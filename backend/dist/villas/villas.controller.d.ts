import { VillasService } from './villas.service';
export declare class VillasController {
    private villasService;
    constructor(villasService: VillasService);
    getVillaDetails(): Promise<import("mongoose").Document<unknown, {}, import("../schemas/villa.schema").VillaDocument, {}, {}> & import("../schemas/villa.schema").Villa & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
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
    updateVillaDetails(updateData: any): Promise<import("mongoose").Document<unknown, {}, import("../schemas/villa.schema").VillaDocument, {}, {}> & import("../schemas/villa.schema").Villa & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    updateVillaImages(body: {
        images: string[];
    }): Promise<import("mongoose").Document<unknown, {}, import("../schemas/villa.schema").VillaDocument, {}, {}> & import("../schemas/villa.schema").Villa & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    updateVillaAvailability(body: {
        isAvailable: boolean;
    }): Promise<import("mongoose").Document<unknown, {}, import("../schemas/villa.schema").VillaDocument, {}, {}> & import("../schemas/villa.schema").Villa & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    updateVillaPricing(body: {
        pricePerNight: number;
    }): Promise<import("mongoose").Document<unknown, {}, import("../schemas/villa.schema").VillaDocument, {}, {}> & import("../schemas/villa.schema").Villa & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
}
