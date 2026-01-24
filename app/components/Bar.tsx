"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Wine, Music, Sunset, Sparkles } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Bar() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the content box sliding up
      gsap.from(".bar-content", {
        y: 50,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 70%",
        },
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={container}
      className="relative h-[85vh] w-full overflow-hidden bg-stone-900"
    >
      {/* --- VIDEO BACKGROUND --- */}
      {/* Replace src with your bar/nightlife video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover opacity-60"
      >
        <source src="/bar-ambiance.mp4" type="video/mp4" />
      </video>

      {/* Dark Gradient Overlay for Readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/40 to-transparent" />

      {/* --- CONTENT --- */}
      <div className="absolute inset-0 flex items-center justify-center px-6">
        <div className="bar-content max-w-2xl text-center">
          
          {/* Label */}
          <div className="mb-6 flex justify-center">
            <span className="flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-900/20 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-emerald-400 backdrop-blur-sm">
              <Sparkles className="h-3 w-3" />
              Open Evenings
            </span>
          </div>

          {/* Title */}
          <h2 className="mb-6 font-serif text-5xl text-white md:text-7xl">
            The Cloud Bar
          </h2>

          <p className="mb-10 text-lg font-light leading-relaxed text-stone-300">
            Sip on signature cocktails as the sun dips below the Knuckles Range. 
            An open-air experience where cool mountain breezes meet curated spirits 
            and low-fi beats.
          </p>

          {/* Features Grid */}
          <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Feature icon={Wine} title="Curated Wine" desc="Global selection" />
            <Feature icon={Sunset} title="Sunset Views" desc="Golden hour magic" />
            <Feature icon={Music} title="Ambient Sound" desc="Chill vibes only" />
          </div>

          {/* Menu Link (Optional) */}
          <button className="group relative inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-white transition-colors hover:text-emerald-400">
            View Drink Menu
            <span className="h-[1px] w-8 bg-white transition-all group-hover:w-12 group-hover:bg-emerald-400" />
          </button>

        </div>
      </div>
    </section>
  );
}

// Helper Component for Icons
function Feature({ icon: Icon, title, desc }: { icon: any, title: string, desc: string }) {
  return (
    <div className="flex flex-col items-center rounded-lg border border-white/10 bg-white/5 p-4 backdrop-blur-md transition-colors hover:bg-white/10">
      <Icon className="mb-3 h-5 w-5 text-emerald-400" />
      <span className="mb-1 block text-sm font-bold uppercase tracking-wide text-white">
        {title}
      </span>
      <span className="text-xs text-stone-400">{desc}</span>
    </div>
  );
}