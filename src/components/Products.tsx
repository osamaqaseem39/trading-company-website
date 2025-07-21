'use client';

import React, { useEffect, useState } from 'react';
import { productsApi, brandsApi, categoriesApi, Product, Brand, Category } from '../services/api';
import ProductCard from './ProductCard';

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [brandMap, setBrandMap] = useState<Record<string, string>>({});
  const [categoryMap, setCategoryMap] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productsApi.getAll();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    const fetchBrandsAndCategories = async () => {
      try {
        const [brands, categories] = await Promise.all([
          brandsApi.getAll(),
          categoriesApi.getAll(),
        ]);
        console.log('Brands:', brands);
        console.log('Categories:', categories);
        setBrandMap(Object.fromEntries(brands.map(b => [b._id, b.name])));
        setCategoryMap(Object.fromEntries(categories.map(c => [c._id, c.name])));
      } catch (error) {
        console.error('Error fetching brands or categories:', error);
      }
    };

    fetchProducts();
    fetchBrandsAndCategories();
  }, []);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Quality Products
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Genuine auto AC parts and components from trusted brands for optimal performance and reliability.
          </p>
        </div>
        
        {loading || Object.keys(brandMap).length === 0 || Object.keys(categoryMap).length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard 
                key={product._id}
                product={product} 
                variant="simple" 
                showDate={true}
                showGalleryCount={false}
                showCategoryBadge={false}
                showHoverEffects={false}
                brandMap={brandMap}
                categoryMap={categoryMap}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg mb-4">No products available at the moment.</div>
            <p className="text-gray-400">Please check back later for our latest products.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Products; 