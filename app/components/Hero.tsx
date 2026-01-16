"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Mountain, Wifi, Coffee } from "lucide-react";

export default function Hero() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // 1. Reveal Description Box (Left side)
      tl.from(".detail-box", {
        x: -20,
        opacity: 0,
        duration: 1,
        delay: 0.5,
      });

      // 2. Reveal the Side Bump (Socials) - Slides in from right
      tl.from(
        ".side-bump",
        {
          x: 50, // slide in from off-screen
          opacity: 0,
          duration: 0.8,
        },
        "-=0.8"
      );

      // 3. Stagger internal details
      tl.from(
        ".detail-item",
        {
          y: 10,
          opacity: 0,
          stagger: 0.1,
          duration: 0.8,
        },
        "-=0.6"
      );

      // 4. Massive Title Animation (sliding up from bottom)
      tl.from(
        ".title-char",
        {
          yPercent: 120,
          stagger: 0.05,
          duration: 1.2,
          ease: "expo.out",
        },
        "-=0.8"
      );
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={container}
      className="relative h-screen w-full overflow-hidden bg-black text-white"
    >
      {/* --- Full Screen Video --- */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover"
        >
          <source src="/rangala.mp4" type="video/mp4" />
        </video>
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
      </div>

      {/* --- Right Side Bump (Socials) --- */}
      <div className="side-bump absolute top-1/2 right-0 z-30 -translate-y-1/2 translate-x-0">
        <div className="flex flex-col gap-4 rounded-l-2xl border-y border-l border-white/20 bg-black/20 backdrop-blur-md py-4 px-4 shadow-2xl transition-transform hover:translate-x-[-5px]">
          {/* WhatsApp Icon */}
          <a
            href="https://wa.me/9477xxxxxxx" // Replace with real number
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center justify-center transition-transform hover:scale-110"
            aria-label="Contact on WhatsApp"
          >
            <svg
              className="h-6 w-6 fill-white/80 transition-colors group-hover:fill-emerald-400"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
          </a>
          {/* Separator Line */}
          <div className="h-px w-full bg-white/20" />
          {/* Gmail Icon */}
          <a
            href="mailto:villa95rangala@gmail.com"
            className="group relative flex items-center justify-center transition-transform hover:scale-110"
            aria-label="Send an Email"
          >
            <svg
              className="h-6 w-6 fill-white/80 transition-colors group-hover:fill-red-400"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
            </svg>
          </a>
        </div>
      </div>

      {/* --- Main Content (Bottom Left) --- */}
      <div className="absolute bottom-0 left-0 w-full z-10 px-4 md:px-10 pb-6 md:pb-10 flex flex-col items-start justify-end">
        {/* Description Box (Floating above the text) */}
        <div className="detail-box mb-8 max-w-md">
          <div className="border-l-2 border-emerald-500 pl-6">
            <div className="detail-item space-y-2">
              <h2 className="text-xl md:text-2xl font-light leading-tight text-white">
                Private sanctuary above the clouds.
              </h2>
              <p className="text-sm text-white/80 leading-relaxed max-w-[320px]">
                Escape to the raw beauty of the Knuckles Range. 13km from
                Pallekele. Pure silence.
              </p>
            </div>

            <div className="detail-item mt-5 flex flex-wrap gap-3">
              <Badge icon={Mountain} label="VIEWS" />
              <Badge icon={Wifi} label="WIFI" />
              <Badge icon={Coffee} label="DINING" />
            </div>
          </div>
        </div>

        {/* Massive Title - ONE LINE */}
        <h1 className="relative flex w-full overflow-hidden text-[13vw] leading-none font-black tracking-tighter uppercase text-white mix-blend-overlay">
          {"VILLA 95".split("").map((char, i) => (
            <span key={i} className="title-char inline-block origin-bottom">
              {/* Preserve space width */}
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h1>
      </div>
    </section>
  );
}

function Badge({ icon: Icon, label }: { icon: any; label: string }) {
  return (
    <span className="flex items-center gap-2 text-[10px] md:text-xs font-medium uppercase tracking-widest text-white/90">
      <Icon className="h-3 w-3 md:h-4 md:w-4" />
      {label}
    </span>
  );
}
