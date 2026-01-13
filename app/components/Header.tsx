"use client";

import { useEffect, useMemo, useState } from "react";

const links = [
  { id: "about", label: "About" },
  { id: "amenities", label: "Amenities" },
  { id: "gallery", label: "Gallery" },
  { id: "location", label: "Location" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [atTop, setAtTop] = useState(true);

  // Build observers for section highlighting and hero/top detection
  useEffect(() => {
    const sections = ["home", ...links.map((l) => l.id)];
    const els = sections
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // Observe sections to update active link in nav
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        // Pick the most visible entry
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio || 0) - (a.intersectionRatio || 0));
        if (visible[0]) {
          const id = visible[0].target.id;
          setActiveId(id === "home" ? null : id);
        }
      },
      {
        threshold: prefersReducedMotion ? 0 : 0.3,
        rootMargin: "-64px 0px -40% 0px", // account for header height
      },
    );

    els.forEach((el) => sectionObserver.observe(el));

    // Detect if we're at the hero/top to switch header background
    const topEl = document.getElementById("home");
    let topObserver: IntersectionObserver | null = null;
    if (topEl) {
      topObserver = new IntersectionObserver(
        (entries) => {
          const e = entries[0];
          setAtTop(e.isIntersecting && e.boundingClientRect.top <= 0);
        },
        { threshold: 0, rootMargin: "-64px 0px 0px 0px" },
      );
      topObserver.observe(topEl);
    } else {
      // Fallback: use scroll position
      const onScroll = () => setAtTop(window.scrollY < 24);
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    }

    return () => {
      sectionObserver.disconnect();
      if (topObserver) topObserver.disconnect();
    };
  }, []);

  // Close menu when navigating
  useEffect(() => {
    const handler = () => setMenuOpen(false);
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);

  const headerClass = useMemo(() => {
    const base =
      "fixed top-0 left-0 right-0 z-50 backdrop-blur transition-colors duration-300";
    // Minimal borderless cream bar like reference; becomes slightly denser after scroll
    return atTop
      ? `${base} bg-mist-cream/80 supports-[backdrop-filter]:bg-mist-cream/70`
      : `${base} bg-mist-cream/95 supports-[backdrop-filter]:bg-mist-cream/85`;
  }, [atTop]);

  const linkClass = (id: string) =>
    `relative rounded-sm px-1 py-0.5 uppercase tracking-[0.18em] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-forest-green/30 ${
      activeId === id ? "text-rich-brown" : "text-warm-brown/90"
    } ${
      activeId === id
        ? "after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:bg-rich-brown"
        : "hover:text-rich-brown"
    }`;

  return (
    <header className={headerClass}>
      <div className="mx-auto flex h-16 max-w-8xl items-center justify-between px-5">
        {/* Brand */}
        <a
          href="#home"
          className="brand-font text-xl font-normal tracking-tight text-rich-brown focus:outline-none focus-visible:ring-2 focus-visible:ring-forest-green/30 rounded-sm"
        >
          Villa 95
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-10 md:flex">
          {links.map((l) => (
            <a key={l.id} href={`#${l.id}`} aria-current={activeId === l.id} className={linkClass(l.id)}>
              {l.label}
            </a>
          ))}
        </nav>

        {/* CTA and mobile toggle */}
        <div className="flex items-center gap-3">
          <a
            href="https://www.booking.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 md:h-12 items-center justify-center rounded-full bg-rich-brown px-6 md:px-8 text-[0.8rem] md:text-sm font-medium tracking-[0.2em] text-white uppercase transition-colors hover:bg-rich-brown/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-rich-brown/40"
          >
            Book
          </a>

          {/* Mobile menu button */}
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-olive-green/30 bg-white/70 text-rich-brown shadow-sm backdrop-blur transition-colors hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-forest-green/30"
          >
            <span className="sr-only">Menu</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile panel */}
      <div
        className={`md:hidden transition-[opacity,transform] duration-300 ${
          menuOpen ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 -translate-y-1"
        }`}
      >
        <div className="mx-auto max-w-8xl px-5 pb-4">
          <div className="rounded-2xl border border-olive-green/20 bg-mist-cream/90 p-3 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-mist-cream/80">
            <nav className="grid gap-2">
              {links.map((l) => (
                <a
                  key={`m-${l.id}`}
                  href={`#${l.id}`}
                  onClick={() => setMenuOpen(false)}
                  className={`rounded-lg px-3 py-2 text-sm uppercase tracking-[0.18em] transition-colors ${
                    activeId === l.id ? "bg-olive-green/10 text-rich-brown" : "text-warm-brown hover:bg-olive-green/10"
                  }`}
                >
                  {l.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
