"use client";

import { useEffect, useState } from "react";

export default function Header() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const sections = ["home", "about", "amenities", "gallery", "location"];
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: "-80px 0px -50% 0px" }
    );

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const navItems = [
    { href: "#about", label: "About" },
    { href: "#amenities", label: "Amenities" },
    { href: "#gallery", label: "Gallery" },
    { href: "#location", label: "Location" },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-[9999] border-b border-forest-green/10 bg-transparent backdrop-blur">
      <div className="mx-auto flex max-w-8xl items-center justify-between px-6 sm:px-8 h-16">
        <a href="#home" className="text-sm font-semibold tracking-tight text-forest-green">
          Villa 95
        </a>

        <nav className="hidden items-center gap-1 text-sm text-warm-brown md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`relative px-3 py-2 transition-colors ${
                activeSection === item.href.slice(1)
                  ? "text-forest-green font-medium"
                  : "hover:text-forest-green"
              }`}
            >
              {item.label}
              {activeSection === item.href.slice(1) && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-sunlit-amber rounded-full transition-all duration-300" />
              )}
            </a>
          ))}
        </nav>

        <a
          href="https://www.booking.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-10 items-center justify-center rounded-full bg-sunlit-amber px-4 text-sm font-medium text-white hover:bg-sunlit-amber/90 transition-colors"
        >
          Book on Booking.com
        </a>
      </div>
    </header>
  );
}
