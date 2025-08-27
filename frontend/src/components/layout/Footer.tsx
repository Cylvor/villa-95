'use client';

import Link from 'next/link';
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Villa 95 Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-amber-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">V95</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">Villa 95</h3>
                <p className="text-amber-400 text-sm">Rangala, Sri Lanka</p>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Experience luxury and tranquility in the heart of Sri Lanka's hill country. 
              Villa 95 offers an unforgettable escape with breathtaking views and world-class amenities.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors duration-200">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors duration-200">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors duration-200">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors duration-200">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-amber-400">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-amber-400 transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-amber-400 transition-colors duration-200">
                  About Villa 95
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-gray-300 hover:text-amber-400 transition-colors duration-200">
                  Photo Gallery
                </Link>
              </li>
              <li>
                <Link href="/facilities" className="text-gray-300 hover:text-amber-400 transition-colors duration-200">
                  Facilities & Amenities
                </Link>
              </li>
              <li>
                <Link href="/booking" className="text-gray-300 hover:text-amber-400 transition-colors duration-200">
                  Book Your Stay
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-amber-400">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">Villa 95, Rangala</p>
                  <p className="text-gray-400 text-sm">Kandy District, Sri Lanka</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-amber-400" />
                <span className="text-gray-300">+94 11 234 5678</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-amber-400" />
                <span className="text-gray-300">info@villa95rangala.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-amber-400" />
                <span className="text-gray-300">24/7 Support</span>
              </div>
            </div>
          </div>

          {/* Newsletter & Booking */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-amber-400">Stay Updated</h4>
            <p className="text-gray-300 text-sm">
              Subscribe to our newsletter for special offers and updates about Villa 95.
            </p>
            <div className="space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-amber-400 transition-colors duration-200"
              />
              <button className="w-full bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors duration-200 font-medium">
                Subscribe
              </button>
            </div>
            <div className="pt-4">
              <Link
                href="/booking"
                className="block w-full bg-gradient-to-r from-amber-600 to-amber-700 text-white px-6 py-3 rounded-lg text-center hover:from-amber-700 hover:to-amber-800 transition-all duration-200 font-medium shadow-lg"
              >
                Book Your Stay
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © {currentYear} Villa 95, Rangala. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-amber-400 transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-amber-400 transition-colors duration-200">
                Terms of Service
              </Link>
              <Link href="/cancellation" className="text-gray-400 hover:text-amber-400 transition-colors duration-200">
                Cancellation Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
