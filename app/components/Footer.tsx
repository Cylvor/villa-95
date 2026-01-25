"use client";

import Image from "next/image";
import Link from "next/link";
import { Instagram, Facebook, MapPin, Mail, Phone, ArrowUpRight } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-stone-900 text-stone-400 py-20 border-t border-stone-800">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        
        {/* --- Top Section: Grid --- */}
        {/* Added 'text-center md:text-left' to center text on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16 text-center md:text-left">
          
          {/* Brand Column (Span 4) */}
          <div className="md:col-span-4 space-y-6 flex flex-col items-center">
            <a href="/" aria-label="Villa 95 Home" className="inline-flex">
              <Image
                src="/logo/logo.png"
                alt="Villa 95"
                width={480}
                height={180}
                priority
                className="h-auto w-72 md:w-80"
              />
            </a>
            <p className="text-sm leading-relaxed text-stone-500 text-center">
              A1 overseas consultants (pvt) ltd
            </p>
          </div>

          {/* Navigation Column (Span 2) */}
          <div className="md:col-span-2 space-y-6">
            <h3 className="text-xs font-bold uppercase tracking-widest text-white">
              Explore
            </h3>
            <ul className="space-y-4 text-sm">
              <FooterLink href="#about">Our Story</FooterLink>
              <FooterLink href="#amenities">Amenities</FooterLink>
              <FooterLink href="#gallery">Visual Diary</FooterLink>
              <FooterLink href="#reviews">Guest Stories</FooterLink>
            </ul>
          </div>

          {/* Contact Column (Span 3) */}
          <div className="md:col-span-3 space-y-6">
            <h3 className="text-xs font-bold uppercase tracking-widest text-white">
              Contact
            </h3>
            <ul className="space-y-4 text-sm flex flex-col items-center md:items-start">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 shrink-0 text-emerald-600 mt-1" />
                <span>
                  No.95 Bobebila Makuldeniya Rd, <br />
                  Kandy 20921, Sri Lanka
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-emerald-600" />
                <a href="mailto:info@villa95.com" className="hover:text-white transition-colors">
                  info@villa95.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-emerald-600" />
                <a href="tel:+94770000000" className="hover:text-white transition-colors">
                  +94 77 000 0000
                </a>
              </li>
              <li className="pt-2">
                <div className="flex gap-4">
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-stone-700 text-stone-400 transition-all hover:border-emerald-600 hover:bg-emerald-600 hover:text-white"
                  >
                    <Instagram className="h-4 w-4" />
                  </a>
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-stone-700 text-stone-400 transition-all hover:border-emerald-600 hover:bg-emerald-600 hover:text-white"
                  >
                    <Facebook className="h-4 w-4" />
                  </a>
                </div>
              </li>
            </ul>
          </div>

          {/* CTA Column (Span 3) */}
          <div className="md:col-span-3 space-y-6 flex flex-col items-center md:items-start">
            <h3 className="text-xs font-bold uppercase tracking-widest text-white">
              Book Your Stay
            </h3>
            <p className="text-sm text-stone-500">
              Ready to escape? Check availability and rates instantly.
            </p>
            <a
              href="https://www.booking.com/hotel/lk/villa-95-kandy.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-stone-900 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-emerald-600 hover:text-white transition-all duration-300 group"
            >
              Check Availability
              <ArrowUpRight className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>

        {/* --- Bottom Section: Merged Layout --- */}
        <div className="border-t border-stone-800 py-8 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-stone-600 text-center md:text-left">
          
          {/* Left: Copyright */}
          <p>© {currentYear} Villa 95 Rangala. All rights reserved.</p>
          
          {/* Right: Legal & Credits Grouped */}
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
            <div className="flex gap-8">
              <Link href="/privacy-policy" className="hover:text-stone-400 transition-colors">Privacy Policy</Link>
              <Link href="/terms-of-service" className="hover:text-stone-400 transition-colors">Terms of Service</Link>
            </div>

            {/* Separator only on desktop */}
            <span className="hidden md:block text-stone-800">|</span>

            <p className="font-medium text-stone-500">
               Designed by <span className="text-stone-300 font-bold hover:text-emerald-500 transition-colors cursor-default">Cylvor IT</span>
            </p>
          </div>

        </div>

      </div>
    </footer>
  );
}

// Helper Components
function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <a 
        href={href} 
        className="block transition-all duration-300 hover:text-emerald-500 hover:translate-x-1"
      >
        {children}
      </a>
    </li>
  );
}