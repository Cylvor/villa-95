"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Instagram } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// Full list of 6 Gallery Items with Placeholders
const galleryItems = [
  {
    id: 1,
    src: "/Gallery/Knuckles.webp",
    alt: "Breathtaking view from Villa 95 overlooking the Knuckles mountain range",
    caption: "Waking up to mountain magic.",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    id: 2,
    src: "/Gallery/Sunrise.webp",
    alt: "Exterior view of Villa 95",
    caption: "Your home in the clouds.",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    id: 3,
    src: "/Gallery/Tree.webp",
    alt: "Scenic landscape of the surrounding area",
    caption: "Gateway to the Knuckles wilderness.",
    span: "md:col-span-1 md:row-span-2",
  },
  {
    id: 4,
    src: "/Gallery/rangalapool.webp",
    alt: "Vertical view of the mountain layers",
    caption: "Layers of mist and mountain.",
    span: "md:row-span-2",
  },
  {
    id: 5,
    src: "/Gallery/scenic.webp",
    alt: "Another stunning view from the villa",
    caption: "Infinite horizons.",
    span: "md:col-span-1",
  },
  {
    id: 6,
    src: "/Gallery/mountainview.webp",
    alt: "Interior or detail shot of Villa 95",
    caption: "Immersed in emerald greenery.",
    span: "md:col-span-2 md:row-span-1",
  },

];

export default function Gallery() {
  const container = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState<number | null>(null);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Treat devices with no hover or a coarse pointer as "touch" for tap interactions.
    const mq = window.matchMedia("(hover: none), (pointer: coarse)");

    const sync = () => {
      setIsTouch(mq.matches);
      if (!mq.matches) setActiveId(null);
    };

    sync();

    mq.addEventListener?.("change", sync);
    // Older Safari
    mq.addListener?.(sync);

    return () => {
      mq.removeEventListener?.("change", sync);
      mq.removeListener?.(sync);
    };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header Fade In
      gsap.from(".gallery-header", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
        },
      });

      // Masonry Grid Stagger Reveal
      gsap.from(".gallery-item", {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.15, // Creates the wave effect
        ease: "power3.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 75%",
        },
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="gallery"
      ref={container}
      className="relative w-full bg-white px-6 py-24 md:px-12 md:py-32 text-stone-900"
      onClick={() => {
        if (!isTouch) return;
        setActiveId(null);
      }}
    >
      <div className="mx-auto max-w-7xl">
        
        {/* --- Header --- */}
        <div className="gallery-header mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-xl mx-auto md:mx-0 text-center md:text-left">
            <span className="block text-xs font-mono uppercase tracking-[0.2em] text-emerald-600 mb-4">
              Visual Diary
            </span>
            <h2 className="text-4xl md:text-5xl font-light leading-tight tracking-tight text-stone-900 text-center md:text-left md:whitespace-nowrap">
              A glimpse into mountain life.
            </h2>
          </div>
          
          {/* Social Link */}
          <div className="hidden md:block">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-stone-500 hover:text-emerald-700 transition-colors">
                <Instagram className="h-4 w-4" />
                <span>Follow our journey</span>
            </a>
          </div>
        </div>

        {/* --- Masonry Grid --- */}
        {/* We define a grid with 3 columns and implicit rows measuring 250px tall */}
        <div 
            ref={gridRef}
            className="grid grid-cols-1 md:grid-cols-3 auto-rows-[250px] gap-4 md:gap-6"
        >
            {galleryItems.map((item) => (
                // On touch devices: tap toggles the caption overlay.
                <div 
                    key={item.id}
                    // Apply the specific span class for each item to create the mosaic look
                    className={`gallery-item group relative overflow-hidden rounded-lg bg-stone-200 ${item.span}`}
                    role={isTouch ? "button" : undefined}
                    tabIndex={isTouch ? 0 : undefined}
                    aria-pressed={isTouch ? activeId === item.id : undefined}
                    onClick={(e) => {
                      if (!isTouch) return;
                      e.stopPropagation();
                      setActiveId((prev) => (prev === item.id ? null : item.id));
                    }}
                    onKeyDown={(e) => {
                      if (!isTouch) return;
                      if (e.key !== "Enter" && e.key !== " ") return;
                      e.preventDefault();
                      setActiveId((prev) => (prev === item.id ? null : item.id));
                    }}
                >
                    {/* Image with Hover Zoom */}
                    <Image
                        src={item.src}
                        alt={item.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className={
                          "object-cover transition-transform duration-700 ease-out md:group-hover:scale-105" +
                          (isTouch && activeId === item.id ? " scale-105" : "")
                        }
                    />
                    
                    {/* Hover Overlay & Caption */}
                    <div
                      className={
                        "absolute inset-0 bg-black/0 transition-all duration-300 md:group-hover:bg-black/40" +
                        (isTouch && activeId === item.id ? " bg-black/40" : "")
                      }
                    >
                        <div
                          className={
                            "absolute bottom-0 left-0 p-6 opacity-0 translate-y-4 transition-all duration-500 md:group-hover:opacity-100 md:group-hover:translate-y-0" +
                            (isTouch && activeId === item.id ? " opacity-100 translate-y-0" : "")
                          }
                        >
                            <p className="text-white text-lg font-serif italic leading-tight">
                                {item.caption}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>

        {/* --- Mobile CTA --- */}
        <div className="mt-12 text-center md:hidden">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-emerald-700">
                <Instagram className="h-4 w-4" />
                <span>See more on Instagram</span>
            </a>
        </div>

      </div>
    </section>
  );
}