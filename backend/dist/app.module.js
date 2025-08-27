"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const throttler_1 = require("@nestjs/throttler");
const user_schema_1 = require("./schemas/user.schema");
const villa_schema_1 = require("./schemas/villa.schema");
const booking_schema_1 = require("./schemas/booking.schema");
const payment_schema_1 = require("./schemas/payment.schema");
const auth_service_1 = require("./auth/auth.service");
const bookings_service_1 = require("./bookings/bookings.service");
const villas_service_1 = require("./villas/villas.service");
const payhere_service_1 = require("./payments/payhere.service");
const auth_controller_1 = require("./auth/auth.controller");
const bookings_controller_1 = require("./bookings/bookings.controller");
const villas_controller_1 = require("./villas/villas.controller");
const payments_controller_1 = require("./payments/payments.controller");
const jwt_strategy_1 = require("./auth/jwt.strategy");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            mongoose_1.MongooseModule.forRoot(process.env.MONGODB_URI || 'mongodb://localhost:27017/villa95'),
            mongoose_1.MongooseModule.forFeature([
                { name: user_schema_1.User.name, schema: user_schema_1.UserSchema },
                { name: villa_schema_1.Villa.name, schema: villa_schema_1.VillaSchema },
                { name: booking_schema_1.Booking.name, schema: booking_schema_1.BookingSchema },
                { name: payment_schema_1.Payment.name, schema: payment_schema_1.PaymentSchema },
            ]),
            jwt_1.JwtModule.register({
                global: true,
                secret: process.env.JWT_SECRET,
                signOptions: { expiresIn: process.env.JWT_EXPIRES_IN || '15m' },
            }),
            passport_1.PassportModule,
            throttler_1.ThrottlerModule.forRoot([
                {
                    ttl: parseInt(process.env.THROTTLE_TTL) || 60,
                    limit: parseInt(process.env.THROTTLE_LIMIT) || 100,
                },
            ]),
        ],
        controllers: [
            auth_controller_1.AuthController,
            bookings_controller_1.BookingsController,
            villas_controller_1.VillasController,
            payments_controller_1.PaymentsController,
        ],
        providers: [
            auth_service_1.AuthService,
            bookings_service_1.BookingsService,
            villas_service_1.VillasService,
            payhere_service_1.PayHereService,
            jwt_strategy_1.JwtStrategy,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map