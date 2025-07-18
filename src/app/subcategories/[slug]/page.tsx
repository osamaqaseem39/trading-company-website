import React from 'react';
import { subcategoryApi, productsApi, brandsApi, categoriesApi } from '../../../services/api';
import ProductCard from '../../../components/ProductCard';

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  // Fetch all subcategories and find by slug
  const subcategories = await subcategoryApi.getAll();
  const subcategory = subcategories.find((sub: any) => {
    // Support both slug field and generated slug
    const generatedSlug = (sub.name.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').replace(/^-+|-+$/g, '') + '-' + sub._id);
    return sub.slug === slug || generatedSlug === slug;
  });

  if (!subcategory) {
    return (
      <main className="min-h-screen bg-[#ede7de] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Subcategory Not Found</h1>
          <p className="text-lg">The subcategory you are looking for does not exist.</p>
        </div>
      </main>
    );
  }

  // Fetch products for this subcategory
  const products = await productsApi.getBySubcategory(subcategory._id);
  // Fetch brands and categories for mapping
  const [brands, categories] = await Promise.all([
    brandsApi.getAll(),
    categoriesApi.getAll(),
  ]);
  const brandMap = Object.fromEntries(brands.map((b: any) => [b._id, b.name]));
  const categoryMap = Object.fromEntries(categories.map((c: any) => [c._id, c.name]));

  return (
    <main className="min-h-screen bg-[#ede7de] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12 text-center">
          {subcategory.image && (
            <img src={subcategory.image} alt={subcategory.name} className="mx-auto mb-6 w-32 h-32 object-cover rounded-xl shadow" />
          )}
          <h1 className="text-4xl font-bold text-[#405a4d] mb-2">{subcategory.name}</h1>
          {subcategory.description && (
            <p className="text-lg text-gray-700 mb-2">{subcategory.description}</p>
          )}
        </div>
        <h2 className="text-2xl font-bold mb-8 text-[#405a4d] text-center">Products</h2>
        {products.length === 0 ? (
          <div className="text-center text-gray-500 py-16 flex flex-col items-center">
            <svg width="64" height="64" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="mb-4 text-gray-300">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <div className="text-lg font-semibold mb-2">No products found in this subcategory.</div>
            <div className="text-gray-400">Please check back later or explore other subcategories.</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {products.map((product: any) => (
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
    </main>
  );
} 