'use client';

import React, { useState, useEffect } from 'react';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on scroll
  useEffect(() => {
    if (!menuOpen) return;
    const handleScroll = () => setMenuOpen(false);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [menuOpen]);

  const navLinks = [
    { label: 'Menu', href: '#menu' },
    { label: 'Why Us', href: '#why-us' },
    { label: 'Find Us', href: '#social' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-background/90 backdrop-blur-xl border-b border-border shadow-lg shadow-black/20'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="flex items-center gap-3 group"
            aria-label="B For Burger - Home"
          >
            <AppLogo
              src="/assets/images/453443215_1522892728317109_6297073676447441462_n-1778165106505.jpg"
              size={40}
              className="rounded-lg overflow-hidden transition-transform duration-300 group-hover:scale-105"
            />
            <span className="font-display text-base font-800 tracking-tight text-foreground hidden sm:block">
              B <span className="text-primary">For</span> Burger
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            {navLinks?.map((link) => (
              <a
                key={link?.href}
                href={link?.href}
                className="hover:text-foreground transition-colors duration-200 relative group"
              >
                {link?.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-3">
            <a
              href="#social"
              className="hidden md:flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-primary/90 transition-all duration-300 btn-glow"
            >
              Visit Us
              <Icon name="ArrowRightIcon" size={16} />
            </a>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-full bg-muted text-foreground hover:bg-border transition-colors"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              <Icon name={menuOpen ? 'XMarkIcon' : 'Bars3Icon'} size={20} />
            </button>
          </div>
        </div>
      </header>
      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
          menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        <div
          className="absolute inset-0 bg-background/95 backdrop-blur-xl"
          onClick={() => setMenuOpen(false)}
        />
        <div className="relative z-10 flex flex-col items-center justify-center h-full gap-8">
          {navLinks?.map((link, i) => (
            <a
              key={link?.href}
              href={link?.href}
              onClick={() => setMenuOpen(false)}
              className="text-3xl font-bold text-foreground hover:text-primary transition-colors"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              {link?.label}
            </a>
          ))}
          <a
            href="#social"
            onClick={() => setMenuOpen(false)}
            className="mt-4 flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full text-lg font-semibold btn-glow"
          >
            Visit Us
            <Icon name="ArrowRightIcon" size={18} />
          </a>
        </div>
      </div>
    </>
  );
}