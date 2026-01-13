'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';

const destinations = [
  {
    name: "Knuckles Five Peak Mountains",
    description: "Iconic mountain range with breathtaking peaks and hiking trails",
    image: "/5 peak.jpg",
    category: "Mountain"
  },
  {
    name: "Rangala Natural Pool",
    description: "Crystal-clear natural pool surrounded by lush greenery",
    image: "/rangala natural pool.jpg",
    category: "Water"
  },
  {
    name: "Thunhisgala Mountain",
    description: "Majestic mountain peak with panoramic views",
    image: "/thunhisgala.jpg",
    category: "Mountain"
  },
  {
    name: "Meemure Village",
    description: "Traditional village nestled in the Knuckles range",
    image: "/meemure.jpeg",
    category: "Village"
  },
  {
    name: "Jodu Falls",
    description: "Hidden waterfall paradise for nature lovers",
    image: "/jodu falls.jpeg",
    category: "Waterfall"
  },
  {
    name: "Saaree Falls",
    description: "Serene waterfall with pristine swimming spots",
    image: "/saaree falls.jpeg",
    category: "Waterfall"
  },
  {
    name: "Huluganga Falls",
    description: "Powerful cascading waterfall in a scenic gorge",
    image: "/huluganga falls.jpg.jpeg",
    category: "Waterfall"
  },
  {
    name: "Heeloya Village",
    description: "Charming village with authentic rural experience",
    image: "/heeloya.jpg",
    category: "Village"
  },
  {
    name: "Corbet's Gap",
    description: "Scenic mountain pass with stunning valley views",
    image: "/corbets gap.jpeg",
    category: "Mountain"
  },
];

