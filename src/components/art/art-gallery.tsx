"use client";
import React, { useState } from "react";
import CategoryFilter from "./category-filter";
import { BentoGrid, BentoGridItem } from "../ui/bento-grid";

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

  const filteredPieces = activeCategory === "All" 
    ? artPieces 
    : artPieces.filter(piece => piece.category === activeCategory);

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

      <BentoGrid>
        {filteredPieces.map((piece) => (
          <BentoGridItem
            key={piece.slug}
            title={piece.title}
            description={piece.description}
            header={
              piece.heroImage ? (
                <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100">
                  <img 
                    src={piece.heroImage} 
                    alt={piece.title}
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
              ) : undefined
            }
            href={`/art/${piece.slug}`}
            className={piece.featured ? "md:col-span-2" : ""}
          />
        ))}
      </BentoGrid>
    </>
  );
}
