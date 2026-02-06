"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin, Navigation, Clock, Car } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Location() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Text Reveal
      gsap.from(".loc-text", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        scrollTrigger: {
          trigger: container.current,
          start: "top 75%",
        },
      });

      // Map Reveal
      gsap.from(".map-frame", {
        x: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 75%",
        },
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="location"
      ref={container}
      className="relative w-full bg-stone-50 px-6 py-24 md:px-12 md:py-32 text-stone-900"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          
          {/* --- LEFT: Text Details --- */}
          <div className="order-1 lg:order-1">
            <span className="loc-text block text-xs font-mono uppercase tracking-[0.2em] text-emerald-600 mb-6 text-center md:text-left">
              Getting Here
            </span>
            <h2 className="loc-text text-4xl md:text-5xl font-light leading-tight tracking-tight text-stone-900 mb-8 text-center md:text-left">
              Hidden in the hills, <br />
              <span className="font-serif italic text-stone-500">yet easy to find.</span>
            </h2>

            <div className="space-y-8">
              {/* Address */}
              <div className="loc-text flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white border border-stone-200 text-emerald-700 shadow-sm">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wide text-stone-900">
                    Address
                  </h4>
                  <p className="mt-1 text-base text-stone-600 font-light leading-relaxed">


                    No.95 Bobabila Makuldeniya Rd, <br />
                    Kandy 20921, Sri Lanka
                  </p>
                </div>
              </div>

              {/* Distances */}
              <div className="loc-text flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white border border-stone-200 text-emerald-700 shadow-sm">
                  <Car className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wide text-stone-900">
                    Drive Times
                  </h4>
                  <ul className="mt-1 text-sm text-stone-600 space-y-1 font-light">
                    <li>• 45 mins from Kandy City Center</li>
                    <li>• 3.5 hours from Colombo Airport (CMB)</li>
                    <li>• 20 mins to Knuckles Mountain Range entrance</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Google Maps Button */}
            <div className="loc-text mt-12">
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=Villa+95+Rangala"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 rounded-full bg-stone-900 px-8 py-4 text-xs font-bold uppercase tracking-widest text-white transition-all hover:bg-emerald-700"
              >
                <Navigation className="h-4 w-4" />
                Get Directions
              </a>
            </div>
          </div>

          {/* --- RIGHT: Map Embed --- */}
          <div className="map-frame order-2 lg:order-2 h-[400px] md:h-[500px] w-full overflow-hidden rounded-2xl shadow-xl border border-stone-200 bg-stone-200 relative">
            <iframe
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              // This is a Google Maps Embed search query for "Villa 95 Rangala"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.271674706593!2d80.7726692!3d7.3431039!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae35f290eba10f7%3A0x5eab28d146c5416d!2sVilla%2095%20Rangala!5e0!3m2!1sen!2slk!4v1710000000000!5m2!1sen!2slk"
              className="absolute inset-0 grayscale-[20%] hover:grayscale-0 transition-all duration-700"
            ></iframe>
          </div>

        </div>
      </div>
    </section>
  );
}