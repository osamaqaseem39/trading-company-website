import React from "react";
import { Product, Category } from "../services/api";
import Link from "next/link";

interface CategoryProductListProps {
  products: Product[];
  categories: Category[];
}

const CategoryProductList: React.FC<CategoryProductListProps> = ({ products, categories }) => {
  // Group products by category ID
  const grouped = products.reduce<Record<string, Product[]>>((acc, product) => {
    const catId = product.category || "uncategorized";
    if (!acc[catId]) acc[catId] = [];
    acc[catId].push(product);
    return acc;
  }, {});

  // Prepare ordered categories (with uncategorized last)
  const orderedCategories = [
    ...categories,
    { _id: "uncategorized", name: "Uncategorized" }
  ];

  // Find the 'food items' category
  const foodItemsCategory = categories.find(cat => cat.name.toLowerCase() === "food items");

  return (
    <section className="w-full bg-[#ededed] py-16 px-4 md:px-16">
      <div className="w-full max-w-[1400px] mx-auto">
        {orderedCategories.map((cat) => {
          const subcategories = categories.filter(sub => sub.parent === cat._id);
          const catProducts = grouped[cat._id] || [];
          // Always show the parent category as heading
          // Cards below: subcategories if any, else products
          if (subcategories.length > 0 || catProducts.length > 0) {
            return (
              <div key={cat._id} className="mb-16">
                <div className="flex flex-col md:flex-row items-center md:items-start mb-8 gap-6">
                  {cat.image && (
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-24 h-24 object-cover rounded-xl shadow-md mb-4 md:mb-0"
                    />
                  )}
                  <div className="flex-1 text-center md:text-left">
                    <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-[#001a33] mb-2">{cat.name}</h2>
                    {cat.description && (
                      <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-2">{cat.description}</p>
                    )}
                  </div>
                </div>
                <div className="bg-white rounded-2xl shadow divide-y divide-[#e0dbd2] px-2 md:px-4 py-2 md:py-3">
                  {subcategories.length > 0
                    ? subcategories.map(subcat => {
                        // Find products in this subcategory
                        const subcatProducts = products.filter(p => p.subCategory === subcat._id);
                        // Pick image: subcategory image or random product image
                        let image = subcat.image;
                        if (!image && subcatProducts.length > 0) {
                          const randomProduct = subcatProducts[Math.floor(Math.random() * subcatProducts.length)];
                          image = randomProduct.featuredImage;
                        }
                        return (
                          <div key={subcat._id} className="flex items-center px-1 md:px-2 py-2 md:py-2 hover:bg-[#f7f2ea] transition group cursor-pointer">
                            <div className="w-16 h-16 rounded-full bg-[#ededed] flex items-center justify-center mr-6 overflow-hidden">
                              {image ? (
                                <img src={image} alt={subcat.name} className="w-12 h-12 object-cover rounded-full" />
                              ) : (
                                <span className="text-2xl text-[#001a33] font-bold">{subcat.name[0]}</span>
                              )}
                            </div>
                            <span className="flex-1 text-xl text-[#001a33] font-medium">{subcat.name}</span>
                            <span className="w-10 h-10 flex items-center justify-center rounded-full bg-[#ededed] group-hover:bg-[#001a33] transition">
                              <svg className="w-6 h-6 text-[#001a33] group-hover:text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                              </svg>
                            </span>
                          </div>
                        );
                      })
                    : catProducts.map(product => (
                        <Link
                          href={`/products/${product.title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')}-${product._id}`}
                          key={product._id}
                          className="flex items-center px-1 md:px-2 py-2 md:py-2 hover:bg-[#f7f2ea] transition group"
                        >
                          <div className="w-16 h-16 rounded-full bg-[#ededed] flex items-center justify-center mr-6 overflow-hidden">
                            {product.featuredImage ? (
                              <img src={product.featuredImage} alt={product.title} className="w-12 h-12 object-cover rounded-full" />
                            ) : (
                              <span className="text-2xl text-[#001a33] font-bold">{product.title[0]}</span>
                            )}
                          </div>
                          <span className="flex-1 text-xl text-[#001a33] font-medium">{product.title}</span>
                          <span className="w-10 h-10 flex items-center justify-center rounded-full bg-[#ededed] group-hover:bg-[#001a33] transition">
                            <svg className="w-6 h-6 text-[#001a33] group-hover:text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                          </span>
                        </Link>
                      ))}
                </div>
              </div>
            );
          }
          return null;
        })}
      </div>
    </section>
  );
};

export default CategoryProductList; 