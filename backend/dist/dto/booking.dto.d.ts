export declare class CreateBookingDto {
    checkIn: string;
    checkOut: string;
    guests: number;
    specialRequests?: string;
    guestNames?: string[];
    contactPhone?: string;
    contactEmail?: string;
}
export declare class UpdateBookingStatusDto {
    status: string;
    notes?: string;
}
export declare class CancelBookingDto {
    reason: string;
}
export declare class CheckAvailabilityDto {
    checkIn: string;
    checkOut: string;
    guests: number;
}
