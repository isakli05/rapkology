'use client';

import { useState, useCallback, useMemo } from 'react';
import { X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import NewsCard from './NewsCard';
import CategoryTabs from './CategoryTabs';
import type { ViewMode } from '@/types/common';
import Button, { ButtonShadow } from './ui/Button';
import ClipsSection from './news/ClipsSection';
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

interface NewsDiscoveryConfig {
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
const newsDiscoveryConfig: NewsDiscoveryConfig = {
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

export default function NewsDiscovery() {
  const [activeCategory, setActiveCategory] = useState<string>('Yabancı Rap');
  const [viewMode, setViewMode] = useState<ViewMode>('double');
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showAllNews, setShowAllNews] = useState<boolean>(false);

  // Process news data - Memoized for performance
  const newsData = useMemo(() => {
    return transformMockDataToNews(mockData);
  }, []);

  // Senior Level Category Filtering - Fallback to All Content
  const filteredNews = useMemo(() => {
    let filtered = newsData;

    // Category filtering with intelligent mapping to mock data
    const categoryFiltered = newsData.filter(news => {
      const originalItem = mockData.find(item => item._id === news.id);
      if (!originalItem) return false;

      const { category = [], tags = [] } = originalItem.attributes;
      const allContent = [...category, ...tags].join(' ').toLowerCase();
      
      // Intelligent category mapping
      switch (activeCategory) {
        case 'Yabancı Rap':
          // Rap content but not specifically Turkish
          return (allContent.includes('rap') || allContent.includes('hip-hop')) && 
                 !allContent.includes('türk');
                 
        case 'Türk Rap':
          // Turkish rap specific content
          return allContent.includes('türk') && allContent.includes('rap');
          
        case 'Rap Haberleri':
          // General rap news - broader rap content
          return allContent.includes('rap') || allContent.includes('hip-hop');
          
        case 'Haftanın Klipleri':
          // Weekly video content
          return allContent.includes('hafta') && 
                 (allContent.includes('video') || allContent.includes('klip'));
                 
        case 'Ayın Klipleri':
          // Monthly video content  
          return allContent.includes('ay') && 
                 (allContent.includes('video') || allContent.includes('klip'));
                 
        case 'Rap Sohbetleri':
          // Interview and conversation content
          return allContent.includes('sohbet') || allContent.includes('röportaj') ||
                 allContent.includes('konuşma') || allContent.includes('interview');
                 
        case 'Rap Müsabakaları':
          // Competition and battle content
          return allContent.includes('müsabaka') || allContent.includes('yarışma') ||
                 allContent.includes('battle') || allContent.includes('competition');
                 
        default:
          return true;
      }
    });

    // If no content found in category, show all content (Better UX)
    filtered = categoryFiltered.length > 0 ? categoryFiltered : newsData;

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
      : filteredNews.slice(0, newsDiscoveryConfig.initialDisplayCount);
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
    <section className="relative w-full bg-black py-16 lg:py-24 overflow-x-hidden" role="region" aria-label="Keşfet bölümü">
      {/* Diamond Background - Behind everything */}
      <div className="discovery-diamond-background" aria-hidden="true">
        <Image 
          src="/icons/diamond.svg"
          alt=""
          fill
          className="object-contain"
          priority={false}
        />
      </div>

      <div className="discovery-content-wrapper overflow-x-hidden">
        <div className="container mx-auto py-8 px-4 lg:px-hero-gap-lg xl:px-hero-gap-xl w-full max-w-screen-2xl">
        
        {/* Header Section */}
        <div className="flex items-start justify-between mb-8 lg:mb-12 w-full max-w-full">
          {/* Title with Compass and Diamond Icons */}
          <div>
            <h1 className="font-saira-condensed font-bold text-4xl lg:text-8xl leading-[0.89] text-white flex items-center gap-4 mb-4">
              {newsDiscoveryConfig.title}
              <Image 
                src="/icons/compass.svg"
                alt=""
                width={80}
                height={80}
                className="w-10 h-10 lg:w-20 lg:h-20"
                aria-hidden="true"
              />
            </h1>
            
            {/* Mobile Only - NE GÖRMEK İSTERSİN */}
            {/* Migrated inline fontSize to text-body-lg token */}
            <h2 
              className="block lg:hidden font-saira font-bold text-white mb-6 text-body-lg"
            >
              NE GÖRMEK İSTERSİN?
            </h2>
          </div>

          {/* View Controls */}
          <div className="flex items-center gap-2 flex-wrap flex-shrink-0">
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
          categories={newsDiscoveryConfig.categories}
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
                : "grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8"
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
          // No Search Results - Only for search, not categories
          <div className="mb-12 lg:mb-16 text-center py-16">
            <div className="max-w-md mx-auto">
              <h3 className="font-saira-condensed font-bold text-2xl text-white mb-4">
                Arama Sonucu Bulunamadı
              </h3>
              <p className="font-saira font-normal text-ink-400 mb-6">
                &quot;{searchQuery}&quot; araması için sonuç bulunamadı.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setShowSearch(false);
                }}
                className="font-saira font-normal text-sm text-brand-yellow hover:text-white transition-colors duration-200"
              >
                Aramayı Temizle
              </button>
            </div>
          </div>
        )}

        {/* Load More Button - Unified Button Component */}
        {displayedNews.length > 0 && filteredNews.length > newsDiscoveryConfig.initialDisplayCount && (
          <div className="flex justify-center mb-8">
            <div className="cta-button-container">
              <Button
                variant="primary"
                size="md"
                onClick={handleToggleShowAll}
                className="uppercase tracking-wide"
                aria-expanded={showAllNews}
                aria-controls="news-grid"
                title={showAllNews ? newsDiscoveryConfig.loadMore.buttonText.hide : newsDiscoveryConfig.loadMore.buttonText.show}
              >
                {showAllNews ? newsDiscoveryConfig.loadMore.buttonText.hide : newsDiscoveryConfig.loadMore.buttonText.show}
              </Button>
              
              {/* Shadow Element */}
              <ButtonShadow />
            </div>
          </div>
        )}

        {/* Mobile Only - Klipler Section */}
        <div className="block lg:hidden mb-8 mt-24 w-full overflow-hidden">
          <ClipsSection />
        </div>

        </div>
      </div>
    </section>
  );
}

// ClipsSection component now extracted to separate file - components/news/ClipsSection.tsx
