import { IsDateString, IsNumber, IsString, IsOptional, Min, Max, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateBookingDto {
  @ApiProperty({ example: '2024-01-15' })
  @IsDateString()
  checkIn: string;

  @ApiProperty({ example: '2024-01-18' })
  @IsDateString()
  checkOut: string;

  @ApiProperty({ example: 2, minimum: 1, maximum: 8 })
  @IsNumber()
  @Min(1)
  @Max(8)
  @Type(() => Number)
  guests: number;

  @ApiProperty({ example: 'Early check-in if possible', required: false })
  @IsOptional()
  @IsString()
  specialRequests?: string;

  @ApiProperty({ example: ['John Doe', 'Jane Doe'], required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  guestNames?: string[];

  @ApiProperty({ example: '+94 11 234 5678', required: false })
  @IsOptional()
  @IsString()
  contactPhone?: string;

  @ApiProperty({ example: 'john@example.com', required: false })
  @IsOptional()
  @IsString()
  contactEmail?: string;
}

export class UpdateBookingStatusDto {
  @ApiProperty({ enum: ['pending', 'confirmed', 'cancelled', 'completed'] })
  @IsString()
  status: string;

  @ApiProperty({ example: 'Booking confirmed by admin', required: false })
  @IsOptional()
  @IsString()
  notes?: string;
}

export class CancelBookingDto {
  @ApiProperty({ example: 'Change of plans' })
  @IsString()
  reason: string;
}

export class CheckAvailabilityDto {
  @ApiProperty({ example: '2024-01-15' })
  @IsDateString()
  checkIn: string;

  @ApiProperty({ example: '2024-01-18' })
  @IsDateString()
  checkOut: string;

  @ApiProperty({ example: 2, minimum: 1, maximum: 8 })
  @IsNumber()
  @Min(1)
  @Max(8)
  @Type(() => Number)
  guests: number;
}
