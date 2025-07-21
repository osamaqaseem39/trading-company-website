'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const navLinks = [
  { label: 'Products', href: '/products' },
  { label: 'Categories', href: '/categories' },
  { label: 'Company', href: '/company' },
  { label: 'Updates', href: '/updates' },
  { label: 'Become A Supplier', href: '/become-a-supplier' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false); // NEW: mobile nav state

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile nav on route change
  useEffect(() => {
    setMobileOpen(false);
  }, []);

  return (
    <header className={`${scrolled ? 'bg-white' : 'bg-[#fafafa]'} border-b border-[#ececec] sticky top-0 z-50 transition-colors duration-500 ease-in-out rounded-b-2xl`}>
      <div className={`max-w-[1600px] mx-auto flex items-center ${scrolled ? 'py-1.5 px-4' : 'py-3 px-4'} transition-all duration-500 ease-in-out`}>
        {/* Logo + Brand Name */}
        <Link href="/" className="flex items-center min-w-[100px] group" aria-label="Go to homepage">
          <img
            src="/images/logo-menu.png"
            alt="Wingz Impex Logo"
            width={120}
            height={120}
            className="object-contain mr-3 transition-all duration-500 ease-in-out w-10 h-10 sm:w-16 sm:h-16 group-hover:opacity-80"
          />
          <div>
            <span className="block font-bold text-xl sm:text-4xl text-[#49594b] leading-tight">WINGZ IMPEX</span>
          </div>
        </Link>
        {/* Hamburger for mobile, right aligned */}
        <div className="flex-1 flex justify-end lg:hidden">
          <button
            className="p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-[#405a4d]"
            aria-label="Open navigation menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileOpen((v) => !v)}
          >
            <svg className="w-8 h-8 text-[#49594b]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        {/* Centered Navigation */}
        <nav className="flex-1 flex justify-center">
          <ul className="hidden lg:flex gap-3">
            {navLinks.map(link => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="rounded-full bg-[#ede7de] text-[#2d2d2d] font-semibold text-base px-6 py-2 transition-colors duration-150 hover:bg-[#e2d7c3] hover:text-[#2d2d2d] focus:bg-[#e2d7c3] focus:text-[#2d2d2d]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        {/* Right Side: Contact & Search */}
        <div className="hidden md:flex items-center gap-3 min-w-[120px] justify-end">
          <button className="w-10 h-10 flex items-center justify-center rounded-full bg-[#ede7de] hover:bg-[#e2d7c3] transition-colors">
            <svg className="w-5 h-5 text-[#49594b]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="7" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
          <Link
            href="/contact"
            className="bg-[#405a4d] hover:bg-[#2e3e2c] text-white font-bold px-7 py-2 rounded-full text-base transition-colors shadow"
          >
            Contact
          </Link>
        </div>
      </div>
      {/* Mobile Nav Drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-40" onClick={() => setMobileOpen(false)}>
          <nav
            className="absolute top-0 right-0 w-4/5 max-w-xs h-full bg-white shadow-lg p-8 flex flex-col gap-6 animate-slide-in"
            onClick={e => e.stopPropagation()}
          >
            {/* Search button at the top of mobile menu */}
            <button className="w-full flex items-center justify-center rounded-full bg-[#ede7de] hover:bg-[#e2d7c3] text-[#49594b] font-semibold text-lg px-6 py-3 mb-4 transition-colors duration-150">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="7" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              Search
            </button>
            <button
              className="self-end mb-4 p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-[#405a4d]"
              aria-label="Close navigation menu"
              onClick={() => setMobileOpen(false)}
            >
              <svg className="w-8 h-8 text-[#49594b]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <ul className="flex flex-col gap-4">
              {navLinks.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block rounded-full bg-[#ede7de] text-[#2d2d2d] font-semibold text-lg px-6 py-3 transition-colors duration-150 hover:bg-[#e2d7c3] hover:text-[#2d2d2d] focus:bg-[#e2d7c3] focus:text-[#2d2d2d]"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            {/* Contact button at the bottom of mobile menu */}
            <Link
              href="/contact"
              className="block mt-auto bg-[#405a4d] hover:bg-[#2e3e2c] text-white font-bold px-7 py-3 rounded-full text-lg transition-colors shadow text-center"
              onClick={() => setMobileOpen(false)}
            >
              Contact
            </Link>
          </nav>
        </div>
      )}
      <style>{`
        @keyframes slide-in {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-slide-in {
          animation: slide-in 0.3s cubic-bezier(0.4,0,0.2,1) both;
        }
      `}</style>
    </header>
  );
}
