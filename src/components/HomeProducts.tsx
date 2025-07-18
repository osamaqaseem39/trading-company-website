'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { productsApi, brandsApi, categoriesApi, Product } from '../services/api';
import ProductCard from './ProductCard';

const HomeProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [brandMap, setBrandMap] = useState<Record<string, string>>({});
  const [categoryMap, setCategoryMap] = useState<Record<string, string>>({});
  const [categoriesData, setCategoriesData] = useState<any[]>([]); // <-- store categories
  const [categoriesList, setCategoriesList] = useState<{ id: string, name: string, count: number }[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [products, brands, categories] = await Promise.all([
          productsApi.getAll(),
          brandsApi.getAll(),
          categoriesApi.getAll(),
        ]);
        setProducts(products.slice(0, 6));
        setBrandMap(Object.fromEntries(brands.map((b: any) => [b._id, b.name])));
        setCategoryMap(Object.fromEntries(categories.map((c: any) => [c._id, c.name])));
        setCategoriesData(categories);
      } catch (e) {
        setProducts([]);
        setBrandMap({});
        setCategoryMap({});
        setCategoriesData([]);
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  // Build categoriesList when products or categoriesData change
  useEffect(() => {
    const allCategory = { id: 'all', name: 'All Products', count: products.length };
    const categoryCounts: Record<string, number> = {};
    products.forEach((p) => {
      if (p.category) {
        categoryCounts[p.category] = (categoryCounts[p.category] || 0) + 1;
      }
    });
    // Only include parent categories (no parent or parent === null/undefined)
    const parentCategories = categoriesData.filter((cat: any) => !cat.parent || cat.parent === null);
    let dynamicCategories = parentCategories.map((cat: any) => ({
      id: cat._id,
      name: cat.name,
      count: categoryCounts[cat._id] || 0,
    }));
    // Sort by product count descending and take top 5
    dynamicCategories = dynamicCategories.sort((a, b) => b.count - a.count).slice(0, 5);
    setCategoriesList([allCategory, ...dynamicCategories]);
  }, [products, categoriesData]);

  // Helper to get all descendant category IDs
  function getAllDescendantCategoryIds(parentId: string, categories: any[]): string[] {
    const directChildren = categories.filter(cat => cat.parent === parentId).map(cat => cat._id);
    let all = [...directChildren];
    for (const childId of directChildren) {
      all = all.concat(getAllDescendantCategoryIds(childId, categories));
    }
    return all;
  }

  // Filter products by category
  const filteredProducts = React.useMemo(() => {
    if (selectedCategory === 'all') return products;
    // Find all subcategory IDs for the selected parent
    const subCategoryIds = categoriesData
      .filter(cat => cat.parent === selectedCategory)
      .map(cat => cat._id);
    return products.filter(product =>
      product.category === selectedCategory ||
      (product.subCategory && subCategoryIds.includes(product.subCategory))
    );
  }, [products, selectedCategory, categoriesData]);

  const categories = [
    { id: 'all', name: 'All Products', count: products.length },
    { id: 'compressor', name: 'Compressors', count: products.filter(p => p.title.toLowerCase().includes('compressor')).length },
    { id: 'condenser', name: 'Condensers', count: products.filter(p => p.title.toLowerCase().includes('condenser')).length },
    { id: 'evaporator', name: 'Evaporators', count: products.filter(p => p.title.toLowerCase().includes('evaporator')).length },
  ];



  return (
    <section className="py-20" style={{ background: '#ede7de' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-bold mb-6 text-[#2d2d2d] text-[60px]">
            Our Featured Products
          </h2>
          <p className="text-xl text-[#2d2d2d] max-w-3xl mx-auto leading-relaxed">
            Explore our curated selection of high-quality food items, beverages, and kitchen essentials from trusted brands.</p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {categoriesList.map((category, idx) => (
            <button
              key={category.id || idx}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300
                ${selectedCategory === category.id
                  ? 'border-2 border-[#2d2d2d] font-bold bg-[#ede7de] text-[#2d2d2d]'
                  : 'bg-[#ede7de] text-[#2d2d2d] border border-[#d6d1c7] hover:bg-[#e0dbd2]'}
              `}
              style={{ minWidth: 120 }}
            >
              {category.name}
              <span className={`ml-2 px-2 py-1 rounded-full text-xs ${selectedCategory === category.id ? 'bg-[#2d2d2d] text-white' : 'bg-[#d6d1c7] text-[#2d2d2d]'}`}>
                {category.count}
              </span>
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-wingzimpex-brand"></div>
              <div className="mt-4 text-center text-gray-600">Loading featured products...</div>
            </div>
          </div>
        ) : filteredProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {filteredProducts.map((product, index) => (
                <div key={product._id} style={{ animationDelay: `${index * 100}ms` }}>
                  <ProductCard 
                    product={product} 
                    variant="homepage" 
                    showDate={false}
                    showGalleryCount={true}
                    showCategoryBadge={true}
                    showHoverEffects={true}
                    brandMap={brandMap}
                    categoryMap={categoryMap}
                  />
                </div>
              ))}
            </div>

            {/* CTA Section */}
            <div className="text-center">
              <Link
                href="/products"
                className="inline-flex items-center bg-[#405a4d] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#2d2d2d] transition-colors"
              >
                View All Products
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-600 mb-6">
                {selectedCategory !== 'all' 
                  ? 'No products match the selected category. Try another category or view all products.'
                  : 'No products are currently available. Please check back later.'
                }
              </p>
              {selectedCategory !== 'all' && (
                <button
                  onClick={() => setSelectedCategory('all')}
                  className="bg-[#405a4d] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#2d2d2d] transition-colors"
                >
                  View All Products
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default HomeProducts; 