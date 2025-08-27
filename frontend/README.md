# Villa 95 - Luxury Hill Country Retreat

A modern, responsive booking website for Villa 95, a luxury accommodation in Rangala, Sri Lanka. Built with Next.js 14, Tailwind CSS, and GSAP animations.

## 🏗️ Project Structure

```
frontend/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (pages)/           # Route groups
│   │   │   ├── about/         # About page
│   │   │   ├── gallery/       # Photo gallery
│   │   │   ├── facilities/    # Amenities & facilities
│   │   │   ├── booking/       # Booking system
│   │   │   └── contact/       # Contact form
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Homepage
│   ├── components/            # React components
│   │   ├── layout/            # Layout components
│   │   │   ├── Header.tsx     # Navigation header
│   │   │   ├── Footer.tsx     # Site footer
│   │   │   └── Layout.tsx     # Main layout wrapper
│   │   ├── ui/                # UI components
│   │   │   ├── HeroSection.tsx    # Homepage hero
│   │   │   └── FeaturesSection.tsx # Features showcase
│   │   └── booking/           # Booking components
│   ├── types/                 # TypeScript interfaces
│   ├── utils/                 # Utility functions
│   ├── hooks/                 # Custom React hooks
│   └── lib/                   # Library configurations
├── public/                    # Static assets
└── package.json               # Dependencies
```

## ✨ Features

### 🎨 Design & UX
- **Modern Luxury Design**: Full-screen hero sections, big typography, smooth animations
- **Responsive Layout**: Mobile-first design optimized for all devices
- **Smooth Animations**: GSAP-powered scroll triggers and micro-interactions
- **Beautiful UI**: Tailwind CSS with custom color schemes and gradients

### 🏠 Pages & Content
- **Homepage**: Hero section, features showcase, call-to-action
- **About**: Villa information, location details, company values
- **Gallery**: Photo gallery with categories and lightbox
- **Facilities**: Comprehensive amenities listing with filtering
- **Booking**: Multi-step booking form with date selection and pricing
- **Contact**: Contact form, location info, and FAQ

### 🔧 Technical Features
- **Next.js 14**: Latest React framework with App Router
- **TypeScript**: Full type safety and better development experience
- **Tailwind CSS v4**: Utility-first CSS framework
- **GSAP Animations**: Professional-grade animations and scroll effects
- **Responsive Design**: Mobile-optimized with touch-friendly interactions
- **SEO Optimized**: Meta tags, Open Graph, and structured data

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Villa-95/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🎯 Key Components

### Header Component
- Fixed navigation with scroll effects
- Mobile-responsive menu
- Contact information in top bar
- Call-to-action button

### Hero Section
- Full-screen video/image background
- Animated text and elements
- Parallax scroll effects
- Trust indicators and stats

### Booking System
- Multi-step form (Dates → Guests → Confirmation)
- Real-time pricing calculation
- Date validation and constraints
- Guest count management

### Gallery System
- Category-based filtering
- Lightbox with navigation
- Responsive grid layout
- Image placeholders for development

## 🎨 Design System

### Color Palette
- **Primary**: Amber (#D97706, #B45309)
- **Secondary**: Gray scale (#1F2937, #6B7280)
- **Accent**: Green (#10B981) for success states
- **Background**: White and light gray variations

### Typography
- **Headings**: Bold, large text with gradient effects
- **Body**: Clean, readable fonts optimized for web
- **Accent**: Highlighted text for important information

### Spacing & Layout
- **Container**: Max-width 7xl (1280px) with responsive padding
- **Sections**: Consistent vertical spacing (py-20)
- **Cards**: Rounded corners (rounded-2xl) with shadows
- **Grids**: Responsive grid systems for different screen sizes

## 🔧 Customization

### Adding New Pages
1. Create a new directory in `src/app/(pages)/`
2. Add a `page.tsx` file with your component
3. Import and use the `Layout` component
4. Add navigation links in `Header.tsx`

### Modifying Styles
- Use Tailwind CSS classes for styling
- Custom colors defined in `tailwind.config.js`
- Component-specific styles in individual files
- Global styles in `src/app/globals.css`

### Adding Animations
- Import GSAP and ScrollTrigger
- Use `useEffect` hooks for animation setup
- Clean up ScrollTrigger instances on unmount
- Follow existing animation patterns

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 640px (sm)
- **Tablet**: 640px - 1024px (md, lg)
- **Desktop**: > 1024px (xl, 2xl)

### Mobile-First Approach
- Base styles for mobile devices
- Progressive enhancement for larger screens
- Touch-friendly interactions
- Optimized navigation for small screens

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository
2. Configure build settings
3. Deploy automatically on push

### Other Platforms
- **Netlify**: Build command: `npm run build`
- **AWS Amplify**: Connect repository and build
- **Traditional hosting**: Build and upload `out` directory

## 🔮 Future Enhancements

### Phase 2 Features
- **User Authentication**: Login/registration system
- **Admin Panel**: Booking management and analytics
- **Payment Integration**: PayHere API integration
- **Real-time Availability**: Calendar and booking system
- **Multi-language Support**: Sinhala and English
- **Blog/News Section**: Content management system

### Technical Improvements
- **Performance**: Image optimization and lazy loading
- **SEO**: Advanced meta tags and structured data
- **Analytics**: User behavior tracking
- **Testing**: Unit and integration tests
- **PWA**: Progressive web app features

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is proprietary software for Villa 95. All rights reserved.

## 📞 Support

For technical support or questions:
- Email: dev@villa95rangala.com
- Phone: +94 11 234 5678

---

**Built with ❤️ for Villa 95, Rangala, Sri Lanka**
