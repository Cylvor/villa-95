"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { MapPin } from "lucide-react";

export default function Hero() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // 1. Video Fade In
      tl.fromTo(".video-bg", 
        { scale: 1.1, opacity: 0 }, 
        { scale: 1, opacity: 1, duration: 1.5 }
      );

      // 2. Center Title Reveal (Slow rise)
      tl.from(".hero-center", {
        y: 40,
        opacity: 0,
        duration: 1.2,
        ease: "power2.out",
      }, "-=0.5");

      // 3. Line Draw Animation
      tl.from(".hero-line", {
        scaleX: 0,
        opacity: 0,
        duration: 1,
        ease: "expo.out",
      }, "-=1");

      // 4. Bottom Corners Reveal (Staggered)
      tl.from(".corner-item", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
      }, "-=0.5");

    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={container}
      className="relative h-screen w-full overflow-hidden bg-stone-900 text-white"
    >
      {/* --- BACKGROUND VIDEO --- */}
      <div className="video-bg absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover"
        >
          <source src="/Videos/rangala.mp4" type="video/mp4" />
        </video>
        {/* Elegant Dark Overlay */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* --- CENTER: The "Sanctuary" Statement --- */}
      <div className="hero-center absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none">
        
        <span className="mb-4 text-xs font-mono uppercase tracking-[0.4em] text-white/40">
          Welcome to the
        </span>
        
        <h1 className="text-center font-serif text-5xl md:text-7xl lg:text-8xl text-white drop-shadow-2xl">
          VILLA 95 RANGALA
        </h1>
        
        {/* Decorative Line */}
        <div className="hero-line my-6 h-[1px] w-24 bg-white/50" />
        
        <p className="max-w-md text-center text-sm md:text-base font-light leading-relaxed text-white/90">
          A private villa hidden in the Knuckles Mountain Range. <br className="hidden md:block"/>
          Where silence meets luxury.
        </p>
      </div>

      {/* --- BOTTOM LEFT: Location/Weather --- */}
      <div className="corner-item absolute bottom-8 left-8 z-20 hidden md:block">
        <div className="flex items-center gap-3 rounded-lg bg-black/20 backdrop-blur-sm px-4 py-3 border border-white/10">
          <MapPin className="h-4 w-4 text-emerald-400" />
          <div className="flex flex-col">
            <span className="text-xs font-bold uppercase tracking-wide">Knuckles Range</span>
            <span className="text-[10px] text-white/70">Elevation: 3000ft</span>
          </div>
        </div>
      </div>

      {/* --- BOTTOM CENTER: Scroll Hint --- */}
      <div className="corner-item absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] uppercase tracking-widest writing-vertical-rl opacity-70">
            Scroll to Explore
          </span>
          <div className="flex h-10 w-6 items-start justify-center rounded-full border border-white/30 p-1">
            <div className="h-1.5 w-1.5 rounded-full bg-white animate-bounce" />
          </div>
        </div>
      </div>

    </section>
  );
}