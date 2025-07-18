"use client";

import React, { useEffect, useState } from "react";
import { Category as BaseCategory, Product, productsApi, categoriesApi } from "../../services/api";
import ContactSection from "../../components/ContactSection";
import CategoryProductList from "../../components/CategoryProductList";

// Remove the custom Category type and use BaseCategory only
// Remove the recursive renderCategoryTree and just render a flat list

const CategoriesPage = () => {
  const [categories, setCategories] = useState<BaseCategory[]>([]);
  const [nestedCategories, setNestedCategories] = useState<any[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const [nestedCats, prods] = await Promise.all([
          categoriesApi.getNested(),
          productsApi.getAll(),
        ]);
        setNestedCategories(nestedCats);
        setProducts(prods);
        setError(null);
      } catch (err) {
        setError("Failed to load categories or products.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Helper to generate slug for category links
  function generateSlug(name: string, id: string) {
    return (
      name
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-+|-+$/g, '') + '-' + id
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-wingzimpex-brand/5">
      <section className="relative bg-[#2d2d2d] text-white py-20 m-0 overflow-visible" style={{ zIndex: 10 }}>
        {/* Overlay for contrast */}
        <div className="relative w-full px-4 sm:px-6 lg:px-8 text-center" style={{ zIndex: 10 }}>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
            Our Categories
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Explore our wide range of categories and subcategories.
          </p>
        </div>
      </section>

      {/* Modern Category List UI */}
      <section className="w-full bg-[#ece7dd] py-24">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
          <h1 className="text-5xl font-bold text-center text-[#2d2d2d] mb-12">
            {nestedCategories.length > 0 ? nestedCategories[0].name : 'Categories'}
          </h1>
          <div className="border-t border-b border-[#d6d1c4]">
            {nestedCategories
              .sort((a, b) => (b.children?.length || 0) - (a.children?.length || 0))
              .flatMap(parent =>
                (!parent.children || parent.children.length === 0)
                  ? []
                  : parent.children.map((child: BaseCategory) => (
                      <a
                        key={child._id}
                        href={`/categories/${generateSlug(child.name, child._id)}`}
                        className="flex items-center w-full px-8 py-8 hover:bg-[#e3ded6] transition group cursor-pointer"
                        style={{ textDecoration: 'none' }}
                      >
                        <div className="w-16 h-16 rounded-full bg-[#d6d1c4] flex items-center justify-center mr-8 overflow-hidden">
                          {child.image ? (
                            <img src={child.image} alt={child.name} className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-2xl text-[#2d2d2d] font-bold">{child.name[0]}</span>
                          )}
                        </div>
                        <span className="flex-1 text-2xl text-[#2d2d2d] font-semibold">{child.name}</span>
                        <span className="w-10 h-10 flex items-center justify-center rounded-full bg-white group-hover:bg-[#2d2d2d] transition">
                          <svg className="w-6 h-6 text-[#2d2d2d] group-hover:text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                      </a>
                    ))
              )}
          </div>
        </div>
      </section>

      {/* Category Product List */}
      {!loading && !error && categories.length > 0 && (
        <CategoryProductList products={products} categories={categories} />
      )}

      <ContactSection />
    </main>
  );
};

export default CategoriesPage; 