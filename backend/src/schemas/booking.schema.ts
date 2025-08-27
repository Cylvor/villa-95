import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type BookingDocument = Booking & Document;

export enum BookingStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  CANCELLED = 'cancelled',
  COMPLETED = 'completed',
}

@Schema({ timestamps: true })
export class Booking {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Villa', required: true })
  villaId: Types.ObjectId;

  @Prop({ required: true })
  checkIn: Date;

  @Prop({ required: true })
  checkOut: Date;

  @Prop({ required: true, min: 1 })
  guests: number;

  @Prop({ required: true, min: 0 })
  totalPrice: number;

  @Prop({ type: String, enum: BookingStatus, default: BookingStatus.PENDING })
  status: BookingStatus;

  @Prop({ type: Types.ObjectId, ref: 'Payment' })
  paymentId?: Types.ObjectId;

  @Prop()
  specialRequests?: string;

  @Prop({ type: [String], default: [] })
  guestNames: string[];

  @Prop()
  contactPhone?: string;

  @Prop()
  contactEmail?: string;

  @Prop({ type: Object })
  cancellationDetails?: {
    cancelledAt: Date;
    cancelledBy: Types.ObjectId;
    reason: string;
    refundAmount: number;
  };

  @Prop({ type: Object })
  adminNotes?: {
    notes: string;
    updatedBy: Types.ObjectId;
    updatedAt: Date;
  };
}

export const BookingSchema = SchemaFactory.createForClass(Booking);

// Indexes for better query performance
BookingSchema.index({ userId: 1 });
BookingSchema.index({ villaId: 1 });
BookingSchema.index({ status: 1 });
BookingSchema.index({ checkIn: 1, checkOut: 1 });
BookingSchema.index({ createdAt: -1 });
