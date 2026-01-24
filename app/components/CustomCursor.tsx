"use client";

import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(hover: hover) and (pointer: fine)");
    const updateEnabled = () => setEnabled(mql.matches);
    updateEnabled();

    // Safari < 14 fallback
    // eslint-disable-next-line deprecation/deprecation
    mql.addEventListener ? mql.addEventListener("change", updateEnabled) : mql.addListener(updateEnabled);

    return () => {
      // eslint-disable-next-line deprecation/deprecation
      mql.removeEventListener ? mql.removeEventListener("change", updateEnabled) : mql.removeListener(updateEnabled);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      const target = e.target as HTMLElement;
      setIsPointer(
        window.getComputedStyle(target).cursor === "pointer" ||
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") !== null ||
        target.closest("button") !== null
      );
    };

    const hideCursor = () => setIsVisible(false);
    const showCursor = () => setIsVisible(true);

    window.addEventListener("mousemove", updatePosition);
    document.addEventListener("mouseleave", hideCursor);
    document.addEventListener("mouseenter", showCursor);

    return () => {
      window.removeEventListener("mousemove", updatePosition);
      document.removeEventListener("mouseleave", hideCursor);
      document.removeEventListener("mouseenter", showCursor);
    };
  }, [enabled]);

  if (!enabled || !isVisible) return null;

  // --- CONFIGURATION ---
  const textString = "VILLA 95 • ";
  const text = textString.repeat(3); 
  
  // FIXED RADIUS (Does not change on hover)
  const radius = 32; 
  const fontSize = 8.5; 
  const size = radius * 2.8; 

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] mix-blend-difference">
      
      {/* Main cursor dot - SCALES ON HOVER */}
      <div
        className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-white transition-transform duration-300 ease-out h-4 w-4 ${
            // Scale from 1 (16px) to 1.5 (24px) when hovering
            isPointer ? "scale-[1.5]" : "scale-100"
        }`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      />

      {/* Rotating text ring - SIZE STAYS CONSTANT */}
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: size,
          height: size,
        }}
      >
        <div className={`h-full w-full transition-opacity duration-500 ease-out ${isPointer ? "opacity-100" : "opacity-60"}`}>
            <svg 
                width="100%" 
                height="100%" 
                viewBox={`0 0 ${size} ${size}`}
                className="animate-[spin_10s_linear_infinite]"
            >
            <defs>
                <path
                id="circlePath"
                d={`M ${size / 2}, ${size / 2} m -${radius}, 0 a ${radius},${radius} 0 1,1 ${radius * 2},0 a ${radius},${radius} 0 1,1 -${radius * 2},0`}
                />
            </defs>
            <text fill="white" fontSize={fontSize} fontWeight="bold" letterSpacing="0.1em" className="uppercase font-mono">
                <textPath href="#circlePath" startOffset="0%">
                {text}
                </textPath>
            </text>
            </svg>
        </div>
      </div>
    </div>
  );
}