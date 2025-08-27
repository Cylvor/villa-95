import { Model } from 'mongoose';
import { Villa, VillaDocument } from '../schemas/villa.schema';
export declare class VillasService {
    private villaModel;
    constructor(villaModel: Model<VillaDocument>);
    getVillaDetails(): Promise<import("mongoose").Document<unknown, {}, VillaDocument, {}, {}> & Villa & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    updateVillaDetails(updateData: Partial<Villa>): Promise<import("mongoose").Document<unknown, {}, VillaDocument, {}, {}> & Villa & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    updateVillaImages(images: string[]): Promise<import("mongoose").Document<unknown, {}, VillaDocument, {}, {}> & Villa & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    updateVillaAvailability(isAvailable: boolean): Promise<import("mongoose").Document<unknown, {}, VillaDocument, {}, {}> & Villa & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    updateVillaPricing(pricePerNight: number): Promise<import("mongoose").Document<unknown, {}, VillaDocument, {}, {}> & Villa & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    getVillaStats(): Promise<{
        id: unknown;
        name: string;
        pricePerNight: number;
        maxGuests: number;
        bedrooms: number;
        bathrooms: number;
        rating: number;
        reviewCount: number;
        isAvailable: boolean;
        location: string;
        amenities: string[];
        facilities: string[];
    }>;
}
