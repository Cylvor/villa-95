"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayHereService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const payment_schema_1 = require("../schemas/payment.schema");
const booking_schema_1 = require("../schemas/booking.schema");
const user_schema_1 = require("../schemas/user.schema");
let PayHereService = class PayHereService {
    constructor(paymentModel, bookingModel, userModel) {
        this.paymentModel = paymentModel;
        this.bookingModel = bookingModel;
        this.userModel = userModel;
    }
    async initiatePayment(bookingId, userId) {
        const booking = await this.bookingModel
            .findById(bookingId)
            .populate('userId', 'name email')
            .populate('villaId', 'name');
        if (!booking) {
            throw new common_1.BadRequestException('Booking not found');
        }
        if (booking.userId.toString() !== userId) {
            throw new common_1.BadRequestException('Access denied');
        }
        const transactionRef = `V95_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const payment = new this.paymentModel({
            bookingId: new mongoose_2.Types.ObjectId(bookingId),
            amount: booking.totalPrice,
            status: payment_schema_1.PaymentStatus.PENDING,
            method: payment_schema_1.PaymentMethod.PAYHERE,
            transactionRef,
            currency: 'LKR',
            description: `Booking for Villa 95 - ${booking.checkIn.toDateString()} to ${booking.checkOut.toDateString()}`,
            metadata: {
                customerEmail: booking.userId.email,
                customerName: booking.userId.name,
                customerPhone: booking.contactPhone,
            },
        });
        await payment.save();
        const payhereData = {
            merchant_id: process.env.PAYHERE_MERCHANT_ID,
            return_url: `${process.env.FRONTEND_URL}/payment/success`,
            cancel_url: `${process.env.FRONTEND_URL}/payment/cancel`,
            notify_url: `${process.env.BACKEND_URL}/payments/payhere/callback`,
            order_id: transactionRef,
            items: `Villa 95 Booking`,
            currency: 'LKR',
            amount: booking.totalPrice.toFixed(2),
            first_name: booking.userId.name.split(' ')[0],
            last_name: booking.userId.name.split(' ').slice(1).join(' ') || '',
            email: booking.userId.email,
            phone: booking.contactPhone || '',
            address: booking.userId.address || '',
            city: 'Rangala',
            country: 'Sri Lanka',
            custom_1: bookingId,
            custom_2: userId,
        };
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
    async handleCallback(callbackData) {
        const { merchant_id, order_id, payment_id, payhere_amount, payhere_currency, status_code, md5sig, custom_1: bookingId, custom_2: userId, } = callbackData;
        const expectedSignature = this.generateSignature(callbackData);
        if (md5sig !== expectedSignature) {
            throw new common_1.BadRequestException('Invalid signature');
        }
        const payment = await this.paymentModel.findOne({ transactionRef: order_id });
        if (!payment) {
            throw new common_1.BadRequestException('Payment not found');
        }
        if (status_code === '2') {
            payment.status = payment_schema_1.PaymentStatus.COMPLETED;
            payment.payherePaymentId = payment_id;
            payment.processedAt = new Date();
            payment.payhereResponse = {
                status: 'success',
                message: 'Payment completed successfully',
                data: callbackData,
            };
            await this.bookingModel.findByIdAndUpdate(bookingId, {
                status: 'confirmed',
                paymentId: payment._id,
            });
        }
        else {
            payment.status = payment_schema_1.PaymentStatus.FAILED;
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
    async getPaymentStatus(paymentId, userId) {
        const payment = await this.paymentModel
            .findById(paymentId)
            .populate('bookingId');
        if (!payment) {
            throw new common_1.BadRequestException('Payment not found');
        }
        if (payment.bookingId.userId.toString() !== userId) {
            throw new common_1.BadRequestException('Access denied');
        }
        return {
            paymentId: payment._id,
            status: payment.status,
            amount: payment.amount,
            transactionRef: payment.transactionRef,
            method: payment.method,
            createdAt: payment.createdAt,
            processedAt: payment.processedAt,
            failureReason: payment.failureReason,
        };
    }
    generateSignature(data) {
        const crypto = require('crypto');
        const signatureString = Object.keys(data)
            .filter(key => key !== 'signature' && key !== 'md5sig')
            .sort()
            .map(key => `${key}=${data[key]}`)
            .join('&');
        const signatureWithSecret = signatureString + process.env.PAYHERE_SECRET_KEY;
        return crypto.createHash('md5').update(signatureWithSecret).digest('hex').toUpperCase();
    }
};
exports.PayHereService = PayHereService;
exports.PayHereService = PayHereService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(payment_schema_1.Payment.name)),
    __param(1, (0, mongoose_1.InjectModel)(booking_schema_1.Booking.name)),
    __param(2, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], PayHereService);
//# sourceMappingURL=payhere.service.js.map