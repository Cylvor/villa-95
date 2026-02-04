"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Clock, Baby, PawPrint, VolumeX, CreditCard, Info } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const rules = [
  {
    title: "Check-in / Out",
    icon: Clock,
    text: "Check-in from 10:00 AM - 6:00 PM. Check-out by 11:00 AM. Please inform us of your arrival time in advance.",
  },
  {
    title: "Children",
    icon: Baby,
    text: "Children of all ages are welcome. We do not provide cribs or extra beds at this property.",
  },
  {
    title: "Quiet Sanctuary",
    icon: VolumeX,
    text: "To maintain the serenity of the Knuckles Range, we observe quiet hours from 10:00 PM to 7:00 AM.",
  },
  {
    title: "Pet Policy",
    icon: PawPrint,
    text: "We love animals, but to preserve the local wildlife and hygiene, pets are not allowed.",
  },
  {
    title: "Payment",
    icon: CreditCard,
    text: "Cash payments are preferred at the property. Online prepayments vary by booking platform.",
  },
  {
    title: "Cancellation",
    icon: Info,
    text: "Policies vary by room type. Please check your specific conditions when selecting your dates.",
  },
];

export default function HouseRules() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".rule-card", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 85%",
        },
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="house-rules"
      ref={container}
      className="relative w-full bg-stone-50 px-6 py-20 md:py-24"
    >
      <div className="mx-auto max-w-7xl">
        
        {/* --- Header (UNCHANGED) --- */}
        <div className="mb-16 text-center">
          <span className="block text-xs font-mono uppercase tracking-[0.2em] text-emerald-600 mb-4">
            Good to Know
          </span>
          <h2 className="text-3xl md:text-4xl font-light text-stone-900">
            Essential Information
          </h2>
        </div>

        {/* --- Grid --- */}
        {/* Added 'items-stretch' implicitly by using Grid, ensuring equal height rows */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rules.map((rule, idx) => (
            <div
              key={idx}
              className="
                rule-card group h-full
                flex flex-col items-start gap-4 
                p-8 rounded-xl bg-white 
                border border-stone-100 shadow-sm 
                transition-all duration-300 
                hover:shadow-lg hover:-translate-y-1 hover:border-emerald-500/30
              "
            >
              {/* Icon */}
              <div className="
                flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-stone-50 
                text-emerald-700 transition-colors duration-300 
                group-hover:bg-emerald-50 group-hover:scale-110
              ">
                <rule.icon className="h-6 w-6" strokeWidth={1.5} />
              </div>
              
              {/* Text Content */}
              <div className="flex flex-col">
                <h3 className="text-base font-bold uppercase tracking-wide text-stone-900 mb-3 group-hover:text-emerald-900 transition-colors">
                  {rule.title}
                </h3>
                {/* 'flex-grow' ensures the description pushes any bottom content down evenly if we added footers */}
                <p className="text-sm font-light leading-relaxed text-stone-500">
                  {rule.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* --- Note --- */}
        <div className="mt-12 text-center">
          <p className="text-xs text-stone-400 italic">
            * Have a special request? <a href="mailto:info@villa95.com" className="underline hover:text-emerald-600">Contact us directly.</a>
          </p>
        </div>

      </div>
    </section>
  );
}