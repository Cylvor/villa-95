import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Villa, VillaDocument } from '../schemas/villa.schema';
import { User, UserDocument, UserRole } from '../schemas/user.schema';

@Injectable()
export class DatabaseSeeder {
  constructor(
    @InjectModel(Villa.name) private villaModel: Model<VillaDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async seed() {
    console.log('🌱 Starting database seeding...');

    // Seed Villa 95
    await this.seedVilla();

    // Seed Admin User
    await this.seedAdminUser();

    console.log('✅ Database seeding completed!');
  }

  private async seedVilla() {
    const existingVilla = await this.villaModel.findOne({ name: 'Villa 95' });
    
    if (!existingVilla) {
      const villa = new this.villaModel({
        name: 'Villa 95',
        description: 'Experience unparalleled luxury in the heart of Sri Lanka\'s misty mountains. Villa 95 offers an unforgettable escape with breathtaking views and world-class amenities.',
        pricePerNight: 250,
        maxGuests: 8,
        bedrooms: 4,
        bathrooms: 3,
        isAvailable: true,
        location: 'Rangala, Kandy District, Sri Lanka',
        coordinates: {
          lat: 7.2906,
          lng: 80.6337,
        },
        images: [
          '/images/villa95-1.jpg',
          '/images/villa95-2.jpg',
          '/images/villa95-3.jpg',
          '/images/villa95-4.jpg',
          '/images/villa95-5.jpg',
          '/images/villa95-6.jpg',
        ],
        facilities: [
          'High-speed WiFi',
          'Free Parking',
          'Air Conditioning',
          'Kitchen',
          'Dining Area',
          'Garden',
          'Terrace',
          'BBQ Facilities',
          'Security System',
          'Cleaning Service',
        ],
        amenities: [
          'King-size beds',
          'Premium linens',
          'Smart TV',
          'Bluetooth speakers',
          'Coffee maker',
          'Refrigerator',
          'Microwave',
          'Dishwasher',
          'Outdoor seating',
          'Mountain views',
        ],
        policies: {
          checkInTime: '2:00 PM',
          checkOutTime: '11:00 AM',
          cancellationPolicy: 'Free cancellation up to 7 days before check-in',
          houseRules: [
            'No smoking',
            'No pets',
            'Quiet hours 10 PM - 8 AM',
            'Maximum 8 guests',
            'No parties or events',
          ],
        },
        rating: 4.9,
        reviewCount: 127,
      });

      await villa.save();
      console.log('🏡 Villa 95 seeded successfully');
    } else {
      console.log('🏡 Villa 95 already exists');
    }
  }

  private async seedAdminUser() {
    const existingAdmin = await this.userModel.findOne({ email: 'admin@villa95rangala.com' });
    
    if (!existingAdmin) {
      const bcrypt = require('bcryptjs');
      const passwordHash = await bcrypt.hash('admin123', 12);

      const admin = new this.userModel({
        name: 'Villa 95 Admin',
        email: 'admin@villa95rangala.com',
        passwordHash,
        role: UserRole.ADMIN,
        isActive: true,
        emailVerified: true,
        phone: '+94 11 234 5678',
        address: 'Villa 95, Rangala, Kandy District, Sri Lanka',
      });

      await admin.save();
      console.log('👤 Admin user seeded successfully');
    } else {
      console.log('👤 Admin user already exists');
    }
  }
}
