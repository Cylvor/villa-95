import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Villa, VillaDocument } from '../schemas/villa.schema';

@Injectable()
export class VillasService {
  constructor(
    @InjectModel(Villa.name) private villaModel: Model<VillaDocument>,
  ) {}

  async getVillaDetails() {
    const villa = await this.villaModel.findOne({ isAvailable: true });
    if (!villa) {
      throw new NotFoundException('Villa not found');
    }
    return villa;
  }

  async updateVillaDetails(updateData: Partial<Villa>) {
    const villa = await this.villaModel.findOne({ isAvailable: true });
    if (!villa) {
      throw new NotFoundException('Villa not found');
    }

    Object.assign(villa, updateData);
    await villa.save();
    return villa;
  }

  async updateVillaImages(images: string[]) {
    const villa = await this.villaModel.findOne({ isAvailable: true });
    if (!villa) {
      throw new NotFoundException('Villa not found');
    }

    villa.images = images;
    await villa.save();
    return villa;
  }

  async updateVillaAvailability(isAvailable: boolean) {
    const villa = await this.villaModel.findOne({ isAvailable: true });
    if (!villa) {
      throw new NotFoundException('Villa not found');
    }

    villa.isAvailable = isAvailable;
    await villa.save();
    return villa;
  }

  async updateVillaPricing(pricePerNight: number) {
    const villa = await this.villaModel.findOne({ isAvailable: true });
    if (!villa) {
      throw new NotFoundException('Villa not found');
    }

    villa.pricePerNight = pricePerNight;
    await villa.save();
    return villa;
  }

  async getVillaStats() {
    const villa = await this.villaModel.findOne({ isAvailable: true });
    if (!villa) {
      throw new NotFoundException('Villa not found');
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
}
