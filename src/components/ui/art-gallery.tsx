"use client";
import React, { useState } from "react";
import CategoryFilter from "./category-filter";
import BentoGridDemo from "./bento-grid-demo";

interface ArtPiece {
  slug: string;
  title: string;
  description: string;
  heroImage?: string;
  category: string;
  featured: boolean;
}

interface ArtGalleryProps {
  artPieces: ArtPiece[];
}

export default function ArtGallery({ artPieces }: ArtGalleryProps) {
  const [activeCategory, setActiveCategory] = useState("All");

  return (
    <>
      <div className="mt-8">
        <CategoryFilter 
          onFilterChange={setActiveCategory}
          initialCategory={activeCategory}
        />
      </div>

      {/* Divider */}
      <div className="mt-8 mb-8">
        <div className="border-t border-gray-200 dark:border-gray-800"></div>
      </div>

      <BentoGridDemo 
        artPieces={artPieces}
        activeCategory={activeCategory}
      />
    </>
  );
}
