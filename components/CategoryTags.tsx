'use client';

import { useCallback, memo } from 'react';
import type { ComponentConfig } from '@/types/config';
import { createLayoutConfig, createTypographyConfig, createInteractionConfig } from '@/types/config';

interface CategoryTagsProps {
  title: string;
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

interface CategoryTagsConfig extends ComponentConfig {
  tags: {
    grid: string;
    tag: {
      base: string;
      active: string;
      hover: string;
    };
  };
  tagStateLabel: (category: string, isActive: boolean) => string;
}

// Design System Configuration - Standardized Pattern
const categoryTagsConfig: CategoryTagsConfig = {
  layout: createLayoutConfig("space-y-6", "mb-6"),
  typography: createTypographyConfig({
    title: "font-saira-condensed font-bold text-display-md leading-[1.04] text-white", // migrated from text-[40px]
    tag: "font-saira font-normal text-sm leading-none text-center"
  }),
  interactions: createInteractionConfig("transition-all duration-200", {
    focus: "focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:ring-offset-2 focus:ring-offset-black"
  }),
  accessibility: {
    sectionRole: "region",
    sectionLabel: "Kategori filtreleri"
  },
  tags: {
    grid: "flex flex-wrap gap-3",
    tag: {
      base: "px-4 py-2 border border-ink-500 cursor-pointer",
      active: "bg-brand-yellow text-black border-brand-yellow",
      hover: "hover:bg-brand-yellow hover:text-black hover:border-brand-yellow"
    }
  },
  tagStateLabel: (category: string, isActive: boolean) => 
    `${category} kategorisi${isActive ? ' - şu anda seçili' : ' - seçmek için tıklayın'}`
};

const CategoryTags = memo(function CategoryTags({ 
  title, 
  categories, 
  activeCategory, 
  onCategoryChange 
}: CategoryTagsProps) {

  // Performance: Memoized handler
  const handleCategoryClick = useCallback((category: string) => {
    onCategoryChange(category);
  }, [onCategoryChange]);

  return (
    <section 
      className={categoryTagsConfig.layout.container}
      role={categoryTagsConfig.accessibility.sectionRole}
      aria-label={categoryTagsConfig.accessibility.sectionLabel}
    >
      
      {/* Section Title - Design System Typography */}
      <h2 className={`${categoryTagsConfig.typography.title} ${categoryTagsConfig.layout.spacing}`}>
        {title}
      </h2>

      {/* Category Tags Grid - Design System Layout */}
      <div 
        className={categoryTagsConfig.tags.grid}
        role="group"
        aria-label="Kategori seçenekleri"
      >
        {categories.map((category) => {
          const isActive = activeCategory === category;
          
          return (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              role="button"
              aria-pressed={isActive}
              aria-label={categoryTagsConfig.tagStateLabel(category, isActive)}
              className={`
                ${categoryTagsConfig.typography.tag}
                ${categoryTagsConfig.tags.tag.base}
                ${categoryTagsConfig.interactions?.transition}
                ${categoryTagsConfig.interactions?.focus}
                ${isActive 
                  ? categoryTagsConfig.tags.tag.active
                  : `text-white ${categoryTagsConfig.tags.tag.hover}`
                }
              `}
              tabIndex={0}
            >
              {category}
            </button>
          );
        })}
      </div>

    </section>
  );
});

export default CategoryTags;
