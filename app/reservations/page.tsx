"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import Image from "next/image";
import Footer from "../components/Footer";
import { 
   Star, 
  ExternalLink, 
  CheckCircle2, 
  ArrowLeft,
  MessageCircle
} from "lucide-react";

export default function ReservationsPage() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const backgroundImages = [
    '/Images/Family/V95_Family_Rooms_1.webp',
    '/Images/Family/V95_Family_Rooms_2.webp',
    '/Images/Family/V95_Family_Rooms_3.webp',
    '/Images/Single/V95_Single_Rooms_1.webp',
    '/Images/Single/V95_Single_Rooms_2.webp',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % backgroundImages.length
      );
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero fade in
      gsap.from(".hero-content", {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      // Platform cards stagger
      gsap.from(".platform-card", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        delay: 0.3,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const platforms = [
    {
      name: "Booking.com",
      logo: "/logo/bookingcom-1.svg",
      rating: "9.3",
      ratingLabel: "Superb",
      reviews: "100+ reviews",
      url: "https://www.booking.com/hotel/lk/villa-95-kandy.en-gb.html",
      disabled: false,
      features: [
        "Instant Confirmation",
        "Free Cancellation Available",
        "Best Price Guarantee",
        "24/7 Customer Support"
      ],
      color: "from-stone-900 to-stone-900",
      hoverColor: "hover:from-emerald-700 hover:to-emerald-700",
      highlight: "Most Popular",
      highlightColor: "bg-stone-900"
    },
    {
      name: "TripAdvisor",
      logo: "/logo/tripadvisor-2.svg",
      rating: "5.0",
      ratingLabel: "Excellent",
      reviews: "Verified Reviews",
      url: "https://www.tripadvisor.com/Hotel_Review-g304138-d32968471-Reviews-Villa_95_Rangala-Kandy_Kandy_District_Central_Province.html",
      disabled: false,
      features: [
        "Traveler Verified Reviews",
        "Photo Galleries",
        "Travel Community Forums",
        "Secure Booking System"
      ],
      color: "from-stone-900 to-stone-900",
      hoverColor: "hover:from-emerald-700 hover:to-emerald-700",
      highlight: "Trusted Reviews",
      highlightColor: "bg-stone-900"
    },
    {
      name: "Google Hotels",
      logo: "/logo/google-g-2015.svg",
      rating: "4.7",
      ratingLabel: "Highly Rated",
      reviews: "Google Reviews",
      url: "https://share.google/x1xq76In5X6bNQfmy",
      disabled: false,
      features: [
        "Compare All Prices",
        "See Multiple Platforms",
        "Maps & Directions",
        "Quick Price Search"
      ],
      color: "from-stone-900 to-stone-900",
      hoverColor: "hover:from-emerald-700 hover:to-emerald-700",
      highlight: "Best Comparison",
      highlightColor: "bg-stone-900"
    }
  ];


  return (
    <div className="min-h-screen relative overflow-hidden">
      
      {/* Background Image with Overlay */}
      <div className="fixed inset-0 z-0">
        {/* Image Slideshow */}
        {backgroundImages.map((image, index) => (
          <div
            key={image}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={image}
              alt={`Villa 95 background ${index + 1}`}
              fill
              className={`object-cover transition-transform duration-[7000ms] ease-out ${
                index === currentImageIndex ? 'scale-110' : 'scale-100'
              }`}
              priority={index === 0}
              quality={85}
            />
          </div>
        ))}
        
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70 z-0" />
        
        {/* Subtle Dot Pattern */}
        <div className="absolute inset-0 opacity-[0.02] z-20" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>
      
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 z-50 w-full bg-white/95 backdrop-blur-md shadow-sm relative">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 md:px-12 py-3 sm:py-4 gap-2">
          <Link href="/" className="flex items-center gap-2 text-stone-900 hover:text-emerald-600 transition-colors shrink-0">
            <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="text-xs sm:text-sm font-bold uppercase tracking-widest hidden sm:inline">Back to Home</span>
            <span className="text-xs font-bold uppercase tracking-widest sm:hidden">Back</span>
          </Link>
          
          <Link href="/" className="font-serif text-lg sm:text-xl md:text-2xl font-bold tracking-widest text-stone-900 shrink-0">
            VILLA 95
          </Link>
          
          <a
            href="tel:+94773864650"
            className="hidden md:flex items-center gap-2 text-xs sm:text-sm font-bold text-stone-900 hover:text-emerald-600 transition-colors shrink-0"
          >
            📞 <span className="hidden lg:inline">+94 77 386 4650</span>
          </a>
          <div className="md:hidden w-10" />
        </div>
      </nav>

      {/* Platform Cards Section */}
      <section className="px-4 md:px-12 pb-20 pt-4 sm:pt-28 md:pt-4 relative z-10">
        <div className="mx-auto max-w-7xl">
          
          <div className="mb-12 text-center">
            <h1 className="mb-6 font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white break-words leading-tight drop-shadow-lg">
            Reserve Your<br />Mountain Escape
            </h1>
          
            <p className="mx-auto max-w-2xl text-base sm:text-lg md:text-xl text-white/90 leading-relaxed mb-8 break-words drop-shadow-md">
            Choose your preferred booking platform and secure your stay at Villa 95 Rangala. 
            Each platform offers unique benefits and competitive rates for your mountain retreat.
            </p>

          </div>

          {/* Platform Cards Grid */}
          <div className="grid gap-8 lg:grid-cols-3 md:grid-cols-2 mb-20">
            {platforms.map((platform, index) => (
              <div
                key={index}
                className={`platform-card group relative overflow-hidden rounded-xl bg-white p-6 sm:p-8 pt-16 sm:pt-20 shadow-lg transition-all duration-500 flex flex-col min-h-[540px] ${
                  platform.disabled ? "opacity-70" : "hover:shadow-2xl hover:-translate-y-2"
                }`}
              >
                {/* Highlight Badge */}
                {platform.highlight && (
                  <div className={`absolute top-0 right-0 ${platform.highlightColor} rounded-bl-xl px-4 sm:px-6 py-2 sm:py-3 z-10 max-w-[50%]`}>
                    <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wide text-white whitespace-nowrap">
                      {platform.highlight}
                    </span>
                  </div>
                )}

                {/* Platform Header */}
                <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row items-start gap-4 min-h-[100px] sm:min-h-[120px]">
                  <div className="relative h-12 w-12 sm:h-16 sm:w-16 shrink-0">
                    <Image
                      src={platform.logo}
                      alt={`${platform.name} logo`}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="flex-1 min-w-0 w-full sm:w-auto max-w-[calc(100%-4rem)]">
                    <h3 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-stone-900 mb-2 break-words leading-tight pr-0 sm:pr-2">
                      {platform.name}
                    </h3>
                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-1">
                      <Star className="h-4 w-4 sm:h-5 sm:w-5 shrink-0 fill-amber-400 text-amber-400" />
                      <span className="text-sm sm:text-base lg:text-lg font-bold text-stone-700">{platform.rating}</span>
                      <span className="text-xs sm:text-sm text-stone-500 break-words">{platform.ratingLabel}</span>
                    </div>
                    <p className="text-xs text-stone-500 break-words">{platform.reviews}</p>
                  </div>
                </div>

                {/* Features List */}
                <div className="mb-6 sm:mb-8 space-y-2.5 sm:space-y-3">
                  {platform.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-2.5 sm:gap-3">
                      <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 shrink-0 text-emerald-500 mt-0.5" />
                      <span className="text-xs sm:text-sm text-stone-600 break-words leading-relaxed flex-1">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <a
                  href={platform.disabled ? "#" : platform.url}
                  target={platform.disabled ? undefined : "_blank"}
                  rel={platform.disabled ? undefined : "noopener noreferrer"}
                  className={`group/btn mt-auto flex w-full items-center justify-center gap-3 rounded-full bg-gradient-to-r ${platform.color} ${platform.hoverColor} px-6 sm:px-8 py-4 sm:py-5 text-xs sm:text-sm font-bold uppercase tracking-widest text-white transition-all shadow-lg ${
                    platform.disabled
                      ? "cursor-not-allowed opacity-50"
                      : "hover:shadow-xl hover:scale-105 active:scale-100"
                  }`}
                  onClick={(e) => platform.disabled && e.preventDefault()}
                >
                  {platform.disabled ? (
                    <span className="whitespace-nowrap">Coming Soon</span>
                  ) : (
                    <>
                      <span className="break-words text-center">
                        {platform.name === "TripAdvisor" ? "View on" : "Book on"} {platform.name}
                      </span>
                      <ExternalLink className="h-4 w-4 sm:h-5 sm:w-5 shrink-0 transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                    </>
                  )}
                </a>

                {/* Bottom accent line */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${platform.color}`} />
              </div>
            ))}
          </div>


          

        </div>
      </section>

      {/* WhatsApp Floating Button */}
      <a 
        href="https://wa.me/94773864650" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-[9999] group"
      >
        <div className="relative">
          <div className="absolute inset-2 rounded-full bg-green-500 animate-ping opacity-75"></div>
          <div className="relative flex items-center justify-center h-16 w-16 rounded-full bg-green-500 hover:bg-green-600 transition-all duration-300 shadow-2xl hover:shadow-green-500/50 hover:scale-110">
            <MessageCircle className="h-8 w-8 text-white" fill="white" />
          </div>
        </div>
      </a>

      {/* Footer */}
      <div className="relative z-10 bg-stone-900">
        <Footer />
      </div>

    </div>
  );
}
