import { Document, Types } from 'mongoose';
export type BookingDocument = Booking & Document;
export declare enum BookingStatus {
    PENDING = "pending",
    CONFIRMED = "confirmed",
    CANCELLED = "cancelled",
    COMPLETED = "completed"
}
export declare class Booking {
    userId: Types.ObjectId;
    villaId: Types.ObjectId;
    checkIn: Date;
    checkOut: Date;
    guests: number;
    totalPrice: number;
    status: BookingStatus;
    paymentId?: Types.ObjectId;
    specialRequests?: string;
    guestNames: string[];
    contactPhone?: string;
    contactEmail?: string;
    cancellationDetails?: {
        cancelledAt: Date;
        cancelledBy: Types.ObjectId;
        reason: string;
        refundAmount: number;
    };
    adminNotes?: {
        notes: string;
        updatedBy: Types.ObjectId;
        updatedAt: Date;
    };
}
export declare const BookingSchema: import("mongoose").Schema<Booking, import("mongoose").Model<Booking, any, any, any, Document<unknown, any, Booking, any, {}> & Booking & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Booking, Document<unknown, {}, import("mongoose").FlatRecord<Booking>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Booking> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
