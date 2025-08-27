'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowDown, Play, Star } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;

    const tl = gsap.timeline();

    // Animate hero text
    tl.fromTo(
      textRef.current,
      { opacity: 0, y: 100 },
      { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' },
      0.2
    )
    .fromTo(
      ctaRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
      0.8
    )
    .fromTo(
      scrollIndicatorRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
      1.2
    );

    // Parallax effect on scroll
    gsap.to(heroRef.current, {
      yPercent: -50,
      ease: 'none',
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });

    // Floating animation for scroll indicator
    gsap.to(scrollIndicatorRef.current, {
      y: -10,
      repeat: -1,
      yoyo: true,
      duration: 2,
      ease: 'power2.inOut',
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const scrollToContent = () => {
    const nextSection = heroRef.current?.nextElementSibling;
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={heroRef}
      className="relative h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-60"
        >
          <source src="/videos/villa95-hero.mp4" type="video/mp4" />
          {/* Fallback image if video doesn't load */}
          <div className="w-full h-full bg-gradient-to-br from-amber-900 via-amber-800 to-amber-700" />
        </video>
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-6xl mx-auto">
        <div ref={textRef} className="space-y-6">
          {/* Location Badge */}
          <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30">
            <Star className="w-4 h-4 text-amber-400 fill-current" />
            <span className="text-sm font-medium">Rangala, Sri Lanka</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">
              Villa 95
            </span>
            <span className="block text-4xl md:text-5xl lg:text-6xl mt-2 font-light">
              Luxury Hill Country Retreat
            </span>
          </h1>

          {/* Description */}
          <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
            Experience unparalleled luxury in the heart of Sri Lanka's misty mountains. 
            Where modern comfort meets natural beauty, creating memories that last a lifetime.
          </p>

          {/* Stats */}
          <div className="flex justify-center items-center space-x-8 pt-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-400">4</div>
              <div className="text-sm text-gray-300">Bedrooms</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-400">8</div>
              <div className="text-sm text-gray-300">Max Guests</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-400">5★</div>
              <div className="text-sm text-gray-300">Rating</div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div ref={ctaRef} className="mt-12 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/booking"
              className="group bg-gradient-to-r from-amber-600 to-amber-700 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-amber-700 hover:to-amber-800 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-amber-500/25"
            >
              Book Your Stay
              <span className="ml-2 group-hover:translate-x-1 transition-transform duration-200">→</span>
            </Link>
            
            <button className="group flex items-center space-x-2 bg-white/20 backdrop-blur-sm text-white px-6 py-4 rounded-lg border border-white/30 hover:bg-white/30 transition-all duration-300">
              <Play className="w-5 h-5" />
              <span>Watch Video</span>
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="flex items-center justify-center space-x-6 text-sm text-gray-300">
            <span>✓ Instant Confirmation</span>
            <span>✓ Free Cancellation</span>
            <span>✓ 24/7 Support</span>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
        onClick={scrollToContent}
      >
        <div className="flex flex-col items-center space-y-2 text-white/70 hover:text-white transition-colors duration-200">
          <span className="text-sm font-medium">Scroll to explore</span>
          <ArrowDown className="w-6 h-6 animate-bounce" />
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-amber-400/20 rounded-full blur-xl animate-pulse" />
      <div className="absolute bottom-40 right-20 w-32 h-32 bg-amber-600/20 rounded-full blur-xl animate-pulse delay-1000" />
    </section>
  );
};

export default HeroSection;
