import { BookingsService } from './bookings.service';
import { CreateBookingDto, UpdateBookingStatusDto, CancelBookingDto, CheckAvailabilityDto } from '../dto/booking.dto';
export declare class BookingsController {
    private bookingsService;
    constructor(bookingsService: BookingsService);
    createBooking(createBookingDto: CreateBookingDto, req: any): Promise<import("mongoose").Document<unknown, {}, import("../schemas/booking.schema").BookingDocument, {}, {}> & import("../schemas/booking.schema").Booking & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    getUserBookings(req: any): Promise<(import("mongoose").Document<unknown, {}, import("../schemas/booking.schema").BookingDocument, {}, {}> & import("../schemas/booking.schema").Booking & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    getAllBookings(req: any): Promise<(import("mongoose").Document<unknown, {}, import("../schemas/booking.schema").BookingDocument, {}, {}> & import("../schemas/booking.schema").Booking & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    getBookingById(id: string, req: any): Promise<import("mongoose").Document<unknown, {}, import("../schemas/booking.schema").BookingDocument, {}, {}> & import("../schemas/booking.schema").Booking & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    updateBookingStatus(id: string, updateDto: UpdateBookingStatusDto, req: any): Promise<import("mongoose").Document<unknown, {}, import("../schemas/booking.schema").BookingDocument, {}, {}> & import("../schemas/booking.schema").Booking & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    cancelBooking(id: string, cancelDto: CancelBookingDto, req: any): Promise<import("mongoose").Document<unknown, {}, import("../schemas/booking.schema").BookingDocument, {}, {}> & import("../schemas/booking.schema").Booking & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
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
    getBookingCalendar(req: any): Promise<{
        id: unknown;
        title: string;
        start: Date;
        end: Date;
        status: import("../schemas/booking.schema").BookingStatus;
        guestName: any;
        guestEmail: any;
        guests: number;
        totalPrice: number;
    }[]>;
}
