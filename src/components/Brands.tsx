'use client';
import React, { useEffect, useState, useRef } from 'react';
import { brandsApi } from '../services/api';

const Brands = ({ dark = false }: { dark?: boolean }) => {
  const [brands, setBrands] = useState<any[]>([]);
  const marqueeRef = useRef<HTMLDivElement>(null);
  // Touch drag logic
  let startX = 0;
  let scrollLeft = 0;
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!marqueeRef.current) return;
    marqueeRef.current.style.scrollBehavior = 'auto';
    startX = e.touches[0].pageX - marqueeRef.current.offsetLeft;
    scrollLeft = marqueeRef.current.scrollLeft;
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!marqueeRef.current) return;
    const x = e.touches[0].pageX - marqueeRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // scroll-fast
    marqueeRef.current.scrollLeft = scrollLeft - walk;
  };

  useEffect(() => {
    async function fetchBrands() {
      try {
        const brands = await brandsApi.getAll();
        setBrands(brands);
      } catch {
        setBrands([]);
      }
    }
    fetchBrands();
  }, []);

  // Fallback static brands if none found
  const fallbackBrands = [
    { name: 'DENSO', image: '/images/brands/denso.png' },
    { name: 'COOL GEAR', image: '/images/brands/coolgear.png' },
    { name: 'SANDEN', image: '/images/brands/sanden.png' },
  ];

  const displayBrands = brands.length > 0 ? brands : fallbackBrands;

  return (
    <section className={dark ? "py-20" : "py-20 bg-gray-50"}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className={`font-bold mb-4 text-2xl sm:text-4xl md:text-5xl ${dark ? 'text-white' : 'text-[#001a33]'}`}>Our Brands</h2>
          <p className={`text-base sm:text-lg md:text-xl max-w-3xl mx-auto ${dark ? 'text-white/80' : 'text-[#001a33]'}`}>Genuine auto AC parts and components from trusted brands for optimal performance and reliability.</p>
        </div>
        {/* Marquee Carousel */}
        <div
          className="overflow-x-hidden w-full py-4 group"
          ref={marqueeRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
        >
          <div className="flex items-center gap-12 animate-marquee whitespace-nowrap group-hover:[animation-play-state:paused]" style={{ animation: 'marquee 30s linear infinite' }}>
            {displayBrands.concat(displayBrands).map((brand, idx) => (
              <div key={idx} className="flex flex-col items-center min-w-[120px]">
                <img src={brand.image} alt={brand.name} className="h-16 w-auto mb-2" />
                <span className={`text-lg font-semibold ${dark ? 'text-white' : 'text-gray-800'}`}>{brand.name}</span>
              </div>
            ))}
          </div>
        </div>
        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            will-change: transform;
            display: flex;
            min-width: 200%;
          }
        `}</style>
      </div>
    </section>
  );
};

export default Brands; 