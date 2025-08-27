import { Model } from 'mongoose';
import { PaymentDocument, PaymentStatus, PaymentMethod } from '../schemas/payment.schema';
import { BookingDocument } from '../schemas/booking.schema';
import { UserDocument } from '../schemas/user.schema';
export declare class PayHereService {
    private paymentModel;
    private bookingModel;
    private userModel;
    constructor(paymentModel: Model<PaymentDocument>, bookingModel: Model<BookingDocument>, userModel: Model<UserDocument>);
    initiatePayment(bookingId: string, userId: string): Promise<{
        paymentId: unknown;
        transactionRef: string;
        payhereData: {
            signature: string;
            merchant_id: string;
            return_url: string;
            cancel_url: string;
            notify_url: string;
            order_id: string;
            items: string;
            currency: string;
            amount: string;
            first_name: any;
            last_name: any;
            email: any;
            phone: string;
            address: any;
            city: string;
            country: string;
            custom_1: string;
            custom_2: string;
        };
        payhereUrl: string;
    }>;
    handleCallback(callbackData: any): Promise<{
        success: boolean;
        paymentId: unknown;
        bookingId: any;
        status: PaymentStatus.COMPLETED | PaymentStatus.FAILED;
    }>;
    getPaymentStatus(paymentId: string, userId: string): Promise<{
        paymentId: unknown;
        status: PaymentStatus;
        amount: number;
        transactionRef: string;
        method: PaymentMethod;
        createdAt: any;
        processedAt: Date;
        failureReason: string;
    }>;
    private generateSignature;
}
