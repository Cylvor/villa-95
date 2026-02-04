"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { Quote, Star, ArrowRight, ChevronLeft, ChevronRight, X } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// Full list of 6 Reviews
const reviews = [
  {
    id: 1,
    guest: "Veronika",
    country: "Czech Republic",
    rating: 10,
    text: "Rajiva was an excellent host. We spent magnificent three days here. The area is very authentic without many tourists, but with friendly local people. The balcony view is the best—we loved breakfast with this view.",
    tag: "AUTHENTIC STAY",
  },
  {
    id: 2,
    guest: "Carmen",
    country: "Canada",
    rating: 9,
    text: "This hotel had a killer view. The food was absolutely delicious and the owner was extremely friendly and helpful. They brought us tea in the evening and coffee in the morning. We wish we could have stayed longer.",
    tag: "KILLER VIEWS",
  },
  {
    id: 3,
    guest: "Lisa Milnor",
    country: "United Kingdom",
    rating: 9,
    text: "Great base for Knuckles hiking. I had a large room on the top floor with amazing views. What really stands out is the owner's welcome and kindness. Excellent value for money.",
    tag: "HIKING BASE",
  },
  {
    id: 4,
    guest: "David & Sarah",
    country: "Australia",
    rating: 10,
    text: "A hidden gem. We booked for one night and stayed for three. The silence here is healing, and the curry was the best we had in Sri Lanka. Highly recommend the dinner.",
    tag: "HIDDEN GEM",
  },
  {
    id: 5,
    guest: "Chathuranga",
    country: "Sri Lanka",
    rating: 10,
    text: "Perfect place for a family getaway. The rooms are huge, like apartments. Kids loved playing in the garden while we enjoyed the sunset. The host arranged everything perfectly.",
    tag: "FAMILY FRIENDLY",
  },
  {
    id: 6,
    guest: "Jonas",
    country: "Germany",
    rating: 9,
    text: "If you want to escape the noise of Kandy, this is it. It feels like you are sleeping in the clouds. Very clean and modern facilities with hot water and fast wifi.",
    tag: "PEACEFUL",
  },
];

const awards = [
  {
    id: "booking-award",
    src: "/Images/Awarde/Awarde.webp",
    alt: "Villa 95 award",
  },
];

type Award = (typeof awards)[number];

