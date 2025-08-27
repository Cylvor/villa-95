import { Controller, Get, Put, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { VillasService } from './villas.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Villas')
@Controller('villas')
export class VillasController {
  constructor(private villasService: VillasService) {}

  @Get()
  @ApiOperation({ summary: 'Get villa details' })
  @ApiResponse({ status: 200, description: 'Villa details retrieved successfully' })
  async getVillaDetails() {
    return this.villasService.getVillaDetails();
  }

  @Get('stats')
  @ApiOperation({ summary: 'Get villa statistics' })
  @ApiResponse({ status: 200, description: 'Villa stats retrieved successfully' })
  async getVillaStats() {
    return this.villasService.getVillaStats();
  }

  @Put()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update villa details (admin only)' })
  @ApiResponse({ status: 200, description: 'Villa details updated successfully' })
  async updateVillaDetails(@Body() updateData: any) {
    return this.villasService.updateVillaDetails(updateData);
  }

  @Put('images')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update villa images (admin only)' })
  @ApiResponse({ status: 200, description: 'Villa images updated successfully' })
  async updateVillaImages(@Body() body: { images: string[] }) {
    return this.villasService.updateVillaImages(body.images);
  }

  @Put('availability')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update villa availability (admin only)' })
  @ApiResponse({ status: 200, description: 'Villa availability updated successfully' })
  async updateVillaAvailability(@Body() body: { isAvailable: boolean }) {
    return this.villasService.updateVillaAvailability(body.isAvailable);
  }

  @Put('pricing')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update villa pricing (admin only)' })
  @ApiResponse({ status: 200, description: 'Villa pricing updated successfully' })
  async updateVillaPricing(@Body() body: { pricePerNight: number }) {
    return this.villasService.updateVillaPricing(body.pricePerNight);
  }
}
