'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { productsApi, Product, categoriesApi, Category } from '../services/api';

export default function Footer() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoadingProducts(true);
      const data = await productsApi.getAll();
      setProducts(data.slice(0, 6));
      setLoadingProducts(false);
    };
    const fetchCategories = async () => {
      const cats = await categoriesApi.getAll();
      setCategories(cats.filter(cat => !cat.parent).slice(0, 6));
    };
    fetchProducts();
    fetchCategories();
  }, []);

  return (
    <footer className="bg-[#ede7de] text-[#2d2d2d] pt-12">
      <div className="max-w-[1400px] mx-auto py-6 px-4 sm:px-8 flex flex-col">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-x-8 gap-y-8">
          {/* Company Info */}
          <div className="lg:col-span-1 min-w-[180px]">
            <div className="mb-6 flex flex-col items-start">
              <img src="/images/logo.png" alt="Lehmann Ingredients Logo" width={200} height={80} className="h-20 w-auto mb-2" />
              <div className="text-md text-[#2d2d2d] mb-1">Premium food and beverage ingredients supplier. Trusted by industry leaders for quality, innovation, and service.</div>
            </div>
            <div className="flex space-x-4">
              {/* Facebook */}
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-[#2d2d2d] hover:text-white transition-colors" aria-label="Facebook">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0" />
                </svg>
              </a>
              {/* LinkedIn */}
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-[#2d2d2d] hover:text-white transition-colors" aria-label="LinkedIn">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm13.5 10.28h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.89v1.23h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v4.72z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Products (dynamic) */}
          <div className="min-w-[180px]">
            <h3 className="text-lg font-semibold mb-6">Products</h3>
            <ul className="space-y-3">
              {loadingProducts ? (
                <li className="text-[#2d2d2d]">Loading...</li>
              ) : products.length > 0 ? (
                products.map(product => (
                  <li key={product._id}>
                    <Link href={`/products/${productsApi.generateSlug(product.title, product._id)}`} className="text-[#2d2d2d] hover:text-white transition-colors">
                      {product.title}
                    </Link>
                  </li>
                ))
              ) : (
                <li className="text-[#2d2d2d]">No products available</li>
              )}
            </ul>
          </div>

          {/* Categories (dynamic) */}
          <div className="min-w-[180px]">
            <h3 className="text-lg font-semibold mb-6">Categories</h3>
            <ul className="space-y-3">
              {categories.length === 0 ? (
                <li className="text-[#2d2d2d]">Loading...</li>
              ) : (
                categories.map(cat => (
                  <li key={cat._id}>
                    <Link href={`/categories/${cat.name.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')}-${cat._id}`} className="text-[#2d2d2d] hover:text-white transition-colors">
                      {cat.name}
                    </Link>
                  </li>
                ))
              )}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="min-w-[180px]">
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/products" className="text-[#2d2d2d] hover:text-white transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-[#2d2d2d] hover:text-white transition-colors">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/company" className="text-[#2d2d2d] hover:text-white transition-colors">
                  Company
                </Link>
              </li>
              <li>
                <Link href="/updates" className="text-[#2d2d2d] hover:text-white transition-colors">
                  Updates
                </Link>
              </li>
              <li>
                <Link href="/become-a-supplier" className="text-[#2d2d2d] hover:text-white transition-colors">
                  Become A Supplier
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-[#2d2d2d] hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="min-w-[180px]">
            <h3 className="text-lg font-semibold mb-6">Contact Info</h3>
            <div className="text-[#2d2d2d] space-y-1 mb-6">
              <div className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-wingzimpex-brand-light mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div>
                  <p className="text-[#2d2d2d]">28, Mozang Road</p>
                  <p className="text-[#2d2d2d]">Opp. Sir Ganga Ram Hospital</p>
                  <p className="text-[#2d2d2d]">Lahore, Pakistan</p>
                  <p className="text-[#2d2d2d]">P.O Box : 6009 Dubai, United Arab Emirates</p>
                  {/* Google Maps Link */}
                  <a
                    href="https://maps.app.goo.gl/risMNUN4yaSqm4ug8"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-wingzimpex-brand-light hover:underline mt-1 text-sm"
                    aria-label="View on Google Maps"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <circle cx="12" cy="11" r="3" stroke="currentColor" strokeWidth="2" fill="none" />
                    </svg>
                    View on Maps
                  </a>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-wingzimpex-brand-light flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <rect x="7" y="2" width="10" height="20" rx="2" stroke="currentColor" strokeWidth="2" fill="none" />
                  <circle cx="12" cy="18" r="1" fill="currentColor" />
                </svg>
                <span className="text-[#2d2d2d]">
                  <a href="tel:+971505475200">+971 50 547 5200</a><br />
                  <a href="tel:+971545897355">+971 54 589 7355</a>
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-wingzimpex-brand-light flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-[#2d2d2d]">abdul.razzaq@wingzimpex.com
                  <br/> kashif.naseem@wingzimpex.com</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-[#d6d1c4] mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-[#2d2d2d] text-sm">
              © 2025 Lehmann Ingredients. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-[#2d2d2d] hover:text-white text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-[#2d2d2d] hover:text-white text-sm transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 