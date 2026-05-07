import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/app/components/HeroSection';
import MenuSection from '@/app/components/MenuSection';
import WhyUsSection from '@/app/components/WhyUsSection';
import SocialSection from '@/app/components/SocialSection';

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <MenuSection />
        <WhyUsSection />
        <SocialSection />
      </main>
      <Footer />
    </>
  );
}