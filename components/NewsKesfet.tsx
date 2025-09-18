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
    "Tümü",
    "Videolar", 
    "Müzik",
    "Türk Rap",
    "Haftanın Videoları",
    "Ayın Videoları",
    "Rap Haberleri"
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
  const [activeCategory, setActiveCategory] = useState<string>('Tümü');
  const [viewMode, setViewMode] = useState<ViewMode>('double');
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showAllNews, setShowAllNews] = useState<boolean>(false);

  // Process news data - Memoized for performance
  const newsData = useMemo(() => {
    return transformMockDataToNews(mockData);
  }, []);

  // Senior Level Category Filtering - Real Implementation
  const filteredNews = useMemo(() => {
    let filtered = newsData;

    // Category filtering - Professional implementation
    if (activeCategory !== 'Tümü') {
      filtered = newsData.filter(news => {
        const originalItem = mockData.find(item => item._id === news.id);
        if (!originalItem) return false;

        const { category = [], tags = [] } = originalItem.attributes;
        
        // Check both category and tags arrays for matching content
        const categoryMatches = category.some((cat: string) => 
          cat.toLowerCase().includes(activeCategory.toLowerCase()) ||
          activeCategory.toLowerCase().includes(cat.toLowerCase())
        );
        
        const tagMatches = tags.some((tag: string) => 
          tag.toLowerCase().includes(activeCategory.toLowerCase()) ||
          activeCategory.toLowerCase().includes(tag.toLowerCase())
        );

        return categoryMatches || tagMatches;
      });
    }

    // Search filtering - Enhanced implementation
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(news => {
        const titleMatch = news.title.toLowerCase().includes(query);
        const authorMatch = news.author.name.toLowerCase().includes(query);
        
        // Also search in original mock data for content and tags
        const originalItem = mockData.find(item => item._id === news.id);
        const contentMatch = originalItem?.attributes.content?.toLowerCase().includes(query) || false;
        const tagMatch = originalItem?.attributes.tags?.some((tag: string) => 
          tag.toLowerCase().includes(query)
        ) || false;

        return titleMatch || authorMatch || contentMatch || tagMatch;
      });
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
    // Reset pagination when category changes - UX Best Practice
    setShowAllNews(false);
    // Close search if open - Clean UX
    if (showSearch) {
      setShowSearch(false);
      setSearchQuery('');
    }
  }, [showSearch]);

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
        {displayedNews.length > 0 ? (
          <div 
            className={`mb-12 lg:mb-16 ${
              viewMode === 'double' 
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8" 
                : "space-y-8 lg:space-y-12"
            }`}
            role="feed"
            aria-label={`${displayedNews.length} haber gösteriliyor, ${activeCategory} kategorisinde ${filteredNews.length} toplam haber`}
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
        ) : (
          // No Results State - Senior UX Pattern
          <div className="mb-12 lg:mb-16 text-center py-16">
            <div className="max-w-md mx-auto">
              <h3 className="font-saira-condensed font-bold text-2xl text-white mb-4">
                İçerik Bulunamadı
              </h3>
              <p className="font-saira font-normal text-ink-400 mb-6">
                {searchQuery ? (
                  <>&quot;{searchQuery}&quot; araması için <strong>&quot;{activeCategory}&quot;</strong> kategorisinde sonuç bulunamadı.</>
                ) : (
                  <><strong>&quot;{activeCategory}&quot;</strong> kategorisinde henüz içerik bulunmuyor.</>
                )}
              </p>
              {(searchQuery || activeCategory !== 'Tümü') && (
                <button
                  onClick={() => {
                    setActiveCategory('Tümü');
                    setSearchQuery('');
                    setShowSearch(false);
                  }}
                  className="font-saira font-normal text-sm text-brand-yellow hover:text-white transition-colors duration-200"
                >
                  Tüm İçerikleri Görüntüle
                </button>
              )}
            </div>
          </div>
        )}

        {/* Load More Button - Only show if there are results and more to show */}
        {displayedNews.length > 0 && filteredNews.length > newsKesfetConfig.initialDisplayCount && (
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
