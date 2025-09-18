'use client';

import { useCallback } from 'react';

interface CategoryTagsProps {
  title: string;
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

interface CategoryTagsConfig {
  layout: {
    container: string;
    tagsGrid: string;
    spacing: string;
  };
  typography: {
    title: string;
    tag: string;
  };
  interactions: {
    tag: {
      base: string;
      active: string;
      hover: string;
      transition: string;
    };
  };
  accessibility: {
    sectionRole: string;
    sectionLabel: string;
    tagRole: string;
    tagStateLabel: (category: string, isActive: boolean) => string;
  };
}

// Design System Configuration - Enterprise Pattern
const categoryTagsConfig: CategoryTagsConfig = {
  layout: {
    container: "space-y-6",
    tagsGrid: "flex flex-wrap gap-3",
    spacing: "mb-6"
  },
  typography: {
    title: "font-saira-condensed font-bold text-[40px] leading-[1.04] text-white",
    tag: "font-saira font-normal text-sm leading-none text-center"
  },
  interactions: {
    tag: {
      base: "px-4 py-2 border border-ink-500 cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:ring-offset-2 focus:ring-offset-black",
      active: "bg-brand-yellow text-black border-brand-yellow",
      hover: "hover:bg-brand-yellow hover:text-black hover:border-brand-yellow",
      transition: "transition-all duration-200"
    }
  },
  accessibility: {
    sectionRole: "region",
    sectionLabel: "Kategori filtreleri",
    tagRole: "button",
    tagStateLabel: (category: string, isActive: boolean) => 
      `${category} kategorisi${isActive ? ' - şu anda seçili' : ' - seçmek için tıklayın'}`
  }
};

export default function CategoryTags({ 
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
        className={categoryTagsConfig.layout.tagsGrid}
        role="group"
        aria-label="Kategori seçenekleri"
      >
        {categories.map((category) => {
          const isActive = activeCategory === category;
          
          return (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              role={categoryTagsConfig.accessibility.tagRole}
              aria-pressed={isActive}
              aria-label={categoryTagsConfig.accessibility.tagStateLabel(category, isActive)}
              className={`
                ${categoryTagsConfig.typography.tag}
                ${categoryTagsConfig.interactions.tag.base}
                ${categoryTagsConfig.interactions.tag.transition}
                ${isActive 
                  ? categoryTagsConfig.interactions.tag.active
                  : `text-white ${categoryTagsConfig.interactions.tag.hover}`
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
}
