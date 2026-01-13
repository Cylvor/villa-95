"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Header() {
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const sections = ["home", "about", "amenities", "gallery", "location", "destinations"];
    
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

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial scroll position

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { href: "#about", label: "About" },
    { href: "#amenities", label: "Amenities" },
    { href: "#gallery", label: "Gallery" },
    { href: "#destinations", label: "Destinations" },
    { href: "#location", label: "Location" },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[9999] transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-md shadow-md"
          : "bg-transparent"
      }`}
    >
      <div
        className={`mx-auto transition-all duration-300 ${
          isScrolled
            ? "max-w-full px-4 sm:px-6"
            : "max-w-6xl px-4 sm:px-6"
        }`}
      >
        <div
          className={`flex items-center transition-all duration-300 ${
            isScrolled
              ? "h-14 border-b border-olive-green/10"
              : "h-16 mt-5 rounded-2xl border border-olive-green/20 backdrop-blur-md shadow-lg px-4 sm:px-6"
          }`}
        >
          {/* Left Side - Logo */}
          <div className="flex-shrink-0">
            <a
              href="#home"
              className="inline-flex items-center justify-center transition-all duration-300"
            >
              <div className={`relative transition-all duration-300 ${
                isScrolled ? "w-10 h-10" : "w-12 h-12"
              }`}>
                <Image
                  src="/logo_villa.png"
                  alt="Villa 95 Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </a>
          </div>

          {/* Center - Navigation Links */}
          <div className="flex-1 flex justify-center">
            <nav className="hidden items-center gap-2 text-base md:flex">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={`relative px-3 py-2 transition-all duration-200 rounded-lg text-white ${
                    activeSection === item.href.slice(1)
                      ? "font-semibold opacity-100"
                      : "opacity-80 hover:opacity-100"
                  }`}
                >
                  {item.label}
                  {activeSection === item.href.slice(1) && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-sunlit-amber rounded-full transition-all duration-300" />
                  )}
                </a>
              ))}
            </nav>
          </div>

          {/* Right Side - Button */}
          <div className="flex-shrink-0">
            <a
              href="https://www.booking.com/"
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-300 ${
                isScrolled
                  ? "h-9 bg-sunlit-amber px-4 text-sm text-white hover:bg-sunlit-amber/90"
                  : "h-10 bg-sunlit-amber px-5 text-sm text-white hover:bg-sunlit-amber/90 shadow-sm"
              }`}
            >
              Book Now
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
