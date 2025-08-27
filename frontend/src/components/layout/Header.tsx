'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, Mail, User, LogOut } from 'lucide-react';
import { gsap } from 'gsap';
import { useAuth } from '@/contexts/AuthContext';
import { LoginModal } from '@/components/auth/LoginModal';
import { RegisterModal } from '@/components/auth/RegisterModal';

const Header = () => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isScrolled) {
      gsap.to('.header', {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        duration: 0.3,
        ease: 'power2.out'
      });
    } else {
      gsap.to('.header', {
        backgroundColor: 'transparent',
        backdropFilter: 'blur(0px)',
        duration: 0.3,
        ease: 'power2.out'
      });
    }
  }, [isScrolled]);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Facilities', href: '/facilities' },
    { name: 'Booking', href: '/booking' },
    { name: 'Contact', href: '/contact' },
  ];

  const handleLogout = async () => {
    await logout();
    setIsMenuOpen(false);
  };

  return (
    <header className={`header fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'shadow-lg' : ''
    }`}>
      {/* Top bar with contact info */}
      <div className="bg-amber-900 text-white py-2 px-4 text-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4" />
              <span>+94 11 234 5678</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4" />
              <span>info@villa95rangala.com</span>
            </div>
          </div>
          <div className="hidden md:block">
            <span>📍 Rangala, Sri Lanka</span>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="py-4 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-12 h-12 bg-amber-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">V95</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-2xl font-bold text-gray-900">Villa 95</h1>
              <p className="text-sm text-amber-600">Rangala, Sri Lanka</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-gray-700 hover:text-amber-600 transition-colors duration-200 font-medium ${
                  pathname === item.href ? 'text-amber-600' : ''
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* User Menu / CTA Button */}
          <div className="hidden lg:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-700">Welcome, {user?.name}</span>
                <a
                  href="/profile"
                  className="text-gray-700 hover:text-amber-600 transition-colors"
                >
                  Profile
                </a>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 text-gray-700 hover:text-amber-600 transition-colors"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="text-gray-700 hover:text-amber-600 transition-colors"
                >
                  Sign In
                </button>
                <Link
                  href="/booking"
                  className="bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors duration-200 font-medium shadow-lg hover:shadow-xl"
                >
                  Book Now
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-6 space-y-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`block text-gray-700 hover:text-amber-600 transition-colors duration-200 font-medium py-2 ${
                  pathname === item.href ? 'text-amber-600' : ''
                }`}
              >
                {item.name}
              </Link>
            ))}
            {/* Mobile Auth */}
            {isAuthenticated ? (
              <div className="pt-4 border-t">
                <div className="flex items-center space-x-2 mb-4">
                  <User size={16} />
                  <span className="text-gray-700">{user?.name}</span>
                </div>
                <a
                  href="/profile"
                  className="block w-full text-left text-gray-700 hover:text-amber-600 transition-colors mb-2"
                >
                  Profile
                </a>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 text-gray-700 hover:text-amber-600 transition-colors"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="pt-4 border-t space-y-2">
                <button
                  onClick={() => {
                    setShowLoginModal(true);
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left text-gray-700 hover:text-amber-600 transition-colors"
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    setShowRegisterModal(true);
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left text-gray-700 hover:text-amber-600 transition-colors"
                >
                  Sign Up
                </button>
              </div>
            )}
            <div className="pt-4">
              <Link
                href="/booking"
                onClick={() => setIsMenuOpen(false)}
                className="block w-full bg-amber-600 text-white px-6 py-3 rounded-lg text-center hover:bg-amber-700 transition-colors duration-200 font-medium"
              >
                Book Now
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Auth Modals */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onSwitchToRegister={() => {
          setShowLoginModal(false);
          setShowRegisterModal(true);
        }}
      />
      
      <RegisterModal
        isOpen={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
        onSwitchToLogin={() => {
          setShowRegisterModal(false);
          setShowLoginModal(true);
        }}
      />
    </header>
  );
};

export default Header;
