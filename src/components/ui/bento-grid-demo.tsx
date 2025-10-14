"use client";
import { cn } from "@/lib/utils";
import React, { useState, useEffect } from "react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";

interface ArtPiece {
  slug: string;
  title: string;
  description: string;
  heroImage?: string;
  category: string;
  featured: boolean;
}

interface BentoGridDemoProps {
  artPieces: ArtPiece[];
  activeCategory?: string;
}

export default function BentoGridDemo({ artPieces, activeCategory = "All" }: BentoGridDemoProps) {
  const [filteredPieces, setFilteredPieces] = useState(artPieces);

  useEffect(() => {
    if (activeCategory === "All") {
      setFilteredPieces(artPieces);
    } else {
      const categoryMap: { [key: string]: string } = {
        "Characters": "character",
        "Environments": "environment",
        "3D": "3d",
        "Digital": "digital",
        "Concept": "concept",
        "Abstract": "abstract"
      };
      const filterValue = categoryMap[activeCategory] || activeCategory.toLowerCase();
      setFilteredPieces(artPieces.filter(piece => piece.category === filterValue));
    }
  }, [activeCategory, artPieces]);

  const getCategoryIcon = (category: string) => {
    const icons: { [key: string]: string } = {
      "character": "👤",
      "environment": "🏛️",
      "3d": "🎨",
      "digital": "✨",
      "concept": "🖌️",
      "abstract": "�"
    };
    return icons[category] || "🎨";
  };

  return (
    <BentoGrid className="max-w-7xl mx-auto">
      {filteredPieces.length === 0 ? (
        <div className="col-span-full text-center py-12 text-gray-500 dark:text-gray-400">
          No art pieces found in this category yet.
        </div>
      ) : (
        filteredPieces.map((item, i) => (
          <BentoGridItem
            key={item.slug}
            title={item.title}
            description={item.description}
            header={<ImageHeader src={item.heroImage || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=600&fit=crop"} alt={item.title} />}
            icon={<div className="text-xl">{getCategoryIcon(item.category)}</div>}
            className={i === 3 || i === 6 ? "md:col-span-2" : ""}
            href={`/art/${item.slug}`}
          />
        ))
      )}
    </BentoGrid>
  );
}

const ImageHeader = ({ src, alt }: { src: string; alt: string }) => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl overflow-hidden">
    <img
      src={src}
      alt={alt}
      className="w-full h-full object-cover transition-transform duration-300 group-hover/bento:scale-105"
    />
  </div>
);
