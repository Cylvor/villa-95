import { Document, Types } from 'mongoose';
export type PaymentDocument = Payment & Document;
export declare enum PaymentStatus {
    PENDING = "pending",
    COMPLETED = "completed",
    FAILED = "failed",
    CANCELLED = "cancelled",
    REFUNDED = "refunded"
}
export declare enum PaymentMethod {
    PAYHERE = "payhere",
    CASH = "cash",
    BANK_TRANSFER = "bank_transfer"
}
export declare class Payment {
    bookingId: Types.ObjectId;
    amount: number;
    status: PaymentStatus;
    method: PaymentMethod;
    transactionRef: string;
    payhereOrderId?: string;
    payherePaymentId?: string;
    payhereResponse?: {
        status: string;
        message: string;
        data: any;
    };
    currency: string;
    description?: string;
    metadata?: {
        customerEmail: string;
        customerPhone?: string;
        customerName: string;
    };
    processedAt?: Date;
    refundDetails?: {
        refundedAt: Date;
        refundAmount: number;
        reason: string;
        processedBy: Types.ObjectId;
    };
    failureReason?: string;
    retryCount: number;
}
export declare const PaymentSchema: import("mongoose").Schema<Payment, import("mongoose").Model<Payment, any, any, any, Document<unknown, any, Payment, any, {}> & Payment & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Payment, Document<unknown, {}, import("mongoose").FlatRecord<Payment>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Payment> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
