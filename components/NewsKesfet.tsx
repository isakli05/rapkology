'use client';

import { useState, useCallback, useMemo } from 'react';
import { X } from 'lucide-react';
import Image from 'next/image';
import NewsCard from './NewsCard';
import CategoryTabs from './CategoryTabs';
import mockData from '../mock-data.json';

interface NewsItem {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  title: string;
  img: string;
  slug: string;
  publishDate: string;
}

interface NewsKesfetConfig {
  title: string;
  initialDisplayCount: number;
  loadMore: {
    buttonText: {
      show: string;
      hide: string;
    };
  };
  categories: string[];
}

// Senior Level Configuration - Enterprise Pattern
const newsKesfetConfig: NewsKesfetConfig = {
  title: "KEŞFET",
  initialDisplayCount: 8, // 4 rows x 2 columns
  loadMore: {
    buttonText: {
      show: "Daha Fazla Gör",
      hide: "Daha Az Göster"
    }
  },
  categories: [
    "Yabancı Rap",
    "Türk Rap",
    "Rap Haberleri", 
    "Haftanın Klipleri",
    "Ayın Klipleri",
    "Rap Sohbetleri",
    "Rap Müsabakaları"
  ]
};

// Data transformation - Mock data to NewsItem
const transformMockDataToNews = (data: any[]): NewsItem[] => {
  return data.map((item, index) => {
    const publishDate = new Date(item.createdAt).toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });

    const avatars = ["/images/rapci_dayi.png", "/images/rapci_abla.png"];
    const avatar = avatars[index % avatars.length];

    return {
      id: item._id,
      author: {
        name: item.attributes.authors[0] || "Rapkology",
        avatar: avatar
      },
      title: item.attributes.title,
      img: item.attributes.img,
      slug: item.attributes.slug,
      publishDate: publishDate
    };
  });
};

type ViewMode = 'single' | 'double';

