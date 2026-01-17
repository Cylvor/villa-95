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
      gsap.from(cardRef.current, {
        x: -50,
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
        <div className="absolute inset-0 bg-gradient-to-r from-stone-900/90 via-stone-900/20 to-transparent" />
      </div>

      {/* 2. SCROLLING CONTENT */}
      <div className="relative w-full -mt-[100vh]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full min-h-screen flex items-center justify-start">
          
          {/* Description Box - WIDER and MORE SPACIOUS */}
          <div 
            ref={cardRef}
            // Changed max-w-xl to max-w-2xl
            // Increased padding to p-10 md:p-14
            className="w-full max-w-2xl bg-stone-50/95 backdrop-blur-md p-10 md:p-14 shadow-2xl border-l-4 border-emerald-600 rounded-r-sm mt-24 mb-24"
          >
            {/* Header */}
            <span className="block text-xs font-mono uppercase tracking-[0.2em] text-emerald-700 mb-8">
              The Sanctuary
            </span>

            <h2 className="text-4xl md:text-6xl font-light leading-tight text-stone-900 mb-10">
              Apartment living, <br />
              <span className="font-serif italic text-stone-500">mountain soul.</span>
            </h2>

            <p className="text-lg text-stone-600 leading-relaxed mb-10">
              Escape the confines of a standard hotel room. At Villa 95, we offer complete 
              <strong> private apartments</strong> designed for travelers who crave space, silence, and independence.
            </p>

            <div className="h-px w-full bg-stone-200 mb-10" />

            {/* Detail Block 1 */}
            <div className="mb-10">
              <h3 className="text-sm font-bold uppercase tracking-widest text-stone-900 mb-4 flex items-center gap-3">
                  <Wind className="h-5 w-5 text-emerald-600" />
                  A Room with a View
              </h3>
              <p className="text-base text-stone-500 leading-relaxed">
                  Wake up to the mist rolling over the Knuckles Mountain Range. Every single unit features 
                  a private balcony or terrace, perfectly positioned to catch the sunrise.
              </p>
            </div>

            {/* Detail Block 2 */}
            <div className="mb-12">
              <h3 className="text-sm font-bold uppercase tracking-widest text-stone-900 mb-4 flex items-center gap-3">
                  <Coffee className="h-5 w-5 text-emerald-600" />
                  Long Stay Ready
              </h3>
              <p className="text-base text-stone-500 leading-relaxed">
                  Whether you are here for a weekend or a month, you have everything you need. 
                  Cook your favorite meals in your <strong>fully equipped kitchen</strong>, use the 
                  <strong> washing machine</strong> to refresh your hiking gear, and stay connected with 
                  high-speed fiber Wi-Fi.
              </p>
            </div>

            {/* --- ADDED AMENITIES GRID HERE --- */}
            <div className="bg-stone-100/60 p-8 rounded-xl border border-stone-200 mb-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-8 gap-x-6">
                  {amenities.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4 group">
                      <div className="p-2 bg-white rounded-full shadow-sm shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                        <item.icon className="h-5 w-5 text-emerald-600 group-hover:text-white transition-colors" />
                      </div>
                      <div>
                          <h4 className="text-sm font-bold uppercase tracking-wide text-stone-800">
                              {item.label}
                          </h4>
                          <p className="text-xs text-stone-500 leading-relaxed mt-1">
                              {item.text}
                          </p>
                      </div>
                  </div>
                  ))}
              </div>
            </div>

            {/* CTA */}
            <div className="pt-4 flex flex-col sm:flex-row gap-6 items-center justify-between border-t border-stone-200 mt-6">
               <div className="flex flex-col">
                 <span className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-1">
                    Best Rate Guarantee
                 </span>
                 <span className="text-xl font-serif italic text-emerald-800">
                    From $45 / night
                 </span>
               </div>
               
               <a 
                 href="https://www.booking.com/hotel/lk/villa-95-kandy.html" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="group inline-flex items-center gap-3 bg-stone-900 text-white px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-emerald-700 hover:scale-105 transition-all shadow-xl"
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