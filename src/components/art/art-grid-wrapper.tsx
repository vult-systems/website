"use client";
import React from "react";
import ContentGrid from "../ui/content-grid";

interface ArtPiece {
  slug: string;
  title: string;
  description?: string;
  heroImage?: string;
  category: string;
}

interface ArtGridProps {
  artPieces: ArtPiece[];
}

export default function ArtGrid({ artPieces }: ArtGridProps) {
  // Transform art pieces into ContentGrid items with formatted metadata
  const items = artPieces.map(piece => ({
    slug: piece.slug,
    title: piece.title,
    description: piece.description,
    heroImage: piece.heroImage,
    category: piece.category,
    metadata: (
      <span className="truncate">{piece.category}</span>
    )
  }));

  return (
    <ContentGrid 
      items={items}
      baseUrl="/art"
      filterType="category"
    />
  );
}
