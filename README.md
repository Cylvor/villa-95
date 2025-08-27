# Villa 95 - Luxury Hill Country Retreat Booking System

A complete, modern booking website for Villa 95, a luxury accommodation in Rangala, Sri Lanka. Built with Next.js 14 frontend and NestJS backend, featuring real-time booking, payment processing, and admin management.

## 🏗️ Project Architecture

```
Villa-95/
├── frontend/                 # Next.js 14 Frontend
│   ├── src/
│   │   ├── app/             # App Router pages
│   │   ├── components/      # React components
│   │   ├── types/          # TypeScript interfaces
│   │   └── utils/          # Utility functions
│   └── public/             # Static assets
└── backend/                 # NestJS Backend API
    ├── src/
    │   ├── auth/           # Authentication module
    │   ├── bookings/       # Booking management
    │   ├── villas/         # Villa management
    │   ├── payments/       # Payment processing
    │   ├── schemas/        # MongoDB schemas
    │   └── dto/           # Data Transfer Objects
    └── env.example        # Environment configuration
```

## 🚀 Features

### 🌐 Frontend (Next.js 14)
- **Modern Luxury Design** - Full-screen hero, smooth animations, responsive layout
- **GSAP Animations** - Professional scroll-triggered animations and parallax effects
- **Complete Pages** - Home, About, Gallery, Facilities, Booking, Contact
- **Interactive Booking** - Date selection, guest count, real-time pricing
- **Image Gallery** - Lightbox with category filtering
- **SEO Optimized** - Meta tags, sitemap, robots.txt
- **Mobile Responsive** - Optimized for all devices

### 🔧 Backend (NestJS)
- **JWT Authentication** - Secure login/register with refresh tokens
- **Role-Based Access** - Admin and customer roles
- **Booking Management** - Create, update, cancel bookings
- **Real-time Availability** - Check villa availability instantly
- **PayHere Integration** - Secure payment processing
- **Admin Dashboard** - Manage bookings, users, villa details
- **API Documentation** - Swagger/OpenAPI documentation

### 💳 Payment System
- **PayHere Gateway** - Sri Lanka's leading payment processor
- **Secure Transactions** - MD5 signature verification
- **Payment Tracking** - Real-time status updates
- **Refund Handling** - Automated refund processing

### 🔒 Security Features
- **Input Validation** - Comprehensive data validation
- **Rate Limiting** - DDoS protection
- **CORS Configuration** - Secure cross-origin requests
- **Helmet Security** - HTTP security headers
- **Password Hashing** - bcrypt encryption

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: GSAP + ScrollTrigger
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **State Management**: React Hooks

### Backend
- **Framework**: NestJS 10
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT + Passport
- **Validation**: class-validator
- **Documentation**: Swagger/OpenAPI
- **Payment**: PayHere API

### Infrastructure
- **Frontend Hosting**: Vercel
- **Backend Hosting**: AWS/DigitalOcean
- **Database**: MongoDB Atlas
- **CDN**: Cloudflare
- **Domain**: Custom domain with SSL

## 📋 Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)
- PayHere merchant account
- Git

## 🚀 Quick Start

### 1. Clone Repository
```bash
git clone <repository-url>
cd Villa-95
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Frontend will be available at: http://localhost:3000

### 3. Backend Setup
```bash
cd backend
npm install
cp env.example .env
# Edit .env with your configuration
npm run start:dev
```
Backend will be available at: http://localhost:3001
API Documentation: http://localhost:3001/api/docs

### 4. Database Setup
- Install MongoDB locally or use MongoDB Atlas
- Update `MONGODB_URI` in backend `.env`
- The application will auto-seed initial data

## ⚙️ Environment Configuration

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Backend (.env)
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

## 📱 Pages & Features

### 🏠 Home Page
- Full-screen hero with video/image background
- Animated text and call-to-action buttons
- Feature highlights with GSAP animations
- Smooth scroll navigation

### ℹ️ About Page
- Villa history and story
- Location information
- Core values and mission
- Team information

### 📸 Gallery Page
- Image grid with lightbox
- Category filtering (Exterior, Interior, etc.)
- Responsive image loading
- Full-screen image viewing

### 🏊 Facilities Page
- Tabbed navigation for different categories
- Detailed facility descriptions
- Interactive cards with hover effects
- Contact information

### 📅 Booking Page
- Date range picker
- Guest count selection
- Real-time pricing calculation
- Booking form with validation
- Payment integration

### 📞 Contact Page
- Contact form with validation
- Google Maps integration
- FAQ section
- Contact information

## 🔐 Authentication System

### User Registration
```http
POST /api/v1/auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "+94 11 234 5678"
}
```

### User Login
```http
POST /api/v1/auth/login
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Protected Routes
- All booking operations require authentication
- Admin routes require admin role
- JWT tokens with automatic refresh

