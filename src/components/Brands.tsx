'use client';
import React, { useEffect, useState } from 'react';
import { brandsApi } from '../services/api';

const Brands = () => {
  const [brands, setBrands] = useState<any[]>([]);

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
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-bold text-center mb-4" style={{ fontSize: '60px', color: '#2d2d2d' }}>Our Brands</h2>
        <p className="text-xl max-w-3xl mx-auto leading-relaxed text-wingzimpex-brand text-center mb-10">
          We partner with premium brands known for their quality, reliability, and innovation—ensuring you always receive the best products and service.
        </p>
        <div className="flex flex-wrap justify-center items-end gap-x-16 gap-y-10 md:gap-x-20 md:gap-y-12 overflow-x-auto">
          {displayBrands.map((brand, idx) => (
            <div key={brand._id || brand.name || idx} className="flex flex-col items-center min-w-[120px]">
              <img
                src={brand.image || brand.src}
                alt={brand.name}
                width={120}
                height={120}
                className="h-16 w-auto object-contain mb-4 drop-shadow-md"
                style={{ height: '4rem' }}
                loading="lazy"
              />
              <span className="text-base font-medium text-gray-700 mt-2 text-center">{brand.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Brands; 