'use client';
import React, { useEffect, useState } from 'react';
import { brandsApi } from '../services/api';

const Brands = ({ dark = false }: { dark?: boolean }) => {
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
    <section className={dark ? "py-20" : "py-20 bg-gray-50"}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-4 ${dark ? 'text-white' : 'text-gray-900'}`}>Our Brands</h2>
          <p className={`text-base sm:text-lg md:text-xl max-w-3xl mx-auto ${dark ? 'text-white/80' : 'text-gray-600'}`}>Genuine auto AC parts and components from trusted brands for optimal performance and reliability.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center">
          {displayBrands.map((brand, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <img src={brand.image} alt={brand.name} className="h-16 w-auto mb-2" />
              <span className={`text-lg font-semibold ${dark ? 'text-white' : 'text-gray-800'}`}>{brand.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Brands; 