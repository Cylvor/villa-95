"use client";

import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      // Check if hovering over clickable elements
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
  }, []);

  if (!isVisible) return null;

  const text = "VILLA 95 RANGALA • ";
  const radius = isPointer ? 65 : 55;

  return (
    <>
      {/* Main cursor dot */}
      <div
        className="custom-cursor-dot"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      />

      {/* Rotating text around cursor */}
      <div
        className="custom-cursor-text"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      >
        <svg width={radius * 2.5} height={radius * 2.5} viewBox={`0 0 ${radius * 2.5} ${radius * 2.5}`}>
          <defs>
            <path
              id="circlePath"
              d={`M ${radius * 1.25}, ${radius * 1.25} m -${radius}, 0 a ${radius},${radius} 0 1,1 ${radius * 2},0 a ${radius},${radius} 0 1,1 -${radius * 2},0`}
            />
          </defs>
          <text className="cursor-rotating-text">
            <textPath href="#circlePath" startOffset="0%">
              {text.repeat(3)}
            </textPath>
          </text>
        </svg>
      </div>
    </>
  );
}
