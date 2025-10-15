"use client";
import React, { useState } from "react";

interface CategoryFilterProps {
  onFilterChange?: (category: string) => void;
  initialCategory?: string;
}

export default function CategoryFilter({ onFilterChange, initialCategory = "All" }: CategoryFilterProps) {
  const [activeCategory, setActiveCategory] = useState(initialCategory);

  const categories = [
    "All",
    "Characters",
    "Environments",
    "3D",
    "Digital",
    "Concept",
    "Abstract"
  ];

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    onFilterChange?.(category);
  };

  return (
    <div className="flex flex-wrap gap-6 items-center justify-center sm:justify-start">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => handleCategoryClick(category)}
          className={`text-sm font-medium transition-all hover:text-amber-500 hover:scale-105 ${
            activeCategory === category
              ? "text-amber-500"
              : "text-gray-600 dark:text-gray-400"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
