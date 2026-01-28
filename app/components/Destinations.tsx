"use client";

import { useState } from "react";
import Image from "next/image";
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
    image: "/thunhisgala1.jpg",
    category: "HIKING",
  },
  {
    id: 4,
    name: "Meemure Village",
    description: "Traditional isolated village nestled deep in the Knuckles.",
    image: "/meemure1.jpeg",
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
    image: "/heeloya.webp",
    category: "CULTURE",
  },
  {
    id: 9,
    name: "Kotaganga Plains",
    description: "Expansive high-altitude plains with unique flora and fauna.",
    image: "/kotaganga plains.jpg",
    category: "HIKING",
  },
  {
    id: 10,
    name: "Kotaganga Seven Falls",
    description: "A series of seven stunning waterfalls cascading through the wilderness.",
    image: "/Destinations/sevenfalls.webp",
    category: "WATERFALL",
  },
];

export default function Destinations() {
  const [activeId, setActiveId] = useState(1);
  // Default to 1 so the first image shows immediately on mobile
  const [mobileHoverId, setMobileHoverId] = useState<number | null>(1);

  return (
    <section
      id="destinations"
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
          <div className="order-2 lg:order-1 lg:w-5/12 w-full">
            <div className="flex flex-col">
              {destinations.map((item) => (
                <div key={item.id} className="relative">
                  
                  {/* Item Button (Name) */}
                  <button
                    onMouseEnter={() => setActiveId(item.id)}
                    onClick={() => {
                      setActiveId(item.id);
                      // Toggle logic: If clicking the open one, close it. If new one, open new one.
                      setMobileHoverId(mobileHoverId === item.id ? null : item.id);
                    }}
                    className={`group relative flex items-center justify-between w-full py-8 transition-all duration-300 border-b border-stone-200 ${
                      activeId === item.id 
                        ? "opacity-100 pl-4 bg-stone-100/50 rounded-lg mx-0 md:-mx-2 px-6" 
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
                  
                  {/* --- MOBILE IMAGE ACCORDION --- */}
                  {/* Using CSS Grid Transition Trick:
                     grid-rows-[1fr] = Open
                     grid-rows-[0fr] = Closed
                     This animates height smoothly so content doesn't "jump" up instantly.
                  */}
                  <div 
                    className={`lg:hidden grid transition-all duration-500 ease-in-out ${
                      mobileHoverId === item.id 
                        ? "grid-rows-[1fr] opacity-100 mb-8 mt-4" 
                        : "grid-rows-[0fr] opacity-0 mb-0 mt-0"
                    }`}
                  >
                    <div className="overflow-hidden min-h-0">
                        <div className="relative h-64 w-full rounded-sm bg-stone-200 shadow-md">
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
                    </div>
                  </div>

                </div>
              ))}
            </div>
          </div>

          {/* --- RIGHT COLUMN: Sticky Image (Desktop Only) --- */}
          <div className="hidden lg:block order-1 lg:order-2 lg:w-7/12 w-full lg:sticky lg:top-32 h-[50vh] lg:h-[75vh]">
            <div className="relative h-full w-full overflow-hidden rounded-sm bg-stone-900 shadow-lg">
                
                {/* Desktop Images (Stacked for Cross-Fade) */}
                {destinations.map((destination) => (
                    <div
                        key={destination.id}
                        className={`absolute inset-0 h-full w-full transition-opacity duration-700 ease-in-out ${
                            activeId === destination.id 
                                ? "opacity-100 z-10" 
                                : "opacity-0 z-0 pointer-events-none"
                        }`}
                    >
                        <Image
                            src={destination.image}
                            alt={destination.name}
                            fill
                            className="object-cover"
                            priority={destination.id === 1}
                        />
                        
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90" />
                        
                        <div className="absolute bottom-0 left-0 p-6 md:p-10 w-full">
                            <div className="flex items-center gap-2 text-emerald-400 mb-2">
                                <MapPin className="h-4 w-4" />
                                <span className="text-xs font-mono uppercase tracking-widest text-white/90">
                                    {destination.name}
                                </span>
                            </div>
                            <p className="text-lg md:text-xl font-light text-white leading-snug max-w-md drop-shadow-md">
                                {destination.description}
                            </p>
                        </div>
                    </div>
                ))}

                <div className="absolute top-6 right-6 h-12 w-12 border-t border-r border-white/30 z-20" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}