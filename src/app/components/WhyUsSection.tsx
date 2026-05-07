'use client';

import React, { useEffect, useRef, useState } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface StatItem {
  value: string;
  label: string;
  icon: string;
}

const stats: StatItem[] = [
{ value: 'Whole Wheat', label: 'Buns — healthier by choice', icon: 'HeartIcon' },
{ value: '15% Off', label: 'On all combo meals', icon: 'TagIcon' },
{ value: 'Bold Flavours', label: 'In every single bite', icon: 'FireIcon' },
{ value: 'For Everyone', label: 'Veg, non-veg & plant-based', icon: 'SparklesIcon' }];


interface PromiseItem {
  icon: string;
  title: string;
  body: string;
}

const promises: PromiseItem[] = [
{
  icon: 'TrophyIcon',
  title: 'Best Burgers in Town',
  body: 'We put the boldest flavours, freshest ingredients and most satisfying portions into every burger we make. No compromises.'
},
{
  icon: 'HeartIcon',
  title: 'Tasty & Filling',
  body: 'Our whole wheat double patty burgers are built to actually fill you up — real food, real portions, real satisfaction.'
},
{
  icon: 'CurrencyRupeeIcon',
  title: 'Great Value Every Visit',
  body: 'Premium taste without a premium price. Our combos save you up to 15% — because great food should be accessible to all.'
}];


function StatCard({ stat, index, visible }: {stat: StatItem;index: number;visible: boolean;}) {
  return (
    <div
      className="flex flex-col items-center md:items-start gap-2 p-6 rounded-2xl border border-border bg-card/50 backdrop-blur-sm"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.6s ease ${index * 100}ms, transform 0.6s ease ${index * 100}ms`
      }}>
      
      <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center text-primary">
        <Icon name={stat.icon as 'HeartIcon'} size={20} />
      </div>
      <p className="text-xl font-bold text-foreground">{stat.value}</p>
      <p className="text-xs text-muted-foreground text-center md:text-left">{stat.label}</p>
    </div>);

}

export default function WhyUsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {if (entry.isIntersecting) setVisible(true);},
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="why-us" ref={sectionRef} className="py-16 px-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 blob-red opacity-8 rounded-full blur-3xl animate-blob-float" />
        <div className="absolute top-20 right-0 w-64 h-64 blob-crimson opacity-6 rounded-full blur-3xl animate-blob-float-2" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <div
          className="text-center space-y-4 mb-14"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease'
          }}>
          
          <p className="section-label">Why B For Burger</p>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
            Tasty. Filling.{' '}
            <span className="shimmer-text">Great Value.</span>
          </h2>
        </div>

        {/* Main asymmetric layout */}
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          {/* Left: Image + overlay stats */}
          <div
            className="lg:col-span-5 relative"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateX(0)' : 'translateX(-40px)',
              transition: 'opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s'
            }}>
            
            <div className="relative rounded-3xl overflow-hidden aspect-[4/5] shadow-2xl">
              <AppImage
                src="https://images.unsplash.com/photo-1700835880369-467ebff9d324"
                alt="Stacked B For Burger gourmet burger with melted cheese and fresh ingredients, dramatic dark studio lighting with deep shadows"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 42vw" />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Overlaid badge */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-black/70 backdrop-blur-xl border border-white/10 p-4 rounded-2xl flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-white flex-shrink-0 animate-pulse-red">
                    <Icon name="TrophyIcon" size={22} variant="solid" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm">Best Burgers in Town</p>
                    <p className="text-white/60 text-xs">Whole wheat • Bold flavours • Great value</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating accent card */}
            <div
              className="absolute -top-6 -right-6 bg-primary text-primary-foreground p-5 rounded-2xl shadow-2xl hidden lg:block"
              style={{ rotate: '3deg' }}>
              
              <p className="text-3xl font-black leading-none">15%</p>
              <p className="text-xs font-semibold opacity-80 mt-1">Combo Savings</p>
            </div>
          </div>

          {/* Right: Promises + stats */}
          <div
            className="lg:col-span-7 space-y-8 flex flex-col justify-between"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateX(0)' : 'translateX(40px)',
              transition: 'opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s'
            }}>
            
            {/* Promise cards */}
            <div className="space-y-5">
              {promises.map((p, i) =>
              <div
                key={p.title}
                className="flex gap-5 p-5 rounded-2xl border border-border bg-card/40 hover:border-primary/30 hover:bg-card/70 transition-all duration-300 group"
                style={{ transitionDelay: `${i * 80}ms` }}>
                
                  <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center text-primary flex-shrink-0 group-hover:bg-primary/25 transition-colors">
                    <Icon name={p.icon as 'TrophyIcon'} size={22} />
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <h3 className="font-bold text-foreground text-base">{p.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{p.body}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, i) =>
              <StatCard key={stat.value} stat={stat} index={i} visible={visible} />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>);

}