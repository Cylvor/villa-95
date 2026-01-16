"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

type SectionRevealProps = {
  children: React.ReactNode;
  className?: string;
  once?: boolean;
  threshold?: number;
  rootMargin?: string;
  duration?: number;
  y?: number;
  stagger?: number;
  childrenSelector?: string;
};

export default function SectionReveal({
  children,
  className,
  once = true,
  threshold = 0.18,
  rootMargin = "0px 0px -10% 0px",
  duration = 0.7,
  y = 16,
  stagger = 0,
  childrenSelector = "> *",
}: SectionRevealProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {}, el);

    const setInitial = () => {
      if (stagger && stagger > 0) {
        const items = el.querySelectorAll(childrenSelector);
        gsap.set(items, { autoAlpha: 0, y });
      } else {
        gsap.set(el, { autoAlpha: 0, y });
      }
    };

    const play = () => {
      if (stagger && stagger > 0) {
        const items = el.querySelectorAll(childrenSelector);
        gsap.to(items, {
          autoAlpha: 1,
          y: 0,
          duration,
          ease: "power2.out",
          stagger,
          overwrite: true,
        });
      } else {
        gsap.to(el, {
          autoAlpha: 1,
          y: 0,
          duration,
          ease: "power2.out",
          overwrite: true,
        });
      }
    };

    setInitial();

    let hasPlayed = false;

    if (typeof IntersectionObserver === "undefined") {
      // Fallback for very old browsers: play immediately
      play();
      return () => {
        ctx.revert();
      };
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          if (once && hasPlayed) return;

          hasPlayed = true;
          play();

          if (once) observer.disconnect();
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      ctx.revert();
      gsap.killTweensOf(el);
    };
  }, [once, threshold, rootMargin, duration, y, stagger, childrenSelector]);

  return (
    <div ref={rootRef} className={className}>
      {children}
    </div>
  );
}
