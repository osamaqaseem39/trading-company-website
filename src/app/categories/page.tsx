"use client";

import React, { useEffect, useState } from "react";
import { Category as BaseCategory, categoriesApi, productsApi, subcategoryApi } from "../../services/api";
import ContactSection from "../../components/ContactSection";
import CategoryProductList from "../../components/CategoryProductList";
import axios from "axios";
import ProductCard from '../../components/ProductCard';
import Link from 'next/link';

const API_BASE_URL = 'https://adminserver.wingzimpex.com/api';

const CategoriesPage = () => {
  const [parentCategories, setParentCategories] = useState<any[]>([]);
  const [subcategories, setSubcategories] = useState<any[]>([]);
  const [categoryProducts, setCategoryProducts] = useState<Record<string, any[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const [allCategories, allSubcategories] = await Promise.all([
          categoriesApi.getAll(),
          subcategoryApi.getAll(),
        ]);
        // Parent categories: no parent field or parent === null
        const parents = allCategories.filter((cat: any) => !cat.parent || cat.parent === null);
        setParentCategories(parents);
        setSubcategories(allSubcategories);
        // Fetch products for each subcategory
        const productsByCategory: Record<string, any[]> = {};
        await Promise.all(
          allSubcategories.map(async (subcat: any) => {
            const products = await productsApi.getByCategory(subcat._id);
            productsByCategory[subcat._id] = products;
          })
        );
        setCategoryProducts(productsByCategory);
        setError(null);
      } catch (err) {
        setError("Failed to load categories or products.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  function generateSlug(name: string, id: string) {
    return (
      name
        .toLowerCase()
        .trim()
        .replace(/[^ 0-9\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-+|-+$/g, '') + '-' + id
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-wingzimpex-brand/5">
      <section className="relative bg-[#2d2d2d] text-white py-20 m-0 overflow-visible rounded-b-2xl" style={{ zIndex: 10 }}>
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
          <div className="border-t border-b border-[#d6d1c4]">
            {parentCategories
              .slice() // copy to avoid mutating state
              .sort((a, b) => {
                const aCount = subcategories.filter((sub: any) => sub.parent && sub.parent._id === a._id).length;
                const bCount = subcategories.filter((sub: any) => sub.parent && sub.parent._id === b._id).length;
                return bCount - aCount;
              })
              .map(parent => {
                const children = subcategories.filter((sub: any) => sub.parent && sub.parent._id === parent._id);
                return (
                <div key={parent._id} className="mb-16">
                  <h1 className="text-5xl font-bold text-center text-[#2d2d2d] mb-12">{parent.name}</h1>
                  {children.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                      {children.map((child: BaseCategory) => (
                        <a
                          key={child._id}
                          href={`/subcategories/${generateSlug(child.name, child._id)}`}
                          className="flex items-center w-full px-8 py-8 hover:bg-[#e3ded6] transition group cursor-pointer rounded-xl bg-white shadow"
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
                      ))}
                    </div>
                  ) : (
                    <div className="text-gray-500 italic">No subcategories.</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <ContactSection />
    </main>
  );
};

export default CategoriesPage; 