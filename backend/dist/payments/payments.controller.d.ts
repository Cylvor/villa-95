import { PayHereService } from './payhere.service';
export declare class PaymentsController {
    private payHereService;
    constructor(payHereService: PayHereService);
    initiatePayment(bookingId: string, req: any): Promise<{
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
    handlePayHereCallback(callbackData: any): Promise<{
        success: boolean;
        paymentId: unknown;
        bookingId: any;
        status: import("../schemas/payment.schema").PaymentStatus.COMPLETED | import("../schemas/payment.schema").PaymentStatus.FAILED;
    }>;
    getPaymentStatus(paymentId: string, req: any): Promise<{
        paymentId: unknown;
        status: import("../schemas/payment.schema").PaymentStatus;
        amount: number;
        transactionRef: string;
        method: import("../schemas/payment.schema").PaymentMethod;
        createdAt: any;
        processedAt: Date;
        failureReason: string;
    }>;
}
