import React from 'react';
import Link from 'next/link';
import ContactSection from '../../../components/ContactSection';
import { blogsApi } from '../../../services/api';
import ReactMarkdown from 'react-markdown';

export default async function BlogDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  // Fetch all blogs and find by slug
  const blogs = await blogsApi.getAll();
  const blog = blogs.find(b => b.slug === slug);

  if (!blog) {
    return (
      <main className="min-h-screen bg-[#ede7de]">
        <div className="max-w-4xl mx-auto py-12 px-4">
          <div className="text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold mb-4">Blog Not Found</h1>
            <p className="text-gray-600 mb-6">The blog you're looking for doesn't exist or has been removed.</p>
            <Link href="/updates" className="bg-wingzimpex-brand text-white px-6 py-3 rounded-lg font-semibold hover:bg-wingzimpex-brand-light transition-colors">
              Back to Updates
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#ede7de]">
      {/* Breadcrumb */}
      <section className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-wingzimpex-brand transition-colors">
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <Link href="/updates" className="text-gray-500 hover:text-wingzimpex-brand transition-colors">
              Updates
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">{blog.title}</span>
          </nav>
        </div>
      </section>

      {/* Blog Details */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {blog.featuredImage && (
              <div className="w-full h-80 relative overflow-hidden">
                <img src={blog.featuredImage} alt={blog.title} className="w-full h-full object-cover" />
              </div>
            )}
            <div className="p-8 lg:p-12">
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                {blog.title}
              </h1>
              <div className="prose max-w-none mb-8">
                <ReactMarkdown>{blog.content || ''}</ReactMarkdown>
              </div>
              <Link href="/updates" className="text-wingzimpex-brand hover:underline">Back to Updates</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <ContactSection />
    </main>
  );
} 