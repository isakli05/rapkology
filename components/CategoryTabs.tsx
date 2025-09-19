'use client';

import { useCallback } from 'react';

interface CategoryTabsProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

// Senior Level CategoryTabs - Horizontal Filter Design System
export default function CategoryTabs({ categories, activeCategory, onCategoryChange }: CategoryTabsProps) {
  
  const handleCategoryClick = useCallback((category: string) => {
    onCategoryChange(category);
  }, [onCategoryChange]);

  return (
    <>
      <style jsx global>{`
        .category-scroll-container::-webkit-scrollbar {
          display: none;
        }
        .category-scroll-container {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      <div className="category-tabs-container mb-8 lg:mb-12">
        <div className="category-scroll-container flex gap-3 lg:gap-4 overflow-x-auto lg:flex-wrap lg:overflow-x-visible pb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={`category-tab flex-shrink-0 ${
                activeCategory === category
                  ? 'category-tab--active'
                  : 'category-tab--inactive'
              }`}
              aria-pressed={activeCategory === category}
              aria-label={`${category} kategorisini seç`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
