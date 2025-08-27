import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Payment, PaymentDocument, PaymentStatus, PaymentMethod } from '../schemas/payment.schema';
import { Booking, BookingDocument } from '../schemas/booking.schema';
import { User, UserDocument } from '../schemas/user.schema';

@Injectable()
export class PayHereService {
  constructor(
    @InjectModel(Payment.name) private paymentModel: Model<PaymentDocument>,
    @InjectModel(Booking.name) private bookingModel: Model<BookingDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async initiatePayment(bookingId: string, userId: string) {
    // Get booking details
    const booking = await this.bookingModel
      .findById(bookingId)
      .populate('userId', 'name email')
      .populate('villaId', 'name');

    if (!booking) {
      throw new BadRequestException('Booking not found');
    }

    if (booking.userId.toString() !== userId) {
      throw new BadRequestException('Access denied');
    }

    // Generate unique transaction reference
    const transactionRef = `V95_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Create payment record
    const payment = new this.paymentModel({
      bookingId: new Types.ObjectId(bookingId),
      amount: booking.totalPrice,
      status: PaymentStatus.PENDING,
      method: PaymentMethod.PAYHERE,
      transactionRef,
      currency: 'LKR',
      description: `Booking for Villa 95 - ${booking.checkIn.toDateString()} to ${booking.checkOut.toDateString()}`,
      metadata: {
        customerEmail: (booking.userId as any).email,
        customerName: (booking.userId as any).name,
        customerPhone: booking.contactPhone,
      },
    });

    await payment.save();

    // Prepare PayHere payment data
    const payhereData = {
      merchant_id: process.env.PAYHERE_MERCHANT_ID,
      return_url: `${process.env.FRONTEND_URL}/payment/success`,
      cancel_url: `${process.env.FRONTEND_URL}/payment/cancel`,
      notify_url: `${process.env.BACKEND_URL}/payments/payhere/callback`,
      order_id: transactionRef,
      items: `Villa 95 Booking`,
      currency: 'LKR',
      amount: booking.totalPrice.toFixed(2),
      first_name: (booking.userId as any).name.split(' ')[0],
      last_name: (booking.userId as any).name.split(' ').slice(1).join(' ') || '',
      email: (booking.userId as any).email,
      phone: booking.contactPhone || '',
      address: (booking.userId as any).address || '',
      city: 'Rangala',
      country: 'Sri Lanka',
      custom_1: bookingId,
      custom_2: userId,
    };

    // Generate signature
    const signature = this.generateSignature(payhereData);

    return {
      paymentId: payment._id,
      transactionRef,
      payhereData: {
        ...payhereData,
        signature,
      },
      payhereUrl: process.env.PAYHERE_SANDBOX === 'true' 
        ? 'https://sandbox.payhere.lk/pay/checkout'
        : 'https://www.payhere.lk/pay/checkout',
    };
  }

  async handleCallback(callbackData: any) {
    const {
      merchant_id,
      order_id,
      payment_id,
      payhere_amount,
      payhere_currency,
      status_code,
      md5sig,
      custom_1: bookingId,
      custom_2: userId,
    } = callbackData;

    // Verify signature
    const expectedSignature = this.generateSignature(callbackData);
    if (md5sig !== expectedSignature) {
      throw new BadRequestException('Invalid signature');
    }

    // Find payment record
    const payment = await this.paymentModel.findOne({ transactionRef: order_id });
    if (!payment) {
      throw new BadRequestException('Payment not found');
    }

    // Update payment status
    if (status_code === '2') {
      payment.status = PaymentStatus.COMPLETED;
      payment.payherePaymentId = payment_id;
      payment.processedAt = new Date();
      payment.payhereResponse = {
        status: 'success',
        message: 'Payment completed successfully',
        data: callbackData,
      };

      // Update booking status
      await this.bookingModel.findByIdAndUpdate(bookingId, {
        status: 'confirmed',
        paymentId: payment._id,
      });
    } else {
      payment.status = PaymentStatus.FAILED;
      payment.failureReason = `PayHere status: ${status_code}`;
      payment.payhereResponse = {
        status: 'failed',
        message: 'Payment failed',
        data: callbackData,
      };
    }

    await payment.save();

    return {
      success: status_code === '2',
      paymentId: payment._id,
      bookingId,
      status: payment.status,
    };
  }

  async getPaymentStatus(paymentId: string, userId: string) {
    const payment = await this.paymentModel
      .findById(paymentId)
      .populate('bookingId');

    if (!payment) {
      throw new BadRequestException('Payment not found');
    }

    // Check if user can access this payment
    if ((payment.bookingId as any).userId.toString() !== userId) {
      throw new BadRequestException('Access denied');
    }

    return {
      paymentId: payment._id,
      status: payment.status,
      amount: payment.amount,
      transactionRef: payment.transactionRef,
      method: payment.method,
      createdAt: (payment as any).createdAt,
      processedAt: payment.processedAt,
      failureReason: payment.failureReason,
    };
  }

  private generateSignature(data: any): string {
    const crypto = require('crypto');
    
    // Create signature string
    const signatureString = Object.keys(data)
      .filter(key => key !== 'signature' && key !== 'md5sig')
      .sort()
      .map(key => `${key}=${data[key]}`)
      .join('&');

    // Add secret key
    const signatureWithSecret = signatureString + process.env.PAYHERE_SECRET_KEY;

    // Generate MD5 hash
    return crypto.createHash('md5').update(signatureWithSecret).digest('hex').toUpperCase();
  }
}
