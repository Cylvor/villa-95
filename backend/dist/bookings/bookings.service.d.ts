import { Model } from 'mongoose';
import { Booking, BookingDocument, BookingStatus } from '../schemas/booking.schema';
import { VillaDocument } from '../schemas/villa.schema';
import { User, UserDocument, UserRole } from '../schemas/user.schema';
import { CreateBookingDto, UpdateBookingStatusDto, CancelBookingDto, CheckAvailabilityDto } from '../dto/booking.dto';
export declare class BookingsService {
    private bookingModel;
    private villaModel;
    private userModel;
    constructor(bookingModel: Model<BookingDocument>, villaModel: Model<VillaDocument>, userModel: Model<UserDocument>);
    createBooking(userId: string, createBookingDto: CreateBookingDto): Promise<import("mongoose").Document<unknown, {}, BookingDocument, {}, {}> & Booking & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    getUserBookings(userId: string): Promise<(import("mongoose").Document<unknown, {}, BookingDocument, {}, {}> & Booking & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    getAllBookings(user: User): Promise<(import("mongoose").Document<unknown, {}, BookingDocument, {}, {}> & Booking & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    getBookingById(bookingId: string, userId: string, userRole: UserRole): Promise<import("mongoose").Document<unknown, {}, BookingDocument, {}, {}> & Booking & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    updateBookingStatus(bookingId: string, updateDto: UpdateBookingStatusDto, adminUser: User): Promise<import("mongoose").Document<unknown, {}, BookingDocument, {}, {}> & Booking & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    cancelBooking(bookingId: string, cancelDto: CancelBookingDto, userId: string, userRole: UserRole): Promise<import("mongoose").Document<unknown, {}, BookingDocument, {}, {}> & Booking & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    checkAvailability(checkAvailabilityDto: CheckAvailabilityDto): Promise<{
        available: boolean;
        reason: string;
        villa?: undefined;
        nights?: undefined;
        totalPrice?: undefined;
    } | {
        available: boolean;
        villa: {
            id: unknown;
            name: string;
            pricePerNight: number;
            maxGuests: number;
        };
        nights: number;
        totalPrice: number;
        reason?: undefined;
    }>;
    getBookingCalendar(adminUser: User): Promise<{
        id: unknown;
        title: string;
        start: Date;
        end: Date;
        status: BookingStatus;
        guestName: any;
        guestEmail: any;
        guests: number;
        totalPrice: number;
    }[]>;
}
