"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VillasService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const villa_schema_1 = require("../schemas/villa.schema");
let VillasService = class VillasService {
    constructor(villaModel) {
        this.villaModel = villaModel;
    }
    async getVillaDetails() {
        const villa = await this.villaModel.findOne({ isAvailable: true });
        if (!villa) {
            throw new common_1.NotFoundException('Villa not found');
        }
        return villa;
    }
    async updateVillaDetails(updateData) {
        const villa = await this.villaModel.findOne({ isAvailable: true });
        if (!villa) {
            throw new common_1.NotFoundException('Villa not found');
        }
        Object.assign(villa, updateData);
        await villa.save();
        return villa;
    }
    async updateVillaImages(images) {
        const villa = await this.villaModel.findOne({ isAvailable: true });
        if (!villa) {
            throw new common_1.NotFoundException('Villa not found');
        }
        villa.images = images;
        await villa.save();
        return villa;
    }
    async updateVillaAvailability(isAvailable) {
        const villa = await this.villaModel.findOne({ isAvailable: true });
        if (!villa) {
            throw new common_1.NotFoundException('Villa not found');
        }
        villa.isAvailable = isAvailable;
        await villa.save();
        return villa;
    }
    async updateVillaPricing(pricePerNight) {
        const villa = await this.villaModel.findOne({ isAvailable: true });
        if (!villa) {
            throw new common_1.NotFoundException('Villa not found');
        }
        villa.pricePerNight = pricePerNight;
        await villa.save();
        return villa;
    }
    async getVillaStats() {
        const villa = await this.villaModel.findOne({ isAvailable: true });
        if (!villa) {
            throw new common_1.NotFoundException('Villa not found');
        }
        return {
            id: villa._id,
            name: villa.name,
            pricePerNight: villa.pricePerNight,
            maxGuests: villa.maxGuests,
            bedrooms: villa.bedrooms,
            bathrooms: villa.bathrooms,
            rating: villa.rating,
            reviewCount: villa.reviewCount,
            isAvailable: villa.isAvailable,
            location: villa.location,
            amenities: villa.amenities,
            facilities: villa.facilities,
        };
    }
};
exports.VillasService = VillasService;
exports.VillasService = VillasService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(villa_schema_1.Villa.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], VillasService);
//# sourceMappingURL=villas.service.js.map