# Villa 95 - Backend API

A robust NestJS backend API for the Villa 95 booking system with authentication, booking management, and PayHere payment integration.

## 🏗️ Architecture

```
backend/
├── src/
│   ├── auth/                 # Authentication module
│   │   ├── auth.service.ts   # JWT auth logic
│   │   ├── auth.controller.ts # Auth endpoints
│   │   ├── jwt.strategy.ts   # JWT strategy
│   │   └── jwt-auth.guard.ts # JWT guard
│   ├── bookings/             # Booking management
│   │   ├── bookings.service.ts
│   │   └── bookings.controller.ts
│   ├── villas/               # Villa management
│   │   ├── villas.service.ts
│   │   └── villas.controller.ts
│   ├── payments/             # Payment processing
│   │   ├── payhere.service.ts
│   │   └── payments.controller.ts
│   ├── schemas/              # MongoDB schemas
│   │   ├── user.schema.ts
│   │   ├── villa.schema.ts
│   │   ├── booking.schema.ts
│   │   └── payment.schema.ts
│   ├── dto/                  # Data Transfer Objects
│   │   ├── auth.dto.ts
│   │   └── booking.dto.ts
│   ├── database/             # Database utilities
│   │   └── seeder.ts
│   ├── app.module.ts         # Main module
│   └── main.ts              # Application entry
├── env.example              # Environment variables
└── package.json
```

## 🚀 Features

### 🔐 Authentication & Authorization
- **JWT-based authentication** with access and refresh tokens
- **Role-based access control** (Admin/Customer)
- **Password hashing** with bcrypt
- **Token refresh** mechanism

### 📅 Booking Management
- **Create bookings** with date validation
- **Check availability** in real-time
- **Booking status management** (pending, confirmed, cancelled, completed)
- **User booking history**
- **Admin booking calendar**

### 💳 Payment Integration
- **PayHere payment gateway** integration
- **Payment status tracking**
- **Secure signature verification**
- **Payment callbacks** handling

### 🏠 Villa Management
- **Villa details** management
- **Availability control**
- **Pricing updates**
- **Image management**

### 🔒 Security Features
- **Input validation** with class-validator
- **Rate limiting** with ThrottlerModule
- **Helmet** security headers
- **CORS** configuration
- **Request sanitization**

## 🛠️ Tech Stack

- **Framework**: NestJS 10
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT + Passport
- **Validation**: class-validator + class-transformer
- **Documentation**: Swagger/OpenAPI
- **Security**: Helmet, bcryptjs
- **Payment**: PayHere API

## 📋 Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)
- PayHere merchant account (for payments)

## 🚀 Installation

1. **Clone and navigate to backend**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment setup**
   ```bash
   cp env.example .env
   # Edit .env with your configuration
   ```

4. **Start MongoDB** (if local)
   ```bash
   mongod
   ```

5. **Run the application**
   ```bash
   # Development
   npm run start:dev
   
   # Production
   npm run build
   npm run start:prod
   ```

## ⚙️ Environment Variables

```env
# Database
MONGODB_URI=mongodb://localhost:27017/villa95

# JWT
JWT_SECRET=your-super-secret-jwt-key
JWT_REFRESH_SECRET=your-super-secret-refresh-key
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# PayHere
PAYHERE_MERCHANT_ID=your-merchant-id
PAYHERE_SECRET_KEY=your-secret-key
PAYHERE_SANDBOX=true

# App
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
BACKEND_URL=http://localhost:3001

# Rate Limiting
THROTTLE_TTL=60
THROTTLE_LIMIT=100
```

## 📚 API Documentation

Once the server is running, visit:
- **Swagger UI**: http://localhost:3001/api/docs
- **API Base URL**: http://localhost:3001/api/v1

## 🔐 Authentication Endpoints

### Register User
```http
POST /api/v1/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "+94 11 234 5678"
}
```

### Login
```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Refresh Token
```http
POST /api/v1/auth/refresh
Content-Type: application/json

{
  "refreshToken": "your-refresh-token"
}
```

## 📅 Booking Endpoints

### Check Availability
```http
POST /api/v1/bookings/check-availability
Content-Type: application/json

{
  "checkIn": "2024-01-15",
  "checkOut": "2024-01-18",
  "guests": 2
}
```

### Create Booking
```http
POST /api/v1/bookings
Authorization: Bearer your-jwt-token
Content-Type: application/json

