"use client";

import { Wifi, CloudRain, Car, Flame, Utensils, Mountain } from "lucide-react";

const amenities = [
  {
    icon: Wifi,
    title: "High-Speed Fiber",
    desc: "Stay connected above the clouds with reliable fiber internet suitable for remote work.",
  },
  {
    icon: Flame,
    title: "Hot Water",
    desc: "Essential for the cool mountain climate. Enjoy warm showers in modern bathrooms.",
  },
  {
    icon: Utensils,
    title: "Authentic Dining",
    desc: "Farm-to-table Sri Lankan curry, Western breakfast, and BBQ nights arranged by our chef.",
  },
  {
    icon: Mountain,
    title: "Mountain Trekking",
    desc: "Direct access to Knuckles Range trails. Guides can be arranged upon request.",
  },
  {
    icon: Car,
    title: "Free Parking",
    desc: "Secure on-site parking available for your vehicle or rental driver.",
  },
  {
    icon: CloudRain,
    title: "Cool Climate",
    desc: "Escape the heat. Enjoy a natural AC environment with temperatures between 18°C-24°C.",
  },
];

export default function Amenities() {
  return (
    <section
      id="amenities"
      className="relative w-full bg-stone-50 px-6 py-24 md:px-12 md:py-32 text-stone-900"
    >
      <div className="mx-auto max-w-7xl">
        
        {/* --- Header --- */}
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row items-center md:items-end justify-between gap-6 border-b border-stone-200 pb-8">
          <div className="text-center md:text-left">
            <span className="block text-xs font-mono uppercase tracking-[0.2em] text-emerald-600 mb-4">
              Curated Comforts
            </span>
            <h2 className="text-4xl md:text-5xl font-light leading-tight tracking-tight text-stone-900">
              Everything you need, <br className="md:hidden" />
              <span className="font-serif italic text-stone-500">nothing you don't.</span>
            </h2>
          </div>
          <p className="max-w-xs text-sm text-stone-500 leading-relaxed pb-2 text-center md:text-left mx-auto md:mx-0">
            We prioritize the essentials that make a mountain stay comfortable, without cluttering your experience.
          </p>
        </div>

        {/* --- Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {amenities.map((item, idx) => (
            <div
              key={idx}
              className="group relative overflow-hidden rounded-2xl bg-white p-8 border border-stone-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-emerald-100"
            >
              {/* Icon Circle */}
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-stone-50 text-emerald-700 transition-colors group-hover:bg-emerald-600 group-hover:text-white">
                <item.icon className="h-5 w-5" />
              </div>

              {/* Content */}
              <h3 className="mb-3 text-lg font-bold text-stone-900">
                {item.title}
              </h3>
              <p className="text-sm font-light leading-relaxed text-stone-500">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}