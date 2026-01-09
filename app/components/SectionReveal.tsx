"use client";

import { useEffect, useId, useRef } from "react";
import gsap from "gsap";

type SectionRevealProps = {
  children: React.ReactNode;
  className?: string;
  once?: boolean;
};

export default function SectionReveal({
  children,
  className,
  once = true,
}: SectionRevealProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const id = useId();

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    gsap.set(el, { autoAlpha: 0, y: 16 });

    let hasPlayed = false;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          if (once && hasPlayed) return;

          hasPlayed = true;
          gsap.to(el, {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            overwrite: true,
          });

          if (once) observer.disconnect();
        }
      },
      { threshold: 0.18, rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      gsap.killTweensOf(el);
    };
  }, [id, once]);

  return (
    <div ref={rootRef} className={className}>
      {children}
    </div>
  );
}
