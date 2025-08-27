import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ThrottlerModule } from '@nestjs/throttler';

// Schemas
import { User, UserSchema } from './schemas/user.schema';
import { Villa, VillaSchema } from './schemas/villa.schema';
import { Booking, BookingSchema } from './schemas/booking.schema';
import { Payment, PaymentSchema } from './schemas/payment.schema';

// Services
import { AuthService } from './auth/auth.service';
import { BookingsService } from './bookings/bookings.service';
import { VillasService } from './villas/villas.service';
import { PayHereService } from './payments/payhere.service';

// Controllers
import { AuthController } from './auth/auth.controller';
import { BookingsController } from './bookings/bookings.controller';
import { VillasController } from './villas/villas.controller';
import { PaymentsController } from './payments/payments.controller';

// Guards & Strategies
import { JwtStrategy } from './auth/jwt.strategy';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI || 'mongodb://localhost:27017/villa95'),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Villa.name, schema: VillaSchema },
      { name: Booking.name, schema: BookingSchema },
      { name: Payment.name, schema: PaymentSchema },
    ]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN || '15m' },
    }),
    PassportModule,
    ThrottlerModule.forRoot([
      {
        ttl: parseInt(process.env.THROTTLE_TTL) || 60,
        limit: parseInt(process.env.THROTTLE_LIMIT) || 100,
      },
    ]),
  ],
  controllers: [
    AuthController,
    BookingsController,
    VillasController,
    PaymentsController,
  ],
  providers: [
    AuthService,
    BookingsService,
    VillasService,
    PayHereService,
    JwtStrategy,
  ],
})
export class AppModule {}
