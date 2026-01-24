"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronLeft, ChevronRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const skyStudioImages = [
  {
    id: 1,
    src: "/Images/V95_Rooms (18).png",
    alt: "Sky Studio View 1",
  },
  {
    id: 2,
    src: "/Images/V95_Rooms (19).JPG",
    alt: "Sky Studio View 2",
  },
  {
    id: 3,
    src: "/Images/V95_Rooms (20).JPG",
    alt: "Sky Studio View 3",
  },
  {
    id: 4,
    src: "/Images/V95_Rooms (21).JPG",
    alt: "Sky Studio View 4",
  },
  {
    id: 5,
    src: "/Images/V95_Rooms (22).JPG",
    alt: "Sky Studio View 5",
  },
  {
    id: 6,
    src: "/Images/V95_Rooms (5).JPG",
    alt: "Sky Studio View 6",
  },
];

export default function SkyStudio() {
  const container = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-advance slideshow
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % skyStudioImages.length);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the heading
      gsap.from(".sky-studio-heading", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
        },
      });

      // Animate the card
      gsap.from(".sky-studio-card", {
        scale: 0.9,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 70%",
        },
      });

      // Animate the description
      gsap.from(".sky-studio-description", {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 70%",
        },
      });
    }, container);

    return () => ctx.revert();
  }, []);

  const nextSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev + 1) % skyStudioImages.length);
  };

  const prevSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) =>
      prev === 0 ? skyStudioImages.length - 1 : prev - 1
    );
  };

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentSlide(index);
  };

  return (
    <section
      id="sky-studio"
      ref={container}
      className="relative w-full bg-gradient-to-b from-stone-50 to-white px-6 py-24 md:px-12 md:py-32"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-16 text-center sky-studio-heading">
          <div className="mb-4 inline-block rounded-full border border-stone-300 px-6 py-2">
            <p className="text-sm font-medium tracking-widest text-stone-600 uppercase">
              For Couples & Solo Travelers
            </p>
          </div>
          <h2 className="mb-6 text-4xl font-light tracking-tight text-stone-900 md:text-5xl lg:text-6xl">
            The Sky Studio
          </h2>
          <div className="mx-auto flex items-center justify-center gap-4">
            <div className="h-px w-16 bg-stone-300"></div>
            <div className="relative h-3 w-3">
              <div className="absolute inset-0 rounded-full bg-stone-900"></div>
              <div className="absolute inset-0 animate-ping rounded-full bg-stone-900 opacity-30"></div>
            </div>
            <div className="h-px w-16 bg-stone-300"></div>
          </div>
        </div>

        {/* Main Card with Slideshow */}
        <div className="sky-studio-card relative mx-auto max-w-5xl">
          {/* Image Container */}
          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-stone-200 shadow-2xl">
            {skyStudioImages.map((image, index) => (
              <div
                key={image.id}
                className={`absolute inset-0 transition-opacity duration-700 ${
                  index === currentSlide ? "opacity-100" : "opacity-0"
                }`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
              </div>
            ))}

            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-3 shadow-lg backdrop-blur-sm transition-all hover:bg-white hover:scale-110"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6 text-stone-900" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-3 shadow-lg backdrop-blur-sm transition-all hover:bg-white hover:scale-110"
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6 text-stone-900" />
            </button>

            {/* Slide Indicators */}
            <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
              {skyStudioImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentSlide
                      ? "w-8 bg-white"
                      : "w-2 bg-white/50 hover:bg-white/75"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Description Below Card */}
          <div className="sky-studio-description mt-12 text-center">
            <p className="mx-auto max-w-3xl text-lg leading-relaxed text-stone-600">
              Perched at the edge of the world, our Sky Studio offers an
              intimate sanctuary where clouds drift below your window and
              mountains paint the horizon. Perfect for couples seeking romance
              or solo travelers craving tranquility, this space is designed to
              reconnect you with nature&apos;s grandeur.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-stone-500">
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-stone-400"></div>
                <span>Mountain Views</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-stone-400"></div>
                <span>Private Balcony</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-stone-400"></div>
                <span>Cloud Forest Setting</span>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Element */}
        <div className="mt-16 flex justify-center">
          <div className="relative">
            <svg
              className="h-16 w-16 text-stone-200"
              viewBox="0 0 64 64"
              fill="none"
            >
              <circle
                cx="32"
                cy="32"
                r="30"
                stroke="currentColor"
                strokeWidth="0.5"
              />
              <text
                x="32"
                y="38"
                textAnchor="middle"
                className="fill-stone-400 text-xs font-light"
                style={{ fontFamily: "Georgia, serif" }}
              >
                95
              </text>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
