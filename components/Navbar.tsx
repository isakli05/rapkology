'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/haberler', label: 'HABERLER', active: true },
  { href: '/etkinlikler', label: 'ETKİNLİKLER', active: false },
  { href: '/muzikler', label: 'MÜZİKLER', active: false },
  { href: '/videolar', label: 'VİDEOLAR', active: false },
  { href: '/iletisim', label: 'İLETİŞİM', active: false },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Senior Level Pattern - Route-based Styling with Mobile Override
  const navbarVariant = pathname === '/' ? 'navbar-glassmorphism lg:navbar-glassmorphism navbar-solid' : 'navbar-solid';

  return (
    <nav className={`fixed top-0 left-0 right-0 z-nav ${navbarVariant}`}>
      <div className="container mx-auto px-4 lg:px-hero-gap-lg xl:px-hero-gap-xl">
        <div className="flex items-center h-16 lg:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="block">
              <Image
                src="/images/logo.svg"
                alt="Rapkology"
                width={235}
                height={59}
                priority
                className="h-10 lg:h-12 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Navigation Links - Design System Spacing */}
          <div className="hidden lg:flex lg:items-center lg:space-x-hero-gap xl:space-x-hero-gap-lg flex-1 ml-nav-gap">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.active ? link.href : "#"}
                onClick={link.active ? undefined : (e) => e.preventDefault()}
                className="font-saira font-normal text-sm leading-none text-center text-white hover:text-brand-yellow transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Right Side - Search & Login */}
          <div className="hidden lg:flex lg:items-center lg:space-x-6">
            {/* Search Icon */}
            <button
              type="button"
              className="text-white hover:text-brand-yellow transition-colors duration-200"
              aria-label="Arama"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>

            {/* Login Button */}
            <Link
              href="/giris"
              className="font-saira font-bold text-sm leading-none text-center bg-white text-black hover:bg-brand-yellow hover:text-black transition-colors duration-200 flex items-center justify-center px-4 lg:px-6 py-2 lg:py-2.5 min-w-28 lg:min-w-32 whitespace-nowrap"
            >
              GİRİŞ YAP
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center ml-auto">
            {/* Hamburger Menu */}
            <button
              type="button"
              className="text-white hover:text-brand-yellow focus:outline-none focus:text-brand-yellow p-2 rounded-sm transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Menüyü aç"
            >
              {isMobileMenuOpen ? (
                <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <Image
                  src="/icons/hb_menu.svg"
                  alt="Menü"
                  width={32}
                  height={14}
                  className="w-9 h-auto"
                />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-900">
            <div className="pt-4 pb-6 space-y-4">
              {/* Mobile Navigation Links */}
              <div className="space-y-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.active ? link.href : "#"}
                    onClick={link.active 
                      ? () => setIsMobileMenuOpen(false) 
                      : (e) => { e.preventDefault(); setIsMobileMenuOpen(false); }
                    }
                    className="block font-saira font-normal text-sm leading-none text-center text-white hover:text-brand-yellow transition-colors duration-200 py-2"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              {/* Mobile Login Button */}
              <div className="pt-4">
                <Link
                  href="/giris"
                  className="w-full font-saira font-bold text-sm leading-none text-center bg-white text-black hover:bg-brand-yellow hover:text-black transition-colors duration-200 flex items-center justify-center py-3 min-h-12"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  GİRİŞ YAP
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
