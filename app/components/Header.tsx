"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { Menu, X, ArrowUpRight, ChevronDown } from "lucide-react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // 1. Handle Scroll Effect (Transparent -> Solid White)
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 2. Handle Mobile Menu Animation (GSAP)
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (isMobileOpen) {
        // Open Animation
        gsap.to(mobileMenuRef.current, {
          y: "0%",
          duration: 0.8,
          ease: "power3.inOut",
        });
        gsap.from(".mobile-link", {
          y: 50,
          opacity: 0,
          stagger: 0.1,
          duration: 0.8,
          delay: 0.2,
          ease: "power3.out",
        });
      } else {
        // Close Animation
        gsap.to(mobileMenuRef.current, {
          y: "-100%",
          duration: 0.8,
          ease: "power3.inOut",
        });
      }
    }, mobileMenuRef);

    return () => ctx.revert();
  }, [isMobileOpen]);

  // --- UPDATED LINKS ---
  const navItems = [
    { 
      name: "The Villa", 
      href: "#about",
      dropdown: [
        { name: "About Us", href: "#about" },
        { name: "House Rules", href: "#house-rules" },
      ]
    },
    { 
      name: "Suites", 
      href: "#rooms",
      dropdown: [
        { name: "All Rooms", href: "#rooms" },
        { name: "Room Types", href: "#room-types" },
      ]
    },
    { 
      name: "Dining", 
      href: "#dining",
      dropdown: [
        { name: "Restaurant", href: "#dining" },
        { name: "Bar", href: "#bar" },
      ]
    },
    { name: "Amenities", href: "#amenities" },
    { name: "Gallery", href: "#gallery" },
    { 
      name: "Experience", 
      href: "#destinations",
      dropdown: [
        { name: "Destinations", href: "#destinations" },
        { name: "Reviews", href: "#reviews" },
      ]
    },
    { name: "Location", href: "#location" },
  ];

  const handleMouseEnter = (itemName: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setOpenDropdown(itemName);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 200);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 z-50 w-full transition-all duration-500 ${
          isScrolled
            ? "bg-white/90 py-4 text-stone-900 shadow-sm backdrop-blur-md"
            : "bg-transparent py-6 text-white"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 md:px-12">
          
          {/* --- LOGO --- */}
          <Link href="/" className="relative z-50">
            <span className={`font-serif text-2xl font-bold tracking-widest transition-colors ${
                isMobileOpen ? "text-stone-900" : ""
            }`}>
              VILLA 95 Rangala
            </span>
          </Link>

          {/* --- DESKTOP NAVIGATION --- */}
          <nav className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => item.dropdown && handleMouseEnter(item.name)}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  href={item.href}
                  className="group relative text-xs font-bold uppercase tracking-widest flex items-center gap-1"
                >
                  {item.name}
                  {item.dropdown && (
                    <ChevronDown className={`h-3 w-3 transition-transform ${openDropdown === item.name ? 'rotate-180' : ''}`} />
                  )}
                  {/* Magnetic Underline Effect */}
                  <span className={`absolute -bottom-1 left-0 h-[1px] w-0 bg-current transition-all duration-300 group-hover:w-full ${isScrolled ? "bg-emerald-600" : "bg-white"}`} />
                </Link>

                {/* Dropdown Menu */}
                {item.dropdown && openDropdown === item.name && (
                  <div className="absolute top-full left-0 z-50 mt-2 w-48 bg-white shadow-lg rounded-lg overflow-hidden border border-stone-200">
                    {item.dropdown.map((dropItem) => (
                      <Link
                        key={dropItem.name}
                        href={dropItem.href}
                        className="block px-4 py-3 text-xs font-medium text-stone-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                      >
                        {dropItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* CTA Button */}
            <a
              href="https://www.booking.com/hotel/lk/villa-95-kandy.html"
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex items-center gap-2 rounded-full px-5 py-2.5 transition-all ${
                isScrolled
                  ? "bg-stone-900 text-white hover:bg-emerald-700"
                  : "bg-white text-stone-900 hover:bg-stone-200"
              }`}
            >
              <span className="text-xs font-bold uppercase tracking-widest">
                Book Now
              </span>
              <ArrowUpRight className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </nav>

          {/* --- MOBILE TOGGLE BUTTON --- */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="relative z-50 block md:hidden"
            aria-label="Toggle Menu"
          >
            {isMobileOpen ? (
              <X className="h-6 w-6 text-stone-900" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </header>

      {/* --- MOBILE FULL-SCREEN MENU --- */}
      <div
        ref={mobileMenuRef}
        className="fixed inset-0 z-40 flex h-screen w-full flex-col items-center justify-start bg-stone-50 text-stone-900 overflow-y-auto pt-28 pb-14"
        style={{ transform: "translateY(-100%)" }} // Starts hidden
      >
        <div className="flex w-full max-w-md flex-col items-center gap-6 px-6">
            {navItems.map((item) => (
              <div key={item.name} className="flex flex-col items-center gap-3">
                <Link
                  href={item.href}
                  onClick={() => !item.dropdown && setIsMobileOpen(false)}
                  className="mobile-link text-3xl font-serif font-light tracking-wide hover:text-emerald-700 hover:italic transition-all"
                >
                  {item.name}
                </Link>
                
                {/* Mobile Dropdown Items */}
                {item.dropdown && (
                  <div className="flex flex-col items-center gap-2">
                    {item.dropdown.map((dropItem) => (
                      <Link
                        key={dropItem.name}
                        href={dropItem.href}
                        onClick={() => setIsMobileOpen(false)}
                        className="mobile-link text-lg font-light text-stone-600 hover:text-emerald-700 transition-all"
                      >
                        {dropItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            <div className="mobile-link mt-8">
                <a
                href="https://www.booking.com/hotel/lk/villa-95-kandy.html"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-stone-900 px-8 py-4 text-white shadow-lg transition-transform active:scale-95"
                >
                    <span className="text-sm font-bold uppercase tracking-widest">Book Your Stay</span>
                </a>
            </div>
        </div>
        
        {/* Decorative '95' Background Watermark */}
        <div className="absolute bottom-10 opacity-10 pointer-events-none">
            <h1 className="text-[15vw] font-black leading-none tracking-tighter text-stone-900">
                95
            </h1>
        </div>
      </div>
    </>
  );
} 