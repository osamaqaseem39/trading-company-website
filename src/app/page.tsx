'use client';

import React from 'react';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import HomeProducts from '@/components/HomeProducts';
import WhyChooseUs from '@/components/WhyChooseUs';
import WhoWeAre from '@/components/WhoWeAre';
import Brands from '@/components/Brands';
import ContactSection from '../components/ContactSection';

export default function Home() {
  return (
    <>
      <Hero /> 
      <Services />
      <WhoWeAre />
      <WhyChooseUs />
      <HomeProducts />
      <Brands />
      <ContactSection />
    </>
  );
}
