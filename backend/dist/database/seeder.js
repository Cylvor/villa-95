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
exports.DatabaseSeeder = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const villa_schema_1 = require("../schemas/villa.schema");
const user_schema_1 = require("../schemas/user.schema");
let DatabaseSeeder = class DatabaseSeeder {
    constructor(villaModel, userModel) {
        this.villaModel = villaModel;
        this.userModel = userModel;
    }
    async seed() {
        console.log('🌱 Starting database seeding...');
        await this.seedVilla();
        await this.seedAdminUser();
        console.log('✅ Database seeding completed!');
    }
    async seedVilla() {
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
        }
        else {
            console.log('🏡 Villa 95 already exists');
        }
    }
    async seedAdminUser() {
        const existingAdmin = await this.userModel.findOne({ email: 'admin@villa95rangala.com' });
        if (!existingAdmin) {
            const bcrypt = require('bcryptjs');
            const passwordHash = await bcrypt.hash('admin123', 12);
            const admin = new this.userModel({
                name: 'Villa 95 Admin',
                email: 'admin@villa95rangala.com',
                passwordHash,
                role: user_schema_1.UserRole.ADMIN,
                isActive: true,
                emailVerified: true,
                phone: '+94 11 234 5678',
                address: 'Villa 95, Rangala, Kandy District, Sri Lanka',
            });
            await admin.save();
            console.log('👤 Admin user seeded successfully');
        }
        else {
            console.log('👤 Admin user already exists');
        }
    }
};
exports.DatabaseSeeder = DatabaseSeeder;
exports.DatabaseSeeder = DatabaseSeeder = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(villa_schema_1.Villa.name)),
    __param(1, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], DatabaseSeeder);
//# sourceMappingURL=seeder.js.map