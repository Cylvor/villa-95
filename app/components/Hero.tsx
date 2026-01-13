"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const locationRef = useRef<HTMLParagraphElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(
      titleRef.current,
      { opacity: 0, scale: 0.8, rotationY: -90 },
      { opacity: 1, scale: 1, rotationY: 0, duration: 1.2, ease: "back.out(1.7)" }
    )
      .fromTo(
        locationRef.current,
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" },
        "-=0.8"
      )
      .fromTo(
        featuresRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        "-=0.6"
      )
      .fromTo(
        ctaRef.current,
        { opacity: 0, scale: 0.5 },
        { opacity: 1, scale: 1, duration: 0.6, ease: "elastic.out(1, 0.3)" },
        "-=0.4"
      );
  }, []);

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 -z-10">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/rangala.mp4" type="video/mp4" />
        </video>
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div ref={containerRef} className="relative z-10 text-center text-white px-5 max-w-5xl">
        <h1
          ref={titleRef}
          className="text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-widest mb-2 hero-prata"
        >
          Villa 95
        </h1>
        <p
          ref={locationRef}
          className="text-xl md:text-2xl lg:text-3xl font-light mb-6 opacity-90"
        >
          Rangala, Sri Lanka
        </p>
        <div
          ref={featuresRef}
          className="flex flex-wrap justify-center gap-4 mb-8 text-sm md:text-base"
        >
          <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">Private Pool</span>
          <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">Lush Gardens</span>
          <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">Mountain Views</span>
          <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">Luxury Amenities</span>
        </div>
        <a
          ref={ctaRef}
          href="https://www.booking.com/hotel/lk/villa-95-kandy.html"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-sunlit-amber text-forest-green font-bold px-10 py-5 rounded-full text-lg hover:bg-sunlit-amber/90 hover:scale-105 transition-all duration-300 shadow-lg"
        >
          Book Your Stay
        </a>
      </div>
    </section>
  );
}
