"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Header() {
  const [activeSection, setActiveSection] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const sections = ["home", "about", "amenities", "gallery", "location", "destinations"];

    const observer = new IntersectionObserver(
      (entries) => {
        // Choose the entry with the largest intersectionRatio (fallback even when none are "isIntersecting")
        const sorted = entries.slice().sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (sorted.length === 0) return;
        const topId = sorted[0].target.id;
        // If we're near the top of the page (hero), ignore observer changes on initial load
        if (typeof window !== "undefined" && window.scrollY < 120) {
          setActiveSection("");
          return;
        }
        // Don't mark anything when we're in the `home` (hero) section
        if (topId === "home") setActiveSection("");
        else setActiveSection(topId);
      },
      { threshold: [0.25, 0.5, 0.75], rootMargin: "-100px 0px -50% 0px" }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 40);
      // Clear active section when near the top (in hero)
      if (window.scrollY < 120) setActiveSection("");
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    { href: "#about", label: "About" },
    { href: "#amenities", label: "Amenities" },
    { href: "#gallery", label: "Gallery" },
    { href: "#destinations", label: "Destinations" },
    { href: "#location", label: "Location" },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-[9999]">
      <div
        className={`mx-auto transition-all duration-300 ${
          isScrolled ? "max-w-full px-4 sm:px-6" : "max-w-6xl px-4 sm:px-6"
        }`}
      >
        <div
          className={`mt-4 flex items-center justify-between transition-all duration-300 rounded-2xl px-5 text-white ${
            isScrolled
              ? "h-16 bg-white/10 backdrop-blur-xl shadow-sm border border-white/10"
              : "h-16 bg-transparent backdrop-blur-xl shadow-none border border-transparent"
          }`}
        >
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2">
            <div
              className={`relative transition-all duration-300 ${
                isScrolled ? "w-9 h-9" : "w-11 h-11"
              }`}
            >
              <Image
                src="/logo_villa.png"
                alt="Villa 95"
                fill
                className="object-contain"
                priority
              />
            </div>
          </a>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-1 rounded-full bg-transparent p-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.slice(1);
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`relative px-4 py-2 text-sm rounded-full transition-all duration-200 ${
                    isActive
                      ? "bg-white/20 text-white shadow-sm font-medium"
                      : "text-white/90 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* CTA */}
          <a
            href="https://www.booking.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center h-10 px-5 rounded-full bg-sunlit-amber text-white text-sm font-semibold shadow-md transition-all duration-300 hover:bg-sunlit-amber/90 hover:scale-[1.02]"
          >
            Book Now
          </a>
        </div>
      </div>
    </header>
  );
}
