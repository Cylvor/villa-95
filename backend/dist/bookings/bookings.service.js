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
exports.BookingsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const booking_schema_1 = require("../schemas/booking.schema");
const villa_schema_1 = require("../schemas/villa.schema");
const user_schema_1 = require("../schemas/user.schema");
let BookingsService = class BookingsService {
    constructor(bookingModel, villaModel, userModel) {
        this.bookingModel = bookingModel;
        this.villaModel = villaModel;
        this.userModel = userModel;
    }
    async createBooking(userId, createBookingDto) {
        const { checkIn, checkOut, guests, ...rest } = createBookingDto;
        const checkInDate = new Date(checkIn);
        const checkOutDate = new Date(checkOut);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (checkInDate < today) {
            throw new common_1.BadRequestException('Check-in date cannot be in the past');
        }
        if (checkOutDate <= checkInDate) {
            throw new common_1.BadRequestException('Check-out date must be after check-in date');
        }
        const villa = await this.villaModel.findOne({ isAvailable: true });
        if (!villa) {
            throw new common_1.NotFoundException('Villa not available');
        }
        if (guests > villa.maxGuests) {
            throw new common_1.BadRequestException(`Villa can only accommodate up to ${villa.maxGuests} guests`);
        }
        const isAvailable = await this.checkAvailability({ checkIn: checkInDate.toISOString(), checkOut: checkOutDate.toISOString(), guests });
        if (!isAvailable.available) {
            throw new common_1.BadRequestException('Villa is not available for the selected dates');
        }
        const nights = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));
        const totalPrice = nights * villa.pricePerNight;
        const booking = new this.bookingModel({
            userId: new mongoose_2.Types.ObjectId(userId),
            villaId: villa._id,
            checkIn: checkInDate,
            checkOut: checkOutDate,
            guests,
            totalPrice,
            status: booking_schema_1.BookingStatus.PENDING,
            ...rest,
        });
        await booking.save();
        return booking;
    }
    async getUserBookings(userId) {
        return this.bookingModel
            .find({ userId: new mongoose_2.Types.ObjectId(userId) })
            .populate('villaId', 'name images location')
            .sort({ createdAt: -1 });
    }
    async getAllBookings(user) {
        if (user.role !== user_schema_1.UserRole.ADMIN) {
            throw new common_1.ForbiddenException('Only admins can view all bookings');
        }
        return this.bookingModel
            .find()
            .populate('userId', 'name email')
            .populate('villaId', 'name location')
            .sort({ createdAt: -1 });
    }
    async getBookingById(bookingId, userId, userRole) {
        const booking = await this.bookingModel
            .findById(bookingId)
            .populate('userId', 'name email')
            .populate('villaId', 'name images location amenities');
        if (!booking) {
            throw new common_1.NotFoundException('Booking not found');
        }
        if (userRole !== user_schema_1.UserRole.ADMIN && booking.userId.toString() !== userId) {
            throw new common_1.ForbiddenException('Access denied');
        }
        return booking;
    }
    async updateBookingStatus(bookingId, updateDto, adminUser) {
        if (adminUser.role !== user_schema_1.UserRole.ADMIN) {
            throw new common_1.ForbiddenException('Only admins can update booking status');
        }
        const booking = await this.bookingModel.findById(bookingId);
        if (!booking) {
            throw new common_1.NotFoundException('Booking not found');
        }
        booking.status = updateDto.status;
        if (updateDto.notes) {
            booking.adminNotes = {
                notes: updateDto.notes,
                updatedBy: new mongoose_2.Types.ObjectId(adminUser._id),
                updatedAt: new Date(),
            };
        }
        await booking.save();
        return booking;
    }
    async cancelBooking(bookingId, cancelDto, userId, userRole) {
        const booking = await this.bookingModel.findById(bookingId);
        if (!booking) {
            throw new common_1.NotFoundException('Booking not found');
        }
        if (userRole !== user_schema_1.UserRole.ADMIN && booking.userId.toString() !== userId) {
            throw new common_1.ForbiddenException('Access denied');
        }
        if (booking.status === booking_schema_1.BookingStatus.CANCELLED) {
            throw new common_1.BadRequestException('Booking is already cancelled');
        }
        if (booking.status === booking_schema_1.BookingStatus.COMPLETED) {
            throw new common_1.BadRequestException('Cannot cancel completed booking');
        }
        booking.status = booking_schema_1.BookingStatus.CANCELLED;
        booking.cancellationDetails = {
            cancelledAt: new Date(),
            cancelledBy: new mongoose_2.Types.ObjectId(userId),
            reason: cancelDto.reason,
            refundAmount: booking.totalPrice,
        };
        await booking.save();
        return booking;
    }
    async checkAvailability(checkAvailabilityDto) {
        const { checkIn, checkOut, guests } = checkAvailabilityDto;
        const checkInDate = new Date(checkIn);
        const checkOutDate = new Date(checkOut);
        const villa = await this.villaModel.findOne({ isAvailable: true });
        if (!villa) {
            return { available: false, reason: 'Villa not available' };
        }
        if (guests > villa.maxGuests) {
            return { available: false, reason: `Villa can only accommodate up to ${villa.maxGuests} guests` };
        }
        const conflictingBooking = await this.bookingModel.findOne({
            villaId: villa._id,
            status: { $in: [booking_schema_1.BookingStatus.PENDING, booking_schema_1.BookingStatus.CONFIRMED] },
            $or: [
                {
                    checkIn: { $lt: checkOutDate },
                    checkOut: { $gt: checkInDate },
                },
            ],
        });
        if (conflictingBooking) {
            return { available: false, reason: 'Villa is already booked for these dates' };
        }
        const nights = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));
        const totalPrice = nights * villa.pricePerNight;
        return {
            available: true,
            villa: {
                id: villa._id,
                name: villa.name,
                pricePerNight: villa.pricePerNight,
                maxGuests: villa.maxGuests,
            },
            nights,
            totalPrice,
        };
    }
    async getBookingCalendar(adminUser) {
        if (adminUser.role !== user_schema_1.UserRole.ADMIN) {
            throw new common_1.ForbiddenException('Only admins can view booking calendar');
        }
        const bookings = await this.bookingModel
            .find({
            status: { $in: [booking_schema_1.BookingStatus.PENDING, booking_schema_1.BookingStatus.CONFIRMED] },
        })
            .populate('userId', 'name email')
            .populate('villaId', 'name')
            .sort({ checkIn: 1 });
        return bookings.map(booking => ({
            id: booking._id,
            title: `${booking.userId.name} - ${booking.guests} guests`,
            start: booking.checkIn,
            end: booking.checkOut,
            status: booking.status,
            guestName: booking.userId.name,
            guestEmail: booking.userId.email,
            guests: booking.guests,
            totalPrice: booking.totalPrice,
        }));
    }
};
exports.BookingsService = BookingsService;
exports.BookingsService = BookingsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(booking_schema_1.Booking.name)),
    __param(1, (0, mongoose_1.InjectModel)(villa_schema_1.Villa.name)),
    __param(2, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], BookingsService);
//# sourceMappingURL=bookings.service.js.map