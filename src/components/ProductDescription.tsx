"use client";
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";

export default function ProductDescription({ description }: { description: string }) {
  const [expanded, setExpanded] = useState(false);
  const isLong = description.length > 300;
  const displayText = expanded || !isLong ? description : description.slice(0, 300) + '...';
  return (
    <div className="prose prose-gray max-w-none mb-8">
      <ReactMarkdown>{displayText}</ReactMarkdown>
      {isLong && (
        <button
          className="mt-2 text-wingzimpex-brand underline font-semibold text-sm focus:outline-none"
          onClick={() => setExpanded(v => !v)}
        >
          {expanded ? 'Show less' : 'Read more'}
        </button>
      )}
    </div>
  );
} 