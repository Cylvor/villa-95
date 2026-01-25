"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Utensils, Wine, Sun, ChefHat } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const diningFeatures = [
  { icon: Utensils, label: "Global Cuisine", desc: "Chinese, Indian & British" },
  { icon: Sun, label: "Al Fresco Terrace", desc: "Breakfast with a view" },
  { icon: Wine, label: "The Bar", desc: "Beer & Evening Drinks" },
  { icon: ChefHat, label: "Freshly Prepared", desc: "Made to order daily" },
];

export default function Dining() {
  const container = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mm = gsap.matchMedia();

    // Only run parallax on desktop to save mobile performance
    mm.add("(min-width: 768px)", () => {
        gsap.to(imageRef.current, {
            yPercent: 15,
            ease: "none",
            scrollTrigger: {
            trigger: container.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
            },
        });
    });

    // Stagger Text Reveal (Runs on all sizes)
    gsap.from(".dining-item", {
        scrollTrigger: {
          trigger: ".dining-grid",
          start: "top 85%",
        },
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power2.out",
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      id="dining"
      ref={container}
      className="relative w-full bg-stone-50 px-6 py-24 md:px-12 md:py-32 text-stone-900"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* --- LEFT: Text Content --- */}
          {/* REMOVED 'order-2' so this naturally sits on top in mobile */}
          <div>
            <span className="block text-xs font-mono uppercase tracking-[0.2em] text-emerald-600 mb-6">
              Culinary Journey
            </span>
            <h2 className="text-4xl md:text-5xl font-light leading-tight tracking-tight text-stone-900 mb-8">
              Flavors of the world, <br />
              <span className="text-emerald-800 font-serif italic">served on the edge.</span>
            </h2>
            
            <div className="space-y-6 text-stone-600 font-light leading-relaxed mb-12 text-lg">
              <p>
                Dining at Villa 95 is an experience for all senses. Savor authentic Sri Lankan spices 
                or comfort foods from around the globe, all while gazing out at the endless green valleys.
              </p>
              <p className="text-sm md:text-base">
                Whether it&apos;s a sunrise breakfast on the open terrace or a quiet evening drink at our bar, 
                every meal is accompanied by the sound of nature and the cool mountain breeze.
              </p>
            </div>

            {/* Dining Features Grid */}
            <div className="dining-grid grid grid-cols-2 gap-y-8 gap-x-6 border-t border-stone-200 pt-8">
              {diningFeatures.map((item, idx) => (
                <div key={idx} className="dining-item flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-emerald-700 mb-1">
                    <item.icon className="h-5 w-5" />
                    <span className="text-xs font-bold uppercase tracking-widest">
                        {item.label}
                    </span>
                  </div>
                  <p className="text-sm text-stone-500 pl-7">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* --- RIGHT: Image (Parallax) --- */}
          {/* REMOVED 'order-1' so this sits below text in mobile */}
          <div className="h-[50vh] lg:h-[70vh] w-full relative overflow-hidden rounded-sm bg-stone-200 shadow-xl">
             {/* Parallax Container */}
             <div ref={imageRef} className="absolute inset-0 w-full h-[120%] -top-[10%]">
                <Image
                  src="/dining-placeholder.jpg" // REPLACE with food or terrace photo
                  alt="Dining on the terrace"
                  fill
                  className="object-cover"
                />
             </div>
             
             {/* Floating Badge */}
             <div className="absolute bottom-8 right-8 bg-white/95 backdrop-blur px-6 py-4 shadow-sm border-r-2 border-emerald-600 text-right max-w-[200px]">
                <p className="text-[10px] uppercase tracking-widest text-emerald-800 mb-1">
                    Must Try
                </p>
                <p className="text-sm font-serif italic text-stone-900">
                    &quot;Al Fresco breakfast with a view of the waterfalls."
                </p>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
}