"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { User, BedDouble, Maximize, ArrowRight, Check, ChevronLeft, ChevronRight } from "lucide-react";

const rooms = [
  {
    id: "couple",
    number: "01",
    name: "The Sky Studio",
    tagline: "For Couples & Solo Travelers",
    description: "An intimate sanctuary perched on the edge of the ridge. Designed for romance and solitude, this studio features a wall of glass that opens onto a private balcony, blurring the line between your bed and the clouds.",
    image: "/couple-room.jpg", 
    images: [
      "/Images/Single/V95_Single_Rooms_1.webp",
      "/Images/Single/V95_Single_Rooms_2.webp",
      "/Images/Single/V95_Single_Rooms_3.webp",
      "/Images/Single/V95_Single_Rooms_4.webp",
      "/Images/Single/V95_Single_Rooms_5.webp",
    ],
    features: [
      { icon: User, text: "2 Adults" },
      { icon: BedDouble, text: "1 King Bed" },
      { icon: Maximize, text: "45 m²" },
    ],
    highlights: ["Private Balcony", "Rain Shower", "Work Desk", "Fiber Wi-Fi"],
  },
  {
    id: "family",
    number: "02",
    name: "The Mountain Suite",
    tagline: "For Families & Groups",
    description: "A sprawling apartment-style suite designed for connection. With a separate living area, private dining space, and expansive terrace, it gives your family the freedom to live and relax together in absolute comfort.",
    image: "/family-room.jpg",
    images: [
      "/Images/Family/V95_Family_Rooms_1.webp",
      "/Images/Family/V95_Family_Rooms_2.webp",
      "/Images/Family/V95_Family_Rooms_3.webp",
      "/Images/Family/V95_Family_Rooms_4.webp",
      "/Images/Family/V95_Family_Rooms_5.webp",
    ],
    features: [
      { icon: User, text: "2-4 Guests" },
      { icon: BedDouble, text: "2 Queen Beds" },
      { icon: Maximize, text: "80 m²" },
    ],
    highlights: ["Dining Area", "Living Room", "Large Terrace", "Fiber Wi-Fi"],
  },
];

