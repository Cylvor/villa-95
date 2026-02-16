"use client";

import Image from "next/image";

const diaryEntries = [
  {
    id: 1,
    src: "/Images/guest-diaries/V95_guest_1.webp",
    alt: "Guest portrait moment 1",
    caption: "Captured moments of joy.",
    className: "md:col-span-2 h-[500px]", // Portrait
  },
  {
    id: 2,
    src: "/Images/guest-diaries/V95_guest_2.webp",
    alt: "Guest portrait moment 2",
    caption: "Family feasts and laughter.",
    className: "md:col-span-2 h-[500px]", // Portrait
  },
  {
    id: 3,
    src: "/Images/guest-diaries/V95_guest_3.webp",
    alt: "Guest portrait moment 3",
    caption: "Together in our peacefull haven.",
    className: "md:col-span-2 h-[500px]", // Portrait
  },
  {
    id: 4,
    src: "/Images/guest-diaries/V95_guest_4.webp",
    alt: "Guest landscape view 1",
    caption: "Unwinding in total comfort.",
    className: "md:col-span-3 h-[400px]", // Landscape 1
  },
  {
    id: 5,
    src: "/Images/guest-diaries/V95_guest_5.webp",
    alt: "Guest landscape view 2",
    caption: "Nature's embrace.",
    className: "md:col-span-3 h-[400px]", // Landscape 2
  },
];

export default function GuestDiaries() {
  return (
    <section className="container mx-auto px-6 py-20 text-forest-green">
      <div className="mb-12 text-center">
        <h2 className="text-4xl md:text-5xl font-serif mb-4">Guest Diaries</h2>
        <p className="text-earthy-taupe max-w-2xl mx-auto italic">
          Cherished moments captured by our wonderful guests.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
        {diaryEntries.map((entry) => (
          <div 
            key={entry.id} 
            className={`group relative w-full overflow-hidden rounded-lg shadow-md ${entry.className}`}
          >
            <Image
              src={entry.src}
              alt={entry.alt}
              fill
              className="object-cover transition-transform duration-700 will-change-transform group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
              <p className="text-white font-serif text-xl translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                {entry.caption}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
