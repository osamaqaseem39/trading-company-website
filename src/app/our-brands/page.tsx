"use client";

import React, { useEffect, useState } from 'react';
import { brandsApi, productsApi, Brand, Product } from '../../services/api';
import ContactSection from '../../components/ContactSection';
import CategoryProductList from '../../components/CategoryProductList';

const OurBrandsPage = () => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [brandProducts, setBrandProducts] = useState<Record<string, Product[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const allBrands = await brandsApi.getAll();
        setBrands(allBrands);
        // Fetch products for each brand
        const productsByBrand: Record<string, Product[]> = {};
        await Promise.all(
          allBrands.map(async (brand) => {
            const products = await productsApi.getByBrand(brand._id);
            productsByBrand[brand._id] = products;
          })
        );
        setBrandProducts(productsByBrand);
        setError(null);
      } catch (err) {
        setError('Failed to load brands or products.');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <main className="max-w-7xl mx-auto py-12 px-4">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Trusted Brands</h1>
        <h2 className="text-xl text-wingzimpex-brand font-semibold mb-4">Premium Brands for Quality & Reliability</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          In pursuit of perfection and cohesion in green is always our spiritual motto. We achieve our goals by using highly dependable imported brands of automobile air-conditioning systems & parts such as DENSO, COOL GEAR (Denso), SANDEN, BEHR, and more. These products are excellent in quality and competitive in price.
        </p>
      </div>

      {/* Brands Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {brands.map((brand) => (
          <div key={brand._id} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
            <div className="text-center mb-6">
              <div className="w-32 h-32 mx-auto mb-4 bg-gray-100 rounded-lg flex items-center justify-center">
                <img
                  src={brand.image}
                  alt={`${brand.name} logo`}
                  width={120}
                  height={120}
                  className="object-contain"
                />
              </div>
              <h3 className="text-2xl font-bold text-wingzimpex-brand mb-2">{brand.name}</h3>
              <p className="text-gray-600">{brand.description}</p>
            </div>
            {/* Show products for this brand */}
            {brandProducts[brand._id] && brandProducts[brand._id].length > 0 && (
              <div className="mt-4">
                <CategoryProductList products={brandProducts[brand._id]} categories={[]} />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Why Choose Our Brands */}
      <section className="bg-gray-50 rounded-2xl p-8 mb-16">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Why Choose Our Brands?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We carefully select our brand partners based on quality, reliability, and innovation to ensure the best service for our customers.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-wingzimpex-brand/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-wingzimpex-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Quality Assurance</h3>
            <p className="text-gray-600">All brands meet our strict quality standards and come with comprehensive warranties.</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-wingzimpex-brand/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-wingzimpex-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Innovation</h3>
            <p className="text-gray-600">Cutting-edge technology and advanced features for optimal performance.</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-wingzimpex-brand/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-wingzimpex-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Value for Money</h3>
            <p className="text-gray-600">Premium quality at competitive prices with excellent long-term value.</p>
          </div>
        </div>
      </section>

      <ContactSection />
    </main>
  );
};

export default OurBrandsPage; 