export default function RoomTypes() {
  const [currentSlide, setCurrentSlide] = useState<{ [key: string]: number }>({
    couple: 0,
    family: 0,
  });
  const [isAutoPlaying, setIsAutoPlaying] = useState<{ [key: string]: boolean }>({
    couple: true,
    family: true,
  });

  useEffect(() => {
    const intervals: NodeJS.Timeout[] = [];
    
    rooms.forEach((room) => {
      if (room.images && isAutoPlaying[room.id]) {
        const interval = setInterval(() => {
          setCurrentSlide((prev) => ({
            ...prev,
            [room.id]: (prev[room.id] + 1) % room.images!.length,
          }));
        }, 4000);
        intervals.push(interval);
      }
    });

    return () => intervals.forEach(clearInterval);
  }, [isAutoPlaying]);

  const nextSlide = (roomId: string, imagesLength: number) => {
    setIsAutoPlaying((prev) => ({ ...prev, [roomId]: false }));
    setCurrentSlide((prev) => ({
      ...prev,
      [roomId]: (prev[roomId] + 1) % imagesLength,
    }));
  };

  const prevSlide = (roomId: string, imagesLength: number) => {
    setIsAutoPlaying((prev) => ({ ...prev, [roomId]: false }));
    setCurrentSlide((prev) => ({
      ...prev,
      [roomId]: prev[roomId] === 0 ? imagesLength - 1 : prev[roomId] - 1,
    }));
  };

  const goToSlide = (roomId: string, index: number) => {
    setIsAutoPlaying((prev) => ({ ...prev, [roomId]: false }));
    setCurrentSlide((prev) => ({ ...prev, [roomId]: index }));
  };

  return (
    <section className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        
        {/* --- Section Header --- */}
        <div className="mb-24 text-center">
          <span className="mb-4 block text-xs font-mono uppercase tracking-[0.2em] text-emerald-600">
            Choose Your Space
          </span>
          <h2 className="text-4xl font-light text-stone-900 md:text-5xl">
            Two ways to stay.
          </h2>
        </div>

        {/* --- Room List --- */}
        <div className="flex flex-col gap-32">
          {rooms.map((room, index) => (
            <div
              key={room.id}
              className={`flex flex-col-reverse gap-12 lg:items-center lg:gap-20 ${
                index % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"
              }`}
            >
              {/* IMAGE SIDE */}
              <div className="relative h-[400px] w-full overflow-hidden rounded-sm bg-stone-200 lg:h-[500px] lg:w-1/2">
                {room.images ? (
                  <>
                    {room.images.map((img, imgIndex) => (
                      <div
                        key={imgIndex}
                        className={`absolute inset-0 transition-opacity duration-700 ${
                          imgIndex === currentSlide[room.id] ? "opacity-100" : "opacity-0"
                        }`}
                      >
                        <Image
                          src={img}
                          alt={`${room.name} - View ${imgIndex + 1}`}
                          fill
                          className={`object-cover transition-transform duration-[6000ms] ease-out ${
                            imgIndex === currentSlide[room.id] ? "scale-110" : "scale-100"
                          }`}
                          priority={imgIndex === 0}
                        />
                      </div>
                    ))}
                    <button 
                      onClick={() => prevSlide(room.id, room.images!.length)} 
                      className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/90 p-2.5 shadow-lg backdrop-blur-sm transition-all hover:bg-white hover:scale-110"
                    >
                      <ChevronLeft className="h-5 w-5 text-stone-900" />
                    </button>
                    <button 
                      onClick={() => nextSlide(room.id, room.images!.length)} 
                      className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/90 p-2.5 shadow-lg backdrop-blur-sm transition-all hover:bg-white hover:scale-110"
                    >
                      <ChevronRight className="h-5 w-5 text-stone-900" />
                    </button>
                    <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2">
                      {room.images.map((_, imgIndex) => (
                        <button
                          key={imgIndex}
                          onClick={() => goToSlide(room.id, imgIndex)}
                          className={`h-1.5 rounded-full transition-all ${
                            imgIndex === currentSlide[room.id]
                              ? "w-6 bg-white"
                              : "w-1.5 bg-white/50 hover:bg-white/75"
                          }`}
                        />
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="absolute inset-0 bg-stone-300">
                    <span className="absolute inset-0 flex items-center justify-center text-stone-500 opacity-20 text-4xl font-serif">
                      {room.name} Image
                    </span>
                  </div>
                )}
                
                <div className="absolute top-6 left-6 bg-white/90 px-4 py-2 text-xs font-bold uppercase tracking-widest text-stone-900 backdrop-blur-md z-10">
                   {room.tagline}
                </div>
              </div>

              {/* TEXT SIDE - UPDATED FOR CENTERING */}
              <div className="flex flex-col justify-center lg:w-1/2 items-center lg:items-start text-center lg:text-left">
                <span className="mb-4 text-6xl font-serif text-stone-100 md:text-8xl">
                  {room.number}
                </span>
                
                <h3 className="mb-4 text-3xl font-serif text-stone-900 md:text-4xl">
                  {room.name}
                </h3>
                
                <p className="mb-8 text-base leading-relaxed text-stone-500">
                  {room.description}
                </p>

                {/* Key Specs Row - Centered on Mobile */}
                <div className="mb-8 flex flex-wrap gap-6 border-y border-stone-100 py-6 justify-center lg:justify-start">
                  {room.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <feature.icon className="h-4 w-4 text-emerald-600" />
                      <span className="text-xs font-bold uppercase tracking-wide text-stone-600">
                        {feature.text}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Highlights List - Centered items on Mobile */}
                <div className="mb-10 grid grid-cols-2 gap-y-2 w-full max-w-md lg:max-w-none">
                    {room.highlights.map((item, i) => (
                        <div key={i} className="flex items-center gap-2 justify-center lg:justify-start">
                            <Check className="h-3 w-3 text-emerald-500 shrink-0" />
                            <span className="text-sm text-stone-500">{item}</span>
                        </div>
                    ))}
                </div>

                {/* CTA - Centered on Mobile */}
                <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8 justify-center lg:justify-start w-full">
                  <Link
                    href="/reservations"
                    className="group flex h-12 items-center gap-3 rounded-full bg-stone-900 px-8 text-xs font-bold uppercase tracking-widest text-white transition-all hover:bg-emerald-700"
                  >
                    Book Now
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}