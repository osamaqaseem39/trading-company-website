"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import ContactSection from "../../components/ContactSection";
import BlogCard from "../../components/BlogCard";

interface Blog {
  _id: string;
  title: string;
  content: string;
  status: 'draft' | 'published';
  slug: string;
  featuredImage?: string;
  createdAt: string;
}

export default function UpdatesPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const res = await axios.get("https://trading-company-bcyf.vercel.app/api/blogs");
        const data = res.data;
        setBlogs(Array.isArray(data) ? data.filter((b: Blog) => b.status === "published") : []);
      } catch (error) {
        setBlogs([]);
      }
      setLoading(false);
    }
    fetchBlogs();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-wingzimpex-brand/5">
      <section className="py-20" style={{ background: "#ede7de" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-bold mb-6 text-[#2d2d2d] text-[60px]">
              Company Updates & News
            </h2>
            <p className="text-xl text-[#2d2d2d] max-w-3xl mx-auto leading-relaxed">
              Stay up to date with the latest company news, product launches, and important updates from our team.
            </p>
          </div>
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
          ) : blogs.length === 0 ? (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No updates found</h3>
                <p className="text-gray-600 mb-6">
                  No company updates are currently available. Please check back later.
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog) => (
                <BlogCard key={blog._id} blog={blog} />
              ))}
            </div>
          )}
        </div>
      </section>
      <ContactSection />
    </main>
  );
} 