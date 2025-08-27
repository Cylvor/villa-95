import { format, addDays, differenceInDays, isBefore, isAfter, isSameDay } from 'date-fns';

export const formatDate = (date: Date): string => {
  return format(date, 'MMM dd, yyyy');
};

export const formatDateShort = (date: Date): string => {
  return format(date, 'MMM dd');
};

export const getDateRange = (startDate: Date, endDate: Date): Date[] => {
  const dates: Date[] = [];
  let currentDate = new Date(startDate);
  
  while (isBefore(currentDate, endDate) || isSameDay(currentDate, endDate)) {
    dates.push(new Date(currentDate));
    currentDate = addDays(currentDate, 1);
  }
  
  return dates;
};

export const calculateNights = (checkIn: Date, checkOut: Date): number => {
  return differenceInDays(checkOut, checkIn);
};

export const calculateTotalPrice = (checkIn: Date, checkOut: Date, pricePerNight: number): number => {
  const nights = calculateNights(checkIn, checkOut);
  return nights * pricePerNight;
};

export const isDateAvailable = (date: Date, unavailableDates: Date[]): boolean => {
  return !unavailableDates.some(unavailableDate => isSameDay(date, unavailableDate));
};

export const getMinCheckOutDate = (checkIn: Date): Date => {
  return addDays(checkIn, 1);
};

export const getMaxCheckInDate = (checkOut: Date): Date => {
  return addDays(checkOut, -1);
};

export const isValidDateRange = (checkIn: Date, checkOut: Date): boolean => {
  return isBefore(checkIn, checkOut);
};
