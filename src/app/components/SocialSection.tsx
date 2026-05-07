'use client';

import React, { useEffect, useRef, useState } from 'react';
import AppImage from '@/components/ui/AppImage';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';

interface InstagramPost {
  id: number;
  image: string;
  alt: string;
  caption: string;
}

const instagramPosts: InstagramPost[] = [
{
  id: 1,
  image: "https://images.unsplash.com/photo-1654682094658-f2b13ee0bfd8",
  alt: 'Juicy double patty burger with melted cheddar cheese and fresh lettuce on dark background, moody food photography',
  caption: 'The double patty hits different 🔥'
},
{
  id: 2,
  image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5",
  alt: 'Stacked gourmet burger with golden bun, tomato and onion rings, dramatic side lighting on dark table',
  caption: 'Whole wheat. Whole flavour. 🌾'
},
{
  id: 3,
  image: "https://images.unsplash.com/photo-1541897485083-d5c11bc33020",
  alt: 'Close up of burger cross section showing layers of patty cheese and toppings, professional food photography',
  caption: 'Every layer tells a story 📖'
},
{
  id: 4,
  image: "https://images.unsplash.com/photo-1638324396220-432156cd9303",
  alt: 'Chicken hot dog in soft bun with mustard and colorful toppings on wooden board, casual food photography',
  caption: 'Hot dog season, always 🌭'
},
{
  id: 5,
  image: "https://images.unsplash.com/photo-1727339373630-20e3623ffbeb",
  alt: 'Thick chocolate milkshake in tall glass with whipped cream and chocolate sauce drizzle, indulgent dessert photography',
  caption: 'Thickshakes that hit the spot 🍫'
},
{
  id: 6,
  image: "https://images.unsplash.com/photo-1623659945109-a0ab8cee7762",
  alt: 'Rich fudgy butter brownie with crackly top on dark surface, moody close-up dessert photography',
  caption: 'Butter Brownie. Need we say more? 🍫'
}];


function PostCard({ post, index, visible }: {post: InstagramPost;index: number;visible: boolean;}) {
  return (
    <div
      className="group relative aspect-square rounded-2xl overflow-hidden bg-muted cursor-pointer"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'scale(1)' : 'scale(0.9)',
        transition: `opacity 0.6s ease ${index * 80}ms, transform 0.6s cubic-bezier(0.34,1.56,0.64,1) ${index * 80}ms`
      }}>
      
      <AppImage
        src={post.image}
        alt={post.alt}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110"
        sizes="(max-width: 768px) 50vw, 33vw" />
      
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3 p-4">
        <Icon name="HeartIcon" size={28} className="text-white" variant="solid" />
        <p className="text-white text-xs font-medium text-center leading-snug">{post.caption}</p>
      </div>
      {/* Instagram gradient overlay at bottom */}
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>);

}

export default function SocialSection() {
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
    <section id="social" ref={sectionRef} className="py-16 px-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/3 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <div
          className="text-center space-y-5 mb-12"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease'
          }}>
          
          <p className="section-label">Follow Along</p>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
            We&apos;re on{' '}
            <span className="text-primary">Instagram</span>
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto text-base leading-relaxed">
            Follow us for daily drops, specials, and behind-the-scenes burger action.
          </p>

          {/* Instagram handle */}
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-border bg-card/50 backdrop-blur-sm hover:border-primary/40 transition-colors group cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600 flex items-center justify-center">
              <Icon name="CameraIcon" size={14} className="text-white" />
            </div>
            <span className="font-semibold text-foreground text-sm group-hover:text-primary transition-colors">
              @bforburger
            </span>
            <Icon name="ArrowTopRightOnSquareIcon" size={14} className="text-muted-foreground group-hover:text-primary transition-colors" />
          </div>
        </div>

        {/* Photo grid — 6 posts, 3 cols */}
        {/* BENTO AUDIT: 6 cards, grid-cols-3, 2 rows of 3 — all uniform */}
        {/* Row 1: [col-1: Post1] [col-2: Post2] [col-3: Post3] */}
        {/* Row 2: [col-1: Post4] [col-2: Post5] [col-3: Post6] */}
        {/* Placed 6/6 ✓ */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mb-14">
          {instagramPosts.map((post, i) =>
          <PostCard key={post.id} post={post} index={i} visible={visible} />
          )}
        </div>

        {/* Visit Us CTA — the main conversion section */}
        <div
          className="relative rounded-3xl overflow-hidden"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(32px)',
            transition: 'opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s'
          }}>
          
          {/* Background image */}
          <div className="absolute inset-0">
            <AppImage
              src="https://images.unsplash.com/photo-1625693680219-f9f68627091e"
              alt="Vibrant burger cafe interior with warm moody lighting, dark walls and atmospheric dining ambiance"
              fill
              className="object-cover"
              sizes="100vw" />
            
            {/* Strong dark scrim for white text legibility */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/50" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
          </div>

          {/* Content */}
          <div className="relative z-10 p-10 md:p-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="space-y-4 max-w-xl">
              {/* Logo in CTA */}
              <div className="flex items-center gap-3">
                <AppLogo
                  src="/assets/images/453443215_1522892728317109_6297073676447441462_n-1778165106505.jpg"
                  size={48}
                  className="rounded-xl overflow-hidden" />
                
                <span className="text-white font-bold text-lg">B For Burger</span>
              </div>
              <h3 className="text-3xl md:text-5xl font-bold text-white leading-tight tracking-tight">
                Come Visit Us.<br />
                <span className="text-accent">Taste the Difference.</span>
              </h3>
              <p className="text-white/70 text-base leading-relaxed">
                Walk in, dig in. The best burgers in town are waiting for you — tasty, filling and worth every rupee.
              </p>

              {/* Address placeholder */}
              <div className="flex items-start gap-3 pt-2">
                <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary flex-shrink-0 mt-0.5">
                  <Icon name="MapPinIcon" size={16} />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">Find Us</p>
                  <p className="text-white/60 text-sm">Your address here — update in code</p>
                </div>
              </div>

              {/* Hours placeholder */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary flex-shrink-0 mt-0.5">
                  <Icon name="ClockIcon" size={16} />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">Opening Hours</p>
                  <p className="text-white/60 text-sm">Mon–Sun: 11:00 AM – 11:00 PM</p>
                </div>
              </div>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col gap-4 flex-shrink-0">
              <a
                href="#"
                className="flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full font-bold text-sm hover:bg-primary/90 transition-all duration-300 btn-glow min-w-[180px] text-center">
                
                <Icon name="MapPinIcon" size={18} />
                Visit Us
              </a>
              <a
                href="https://instagram.com/bforburger"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 border border-white/20 text-white px-8 py-4 rounded-full font-semibold text-sm hover:border-white/50 transition-all duration-300 backdrop-blur-sm bg-white/5 min-w-[180px] text-center">
                
                <Icon name="CameraIcon" size={16} />
                Follow on Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>);

}