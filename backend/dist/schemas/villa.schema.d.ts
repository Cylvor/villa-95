import { Document } from 'mongoose';
export type VillaDocument = Villa & Document;
export declare class Villa {
    name: string;
    description: string;
    pricePerNight: number;
    images: string[];
    facilities: string[];
    maxGuests: number;
    bedrooms: number;
    bathrooms: number;
    isAvailable: boolean;
    unavailableDates: Date[];
    rating: number;
    reviewCount: number;
    location: string;
    coordinates?: {
        lat: number;
        lng: number;
    };
    amenities: string[];
    policies?: {
        checkInTime: string;
        checkOutTime: string;
        cancellationPolicy: string;
        houseRules: string[];
    };
}
export declare const VillaSchema: import("mongoose").Schema<Villa, import("mongoose").Model<Villa, any, any, any, Document<unknown, any, Villa, any, {}> & Villa & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Villa, Document<unknown, {}, import("mongoose").FlatRecord<Villa>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Villa> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
