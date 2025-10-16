"use client";
import React, { useState } from "react";
import type { ReactNode } from "react";

interface ContentItem {
  slug: string;
  title: string;
  description?: string;
  heroImage?: string;
  metadata?: ReactNode; // Flexible metadata (date, category, tags, etc.)
  // For filtering
  tags?: string[];
  category?: string;
}

interface ContentGridProps {
  items: ContentItem[];
  baseUrl: string; // e.g., "/log" or "/art"
  filterType?: "tags" | "category"; // Type of filtering
  filterLabels?: string[]; // Optional custom filter labels
}

export default function ContentGrid({ 
  items, 
  baseUrl, 
  filterType,
  filterLabels 
}: ContentGridProps) {
  const [activeFilter, setActiveFilter] = useState("All");

  // Generate filter options based on content
  const getFilters = () => {
    if (filterLabels) return ["All", ...filterLabels];
    
    if (filterType === "tags") {
      const allTags = items.flatMap(item => item.tags || []);
      const uniqueTags = Array.from(new Set(allTags));
      return ["All", ...uniqueTags];
    }
    
    if (filterType === "category") {
      const allCategories = items.map(item => item.category).filter(Boolean);
      const uniqueCategories = Array.from(new Set(allCategories)) as string[];
      return ["All", ...uniqueCategories];
    }
    
    return [];
  };

  const filters = getFilters();
  const showFilters = filters.length > 0;

  // Filter items based on active filter
  const filteredItems = activeFilter === "All" 
    ? items 
    : items.filter(item => {
        if (filterType === "tags") {
          return item.tags?.includes(activeFilter);
        }
        if (filterType === "category") {
          return item.category === activeFilter;
        }
        return true;
      });

  return (
    <>
      {/* Filter Buttons */}
      {showFilters && (
        <>
          <div className="mt-8">
            <div className="flex flex-wrap gap-6 items-center justify-start">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`text-sm font-medium transition-all hover:text-accent hover:scale-105 ${
                    activeFilter === filter
                      ? "text-accent"
                      : "text-foreground-secondary"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="mt-8 mb-8">
            <div className="border-t border-border"></div>
          </div>
        </>
      )}

      {/* Grid of Content Items - 4 Column */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:gap-6">
        {filteredItems.map((item) => (
          <div key={item.slug} className="group flex flex-col overflow-clip rounded-lg border border-border hover:border-border-hover transition-all">
            {/* Image */}
            <a href={`${baseUrl}/${item.slug}`} className="overflow-hidden">
              {item.heroImage && (
                <img
                  src={item.heroImage}
                  alt={item.title}
                  className="aspect-[16/9] h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              )}
            </a>
            
            {/* Content */}
            <div className="flex flex-col flex-grow p-4">
              <h3 className="mb-2 text-base font-semibold text-foreground line-clamp-2 md:text-lg">
                <a href={`${baseUrl}/${item.slug}`} className="hover:text-foreground-secondary transition-colors">
                  {item.title}
                </a>
              </h3>
              {item.description && (
                <p className="text-foreground-secondary text-sm mb-3 line-clamp-2">
                  {item.description}
                </p>
              )}
              
              {/* Flexible Metadata */}
              {item.metadata && (
                <div className="mt-auto flex items-center gap-2 text-xs text-foreground-muted">
                  {item.metadata}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
