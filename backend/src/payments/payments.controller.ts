import { Controller, Post, Get, Param, Body, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { PayHereService } from './payhere.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Payments')
@Controller('payments')
export class PaymentsController {
  constructor(private payHereService: PayHereService) {}

  @Post('initiate/:bookingId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Initiate PayHere payment' })
  @ApiResponse({ status: 200, description: 'Payment initiated successfully' })
  async initiatePayment(@Param('bookingId') bookingId: string, @Req() req) {
    return this.payHereService.initiatePayment(bookingId, req.user._id);
  }

  @Post('payhere/callback')
  @ApiOperation({ summary: 'PayHere payment callback' })
  @ApiResponse({ status: 200, description: 'Callback processed successfully' })
  async handlePayHereCallback(@Body() callbackData: any) {
    return this.payHereService.handleCallback(callbackData);
  }

  @Get('status/:paymentId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get payment status' })
  @ApiResponse({ status: 200, description: 'Payment status retrieved successfully' })
  async getPaymentStatus(@Param('paymentId') paymentId: string, @Req() req) {
    return this.payHereService.getPaymentStatus(paymentId, req.user._id);
  }
}
