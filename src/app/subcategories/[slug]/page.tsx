import React from 'react';
import { categoriesApi, productsApi, brandsApi, Category, Product, Brand } from '../../../services/api';
import Link from 'next/link';
import ProductCard from '../../../components/ProductCard';

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

export async function generateStaticParams() {
  const categories: Category[] = await categoriesApi.getAll();
  // Only subcategories (categories with a parent)
  return categories
    .filter(cat => !!cat.parent)
    .map(cat => ({ slug: generateSlug(cat.name, cat._id) }));
}

export default async function SubcategoryDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const subcategories: Category[] = await categoriesApi.getAll();
  const allCategories: Category[] = await categoriesApi.getAll();
  const allBrands: Brand[] = await brandsApi.getAll();
  const subcategory = subcategories.find(
    (cat: Category) => generateSlug(cat.name, cat._id) === slug
  );
  const parentCategory = subcategory && subcategory.parent ? allCategories.find((c: Category) => c._id === subcategory.parent) : null;

  if (!subcategory) {
    return (
      <main className="max-w-4xl mx-auto py-12 px-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Subcategory Not Found</h1>
          <p className="text-gray-600">The subcategory you&apos;re looking for doesn&apos;t exist or has been removed.</p>
          <Link href="/subcategories" className="text-wingzimpex-brand hover:text-wingzimpex-brand-light mt-4 inline-block">
            ← Back to Subcategories
          </Link>
        </div>
      </main>
    );
  }

  const products: Product[] = await productsApi.getBySubcategory(subcategory._id);

  // Optionally, build brandMap and categoryMap for ProductCard badges
  const brandMap = Object.fromEntries(allBrands.map(b => [b._id, b.name]));
  const categoryMap = Object.fromEntries(allCategories.map(c => [c._id, c.name]));

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-wingzimpex-brand/5">
      {/* Hero Section: Just the title on a green background */}
      <section className="w-full bg-[#2d2d2d] py-16 text-center rounded-b-2xl">
        <h1 className="text-4xl md:text-5xl font-bold text-white">{subcategory.name}</h1>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-[#2d2d2d] text-center">Products</h2>
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
              {products.map((product: Product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  brandMap={brandMap}
                  categoryMap={categoryMap}
                  showHoverEffects={true}
                  showDate={false}
                  showGalleryCount={true}
                  showCategoryBadge={true}
                  // Pass subcategory name as a prop if needed
                  subCategoryName={product.subCategory ? categoryMap[product.subCategory] : undefined}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
} 