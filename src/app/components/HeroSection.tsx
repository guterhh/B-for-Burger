'use client';

import React, { useEffect, useRef, useState } from 'react';
import AppImage from '@/components/ui/AppImage';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';

export default function HeroSection() {
  const [curtainDone, setCurtainDone] = useState(false);
  const [phase, setPhase] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  // Cinematic opening sequence
  useEffect(() => {
    // Phase 1: logo reveal on black screen (0ms)
    const t1 = setTimeout(() => setPhase(1), 300);
    // Phase 2: logo pulses (800ms)
    const t2 = setTimeout(() => setPhase(2), 1200);
    // Phase 3: curtain fades out (1800ms)
    const t3 = setTimeout(() => {
      setCurtainDone(true);
      setPhase(3);
    }, 2000);
    // Phase 4: hero content animates in (2300ms)
    const t4 = setTimeout(() => setPhase(4), 2300);

    return () => {clearTimeout(t1);clearTimeout(t2);clearTimeout(t3);clearTimeout(t4);};
  }, []);

  // Parallax on scroll
  useEffect(() => {
    const hero = heroRef?.current;
    if (!hero) return;
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const blobs = hero?.querySelectorAll<HTMLElement>('[data-parallax]');
      blobs?.forEach((el) => {
        const speed = parseFloat(el?.dataset?.parallax || '0.3');
        el.style.transform = `translateY(${scrollY * speed}px)`;
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Cinematic Opening Curtain */}
      <div
        className={`curtain-overlay ${curtainDone ? 'hidden-curtain' : ''}`}
        aria-hidden="true">
        
        <div className="flex flex-col items-center gap-6">
          {/* Logo reveal */}
          <div
            className={`transition-all duration-700 ${
            phase >= 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-50'} ${
            phase >= 2 ? 'animate-pulse-red' : ''}`}
            style={{ transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)' }}>
            
            <AppLogo
              src="/assets/images/453443215_1522892728317109_6297073676447441462_n-1778165106505.jpg"
              size={100}
              className="rounded-2xl overflow-hidden shadow-2xl" />
            
          </div>
          <div
            className={`transition-all duration-500 delay-300 ${
            phase >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`
            }>
            
            <p className="text-primary font-bold tracking-[0.4em] text-xs uppercase">
              B For Burger
            </p>
          </div>
          {/* Loading bar */}
          <div className="w-32 h-0.5 bg-border rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-1500"
              style={{
                width: phase >= 2 ? '100%' : phase >= 1 ? '40%' : '0%',
                transitionDuration: '1500ms'
              }} />
            
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex flex-col justify-end overflow-hidden grain"
        aria-label="Hero">
        
        {/* Background Food Image */}
        <div className="absolute inset-0 z-0">
          <AppImage
            src="https://images.unsplash.com/photo-1651307433310-053ca6fadfdd"
            alt="Juicy gourmet burger with melted cheese and fresh toppings on dark background"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw" />
          
          {/* Cinematic dark scrim — strong at bottom for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/55 to-black/30" />
          {/* Side vignette */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/20" />
        </div>

        {/* Animated Blobs */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden" data-parallax="0.2">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 md:w-96 md:h-96 blob-red opacity-20 animate-blob-float rounded-full" />
          <div className="absolute top-1/3 right-1/4 w-48 h-48 md:w-72 md:h-72 blob-crimson opacity-15 animate-blob-float-2 rounded-full" />
          <div className="absolute bottom-1/3 left-1/3 w-56 h-56 md:w-80 md:h-80 blob-amber opacity-10 animate-blob-float-3 rounded-full" />
        </div>

        {/* Smoke puffs */}
        <div className="absolute bottom-1/2 left-1/2 pointer-events-none z-0" aria-hidden="true">
          <div className="smoke-puff w-8 h-8 -ml-4" style={{ animationDelay: '0s' }} />
          <div className="smoke-puff w-6 h-6 ml-4 mt-2" style={{ animationDelay: '1s' }} />
          <div className="smoke-puff w-10 h-10 -ml-8 mt-4" style={{ animationDelay: '2s' }} />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-16 pt-32 w-full">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-end">
            {/* Left: Main copy */}
            <div className="lg:col-span-7 space-y-6">
              {/* Eyebrow */}
              <div
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm transition-all duration-700 ${
                phase >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`
                }>
                
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-xs font-semibold tracking-widest uppercase text-accent">
                  Now Serving — Whole Wheat Burgers & More
                </span>
              </div>

              {/* Main Headline */}
              <h1
                className={`hero-title text-foreground transition-all duration-800 ${
                phase >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`
                }
                style={{ transitionDelay: '100ms' }}>
                
                THE BEST<br />
                BURGER<br />
                <span className="hero-title-outline">IN TOWN</span>
              </h1>

              {/* Sub */}
              <p
                className={`text-lg md:text-xl text-foreground/70 max-w-md leading-relaxed font-medium transition-all duration-700 ${
                phase >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`
                }
                style={{ transitionDelay: '200ms' }}>
                
                Tasty. Filling. Great value. Crafted with whole wheat buns, bold spices, and ingredients you can feel good about.
              </p>

              {/* CTAs */}
              <div
                className={`flex flex-col sm:flex-row gap-4 pt-2 transition-all duration-700 ${
                phase >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`
                }
                style={{ transitionDelay: '300ms' }}>
                
                <a
                  href="#menu"
                  className="group flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full font-semibold text-sm hover:bg-primary/90 transition-all duration-300 btn-glow">
                  
                  Explore Menu
                  <Icon name="ArrowDownIcon" size={16} className="group-hover:translate-y-1 transition-transform" />
                </a>
                <a
                  href="#social"
                  className="flex items-center justify-center gap-2 border border-foreground/20 text-foreground px-8 py-4 rounded-full font-semibold text-sm hover:border-primary/50 hover:text-primary transition-all duration-300 backdrop-blur-sm bg-black/20">
                  
                  Visit Us
                  <Icon name="MapPinIcon" size={16} />
                </a>
              </div>
            </div>

            {/* Right: Floating stats card */}
            <div
              className={`lg:col-span-5 flex flex-row lg:flex-col gap-4 justify-start lg:justify-end items-start lg:items-end transition-all duration-800 ${
              phase >= 4 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`
              }
              style={{ transitionDelay: '400ms' }}>
              
              {/* Rating badge */}
              <div className="bg-card/80 backdrop-blur-xl border border-border/50 p-4 rounded-2xl shadow-2xl flex items-center gap-4 min-w-0">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary flex-shrink-0">
                  <Icon name="StarIcon" size={24} variant="solid" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Top Rated</p>
                  <p className="text-sm font-bold text-foreground">Best Burgers in Town</p>
                </div>
              </div>

              {/* Combo badge */}
              <div className="bg-primary/90 backdrop-blur-xl border border-primary/30 p-4 rounded-2xl shadow-2xl flex items-center gap-4 min-w-0">
                <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center text-white flex-shrink-0">
                  <Icon name="TagIcon" size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-white/70">Combos</p>
                  <p className="text-sm font-bold text-white">Up to 15% Off</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className={`absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 transition-all duration-700 ${
          phase >= 4 ? 'opacity-60' : 'opacity-0'}`
          }
          style={{ transitionDelay: '600ms' }}>
          
          <span className="text-xs text-foreground/50 tracking-widest uppercase font-medium">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-foreground/30 to-transparent animate-pulse" />
        </div>
      </section>
    </>);

}