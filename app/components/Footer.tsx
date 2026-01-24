"use client";

import { Instagram, Facebook, MapPin, Mail, Phone, ArrowUpRight } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-stone-900 text-stone-400 py-20 border-t border-stone-800">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        
        {/* --- Top Section: Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          
          {/* Brand Column (Span 4) */}
          <div className="md:col-span-4 space-y-6">
            <h2 className="font-serif text-3xl text-white tracking-widest">
              VILLA 95
            </h2>
            <p className="text-sm leading-relaxed max-w-xs text-stone-500">
              A private sanctuary above the clouds. Experience the raw beauty of the Knuckles Mountain Range in absolute silence.
            </p>
            <div className="flex gap-4">
              <SocialLink href="#" icon={Instagram} label="Instagram" />
              <SocialLink href="#" icon={Facebook} label="Facebook" />
            </div>
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
            <ul className="space-y-4 text-sm">
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
            </ul>
          </div>

          {/* CTA Column (Span 3) */}
          <div className="md:col-span-3 space-y-6">
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

        {/* --- Middle Section: Legal & Copyright --- */}
        <div className="border-t border-stone-800 py-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-stone-600">
          <p>© {currentYear} Villa 95 Rangala. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-stone-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-stone-400 transition-colors">Terms of Service</a>
          </div>
        </div>

        {/* --- BOTTOM SECTION: Credits (Centered & Bigger) --- */}
        <div className="border-t border-stone-800/50 pt-8 flex justify-center">
            <p className="text-sm font-medium text-stone-500">
                Designed by <span className="text-stone-300 font-bold hover:text-emerald-500 transition-colors cursor-default">DataKo Solutions (Pvt) Ltd</span>
            </p>
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

function SocialLink({ href, icon: Icon, label }: { href: string; icon: any; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-700 text-stone-400 transition-all hover:border-emerald-600 hover:bg-emerald-600 hover:text-white"
    >
      <Icon className="h-4 w-4" />
    </a>
  );
}