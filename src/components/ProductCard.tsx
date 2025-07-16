"use client";

import React from "react";
import Link from "next/link";
import { Product, getImageUrl } from "../services/api";

interface ProductCardProps {
  product: Product;
  variant?: "default" | "homepage" | "simple";
  showDate?: boolean;
  showGalleryCount?: boolean;
  showCategoryBadge?: boolean;
  showHoverEffects?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  variant = "default",
  showDate = true,
  showGalleryCount = true,
  showCategoryBadge = true,
  showHoverEffects = true,
}) => {
  const slug = `${product.title.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-")}-${product._id}`;
  const imageUrl = getImageUrl(product.featuredImage, "products");

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.style.display = "none";
    const fallbackDiv = e.currentTarget.nextElementSibling as HTMLElement;
    if (fallbackDiv) {
      fallbackDiv.style.display = "flex";
    }
  };

  const baseClasses = showHoverEffects
    ? "group bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-[#ede7de] hover:border-[#405a4d]"
    : "bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden border border-[#ede7de]";

  const imageClasses = showHoverEffects
    ? "w-full h-72 object-cover group-hover:scale-110 transition-transform duration-500"
    : "w-full h-60 object-cover";

  return (
    <div className={baseClasses}>
      {/* Product Image */}
      <div className="relative flex items-center justify-center bg-[#f7f2ea]" style={{height: '24rem'}}>
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={product.title}
            className="w-full h-full object-cover"
            onError={handleImageError}
            width={288}
            height={288}
            loading="lazy"
            style={{ objectFit: "cover", width: '100%', height: '100%' }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg className="w-16 h-16 text-punjabac-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
        {/* Quick action button for homepage variant */}
        {variant === "homepage" && showHoverEffects && (
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
            <Link
              href={`/products/${slug}`}
              className="bg-white/90 backdrop-blur-sm text-punjabac-brand px-4 py-2 rounded-lg font-semibold hover:bg-white transition-colors shadow-lg"
            >
              View Details
            </Link>
          </div>
        )}
        {/* Category Badge */}
        {showCategoryBadge && (
          <div className="absolute top-4 left-4">
            <span className="bg-punjabac-brand text-white px-3 py-1 rounded-full text-xs font-medium">
              Auto AC
            </span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-6">
        <h3 className={`text-xl font-bold text-[#2d2d2d] mb-1 ${showHoverEffects ? "group-hover:text-[#405a4d] transition-colors line-clamp-2" : "line-clamp-2"}`}>
          {product.title}
        </h3>
        {product.description && (
          <div className="text-sm text-gray-600 mb-1 line-clamp-1">{product.description}</div>
        )}
        <div className="flex items-center gap-2 mb-2">
          {product.category && (
            <span className="inline-block bg-[#ede7de] text-[#405a4d] px-3 py-1 rounded-full text-xs font-semibold border border-[#d6d1c7]">{product.category}</span>
          )}
          {product.brand && (
            <span className="inline-block bg-[#405a4d] text-white px-3 py-1 rounded-full text-xs font-semibold">{product.brand}</span>
          )}
        </div>
        {/* Product Meta */}
        {showDate && (
          <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
            <span>Added {new Date(product.createdAt).toLocaleDateString()}</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Link
            href={`/products/${slug}`}
            className="flex-1 bg-punjabac-brand text-white py-3 px-4 rounded-lg font-semibold hover:bg-punjabac-brand-light transition-colors text-center"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard; 