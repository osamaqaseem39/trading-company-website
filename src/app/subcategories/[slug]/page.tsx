import React from 'react';

export default function Page({ params }: { params: { slug: string } }) {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Subcategory Page</h1>
        <p className="text-lg">Slug: <span className="font-mono text-[#405a4d]">{params.slug}</span></p>
      </div>
    </main>
  );
} 