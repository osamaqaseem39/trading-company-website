import React from 'react';
import Image from 'next/image';

interface PageHeaderProps {
  title: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  children?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, description, image, imageAlt, children }) => {
  return (
    <section className="relative bg-wingzimpex-brand text-white py-20 overflow-hidden">
      {/* Overlay for better text contrast */}
      <div className="absolute inset-0 bg-black/40 z-0" aria-hidden="true"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center text-center md:text-left" style={{zIndex: 2}}>
        <div className="flex-1 z-10">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-6 drop-shadow-lg">{title}</h1>
          {description && (
            <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-2xl leading-relaxed mb-6 drop-shadow-md">{description}</p>
          )}
          {children}
        </div>
        {image && (
          <div className="flex-1 flex justify-center md:justify-end mt-8 md:mt-0 z-10">
            <Image
              src={image}
              alt={imageAlt || title}
              width={320}
              height={320}
              className="rounded-2xl object-cover shadow-lg border-4 border-white/20 max-w-[220px] md:max-w-[320px] w-full h-auto"
              style={{ maxHeight: 320, maxWidth: 320 }}
              priority
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default PageHeader; 