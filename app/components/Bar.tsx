"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Wine, Music, Sunset, Sparkles } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Bar() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".bar-content", {
        y: 50,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 70%",
        },
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={container}
      className="relative w-full bg-stone-50 flex flex-col md:block md:h-[85vh] md:overflow-hidden"
    >
      {/* --- CONTENT (First on Mobile) --- */}
      <div className="order-1 relative z-10 w-full px-6 py-20 bg-stone-50 md:absolute md:inset-0 md:bg-transparent md:flex md:items-center md:justify-center md:py-0 md:order-none">
        <div className="bar-content max-w-2xl text-center text-stone-900 md:text-white">
          
          {/* Title - Changed to Dark */}
          <h2 className="mb-4 font-serif text-5xl md:text-7xl">
            The Cloud Bar
          </h2>

          {/* Description - Changed to Dark Gray */}
          <p className="mb-10 text-lg font-light leading-relaxed">
            Sip on signature cocktails as the sun dips below the Knuckles Range. 
            An open-air experience where cool mountain breezes meet curated spirits 
            and low-fi beats.
          </p>

          {/* Features Grid - Updated for Light Theme */}
          <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Feature icon={Wine} title="Curated Wine" desc="Global selection" />
            <Feature icon={Sunset} title="Sunset Views" desc="Golden hour magic" />
            <Feature icon={Music} title="Ambient Sound" desc="Chill vibes only" />
          </div>

        </div>
      </div>

      {/* --- VIDEO (Second on Mobile) --- */}
      <div className="order-2 relative h-[50vh] w-full md:absolute md:inset-0 md:h-full md:order-none -z-0">
        <video
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover"
        >
            <source src="/Videos/Bar.mp4" type="video/mp4" />
        </video>

        {/* Subtle dark overlay so text remains legible (not too dark) */}
        <div className="absolute inset-0 bg-black/50 pointer-events-none" />
      </div>

    </section>
  );
}

// Helper Component - Styled for Light Theme
function Feature({ icon: Icon, title, desc }: { icon: any, title: string, desc: string }) {
  return (
    <div className="flex flex-col items-center rounded-lg border border-stone-200/60 bg-white/80 p-4 shadow-sm transition-all hover:border-emerald-500 hover:shadow-md">
      <Icon className="mb-3 h-5 w-5 text-emerald-600" />
      <span className="mb-1 block text-sm font-bold uppercase tracking-wide text-stone-900">
        {title}
      </span>
      <span className="text-xs text-stone-500">{desc}</span>
    </div>
  );
}