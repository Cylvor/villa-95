"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Utensils, Wifi, MapPin, BedDouble, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const highlights = [
  {
    icon: BedDouble,
    title: "Family Suites",
    description: "Spacious rooms with private balconies & mountain views.",
  },
  {
    icon: Wifi,
    title: "Modern Amenities",
    description: "High-speed Wi-Fi, full kitchen, and washing facilities.",
  },
  {
    icon: Utensils,
    title: "Global Dining",
    description: "Chinese, Indian & British cuisine with garden al fresco dining.",
  },
  {
    icon: MapPin,
    title: "Prime Location",
    description: "Rated 10/10 by couples. Close to hiking trails & waterfalls.",
  },
];

export default function About() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the main text sliding up
      gsap.from(".about-text", {
        scrollTrigger: {
          trigger: container.current,
          start: "top 70%", // Trigger slightly earlier
        },
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
      });

      // Animate the grid lines and items
      gsap.from(".feature-item", {
        scrollTrigger: {
          trigger: ".features-grid",
          start: "top 80%",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={container}
      // Added scroll-mt-20 to ensure the header doesn't cover the title when clicking nav links
      className="relative w-full bg-stone-50 px-6 py-24 md:px-12 md:py-32 text-stone-900 scroll-mt-20"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          
          {/* --- Left Column: Sticky Heading --- */}
          <div className="lg:col-span-4">
            {/* CHANGED: top-10 -> top-32 to clear the fixed Header */}
            <div className="sticky top-32">
              <span className="about-text block text-xs font-mono uppercase tracking-[0.2em] text-emerald-700 mb-4">
                The Experience
              </span>
              <h2 className="about-text text-4xl md:text-5xl font-light leading-tight tracking-tight text-stone-900">
                A home <br className="hidden lg:block" />
                away from <br className="hidden lg:block" />
                the noise.
              </h2>
              <div className="about-text mt-8 h-px w-24 bg-stone-300" />
            </div>
          </div>

          {/* --- Right Column: Content & Features --- */}
          <div className="lg:col-span-8">
            
            {/* Narrative Text */}
            <div className="space-y-6 mb-20 max-w-2xl">
              <p className="about-text text-lg md:text-xl font-light leading-relaxed text-stone-600">
                Villa 95 Rangala isn&apos;t just a hotel; it&apos;s a sanctuary in the clouds. 
                Experience spacious accommodations designed for families and couples alike, 
                where every window frames a painting of the <span className="text-emerald-800 font-medium">Knuckles Mountain Range</span>.
              </p>
              <p className="about-text text-base leading-relaxed text-stone-500">
                Whether you are here to hike the trails or simply sit back with a cup of Ceylon tea 
                on your private balcony, we provide the perfect blend of modern convenience and 
                raw natural beauty.
              </p>
            </div>

            {/* Features Grid (Minimalist Lines) */}
            <div className="features-grid grid grid-cols-1 md:grid-cols-2">
              {highlights.map((item) => (
                <div
                  key={item.title}
                  className="feature-item group border-t border-stone-200 py-10 pr-6 transition-colors hover:bg-stone-100"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <item.icon className="h-6 w-6 text-emerald-600" />
                    <span className="opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                      <ArrowRight className="h-4 w-4 text-stone-400" />
                    </span>
                  </div>
                  <h3 className="mb-2 text-lg font-medium tracking-wide text-stone-900">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-6 text-stone-500">
                    {item.description}
                  </p>
                </div>
              ))}
              {/* Bottom Border for the last row to close the grid */}
              <div className="hidden md:block col-span-2 border-t border-stone-200" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}