export default function Destinations() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideshowRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const previousIndexRef = useRef<number>(0);

  useEffect(() => {
    // Initialize cards off-screen
    cardsRef.current.forEach((card, index) => {
      if (card) {
        gsap.set(card, {
          opacity: index === 0 ? 1 : 0,
          scale: index === 0 ? 1 : 0.8,
          x: index === 0 ? 0 : 100,
          rotationY: index === 0 ? 0 : 15,
        });
      }
    });

    // Auto-advance slideshow
    const startSlideshow = () => {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % destinations.length);
      }, 5000); // Change slide every 5 seconds
    };

    startSlideshow();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, []);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % destinations.length);
    // Reset auto-advance timer
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % destinations.length);
    }, 5000);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + destinations.length) % destinations.length);
    // Reset auto-advance timer
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % destinations.length);
    }, 5000);
  };

  useEffect(() => {
    // Animate transition when currentIndex changes
    if (cardsRef.current.length === 0) return;

    const currentCard = cardsRef.current[currentIndex];
    const previousIndex = previousIndexRef.current;
    const previousCard = cardsRef.current[previousIndex];

    // Determine direction (forward or backward)
    let isForward = true;
    if (previousIndex !== undefined) {
      if (currentIndex === 0 && previousIndex === destinations.length - 1) {
        isForward = true; // Wrapped around forward
      } else if (currentIndex === destinations.length - 1 && previousIndex === 0) {
        isForward = false; // Wrapped around backward
      } else {
        isForward = currentIndex > previousIndex;
      }
    }

    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    const tl = gsap.timeline();
    timelineRef.current = tl;

    // Animate out previous card
    if (previousCard && previousIndex !== currentIndex) {
      tl.to(previousCard, {
        opacity: 0,
        scale: 0.8,
        x: isForward ? -100 : 100,
        rotationY: isForward ? -15 : 15,
        duration: 1,
        ease: "power3.inOut",
      }, 0);
    }

    // Animate in current card
    if (currentCard) {
      // Reset position for smooth entry
      gsap.set(currentCard, {
        opacity: 0,
        scale: 0.8,
        x: isForward ? 100 : -100,
        rotationY: isForward ? 15 : -15,
      });

      tl.to(currentCard, {
        opacity: 1,
        scale: 1,
        x: 0,
        rotationY: 0,
        duration: 1,
        ease: "power3.inOut",
      }, 0.2);

      // Subtle parallax effect on image
      const image = currentCard.querySelector('.slide-image');
      if (image) {
        tl.to(image, {
          scale: 1.1,
          duration: 1.2,
          ease: "power2.out",
        }, 0.2);
      }
    }

    // Hide all other cards
    cardsRef.current.forEach((card, index) => {
      if (card && index !== currentIndex && index !== previousIndex) {
        gsap.set(card, {
          opacity: 0,
          scale: 0.8,
          x: index < currentIndex ? -100 : 100,
          rotationY: index < currentIndex ? -15 : 15,
        });
      }
    });

    // Update previous index
    previousIndexRef.current = currentIndex;
  }, [currentIndex]);

  return (
    <section
      id="destinations"
      className="relative h-screen w-full overflow-hidden border-t border-olive-green/10 bg-mist-cream"
    >
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-forest-green/5 via-transparent to-sky-blue/5 pointer-events-none z-0" />

      {/* Content container */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 sm:px-8">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl font-semibold tracking-tight text-forest-green sm:text-4xl md:text-5xl">
            Nearby Destinations
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-base leading-7 text-forest-green/80 sm:text-lg">
            Discover the natural wonders and cultural treasures surrounding Villa 95 Rangala.
          </p>
        </div>

        {/* Slideshow container */}
        <div 
          ref={slideshowRef}
          className="relative w-full max-w-5xl h-[60vh] flex items-center justify-center perspective-1000"
        >
          {/* Left Navigation Button */}
          <button
            onClick={goToPrevious}
            className="absolute left-0 md:-left-12 z-20 flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/90 backdrop-blur-sm border border-olive-green/20 shadow-lg hover:bg-white hover:shadow-xl transition-all duration-300 hover:scale-110 group"
            aria-label="Previous slide"
          >
            <svg
              className="w-6 h-6 md:w-7 md:h-7 text-forest-green group-hover:text-forest-green/80 transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Right Navigation Button */}
          <button
            onClick={goToNext}
            className="absolute right-0 md:-right-12 z-20 flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/90 backdrop-blur-sm border border-olive-green/20 shadow-lg hover:bg-white hover:shadow-xl transition-all duration-300 hover:scale-110 group"
            aria-label="Next slide"
          >
            <svg
              className="w-6 h-6 md:w-7 md:h-7 text-forest-green group-hover:text-forest-green/80 transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {destinations.map((destination, index) => (
            <div
              key={destination.name}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div
                ref={(el) => {
                  cardsRef.current[index] = el;
                }}
                className="relative w-full max-w-4xl h-full transform-style-preserve-3d slide-wrapper"
              >
                <div className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl border border-olive-green/20 bg-white transform-gpu slide-card">
                  {/* Image Container */}
                  <div className="relative w-full h-full overflow-hidden rounded-xl">
                    <Image
                      src={destination.image}
                      alt={destination.name}
                      fill
                      className="slide-image object-cover"
                      priority={index === 0}
                      sizes="100vw"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-forest-green/90 via-forest-green/40 to-transparent rounded-xl" />
                  </div>

                  {/* Content Overlay */}
                  <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 text-white rounded-xl">
                    <div className="max-w-2xl">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="inline-flex items-center rounded-full bg-white/20 backdrop-blur-sm px-4 py-2 text-sm font-medium text-white border border-white/30">
                          {destination.category}
                        </span>
                      </div>
                      <h3 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 leading-tight">
                        {destination.name}
                      </h3>
                      <p className="text-lg md:text-xl text-white/90 leading-relaxed">
                        {destination.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Slide indicators */}
        <div className="flex gap-2 mt-8">
          {destinations.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index);
                // Reset auto-advance timer
                if (intervalRef.current) {
                  clearInterval(intervalRef.current);
                }
                intervalRef.current = setInterval(() => {
                  setCurrentIndex((prev) => (prev + 1) % destinations.length);
                }, 5000);
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'w-8 bg-forest-green'
                  : 'w-2 bg-forest-green/30 hover:bg-forest-green/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
        .transform-gpu {
          transform: translateZ(0);
          will-change: transform, opacity;
        }
        .slide-wrapper {
          will-change: transform, opacity;
        }
        .slide-card {
          border-radius: 0.75rem;
          -webkit-mask-image: -webkit-radial-gradient(white, white);
          mask-image: radial-gradient(white, white);
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          isolation: isolate;
          transform: translateZ(0);
        }
      `}</style>
    </section>
  );
}
