import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type PaymentDocument = Payment & Document;

export enum PaymentStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed',
  CANCELLED = 'cancelled',
  REFUNDED = 'refunded',
}

export enum PaymentMethod {
  PAYHERE = 'payhere',
  CASH = 'cash',
  BANK_TRANSFER = 'bank_transfer',
}

@Schema({ timestamps: true })
export class Payment {
  @Prop({ type: Types.ObjectId, ref: 'Booking', required: true })
  bookingId: Types.ObjectId;

  @Prop({ required: true, min: 0 })
  amount: number;

  @Prop({ type: String, enum: PaymentStatus, default: PaymentStatus.PENDING })
  status: PaymentStatus;

  @Prop({ type: String, enum: PaymentMethod, required: true })
  method: PaymentMethod;

  @Prop({ required: true })
  transactionRef: string;

  @Prop()
  payhereOrderId?: string;

  @Prop()
  payherePaymentId?: string;

  @Prop({ type: Object })
  payhereResponse?: {
    status: string;
    message: string;
    data: any;
  };

  @Prop()
  currency: string;

  @Prop()
  description?: string;

  @Prop({ type: Object })
  metadata?: {
    customerEmail: string;
    customerPhone?: string;
    customerName: string;
  };

  @Prop()
  processedAt?: Date;

  @Prop({ type: Object })
  refundDetails?: {
    refundedAt: Date;
    refundAmount: number;
    reason: string;
    processedBy: Types.ObjectId;
  };

  @Prop()
  failureReason?: string;

  @Prop()
  retryCount: number;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);

// Indexes for better query performance
PaymentSchema.index({ bookingId: 1 });
PaymentSchema.index({ status: 1 });
PaymentSchema.index({ transactionRef: 1 }, { unique: true });
PaymentSchema.index({ payhereOrderId: 1 });
PaymentSchema.index({ createdAt: -1 });