export default function Reviews() {
  const container = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeAward, setActiveAward] = useState<Award | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Intro Animation
      gsap.from(container.current, {
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });
    }, container);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!activeAward) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveAward(null);
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [activeAward]);

  useEffect(() => {
    if (!activeAward) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [activeAward]);

  // Slide Animation Logic
  useEffect(() => {
    if (!sliderRef.current) return;
    
    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
    
    // Desktop: Move 33.33% per click (1/3 of total view)
    // Tablet: Move 50%
    // Mobile: Move 100%
    let movePercent = currentIndex * (100 / 3); 
    if (isTablet) movePercent = currentIndex * 50;
    if (isMobile) movePercent = currentIndex * 100;

    gsap.to(sliderRef.current, {
      xPercent: -movePercent,
      duration: 0.6,
      ease: "power3.inOut",
    });
  }, [currentIndex]);

  const nextSlide = () => {
    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
    
    // Calculate how many slides we can actually scroll
    let maxIndex = reviews.length - 3; // Desktop (shows 3, so last index is length-3)
    if (isTablet) maxIndex = reviews.length - 2;
    if (isMobile) maxIndex = reviews.length - 1;

    if (currentIndex < maxIndex) {
        setCurrentIndex((prev) => prev + 1);
    } else {
        setCurrentIndex(0); // Loop back to start
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
        setCurrentIndex((prev) => prev - 1);
    }
  };

  return (
    <section
      id="reviews"
      ref={container}
      className="relative w-full bg-stone-100 px-6 py-24 md:px-12 md:py-32 text-stone-900 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl">
        
        {/* --- Header with Navigation --- */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-xl">
             <span className="block text-xs font-mono uppercase tracking-[0.2em] text-emerald-600 mb-4">
               Guest Stories
             </span>
             <h2 className="text-4xl md:text-5xl font-light leading-tight tracking-tight text-stone-900 mb-4">
               Loved by travelers <br /> from around the world.
             </h2>
             <div className="inline-flex items-center justify-center gap-2 bg-white px-4 py-2 rounded-full border border-stone-200 shadow-sm">
               <Star className="h-4 w-4 fill-emerald-500 text-emerald-500" />
               <span className="text-sm font-bold text-stone-700">9.6 Host Score on Booking.com</span>
             </div>
          </div>

          {/* Arrows */}
          <div className="flex gap-3">
             <button 
                onClick={prevSlide}
                className={`flex h-12 w-12 items-center justify-center rounded-full border border-stone-300 bg-white transition-all hover:bg-stone-900 hover:text-white ${currentIndex === 0 ? 'opacity-50' : ''}`}
             >
                <ChevronLeft className="h-5 w-5" />
             </button>
             <button 
                onClick={nextSlide}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-stone-300 bg-white transition-all hover:bg-stone-900 hover:text-white"
             >
                <ChevronRight className="h-5 w-5" />
             </button>
          </div>
        </div>

        {/* --- Slideshow Window --- */}
        {/* Added -mx-4 px-4 py-12 to Create Breathing Room for Shadows/Icons */}
        <div className="overflow-hidden w-full mx-0 md:-mx-4 px-4 py-12">
            
            <div ref={sliderRef} className="flex w-full">
                {reviews.map((review) => (
                    <div
                        key={review.id}
                        // Sizing: 33.33% on Desktop, 50% Tablet, 100% Mobile
                        className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-4 box-border"
                    >
                        {/* --- CARD --- */}
                        <div className="group relative flex h-full flex-col justify-between rounded-2xl bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border border-stone-100 z-10">
                            
                            {/* Quote Icon */}
                            <div className="absolute -top-5 -left-2 flex h-10 w-10 items-center justify-center rounded-full bg-emerald-700 text-white shadow-lg rotate-12 group-hover:rotate-0 transition-transform">
                                <Quote className="h-4 w-4 fill-white" />
                            </div>

                            <div>
                                <span className="mb-6 inline-block rounded-md bg-stone-100 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-stone-500 group-hover:bg-emerald-50 group-hover:text-emerald-700 transition-colors">
                                {review.tag}
                                </span>
                                <p className="mb-8 text-sm md:text-base font-light leading-relaxed text-stone-600 italic">
                                &quot;{review.text}&quot;
                                </p>
                            </div>

                            <div className="border-t border-stone-100 pt-6 mt-auto">
                                <div className="flex items-center justify-between">
                                <div>
                                    <h4 className="text-sm font-bold text-stone-900 uppercase tracking-wide">
                                    {review.guest}
                                    </h4>
                                    <span className="text-xs text-stone-400 font-mono">
                                    {review.country}
                                    </span>
                                </div>
                                <div className="flex gap-0.5">
                                    {[...Array(5)].map((_, i) => (
                                    <Star 
                                        key={i} 
                                        className={`h-3 w-3 ${i < 5 ? "fill-emerald-500 text-emerald-500" : "fill-stone-200 text-stone-200"}`} 
                                    />
                                    ))}
                                </div>
                                </div>
                            </div>
                        </div>
                        {/* --- END CARD --- */}
                    </div>
                ))}
            </div>
        </div>

        {/* --- Call to Action --- */}
        <div className="text-center">
            <p className="text-stone-400 text-sm mb-6 font-medium">
                Join our guests in the clouds.
            </p>
            <a
              href="https://www.booking.com/hotel/lk/villa-95-kandy.html#tab-reviews"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 rounded-full bg-stone-900 px-8 py-4 text-xs font-bold uppercase tracking-widest text-white transition-all hover:bg-emerald-700 hover:scale-105 shadow-lg"
            >
              Read All Reviews
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
        </div>

        {/* --- Awards (inline, not a card) --- */}
        <div className="mt-14 flex flex-col md:flex-row md:items-center gap-8 md:gap-16">
          {/* Left: Title */}
          <div className="flex-shrink-0">
            <h3 className="text-4xl md:text-5xl font-light leading-tight tracking-tight text-stone-900">
              Recognized by <br /> our guests.
            </h3>
          </div>

          {/* Middle: Awards label + images (centered in remaining space) */}
          <div className="flex-1 flex flex-col items-center">
            <span className="block text-xs font-mono uppercase tracking-[0.2em] text-emerald-600 mb-4">
              Awards
            </span>
            <div className="flex flex-wrap items-center justify-center gap-6">
              {awards.map((award) => (
                <button
                  key={award.id}
                  type="button"
                  onClick={() => setActiveAward(award)}
                  className="group relative focus:outline-none"
                  aria-label={`Open award: ${award.alt}`}
                >
                  <div className="relative h-24 w-44 md:h-28 md:w-56">
                    <Image
                      src={award.src}
                      alt={award.alt}
                      fill
                      sizes="(max-width: 768px) 176px, 224px"
                      className="object-contain transition-transform duration-300 group-hover:scale-[1.03]"
                      priority={false}
                    />
                  </div>
                  <div className="absolute -inset-2 rounded-xl bg-emerald-700/0 transition-colors group-hover:bg-emerald-700/5" />
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* --- Award Popup (portal so it's centered in viewport) --- */}
      {isMounted &&
        activeAward &&
        createPortal(
          <div
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 px-4"
            role="dialog"
            aria-modal="true"
            aria-label="Award preview"
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) setActiveAward(null);
            }}
          >
            <div className="relative w-full max-w-3xl">
              <button
                type="button"
                onClick={() => setActiveAward(null)}
                className="absolute -top-12 right-0 inline-flex items-center justify-center rounded-full bg-white/95 p-2 text-stone-900 shadow-sm backdrop-blur transition-colors hover:bg-white"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-white">
                <Image
                  src={activeAward.src}
                  alt={activeAward.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 768px"
                  className="object-contain p-6"
                />
              </div>
            </div>
          </div>,
          document.body
        )}
    </section>
  );
}