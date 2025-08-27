import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Booking, BookingDocument, BookingStatus } from '../schemas/booking.schema';
import { Villa, VillaDocument } from '../schemas/villa.schema';
import { User, UserDocument, UserRole } from '../schemas/user.schema';
import { CreateBookingDto, UpdateBookingStatusDto, CancelBookingDto, CheckAvailabilityDto } from '../dto/booking.dto';

@Injectable()
export class BookingsService {
  constructor(
    @InjectModel(Booking.name) private bookingModel: Model<BookingDocument>,
    @InjectModel(Villa.name) private villaModel: Model<VillaDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async createBooking(userId: string, createBookingDto: CreateBookingDto) {
    const { checkIn, checkOut, guests, ...rest } = createBookingDto;

    // Validate dates
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (checkInDate < today) {
      throw new BadRequestException('Check-in date cannot be in the past');
    }

    if (checkOutDate <= checkInDate) {
      throw new BadRequestException('Check-out date must be after check-in date');
    }

    // Get villa (assuming single villa for now)
    const villa = await this.villaModel.findOne({ isAvailable: true });
    if (!villa) {
      throw new NotFoundException('Villa not available');
    }

    // Check if villa can accommodate guests
    if (guests > villa.maxGuests) {
      throw new BadRequestException(`Villa can only accommodate up to ${villa.maxGuests} guests`);
    }

    // Check availability
    const isAvailable = await this.checkAvailability({ checkIn: checkInDate.toISOString(), checkOut: checkOutDate.toISOString(), guests });
    if (!isAvailable.available) {
      throw new BadRequestException('Villa is not available for the selected dates');
    }

    // Calculate total price
    const nights = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));
    const totalPrice = nights * villa.pricePerNight;

    // Create booking
    const booking = new this.bookingModel({
      userId: new Types.ObjectId(userId),
      villaId: villa._id,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      guests,
      totalPrice,
      status: BookingStatus.PENDING,
      ...rest,
    });

    await booking.save();

    return booking;
  }

  async getUserBookings(userId: string) {
    return this.bookingModel
      .find({ userId: new Types.ObjectId(userId) })
      .populate('villaId', 'name images location')
      .sort({ createdAt: -1 });
  }

  async getAllBookings(user: User) {
    if (user.role !== UserRole.ADMIN) {
      throw new ForbiddenException('Only admins can view all bookings');
    }

    return this.bookingModel
      .find()
      .populate('userId', 'name email')
      .populate('villaId', 'name location')
      .sort({ createdAt: -1 });
  }

  async getBookingById(bookingId: string, userId: string, userRole: UserRole) {
    const booking = await this.bookingModel
      .findById(bookingId)
      .populate('userId', 'name email')
      .populate('villaId', 'name images location amenities');

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    // Check if user can access this booking
    if (userRole !== UserRole.ADMIN && booking.userId.toString() !== userId) {
      throw new ForbiddenException('Access denied');
    }

    return booking;
  }

  async updateBookingStatus(bookingId: string, updateDto: UpdateBookingStatusDto, adminUser: User) {
    if (adminUser.role !== UserRole.ADMIN) {
      throw new ForbiddenException('Only admins can update booking status');
    }

    const booking = await this.bookingModel.findById(bookingId);
    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    booking.status = updateDto.status as BookingStatus;
    
    if (updateDto.notes) {
      booking.adminNotes = {
        notes: updateDto.notes,
        updatedBy: new Types.ObjectId((adminUser as any)._id),
        updatedAt: new Date(),
      };
    }

    await booking.save();
    return booking;
  }

  async cancelBooking(bookingId: string, cancelDto: CancelBookingDto, userId: string, userRole: UserRole) {
    const booking = await this.bookingModel.findById(bookingId);
    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    // Check if user can cancel this booking
    if (userRole !== UserRole.ADMIN && booking.userId.toString() !== userId) {
      throw new ForbiddenException('Access denied');
    }

    if (booking.status === BookingStatus.CANCELLED) {
      throw new BadRequestException('Booking is already cancelled');
    }

    if (booking.status === BookingStatus.COMPLETED) {
      throw new BadRequestException('Cannot cancel completed booking');
    }

    booking.status = BookingStatus.CANCELLED;
    booking.cancellationDetails = {
      cancelledAt: new Date(),
      cancelledBy: new Types.ObjectId(userId),
      reason: cancelDto.reason,
      refundAmount: booking.totalPrice, // Full refund for now
    };

    await booking.save();
    return booking;
  }

  async checkAvailability(checkAvailabilityDto: CheckAvailabilityDto) {
    const { checkIn, checkOut, guests } = checkAvailabilityDto;

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    // Get villa
    const villa = await this.villaModel.findOne({ isAvailable: true });
    if (!villa) {
      return { available: false, reason: 'Villa not available' };
    }

    // Check guest capacity
    if (guests > villa.maxGuests) {
      return { available: false, reason: `Villa can only accommodate up to ${villa.maxGuests} guests` };
    }

    // Check for conflicting bookings
    const conflictingBooking = await this.bookingModel.findOne({
      villaId: villa._id,
      status: { $in: [BookingStatus.PENDING, BookingStatus.CONFIRMED] },
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

    // Calculate price
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

  async getBookingCalendar(adminUser: User) {
    if (adminUser.role !== UserRole.ADMIN) {
      throw new ForbiddenException('Only admins can view booking calendar');
    }

    const bookings = await this.bookingModel
      .find({
        status: { $in: [BookingStatus.PENDING, BookingStatus.CONFIRMED] },
      })
      .populate('userId', 'name email')
      .populate('villaId', 'name')
      .sort({ checkIn: 1 });

    return bookings.map(booking => ({
      id: booking._id,
      title: `${(booking.userId as any).name} - ${booking.guests} guests`,
      start: booking.checkIn,
      end: booking.checkOut,
      status: booking.status,
      guestName: (booking.userId as any).name,
      guestEmail: (booking.userId as any).email,
      guests: booking.guests,
      totalPrice: booking.totalPrice,
    }));
  }
}
