import React from "react";
import { Product } from "../services/api";
import Link from "next/link";

interface CategoryProductListProps {
  products: Product[];
}

const CategoryProductList: React.FC<CategoryProductListProps> = ({ products }) => {
  // Group products by category
  const grouped = products.reduce<Record<string, Product[]>>((acc, product) => {
    const cat = product.category || "Uncategorized";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(product);
    return acc;
  }, {});

  return (
    <section className="w-full bg-[#ede7de] py-16 px-4 md:px-12">
      <div className="max-w-6xl mx-auto">
        {Object.entries(grouped).map(([category, catProducts]) => (
          <div key={category} className="mb-12">
            <h2 className="text-4xl font-bold text-center text-[#405a4d] mb-8">{category}</h2>
            <div className="bg-white rounded-2xl shadow divide-y divide-[#e0dbd2]">
              {catProducts.map(product => (
                <Link
                  href={`/products/${product.title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')}-${product._id}`}
                  key={product._id}
                  className="flex items-center px-6 py-6 hover:bg-[#f7f2ea] transition group"
                >
                  <div className="w-16 h-16 rounded-full bg-[#ede7de] flex items-center justify-center mr-6 overflow-hidden">
                    {product.featuredImage ? (
                      <img src={product.featuredImage} alt={product.title} className="w-12 h-12 object-cover rounded-full" />
                    ) : (
                      <span className="text-2xl text-[#405a4d] font-bold">{product.title[0]}</span>
                    )}
                  </div>
                  <span className="flex-1 text-xl text-[#405a4d] font-medium">{product.title}</span>
                  <span className="w-10 h-10 flex items-center justify-center rounded-full bg-[#ede7de] group-hover:bg-[#405a4d] transition">
                    <svg className="w-6 h-6 text-[#405a4d] group-hover:text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoryProductList; 