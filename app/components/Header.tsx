"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { Menu, X, ArrowUpRight } from "lucide-react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // 1. Handle Scroll Effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 2. Handle Mobile Menu Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (isMobileOpen) {
        // OPEN: Slide Down
        gsap.to(mobileMenuRef.current, {
          y: "0%",
          duration: 0.8,
          ease: "power3.inOut",
        });
        // Stagger Links
        gsap.fromTo(".mobile-link", 
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, delay: 0.2, ease: "power3.out" }
        );
        document.body.style.overflow = "hidden";
      } else {
        // CLOSE: Slide Up
        gsap.to(mobileMenuRef.current, {
          y: "-100%",
          duration: 0.8,
          ease: "power3.inOut",
        });
        document.body.style.overflow = "auto";
      }
    }, mobileMenuRef);

    return () => ctx.revert();
  }, [isMobileOpen]);

  const navItems = [
    { name: "The Villa", href: "#about" },
    { name: "Suites", href: "#rooms" },
    { name: "Amenities", href: "#amenities" },
    { name: "Gallery", href: "#gallery" },
    { name: "Location", href: "#location" },
  ];

  return (
    <>
      {/* --- MAIN HEADER --- */}
      <header
        className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 py-3 shadow-sm backdrop-blur-md"
            : "bg-transparent py-4 md:py-6"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 md:px-12">
          
          {/* LOGO */}
          <Link href="/" className="relative z-[60]">
            <span className={`font-serif text-xl md:text-2xl font-bold tracking-widest transition-colors ${
                isScrolled ? "text-stone-900" : "text-white"
            }`}>
              VILLA 95 
            </span>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`group relative text-xs font-bold uppercase tracking-widest ${
                    isScrolled ? "text-stone-900" : "text-white"
                }`}
              >
                {item.name}
                <span className={`absolute -bottom-1 left-0 h-[1px] w-0 bg-current transition-all duration-300 group-hover:w-full ${isScrolled ? "bg-emerald-600" : "bg-white"}`} />
              </Link>
            ))}

            <Link
              href="/reservations"
              className={`group flex items-center gap-2 rounded-full px-5 py-2.5 transition-all ${
                isScrolled
                  ? "bg-stone-900 text-white hover:bg-emerald-700"
                  : "bg-white text-stone-900 hover:bg-emerald-700 hover:text-white"
              }`}
            >
              <span className="text-xs font-bold uppercase tracking-widest">
                Book Now
              </span>
              <ArrowUpRight className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </nav>

          {/* MOBILE ACTIONS (Book + Hamburger) */}
          <div className="flex items-center gap-3 md:hidden">
            <Link
              href="/reservations"
              className={`
                flex items-center gap-1 rounded-full px-4 py-2 transition-all shadow-sm
                ${isScrolled
                    ? "bg-stone-900 text-white hover:bg-emerald-700"
                    : "bg-white text-stone-900 hover:bg-emerald-700 hover:text-white"
                }
              `}
            >
              <span className="text-[10px] font-bold uppercase tracking-widest whitespace-nowrap">
                Book Now
              </span>
            </Link>

            {/* OPEN BUTTON (Only visible when menu is CLOSED) */}
            <button
              type="button"
              onClick={() => setIsMobileOpen(true)}
              className={`
                  flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300
                  ${isScrolled 
                      ? "bg-stone-100 text-stone-900" 
                      : "bg-white/10 text-white backdrop-blur-md border border-white/10"
                  }
              `}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* --- FULL SCREEN MOBILE MENU --- */}
      <div
        ref={mobileMenuRef}
        className="fixed inset-0 z-[100] flex h-screen w-full flex-col items-center justify-center bg-stone-50 text-stone-900"
        style={{ transform: "translateY(-100%)" }}
      >
        {/* CLOSE BUTTON (Inside the menu, Top Right) */}
        <div className="absolute top-4 right-4 z-[110]">
            <button
              onClick={() => setIsMobileOpen(false)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-stone-200 text-stone-900 hover:bg-stone-300 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
        </div>

        {/* MENU LINKS */}
        <div className="flex flex-col items-center gap-8">
            {navItems.map((item) => (
                <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileOpen(false)}
                className="mobile-link text-3xl font-serif font-light tracking-wide hover:text-emerald-700 hover:italic transition-all"
                >
                {item.name}
                </Link>
            ))}
        </div>
        
        {/* WATERMARK */}
        <div className="absolute bottom-10 opacity-10 pointer-events-none select-none">
            <h1 className="text-[15vw] font-black leading-none tracking-tighter text-stone-900">
                95
            </h1>
        </div>
      </div>
    </>
  );
}