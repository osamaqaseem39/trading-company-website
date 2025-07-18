"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import ProductCard from './ProductCard';
import { Category, Product } from '../services/api';

interface CategoryProductsClientProps {
  parentCategory: Category;
  subcategories: Category[];
  products: Product[];
  brandMap: Record<string, string>;
  categoryMap: Record<string, string>;
}

export default function CategoryProductsClient({
  parentCategory,
  subcategories,
  products,
  brandMap,
  categoryMap,
}: CategoryProductsClientProps) {
  const [selectedSubcat, setSelectedSubcat] = useState<string>('all');
  let filteredProducts = products;
  if (selectedSubcat !== 'all') {
    filteredProducts = products.filter(
      (product: Product) => product.subCategory === selectedSubcat
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-wingzimpex-brand/5">
      {/* Breadcrumb */}
      <nav className="max-w-6xl mx-auto px-4 py-4 text-sm flex items-center gap-2" aria-label="Breadcrumb">
        <Link href="/" className="text-gray-500 hover:text-wingzimpex-brand">Home</Link>
        <span className="text-gray-400">/</span>
        <Link href="/categories" className="text-gray-500 hover:text-wingzimpex-brand">Categories</Link>
        <span className="text-gray-400">/</span>
        <span className="text-gray-900 font-medium">{parentCategory.name}</span>
      </nav>

      {/* Parent Category Card */}
      <section className="relative flex flex-col items-center justify-center bg-white rounded-2xl shadow-xl max-w-3xl mx-auto mt-6 mb-12 p-8 border border-gray-100">
        {parentCategory.image && (
          <div className="flex justify-center mb-6">
            <img
              src={parentCategory.image}
              alt={parentCategory.name}
              width={160}
              height={160}
              className="rounded-xl object-cover shadow-md"
            />
          </div>
        )}
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center text-[#405a4d]">{parentCategory.name}</h1>
        {parentCategory.description && (
          <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed mb-2 text-center">
            {parentCategory.description}
          </p>
        )}
      </section>

      {/* Subcategories */}
      {subcategories.length > 0 && (
        <section className="py-8">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6 text-[#405a4d] text-center">Subcategories</h2>
            <div className="flex flex-wrap justify-center gap-4 mb-10">
              <button
                onClick={() => setSelectedSubcat('all')}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 border-2 ${selectedSubcat === 'all' ? 'border-wingzimpex-brand bg-wingzimpex-brand text-white' : 'border-gray-200 bg-white text-[#405a4d] hover:bg-[#ece7dd]'}`}
              >
                All
              </button>
              {subcategories.map((subcat: Category) => (
                <button
                  key={subcat._id}
                  onClick={() => setSelectedSubcat(subcat._id)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 border-2 ${selectedSubcat === subcat._id ? 'border-wingzimpex-brand bg-wingzimpex-brand text-white' : 'border-gray-200 bg-white text-[#405a4d] hover:bg-[#ece7dd]'}`}
                >
                  {subcat.name}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {subcategories.map((subcat: Category) => (
                <Link
                  key={subcat._id}
                  href={`/subcategories/${(subcat as any).slug || subcat._id}`}
                  className="bg-white rounded-2xl shadow p-6 flex flex-col items-center hover:shadow-lg transition group border border-gray-100 hover:border-wingzimpex-brand"
                  aria-label={`Go to subcategory ${subcat.name}`}
                >
                  {subcat.image ? (
                    <img
                      src={subcat.image}
                      alt={subcat.name}
                      width={100}
                      height={100}
                      className="rounded-full object-cover mb-4 border-4 border-[#ece7dd] group-hover:border-wingzimpex-brand"
                    />
                  ) : (
                    <div className="w-[100px] h-[100px] rounded-full bg-[#ece7dd] flex items-center justify-center mb-4">
                      <span className="text-3xl text-[#405a4d] font-bold">{subcat.name[0]}</span>
                    </div>
                  )}
                  <h3 className="text-lg font-semibold mb-2 text-[#405a4d] text-center">{subcat.name}</h3>
                  {subcat.description && (
                    <p className="text-gray-600 text-center text-sm line-clamp-2">{subcat.description}</p>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Products */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-[#405a4d] text-center">Products</h2>
          {filteredProducts.length === 0 ? (
            <div className="text-center text-gray-500 py-16 flex flex-col items-center">
              <svg width="64" height="64" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="mb-4 text-gray-300">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <div className="text-lg font-semibold mb-2">No products found in this category.</div>
              <div className="text-gray-400">Please check back later or explore other categories.</div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {filteredProducts.map((product: Product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  brandMap={brandMap}
                  categoryMap={categoryMap}
                  showHoverEffects={true}
                  showDate={true}
                  showGalleryCount={true}
                  showCategoryBadge={true}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
} 