## 📊 Admin Features

### Admin Dashboard
- View all bookings with filtering
- Update booking status
- Manage villa availability
- User management
- Payment tracking

### Booking Calendar
- Visual calendar view
- Booking details on hover
- Status color coding
- Export functionality

### Villa Management
- Update villa details
- Manage images
- Set pricing
- Control availability

## 💳 Payment Integration

### PayHere Setup
1. Register for PayHere merchant account
2. Get merchant ID and secret key
3. Configure sandbox/production environment
4. Set up webhook URLs

### Payment Flow
1. User creates booking
2. System generates PayHere payment link
3. User completes payment on PayHere
4. Webhook updates booking status
5. Confirmation email sent

## 🚀 Deployment

### Frontend (Vercel)
```bash
cd frontend
npm run build
# Deploy to Vercel
```

### Backend (AWS/DigitalOcean)
```bash
cd backend
npm run build
npm run start:prod
# Deploy using PM2 or Docker
```

### Database (MongoDB Atlas)
1. Create MongoDB Atlas cluster
2. Configure network access
3. Create database user
4. Update connection string

## 📈 Performance Optimization

### Frontend
- Image optimization with Next.js
- Code splitting and lazy loading
- GSAP animations optimized
- Responsive design

### Backend
- Database indexing
- Query optimization
- Rate limiting
- Caching strategies

## 🔒 Security Measures

### Frontend
- Input sanitization
- XSS protection
- HTTPS enforcement
- Secure cookie handling

### Backend
- JWT token security
- Password hashing
- Input validation
- Rate limiting
- CORS configuration

## 🧪 Testing

### Frontend Testing
```bash
cd frontend
npm run test
npm run test:e2e
```

### Backend Testing
```bash
cd backend
npm run test
npm run test:e2e
npm run test:cov
```

## 📊 Monitoring & Analytics

### Frontend
- Google Analytics integration
- Performance monitoring
- Error tracking
- User behavior analytics

### Backend
- Application logging
- Error tracking
- Performance monitoring
- Database query optimization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

This project is proprietary software for Villa 95. All rights reserved.

## 📞 Support

### Technical Support
- Email: dev@villa95rangala.com
- Phone: +94 11 234 5678

### Villa 95 Contact
- Email: info@villa95rangala.com
- Phone: +94 11 234 5678
- Address: Villa 95, Rangala, Kandy District, Sri Lanka

## 🎯 Roadmap

### Phase 1 (Current)
- ✅ Basic booking system
- ✅ Payment integration
- ✅ Admin dashboard
- ✅ Responsive design

### Phase 2 (Future)
- 🔄 Multi-language support
- 🔄 Advanced analytics
- 🔄 Mobile app
- 🔄 SMS notifications

### Phase 3 (Future)
- 🔄 AI-powered pricing
- 🔄 Virtual tours
- 🔄 Guest reviews
- 🔄 Loyalty program

---

## 🎯 Project Status: ✅ COMPLETE

All requested features have been implemented and are ready for production deployment:

### ✅ Phase 1: Frontend Development
- ✅ Next.js 14 with App Router
- ✅ Tailwind CSS v4 styling
- ✅ GSAP animations and scroll triggers
- ✅ All pages: Home, About, Gallery, Facilities, Booking, Contact
- ✅ Responsive design for mobile and desktop
- ✅ SEO optimization (meta tags, sitemap, robots.txt)

### ✅ Phase 2: Backend Development
- ✅ NestJS with TypeScript
- ✅ MongoDB Atlas integration
- ✅ JWT authentication with refresh tokens
- ✅ Complete API endpoints for all features
- ✅ PayHere payment integration
- ✅ Admin panel functionality
- ✅ Security features (Helmet, rate limiting, validation)

### ✅ Phase 3: Frontend-Backend Integration
- ✅ API client with JWT handling
- ✅ Authentication context and modals
- ✅ Real-time booking system
- ✅ Payment flow integration
- ✅ Admin dashboard
- ✅ User profile management
- ✅ CSRF protection

### ✅ Phase 4: Finalization & Deployment
- ✅ HTTPS security with Cloudflare
- ✅ CSRF protection and input sanitization
- ✅ Vercel deployment configuration
- ✅ DigitalOcean/AWS deployment setup
- ✅ MongoDB Atlas configuration
- ✅ CI/CD with GitHub Actions
- ✅ SEO enhancements (structured data)
- ✅ Analytics integration (Google Analytics, Plausible)
- ✅ Complete deployment documentation

### 🚀 Ready for Production
The Villa 95 booking system is now complete and ready for production deployment. All security measures, performance optimizations, and deployment configurations have been implemented.

**Built with ❤️ for Villa 95, Rangala, Sri Lanka**

*Experience luxury in the heart of Sri Lanka's misty mountains*
