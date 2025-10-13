"use client";
import React, { useState } from "react";

interface CategoryFilterProps {
  onFilterChange?: (category: string) => void;
}

export default function CategoryFilter({ onFilterChange }: CategoryFilterProps) {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = [
    "All",
    "Characters",
    "Environments",
    "Props",
    "3D Printing"
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
