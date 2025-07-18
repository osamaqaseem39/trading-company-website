import React from 'react';
import { categoriesApi, productsApi, Category, Product } from '../../../services/api';
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
  // Generate slugs for all categories (top-level and subcategories)
  return categories.map(cat => ({ slug: generateSlug(cat.name, cat._id) }));
}

export default async function CategoryDetailPage({ params }: { params: { slug: string } }) {
  // Fetch all categories and products
  const [categories, products]: [Category[], Product[]] = await Promise.all([
    categoriesApi.getAll(),
    productsApi.getAll(),
  ]);

  // Find the selected child category by slug
  const childCategory = categories.find(
    (cat: Category) => generateSlug(cat.name, cat._id) === params.slug
  );

  if (!childCategory) {
    return (
      <main className="max-w-4xl mx-auto py-12 px-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Category Not Found</h1>
          <p className="text-gray-600">The category you&apos;re looking for doesn&apos;t exist or has been removed.</p>
          <Link href="/categories" className="text-wingzimpex-brand hover:text-wingzimpex-brand-light mt-4 inline-block">
            ← Back to Categories
          </Link>
        </div>
      </main>
    );
  }

  // Find sub-subcategories (children of this child category)
  const subSubcategories = categories.filter(
    (cat: Category) => cat.parent === childCategory._id
  );

  // Find products belonging to this child category (either as category or subCategory)
  const childCategoryProducts = products.filter(
    (product: Product) =>
      product.category === childCategory._id ||
      product.subCategory === childCategory._id
  );

  // Optionally, build brandMap and categoryMap for ProductCard badges
  const brandMap = {};
  const categoryMap = Object.fromEntries(categories.map(c => [c._id, c.name]));

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-wingzimpex-brand/5">
      {/* Breadcrumb */}
      <nav className="max-w-6xl mx-auto px-4 py-4 text-sm flex items-center gap-2" aria-label="Breadcrumb">
        <Link href="/" className="text-gray-500 hover:text-wingzimpex-brand">Home</Link>
        <span className="text-gray-400">/</span>
        <Link href="/categories" className="text-gray-500 hover:text-wingzimpex-brand">Categories</Link>
        <span className="text-gray-400">/</span>
        <span className="text-gray-900 font-medium">{childCategory.name}</span>
      </nav>

      {/* Child Category Card */}
      <section className="relative flex flex-col items-center justify-center bg-white rounded-2xl shadow-xl max-w-3xl mx-auto mt-6 mb-12 p-8 border border-gray-100">
        {childCategory.image && (
          <div className="flex justify-center mb-6">
            <img
              src={childCategory.image}
              alt={childCategory.name}
              width={160}
              height={160}
              className="rounded-xl object-cover shadow-md"
            />
          </div>
        )}
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center text-[#405a4d]">{childCategory.name}</h1>
        {childCategory.description && (
          <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed mb-2 text-center">
            {childCategory.description}
          </p>
        )}
      </section>

      {/* Sub-subcategories (if any) */}
      {subSubcategories.length > 0 && (
        <section className="py-8">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6 text-[#405a4d] text-center">Subcategories</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {subSubcategories.map((subcat: Category) => (
                <Link
                  key={subcat._id}
                  href={`/categories/${generateSlug(subcat.name, subcat._id)}`}
                  className="flex items-center w-full px-8 py-8 bg-white rounded-2xl shadow hover:bg-[#e3ded6] transition group cursor-pointer border border-gray-100 hover:border-wingzimpex-brand"
                  style={{ textDecoration: 'none' }}
                  aria-label={`Go to subcategory ${subcat.name}`}
                >
                  <div className="w-16 h-16 rounded-full bg-[#d6d1c4] flex items-center justify-center mr-8 overflow-hidden">
                    {subcat.image ? (
                      <img src={subcat.image} alt={subcat.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-2xl text-[#2d2d2d] font-bold">{subcat.name[0]}</span>
                    )}
                  </div>
                  <span className="flex-1 text-2xl text-[#2d2d2d] font-semibold">{subcat.name}</span>
                  <span className="w-10 h-10 flex items-center justify-center rounded-full bg-white group-hover:bg-[#2d2d2d] transition">
                    <svg className="w-6 h-6 text-[#2d2d2d] group-hover:text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Products Grid */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-[#405a4d] text-center">Products</h2>
          {childCategoryProducts.length === 0 ? (
            <div className="text-center text-gray-500 py-16 flex flex-col items-center">
              <svg width="64" height="64" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="mb-4 text-gray-300">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <div className="text-lg font-semibold mb-2">No products found in this category.</div>
              <div className="text-gray-400">Please check back later or explore other categories.</div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {childCategoryProducts.map((product: Product) => (
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