{
  "checkIn": "2024-01-15",
  "checkOut": "2024-01-18",
  "guests": 2,
  "specialRequests": "Early check-in if possible"
}
```

### Get User Bookings
```http
GET /api/v1/bookings/my-bookings
Authorization: Bearer your-jwt-token
```

## 💳 Payment Endpoints

### Initiate Payment
```http
POST /api/v1/payments/initiate/:bookingId
Authorization: Bearer your-jwt-token
```

### Check Payment Status
```http
GET /api/v1/payments/status/:paymentId
Authorization: Bearer your-jwt-token
```

## 🏠 Villa Endpoints

### Get Villa Details
```http
GET /api/v1/villas
```

### Get Villa Stats
```http
GET /api/v1/villas/stats
```

## 👨‍💼 Admin Endpoints

### Get All Bookings
```http
GET /api/v1/bookings
Authorization: Bearer admin-jwt-token
```

### Update Booking Status
```http
PUT /api/v1/bookings/:id/status
Authorization: Bearer admin-jwt-token
Content-Type: application/json

{
  "status": "confirmed",
  "notes": "Booking confirmed by admin"
}
```

### Get Booking Calendar
```http
GET /api/v1/bookings/admin/calendar
Authorization: Bearer admin-jwt-token
```

## 🗄️ Database Schema

### User
```typescript
{
  name: string;
  email: string;
  passwordHash: string;
  role: 'admin' | 'customer';
  isActive: boolean;
  phone?: string;
  address?: string;
  emailVerified: boolean;
  lastLoginAt?: Date;
}
```

### Villa
```typescript
{
  name: string;
  description: string;
  pricePerNight: number;
  maxGuests: number;
  bedrooms: number;
  bathrooms: number;
  images: string[];
  facilities: string[];
  amenities: string[];
  isAvailable: boolean;
  location: string;
  coordinates?: { lat: number; lng: number };
  policies?: {
    checkInTime: string;
    checkOutTime: string;
    cancellationPolicy: string;
    houseRules: string[];
  };
}
```

### Booking
```typescript
{
  userId: ObjectId;
  villaId: ObjectId;
  checkIn: Date;
  checkOut: Date;
  guests: number;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  paymentId?: ObjectId;
  specialRequests?: string;
  guestNames?: string[];
  contactPhone?: string;
  contactEmail?: string;
}
```

### Payment
```typescript
{
  bookingId: ObjectId;
  amount: number;
  status: 'pending' | 'completed' | 'failed' | 'cancelled' | 'refunded';
  method: 'payhere' | 'cash' | 'bank_transfer';
  transactionRef: string;
  payhereOrderId?: string;
  payherePaymentId?: string;
  currency: string;
  metadata?: {
    customerEmail: string;
    customerPhone?: string;
    customerName: string;
  };
}
```

## 🔒 Security

### JWT Authentication
- Access tokens expire in 15 minutes
- Refresh tokens expire in 7 days
- Secure token storage and transmission

### Input Validation
- All inputs validated with class-validator
- SQL injection prevention
- XSS protection with Helmet

### Rate Limiting
- 100 requests per minute per IP
- Configurable limits and time windows

### CORS
- Configured for frontend domain
- Credentials support enabled

## 🧪 Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## 🚀 Deployment

### Production Build
```bash
npm run build
npm run start:prod
```

### Docker (Optional)
```bash
docker build -t villa95-backend .
docker run -p 3001:3001 villa95-backend
```

### Environment Variables for Production
- Set `NODE_ENV=production`
- Use strong JWT secrets
- Configure MongoDB Atlas connection
- Set up PayHere production credentials
- Configure proper CORS origins

## 📊 Monitoring & Logging

- Application logs with timestamps
- Error tracking and reporting
- Performance monitoring
- Database query optimization

## 🔄 Database Seeding

The application includes a seeder that creates:
- Villa 95 with complete details
- Admin user (admin@villa95rangala.com / admin123)

Run seeding on first startup or manually trigger.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

This project is proprietary software for Villa 95. All rights reserved.

## 📞 Support

For technical support:
- Email: dev@villa95rangala.com
- Phone: +94 11 234 5678

---

**Built with ❤️ for Villa 95, Rangala, Sri Lanka**
