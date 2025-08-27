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
exports.VillasController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const villas_service_1 = require("./villas.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let VillasController = class VillasController {
    constructor(villasService) {
        this.villasService = villasService;
    }
    async getVillaDetails() {
        return this.villasService.getVillaDetails();
    }
    async getVillaStats() {
        return this.villasService.getVillaStats();
    }
    async updateVillaDetails(updateData) {
        return this.villasService.updateVillaDetails(updateData);
    }
    async updateVillaImages(body) {
        return this.villasService.updateVillaImages(body.images);
    }
    async updateVillaAvailability(body) {
        return this.villasService.updateVillaAvailability(body.isAvailable);
    }
    async updateVillaPricing(body) {
        return this.villasService.updateVillaPricing(body.pricePerNight);
    }
};
exports.VillasController = VillasController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get villa details' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Villa details retrieved successfully' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], VillasController.prototype, "getVillaDetails", null);
__decorate([
    (0, common_1.Get)('stats'),
    (0, swagger_1.ApiOperation)({ summary: 'Get villa statistics' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Villa stats retrieved successfully' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], VillasController.prototype, "getVillaStats", null);
__decorate([
    (0, common_1.Put)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update villa details (admin only)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Villa details updated successfully' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], VillasController.prototype, "updateVillaDetails", null);
__decorate([
    (0, common_1.Put)('images'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update villa images (admin only)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Villa images updated successfully' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], VillasController.prototype, "updateVillaImages", null);
__decorate([
    (0, common_1.Put)('availability'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update villa availability (admin only)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Villa availability updated successfully' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], VillasController.prototype, "updateVillaAvailability", null);
__decorate([
    (0, common_1.Put)('pricing'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update villa pricing (admin only)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Villa pricing updated successfully' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], VillasController.prototype, "updateVillaPricing", null);
exports.VillasController = VillasController = __decorate([
    (0, swagger_1.ApiTags)('Villas'),
    (0, common_1.Controller)('villas'),
    __metadata("design:paramtypes", [villas_service_1.VillasService])
], VillasController);
//# sourceMappingURL=villas.controller.js.map