"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Wifi, Wind, Coffee, Maximize, Sun, Waves, ArrowRight, BedDouble, Bath } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const amenities = [
  { icon: Maximize, label: "Family Suites", text: "Spacious 45m² living area." },
  { icon: Sun, label: "Private Terraces", text: "Panoramic views in every unit." },
  { icon: BedDouble, label: "King Beds", text: "Premium linens & comfort." },
  { icon: Bath, label: "Hot Water", text: "Private modern bathrooms." },
  { icon: Coffee, label: "Full Kitchen", text: "Cook your own meals." },
  { icon: Waves, label: "Laundry", text: "Washing machine included." },
];

export default function Rooms() {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Gentle slide-in for the card as you arrive
      gsap.from(cardRef.current, {
        x: -50, // Slide in from Left now
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 85%", 
        },
      });
    }, cardRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="rooms" className="relative w-full">
      
      {/* 1. STICKY VIDEO BACKGROUND */}
      <div className="sticky top-0 h-screen w-full overflow-hidden -z-10">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover opacity-60"
        >
          <source src="/rangala.mp4" type="video/mp4" />
        </video>
        {/* Gradient: Darker on LEFT side now to support the text box */}
        <div className="absolute inset-0 bg-gradient-to-r from-stone-900/90 via-stone-900/20 to-transparent" />
      </div>

      {/* 2. SCROLLING CONTENT */}
      <div className="relative w-full -mt-[100vh]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full min-h-screen flex items-center justify-start">
          
          {/* Description Box (Left Aligned) */}
          <div 
            ref={cardRef}
            className="w-full max-w-xl bg-stone-50/95 backdrop-blur-md p-8 md:p-12 shadow-2xl border-l-4 border-emerald-600 rounded-r-sm mt-24 mb-24"
          >
            {/* Header */}
            <span className="block text-xs font-mono uppercase tracking-[0.2em] text-emerald-700 mb-6">
              The Sanctuary
            </span>

            <h2 className="text-3xl md:text-5xl font-light leading-tight text-stone-900 mb-8">
              Apartment living, <br />
              <span className="font-serif italic text-stone-500">mountain soul.</span>
            </h2>

            {/* Intro Text */}
            <p className="text-base text-stone-600 leading-relaxed mb-8">
              Escape the confines of a standard hotel room. At Villa 95, we offer complete 
              <strong> private apartments</strong> designed for travelers who crave space, silence, and independence.
            </p>

            <div className="h-px w-full bg-stone-200 mb-8" />

            {/* Detail Block 1 */}
            <div className="mb-8">
              <h3 className="text-sm font-bold uppercase tracking-widest text-stone-900 mb-3 flex items-center gap-2">
                  <Wind className="h-4 w-4 text-emerald-600" />
                  A Room with a View
              </h3>
              <p className="text-sm text-stone-500 leading-relaxed">
                  Wake up to the mist rolling over the Knuckles Mountain Range. Every single unit features 
                  a private balcony or terrace, perfectly positioned to catch the sunrise.
              </p>
            </div>

            {/* Detail Block 2 */}
            <div className="mb-10">
              <h3 className="text-sm font-bold uppercase tracking-widest text-stone-900 mb-3 flex items-center gap-2">
                  <Coffee className="h-4 w-4 text-emerald-600" />
                  Long Stay Ready
              </h3>
              <p className="text-sm text-stone-500 leading-relaxed">
                  Whether you are here for a weekend or a month, you have everything you need. 
                  Cook your favorite meals in your <strong>fully equipped kitchen</strong>, use the 
                  <strong> washing machine</strong> to refresh your hiking gear, and stay connected with 
                  high-speed fiber Wi-Fi.
              </p>
            </div>

            {/* Amenities Grid */}
            <div className="bg-stone-100/50 p-6 rounded-lg border border-stone-200/60 mb-8">
              <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                  {amenities.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 group">
                      <item.icon className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5 transition-transform group-hover:scale-110" />
                      <div>
                          <h4 className="text-xs font-bold uppercase tracking-wide text-stone-800">
                              {item.label}
                          </h4>
                          <p className="text-[10px] text-stone-500 leading-tight mt-0.5">
                              {item.text}
                          </p>
                      </div>
                  </div>
                  ))}
              </div>
            </div>

            {/* CTA */}
            <div className="pt-2 flex flex-col sm:flex-row gap-4 items-center justify-between">
               <span className="text-xs font-serif italic text-stone-400">
                  Starting from $45 / night
               </span>
               <a 
                 href="https://www.booking.com/hotel/lk/villa-95-kandy.html" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="group inline-flex items-center gap-3 bg-stone-900 text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-emerald-700 transition-colors"
               >
                  Check Availability
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
               </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}