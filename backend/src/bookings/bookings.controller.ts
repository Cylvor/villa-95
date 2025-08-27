import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Req, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { BookingsService } from './bookings.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateBookingDto, UpdateBookingStatusDto, CancelBookingDto, CheckAvailabilityDto } from '../dto/booking.dto';
import { User, UserRole } from '../schemas/user.schema';

@ApiTags('Bookings')
@Controller('bookings')
export class BookingsController {
  constructor(private bookingsService: BookingsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new booking' })
  @ApiResponse({ status: 201, description: 'Booking created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid booking data' })
  async createBooking(@Body() createBookingDto: CreateBookingDto, @Req() req) {
    return this.bookingsService.createBooking(req.user._id, createBookingDto);
  }

  @Get('my-bookings')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user bookings' })
  @ApiResponse({ status: 200, description: 'User bookings retrieved successfully' })
  async getUserBookings(@Req() req) {
    return this.bookingsService.getUserBookings(req.user._id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all bookings (admin only)' })
  @ApiResponse({ status: 200, description: 'All bookings retrieved successfully' })
  @ApiResponse({ status: 403, description: 'Access denied' })
  async getAllBookings(@Req() req) {
    return this.bookingsService.getAllBookings(req.user);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get booking by ID' })
  @ApiResponse({ status: 200, description: 'Booking retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Booking not found' })
  async getBookingById(@Param('id') id: string, @Req() req) {
    return this.bookingsService.getBookingById(id, req.user._id, req.user.role);
  }

  @Put(':id/status')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update booking status (admin only)' })
  @ApiResponse({ status: 200, description: 'Booking status updated successfully' })
  @ApiResponse({ status: 403, description: 'Access denied' })
  async updateBookingStatus(
    @Param('id') id: string,
    @Body() updateDto: UpdateBookingStatusDto,
    @Req() req,
  ) {
    return this.bookingsService.updateBookingStatus(id, updateDto, req.user);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Cancel booking' })
  @ApiResponse({ status: 200, description: 'Booking cancelled successfully' })
  @ApiResponse({ status: 404, description: 'Booking not found' })
  async cancelBooking(
    @Param('id') id: string,
    @Body() cancelDto: CancelBookingDto,
    @Req() req,
  ) {
    return this.bookingsService.cancelBooking(id, cancelDto, req.user._id, req.user.role);
  }

  @Post('check-availability')
  @ApiOperation({ summary: 'Check villa availability' })
  @ApiResponse({ status: 200, description: 'Availability checked successfully' })
  async checkAvailability(@Body() checkAvailabilityDto: CheckAvailabilityDto) {
    return this.bookingsService.checkAvailability(checkAvailabilityDto);
  }

  @Get('admin/calendar')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get booking calendar (admin only)' })
  @ApiResponse({ status: 200, description: 'Calendar data retrieved successfully' })
  @ApiResponse({ status: 403, description: 'Access denied' })
  async getBookingCalendar(@Req() req) {
    return this.bookingsService.getBookingCalendar(req.user);
  }
}