export default function NewsKesfet() {
  const [activeCategory, setActiveCategory] = useState<string>('Yabancı Rap');
  const [viewMode, setViewMode] = useState<ViewMode>('double');
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showAllNews, setShowAllNews] = useState<boolean>(false);

  // Process news data - Memoized for performance
  const newsData = useMemo(() => {
    return transformMockDataToNews(mockData);
  }, []);

  // Filtered news based on category and search
  const filteredNews = useMemo(() => {
    let filtered = newsData;

    // Category filtering - simplified for demo
    // In real app, you'd filter by actual categories from mock data
    if (activeCategory !== 'Yabancı Rap') {
      // For demo, showing all data regardless of category
      filtered = newsData;
    }

    // Search filtering
    if (searchQuery.trim()) {
      filtered = filtered.filter(news =>
        news.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        news.author.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  }, [newsData, activeCategory, searchQuery]);

  // Displayed news based on showAllNews state
  const displayedNews = useMemo(() => {
    return showAllNews 
      ? filteredNews 
      : filteredNews.slice(0, newsKesfetConfig.initialDisplayCount);
  }, [filteredNews, showAllNews]);

  // Event Handlers - Memoized to prevent re-renders
  const handleCategoryChange = useCallback((category: string) => {
    setActiveCategory(category);
  }, []);

  const handleViewModeChange = useCallback((mode: ViewMode) => {
    setViewMode(mode);
  }, []);

  const handleSearchToggle = useCallback(() => {
    setShowSearch(prev => !prev);
    if (showSearch) {
      setSearchQuery('');
    }
  }, [showSearch]);

  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const handleToggleShowAll = useCallback(() => {
    setShowAllNews(prev => !prev);
  }, []);

  return (
    <section className="relative w-full bg-black py-16 lg:py-24" role="region" aria-label="Keşfet bölümü">
      <div className="container mx-auto px-4 lg:px-hero-gap-lg xl:px-hero-gap-xl">
        
        {/* Header Section */}
        <div className="flex items-start justify-between mb-8 lg:mb-12">
          {/* Title with Compass Icon */}
          <h1 className="font-saira-condensed font-bold text-6xl lg:text-8xl leading-[0.89] text-white flex items-center gap-4">
            {newsKesfetConfig.title}
            <Image 
              src="/icons/compass.svg"
              alt=""
              width={80}
              height={80}
              className="w-6 h-6 lg:w-20 lg:h-20"
              aria-hidden="true"
            />
          </h1>

          {/* View Controls */}
          <div className="flex items-center gap-3">
            {/* Search Toggle - Sharp Design System */}
            <button
              onClick={handleSearchToggle}
              className={`view-control-btn ${
                showSearch ? 'view-control-btn--active' : 'view-control-btn--inactive'
              }`}
              aria-label={showSearch ? 'Aramayı kapat' : 'Arama yap'}
            >
              {showSearch ? (
                <X className="w-5 h-5" strokeWidth={2} />
              ) : (
                <Image 
                  src="/icons/search.svg" 
                  alt="Search" 
                  width={20} 
                  height={20} 
                  className="w-5 h-5" 
                />
              )}
            </button>

            {/* Single Column View - Sharp Design System */}
            <button
              onClick={() => handleViewModeChange('single')}
              className={`view-control-btn ${
                viewMode === 'single' ? 'view-control-btn--active' : 'view-control-btn--inactive'
              }`}
              aria-label="Tek sütun görünümü"
              aria-pressed={viewMode === 'single'}
            >
              <Image 
                src="/icons/single.svg" 
                alt="Single View" 
                width={20} 
                height={20} 
                className="w-5 h-5" 
              />
            </button>

            {/* Double Column View - Sharp Design System */}
            <button
              onClick={() => handleViewModeChange('double')}
              className={`view-control-btn ${
                viewMode === 'double' ? 'view-control-btn--active' : 'view-control-btn--inactive'
              }`}
              aria-label="Çift sütun görünümü"
              aria-pressed={viewMode === 'double'}
            >
              <Image 
                src="/icons/two_columns.svg" 
                alt="Double View" 
                width={20} 
                height={20} 
                className="w-5 h-5" 
              />
            </button>
          </div>
        </div>

        {/* Category Tabs */}
        <CategoryTabs
          categories={newsKesfetConfig.categories}
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />

        {/* Search Input - Conditional */}
        {showSearch && (
          <div className="mb-8 lg:mb-12">
            <div className="relative max-w-md">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="Haber ara..."
                className="w-full px-4 py-3 bg-transparent border-b border-ink-500 text-white placeholder-ink-500 font-saira font-normal text-base focus:outline-none focus:border-brand-yellow transition-colors duration-200"
                autoFocus
              />
              {searchQuery && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-500 text-sm">
                  {filteredNews.length} sonuç
                </span>
              )}
            </div>
          </div>
        )}

        {/* News Grid */}
        <div 
          className={`mb-12 lg:mb-16 ${
            viewMode === 'double' 
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8" 
              : "space-y-8 lg:space-y-12"
          }`}
          role="feed"
          aria-label={`${displayedNews.length} haber gösteriliyor`}
        >
          {displayedNews.map((news, index) => (
            <NewsCard
              key={news.id}
              news={news}
              priority={index < 4} // First 4 items priority loading
              viewMode={viewMode}
            />
          ))}
        </div>

        {/* Load More Button */}
        {filteredNews.length > newsKesfetConfig.initialDisplayCount && (
          <div className="flex justify-center">
            <div className="cta-button-container">
              <button
                onClick={handleToggleShowAll}
                className="cta-button uppercase tracking-wide"
                aria-expanded={showAllNews}
                aria-controls="news-grid"
                title={showAllNews ? newsKesfetConfig.loadMore.buttonText.hide : newsKesfetConfig.loadMore.buttonText.show}
              >
                {showAllNews ? newsKesfetConfig.loadMore.buttonText.hide : newsKesfetConfig.loadMore.buttonText.show}
              </button>
              
              {/* Shadow Element */}
              <div className="cta-button-shadow" aria-hidden="true"></div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
