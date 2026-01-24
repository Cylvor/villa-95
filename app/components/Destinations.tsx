"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ArrowUpRight, MapPin } from "lucide-react";

const destinations = [
  {
    id: 1,
    name: "Knuckles Five Peaks",
    description: "Iconic mountain range with breathtaking peaks and trails.",
    image: "/5 peak.jpg",
    category: "HIKING",
  },
  {
    id: 2,
    name: "Rangala Natural Pool",
    description: "Crystal-clear natural pool surrounded by lush greenery.",
    image: "/rangala natural pool.jpg",
    category: "SWIMMING",
  },
  {
    id: 3,
    name: "Thunhisgala Peak",
    description: "Majestic mountain peak offering panoramic valley views.",
    image: "/thunhisgala.jpg",
    category: "HIKING",
  },
  {
    id: 4,
    name: "Meemure Village",
    description: "Traditional isolated village nestled deep in the Knuckles.",
    image: "/meemure.jpeg",
    category: "CULTURE",
  },
  {
    id: 5,
    name: "Jodu Falls",
    description: "A hidden double waterfall paradise for nature lovers.",
    image: "/jodu falls.jpeg",
    category: "WATERFALL",
  },
  {
    id: 6,
    name: "Saaree Falls",
    description: "Serene waterfall with pristine swimming spots.",
    image: "/saaree falls.jpeg",
    category: "WATERFALL",
  },
  {
    id: 7,
    name: "Huluganga Falls",
    description: "Powerful cascading waterfall in a scenic gorge.",
    image: "/huluganga falls.jpg.jpeg",
    category: "WATERFALL",
  },
  {
    id: 8,
    name: "Heeloya Village",
    description: "Charming village offering an authentic rural experience.",
    image: "/heeloya.jpg",
    category: "CULTURE",
  },
  {
    id: 9,
    name: "Corbet's Gap",
    description: "Scenic mountain pass with stunning wind-swept views.",
    image: "/corbets gap.jpeg",
    category: "VIEWPOINT",
  },
];

export default function Destinations() {
  const [activeId, setActiveId] = useState(1);
  const [mobileHoverId, setMobileHoverId] = useState<number | null>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const fadeRef = useRef<HTMLDivElement>(null);

  const activeDestination = destinations.find((d) => d.id === activeId) || destinations[0];

  useEffect(() => {
    if (!imageRef.current || !fadeRef.current) return;

    const ctx = gsap.context(() => {
      // Flash effect (white flash for light theme)
      gsap.fromTo(
        fadeRef.current,
        { opacity: 1 },
        { opacity: 0, duration: 0.6, ease: "power2.out" }
      );

      // Slight scale effect
      gsap.fromTo(
        imageRef.current,
        { scale: 1.05 },
        { scale: 1, duration: 1.2, ease: "power2.out" }
      );
    });

    return () => ctx.revert();
  }, [activeId]);

  return (
    <section
      id="destinations"
      // Added min-h to ensure enough scroll space
      className="relative w-full bg-stone-50 px-6 py-24 md:px-12 md:py-32 text-stone-900"
    >
      <div className="mx-auto max-w-7xl">
        
        {/* --- Header --- */}
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-stone-200 pb-8">
          <div>
            <span className="block text-xs font-mono uppercase tracking-[0.2em] text-emerald-600 mb-4">
              Explore the Surroundings
            </span>
            <h2 className="text-4xl md:text-5xl font-light leading-tight tracking-tight text-stone-900">
              Beyond the <br /> Villa Walls
            </h2>
          </div>
          <p className="max-w-xs text-sm text-stone-500 leading-relaxed pb-2">
            Discover the raw beauty of the Knuckles Mountain Range, from hidden waterfalls to ancient villages.
          </p>
        </div>

        {/* --- Main Content Layout --- */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
          
          {/* --- LEFT COLUMN: Scrollable List --- */}
          {/* We remove h-full constraints so this column grows naturally with content */}
          <div className="order-2 lg:order-1 lg:w-5/12 w-full">
            <div className="flex flex-col">
              {destinations.map((item) => (
                <div key={item.id} className="relative">
                  <button
                    onMouseEnter={() => {
                      setActiveId(item.id);
                      setMobileHoverId(item.id);
                    }}
                    onMouseLeave={() => setMobileHoverId(null)}
                    onClick={() => setActiveId(item.id)}
                    // Added ample py-8 to make the list tall enough to scroll nicely against the sticky image
                    className={`group relative flex items-center justify-between w-full py-8 transition-all duration-300 border-b border-stone-200 ${
                      activeId === item.id 
                        ? "opacity-100 pl-4 bg-stone-100/50 rounded-lg -mx-2 px-6" 
                        : "opacity-40 hover:opacity-100 hover:pl-2"
                    }`}
                  >
                    {/* Indicator Dot */}
                    {activeId === item.id && (
                      <span className="absolute left-2 h-1.5 w-1.5 rounded-full bg-emerald-600" />
                    )}
                    
                    <div className="text-left">
                      <span className="mb-1 block text-[10px] font-bold uppercase tracking-widest text-emerald-700">
                        {item.category}
                      </span>
                      <h3 className="text-2xl md:text-3xl font-light text-stone-900">
                        {item.name}
                      </h3>
                    </div>

                    <ArrowUpRight 
                      className={`h-5 w-5 transition-transform duration-300 ${
                          activeId === item.id 
                          ? "text-emerald-600 rotate-45" 
                          : "text-stone-400 group-hover:text-stone-900"
                      }`} 
                    />
                  </button>
                  
                  {/* Mobile hover image - only visible on mobile (< lg) */}
                  {mobileHoverId === item.id && (
                    <div className="lg:hidden mt-4 mb-4 relative h-64 w-full overflow-hidden rounded-sm bg-stone-200 shadow-md animate-in fade-in slide-in-from-top-4 duration-300">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute bottom-0 left-0 p-4 w-full">
                        <p className="text-sm font-light text-white leading-snug">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* --- RIGHT COLUMN: Sticky Image --- */}
          {/* sticky top-32 ensures it pins to the top while you scroll the list on the left */}
          <div className="hidden lg:block order-1 lg:order-2 lg:w-7/12 w-full lg:sticky lg:top-32 h-[50vh] lg:h-[75vh]">
            <div className="relative h-full w-full overflow-hidden rounded-sm bg-stone-200 shadow-lg">
                
                {/* The Image */}
                <div ref={imageRef} className="relative h-full w-full">
                    <Image
                        key={activeDestination.image}
                        src={activeDestination.image}
                        alt={activeDestination.name}
                        fill
                        className="object-cover transition-opacity duration-500"
                        priority
                    />
                    
                    {/* Gradient for Text Readability (Still dark at bottom for white text) */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-90" />
                </div>

                {/* Flash Layer (White for light theme) */}
                <div ref={fadeRef} className="absolute inset-0 bg-stone-50 pointer-events-none" />

                {/* Info Card Overlay */}
                <div className="absolute bottom-0 left-0 p-6 md:p-10 w-full">
                    <div className="flex items-center gap-2 text-emerald-400 mb-2">
                        <MapPin className="h-4 w-4" />
                        <span className="text-xs font-mono uppercase tracking-widest text-white/90">
                            {activeDestination.name}
                        </span>
                    </div>
                    <p className="text-lg md:text-xl font-light text-white leading-snug max-w-md drop-shadow-md">
                        {activeDestination.description}
                    </p>
                </div>

                {/* Corner Decoration */}
                <div className="absolute top-6 right-6 h-12 w-12 border-t border-r border-white/30" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}