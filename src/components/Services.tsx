'use client';

import React, { useEffect, useState } from 'react';
import CategoryStack, { CategoryData } from './CategoryStack';
import { categoriesApi, Category } from '../services/api';

const mockCategories: CategoryData[] = [
  {
    title: "Food Items",
    description:
      "Explore a wide range of quality food items sourced from trusted suppliers, ensuring freshness and taste in every bite.",
    image: "/images/categories/fooditems.jpg",
    buttonText: "View Food Items",
    variant: "right",
  },
  {
    title: "Beverages",
    description:
      "Discover our selection of beverages, from refreshing juices to energizing drinks, perfect for any occasion.",
    image: "/images/categories/beverages.jpg",
    buttonText: "View Beverages",
    variant: "left",
  },
  {
    title: "Fresh Fruits",
    description:
      "Enjoy the freshest fruits, handpicked and delivered to you with care for maximum nutrition and flavor.",
    image: "/images/categories/fruits.jpg",
    buttonText: "View Fresh Fruits",
    variant: "right",
  },
  {
    title: "Utensils",
    description:
      "Browse our collection of utensils designed for convenience and durability in your kitchen or business.",
    image: "/images/categories/utencils.jpg",
    buttonText: "View Utensils",
    variant: "left",
  },
];

const Services = () => {
  const [categories, setCategories] = useState<CategoryData[]>(mockCategories);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      setLoading(true);
      try {
        const allCategories: Category[] = await categoriesApi.getAll();
        // Filter parent categories (no parent)
        let parentCategories = allCategories.filter(cat => !cat.parent);
        // Sort by oldest (by _id, string comparison, oldest first)
        parentCategories = parentCategories.sort((a, b) => {
          if (a._id < b._id) return -1;
          if (a._id > b._id) return 1;
          return 0;
        });
        // Map to CategoryData
        const mapped: CategoryData[] = parentCategories.map((cat, idx) => ({
          title: cat.name,
          description: cat.description || '',
          image: cat.image || '/images/categories/fooditems.jpg', // fallback image
          buttonText: `View ${cat.name}`,
          variant: idx % 2 === 0 ? 'right' : 'left',
        }));
        setCategories(mapped);
      } catch (e) {
        // fallback to mockCategories
        setCategories(mockCategories);
      } finally {
        setLoading(false);
      }
    }
    fetchCategories();
  }, []);

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-wingzimpex-brand/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="font-bold mb-6 text-[#2d2d2d] text-2xl sm:text-4xl md:text-5xl">
            Our Sectors
          </h2>
          <p className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed text-[#2d2d2d]">
            From food items to beverages and kitchen essentials, we serve a wide range of sectors with quality and reliability.
          </p>
        </div>
        <CategoryStack categories={categories} />
      </div>
    </section>
  );
};

export default Services; 