import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type VillaDocument = Villa & Document;

@Schema({ timestamps: true })
export class Villa {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, min: 0 })
  pricePerNight: number;

  @Prop({ type: [String], default: [] })
  images: string[];

  @Prop({ type: [String], default: [] })
  facilities: string[];

  @Prop({ required: true, min: 1 })
  maxGuests: number;

  @Prop({ required: true, min: 1 })
  bedrooms: number;

  @Prop({ required: true, min: 1 })
  bathrooms: number;

  @Prop({ default: true })
  isAvailable: boolean;

  @Prop({ type: [Date], default: [] })
  unavailableDates: Date[];

  @Prop({ default: 4.9 })
  rating: number;

  @Prop({ default: 0 })
  reviewCount: number;

  @Prop()
  location: string;

  @Prop({ type: Object })
  coordinates?: {
    lat: number;
    lng: number;
  };

  @Prop({ type: [String], default: [] })
  amenities: string[];

  @Prop({ type: Object })
  policies?: {
    checkInTime: string;
    checkOutTime: string;
    cancellationPolicy: string;
    houseRules: string[];
  };
}

export const VillaSchema = SchemaFactory.createForClass(Villa);

// Indexes for better query performance
VillaSchema.index({ isAvailable: 1 });
VillaSchema.index({ pricePerNight: 1 });
VillaSchema.index({ maxGuests: 1 });
