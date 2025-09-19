'use client';

import { useState, useCallback } from 'react';
import { X } from 'lucide-react';
import Image from 'next/image';
import BlogCard from './BlogCard';
import CategoryTags from './CategoryTags';
import CategoryTabs from './CategoryTabs';
import Newsletter from './Newsletter';
import SocialFooter from './SocialFooter';
import BlogFooter from './BlogFooter';
import mockData from '../mock-data.json';

interface BlogPost {
  id: number;
  author: {
    name: string;
    avatar: string;
  };
  title: string;
  excerpt?: string;
  coverImage: string;
  publishDate: string;
  readMoreText: string;
  slug: string;
}

interface BlogDiscoveryConfig {
  sections: {
    blog: {
      title: string;
      postsPerPage: number;
    };
    sidebar: {
      categoryTitle: string;
      newsletterTitle: string;
    };
  };
  loadMore: {
    initialDisplayCount: number;
    buttonText: {
      show: string;
      hide: string;
    };
  };
  categories: string[];
  layout: {
    grid: {
      leftColumns: string;
      rightColumns: string;
    };
    typography: {
      titleSize: string;
    };
  };
  accessibility: {
    sectionLabel: string;
    searchLabel: string;
    contentDescription: string;
  };
}

// Design System Configuration - Enterprise Pattern
const blogDiscoveryConfig: BlogDiscoveryConfig = {
  sections: {
    blog: {
      title: "KEŞFET",
      postsPerPage: 10
    },
    sidebar: {
      categoryTitle: "NE GÖRMEK İSTERSİN?",
      newsletterTitle: "GELİŞMELERDEN İLK SEN HABERDAR OL!"
    }
  },
  loadMore: {
    initialDisplayCount: 5,
    buttonText: {
      show: "Daha Fazla Göster",
      hide: "Daha Az Göster"
    }
  },
  categories: [
    "Tümü",
    "Türk Rap",
    "Yabancı Rap",
    "Rap Haberleri", 
    "Haftanın Klipleri",
    "Ayın Klipleri",
    "Rap Sohbetleri",
    "Rap Müsabakaları",
  ],
  layout: {
    grid: {
      leftColumns: "lg:col-span-8",
      rightColumns: "lg:col-span-4"
    },
    typography: {
      titleSize: "text-[60px] lg:text-[80px]"
    }
  },
  accessibility: {
    sectionLabel: "Keşfet bölümü",
    searchLabel: "Blog yazıları arama",
    contentDescription: "Hip-hop ve rap müzik kültürü hakkında güncel blog yazıları ve haberleri keşfedin."
  }
};

// Data transformation function - API data'yı BlogPost interface'ine çevir
const transformMockDataToBlogPosts = (data: any[]): BlogPost[] => {
  return data.map((item, index) => {
    const publishDate = new Date(item.createdAt).toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // Avatar randomization için avatarlar arasında dönüşüm
    const avatars = ["/images/rapci_dayi.png", "/images/rapci_abla.png"];
    const avatar = avatars[index % avatars.length];

    return {
      id: parseInt(item._id.slice(-6), 16), // _id'nin son 6 karakterini sayıya çevir
      author: {
        name: item.attributes.authors[0] || "Rapkology",
        avatar: avatar
      },
      title: item.attributes.title,
      excerpt: item.attributes.desc || undefined,
      coverImage: item.attributes.img,
      publishDate: publishDate,
      readMoreText: "Daha Fazla Oku",
      slug: item.attributes.slug
    };
  });
};

// Real company data - mock-data.json'dan geliyor
const blogPostsData: BlogPost[] = transformMockDataToBlogPosts(mockData);

type ViewMode = 'list' | 'grid';

export default function BlogDiscovery() {
  const [activeCategory, setActiveCategory] = useState<string>('Tümü');
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>(blogPostsData);
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showAllPosts, setShowAllPosts] = useState<boolean>(false);

  // Enhanced category filtering with intelligent mapping - Senior Level Implementation
  const handleCategoryChange = useCallback((category: string) => {
    setActiveCategory(category);
    
    if (category === 'Tümü') {
      setFilteredPosts(blogPostsData);
    } else {
      // Intelligent category mapping to mock data content
      const categoryFiltered = blogPostsData.filter((post) => {
        const originalData = mockData.find(item => item.attributes.slug === post.slug);
        if (!originalData) return false;

        const { category: categories = [], tags = [] } = originalData.attributes;
        const allContent = [...categories, ...tags].join(' ').toLowerCase();
        
        // Intelligent category mapping - NewsDiscovery pattern
        switch (category) {
          case 'Türk Rap':
            return allContent.includes('türk') && allContent.includes('rap');
            
          case 'Yabancı Rap':
            return (allContent.includes('rap') || allContent.includes('hip-hop')) && 
                   !allContent.includes('türk');
                   
          case 'Rap Haberleri':
            return allContent.includes('rap') || allContent.includes('hip-hop') ||
                   allContent.includes('haber') || allContent.includes('news');
                   
          case 'Haftanın Klipleri':
            return allContent.includes('hafta') && 
                   (allContent.includes('video') || allContent.includes('klip'));
                   
          case 'Ayın Klipleri':
            return allContent.includes('ay') && 
                   (allContent.includes('video') || allContent.includes('klip'));
                   
          case 'Rap Sohbetleri':
            return allContent.includes('sohbet') || allContent.includes('röportaj') ||
                   allContent.includes('konuşma') || allContent.includes('interview') ||
                   allContent.includes('podcast');
                   
          case 'Rap Müsabakaları':
            return allContent.includes('müsabaka') || allContent.includes('yarışma') ||
                   allContent.includes('battle') || allContent.includes('competition') ||
                   allContent.includes('contest');
                   
          default:
            // Fallback: try direct match first
            return categories.includes(category) || tags.includes(category);
        }
      });

      // If no content found in category, show all content (Better UX)
      const filtered = categoryFiltered.length > 0 ? categoryFiltered : blogPostsData;
      setFilteredPosts(filtered);
    }
  }, []);

  const handleNewsletterSubmit = useCallback((email: string) => {
    // Newsletter subscription logic
    console.log('Newsletter subscription:', email);
  }, []);

  // View Controls Handlers
  const handleViewModeChange = useCallback((mode: ViewMode) => {
    setViewMode(mode);
  }, []);

  const handleSearchToggle = useCallback(() => {
    setShowSearch(prev => !prev);
    if (showSearch) {
      setSearchQuery('');
      setFilteredPosts(blogPostsData);
    }
  }, [showSearch]);

  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      const filtered = blogPostsData.filter(post => {
        const originalData = mockData.find(item => item.attributes.slug === post.slug);
        const content = originalData?.attributes.content || '';
        
        return (
          post.title.toLowerCase().includes(query.toLowerCase()) ||
          post.author.name.toLowerCase().includes(query.toLowerCase()) ||
          (post.excerpt && post.excerpt.toLowerCase().includes(query.toLowerCase())) ||
          content.toLowerCase().includes(query.toLowerCase())
        );
      });
      setFilteredPosts(filtered);
    } else {
      // Aktif kategoriye göre intelligent mapping filtreleme
      if (activeCategory === 'Tümü') {
        setFilteredPosts(blogPostsData);
      } else {
        // Same intelligent mapping logic as in handleCategoryChange
        const categoryFiltered = blogPostsData.filter((post) => {
          const originalData = mockData.find(item => item.attributes.slug === post.slug);
          if (!originalData) return false;

          const { category: categories = [], tags = [] } = originalData.attributes;
          const allContent = [...categories, ...tags].join(' ').toLowerCase();
          
          switch (activeCategory) {
            case 'Türk Rap':
              return allContent.includes('türk') && allContent.includes('rap');
              
            case 'Yabancı Rap':
              return (allContent.includes('rap') || allContent.includes('hip-hop')) && 
                     !allContent.includes('türk');
                     
            case 'Rap Haberleri':
              return allContent.includes('rap') || allContent.includes('hip-hop') ||
                     allContent.includes('haber') || allContent.includes('news');
                     
            case 'Haftanın Klipleri':
              return allContent.includes('hafta') && 
                     (allContent.includes('video') || allContent.includes('klip'));
                     
            case 'Ayın Klipleri':
              return allContent.includes('ay') && 
                     (allContent.includes('video') || allContent.includes('klip'));
                     
            case 'Rap Sohbetleri':
              return allContent.includes('sohbet') || allContent.includes('röportaj') ||
                     allContent.includes('konuşma') || allContent.includes('interview') ||
                     allContent.includes('podcast');
                     
            case 'Rap Müsabakaları':
              return allContent.includes('müsabaka') || allContent.includes('yarışma') ||
                     allContent.includes('battle') || allContent.includes('competition') ||
                     allContent.includes('contest');
                     
            default:
              return categories.includes(activeCategory) || tags.includes(activeCategory);
          }
        });

        const filtered = categoryFiltered.length > 0 ? categoryFiltered : blogPostsData;
        setFilteredPosts(filtered);
      }
    }
  }, [activeCategory]);

  // Load More Handler
  const handleToggleShowAll = useCallback(() => {
    setShowAllPosts(prev => !prev);
  }, []);

  // Calculate displayed posts based on showAllPosts state
  const displayedPosts = showAllPosts 
    ? filteredPosts 
    : filteredPosts.slice(0, blogDiscoveryConfig.loadMore.initialDisplayCount);

  return (
    <section 
      className="relative w-full bg-black py-16 lg:py-24"
      role="region"
      aria-label={blogDiscoveryConfig.accessibility.sectionLabel}
      aria-describedby="blog-discovery-desc"
    >
      <div className="container mx-auto px-hero-gap lg:px-hero-gap-lg xl:px-hero-gap-xl">
        
        {/* Mobile Layout */}
        <div className="lg:hidden">
          {/* Mobile Header */}
          <div className="flex items-start justify-between mb-8">
            <div>
              <h1 className="font-saira-condensed font-bold text-4xl leading-[0.89] text-white flex items-center gap-4 mb-4">
                {blogDiscoveryConfig.sections.blog.title}
                <Image 
                  src="/icons/compass.svg"
                  alt=""
                  width={40}
                  height={40}
                  className="w-10 h-10"
                  aria-hidden="true"
                />
              </h1>
              
              {/* Mobile Only - NE GÖRMEK İSTERSİN */}
              <h2 
                className="font-saira font-bold text-white mb-6"
                style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)', lineHeight: 1.04 }}
              >
                NE GÖRMEK İSTERSİN?
              </h2>
            </div>

            {/* Mobile View Controls */}
            <div className="flex items-center gap-2 flex-shrink-0">
              {/* Search Toggle */}
              <button
                onClick={handleSearchToggle}
                className={`p-2 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:ring-offset-2 focus:ring-offset-black rounded-sm ${
                  showSearch ? 'text-brand-yellow' : 'text-white hover:text-brand-yellow'
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

              {/* List View */}
              <button
                onClick={() => handleViewModeChange('list')}
                className={`p-2 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:ring-offset-2 focus:ring-offset-black rounded-sm ${
                  viewMode === 'list' ? 'text-brand-yellow' : 'text-white hover:text-brand-yellow'
                }`}
                aria-label="Liste görünümü"
                aria-pressed={viewMode === 'list'}
              >
                <Image 
                  src="/icons/single.svg" 
                  alt="List View" 
                  width={20} 
                  height={20} 
                  className="w-5 h-5" 
                />
              </button>

              {/* Grid View */}
              <button
                onClick={() => handleViewModeChange('grid')}
                className={`p-2 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:ring-offset-2 focus:ring-offset-black rounded-sm ${
                  viewMode === 'grid' ? 'text-brand-yellow' : 'text-white hover:text-brand-yellow'
                }`}
                aria-label="Grid görünümü"
                aria-pressed={viewMode === 'grid'}
              >
                <Image 
                  src="/icons/two_columns.svg" 
                  alt="Grid View" 
                  width={20} 
                  height={20} 
                  className="w-5 h-5" 
                />
              </button>
            </div>
          </div>

          {/* Mobile Category Tabs */}
          <CategoryTabs
            categories={blogDiscoveryConfig.categories}
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
          />

          {/* Mobile Search Input */}
          {showSearch && (
            <div className="mb-8">
              <div className="relative max-w-md">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  placeholder="Blog yazıları ara..."
                  className="w-full px-4 py-3 bg-transparent border-b border-ink-500 text-white placeholder-ink-500 font-saira font-normal text-base focus:outline-none focus:border-brand-yellow transition-colors duration-200"
                  autoFocus
                />
                {searchQuery && (
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-500 text-sm">
                    {filteredPosts.length} sonuç
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Mobile Blog Posts Feed */}
          <div 
            className={
              viewMode === 'grid' 
                ? "grid grid-cols-1 sm:grid-cols-2 gap-6" 
                : "space-y-8"
            }
            role="feed"
            aria-label={`${displayedPosts.length} blog yazısı gösteriliyor`}
          >
            {displayedPosts.map((post, index) => (
              <BlogCard
                key={post.id}
                post={post}
                priority={index < 3}
                viewMode={viewMode}
              />
            ))}
          </div>

          {/* Mobile Load More Button */}
          {filteredPosts.length > blogDiscoveryConfig.loadMore.initialDisplayCount && (
            <div className="flex justify-center mt-12">
              <div className="cta-button-container">
                <button
                  onClick={handleToggleShowAll}
                  className="cta-button uppercase tracking-wide bg-white"
                  aria-expanded={showAllPosts}
                  aria-controls="blog-posts-feed"
                >
                  {showAllPosts ? blogDiscoveryConfig.loadMore.buttonText.hide : blogDiscoveryConfig.loadMore.buttonText.show}
                </button>
                <div className="cta-button-shadow" aria-hidden="true"></div>
              </div>
            </div>
          )}

          {/* Mobile Only - Footer Section (like /haberler page) */}
          <div className="mt-16 lg:hidden">
            <BlogFooter />
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:grid grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left Section - Blog Content Feed */}
          <div className={`${blogDiscoveryConfig.layout.grid.leftColumns} space-y-8 lg:space-y-12`}>
            
            {/* Section Header - Design System Typography */}
            <div className="flex items-start justify-between mb-8 lg:mb-12">
              <h1 className={`font-saira-condensed font-bold ${blogDiscoveryConfig.layout.typography.titleSize} leading-[0.89] text-white flex items-center gap-4`}>
                {blogDiscoveryConfig.sections.blog.title}
                <Image 
                  src="/icons/compass.svg"
                  alt=""
                  width={80}
                  height={80}
                  className="w-20 h-20"
                  aria-hidden="true"
                />
              </h1>

              {/* View Controls - Design System Component */}
              <div className="flex items-center gap-3">
                {/* Search Toggle */}
                <button
                  onClick={handleSearchToggle}
                  className={`p-2 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:ring-offset-2 focus:ring-offset-black rounded-sm ${
                    showSearch ? 'text-brand-yellow' : 'text-white hover:text-brand-yellow'
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

                {/* List View */}
                <button
                  onClick={() => handleViewModeChange('list')}
                  className={`p-2 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:ring-offset-2 focus:ring-offset-black rounded-sm ${
                    viewMode === 'list' ? 'text-brand-yellow' : 'text-white hover:text-brand-yellow'
                  }`}
                  aria-label="Liste görünümü"
                  aria-pressed={viewMode === 'list'}
                >
                  <Image 
                    src="/icons/single.svg" 
                    alt="List View" 
                    width={20} 
                    height={20} 
                    className="w-5 h-5" 
                  />
                </button>

                {/* Grid View */}
                <button
                  onClick={() => handleViewModeChange('grid')}
                  className={`p-2 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:ring-offset-2 focus:ring-offset-black rounded-sm ${
                    viewMode === 'grid' ? 'text-brand-yellow' : 'text-white hover:text-brand-yellow'
                  }`}
                  aria-label="Grid görünümü"
                  aria-pressed={viewMode === 'grid'}
                >
                  <Image 
                    src="/icons/two_columns.svg" 
                    alt="Grid View" 
                    width={20} 
                    height={20} 
                    className="w-5 h-5" 
                  />
                </button>
              </div>
            </div>

            {/* Search Input - Conditional Render */}
            {showSearch && (
              <div className="mb-8 lg:mb-12">
                <div className="relative max-w-md">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    placeholder="Blog yazıları ara..."
                    className="w-full px-4 py-3 bg-transparent border-b border-ink-500 text-white placeholder-ink-500 font-saira font-normal text-base focus:outline-none focus:border-brand-yellow transition-colors duration-200"
                    autoFocus
                  />
                  {searchQuery && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-500 text-sm">
                      {filteredPosts.length} sonuç
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Blog Posts Feed */}
            <div 
              className={
                viewMode === 'grid' 
                  ? "grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8" 
                  : "space-y-8 lg:space-y-12"
              }
              role="feed"
              aria-label={`${displayedPosts.length} blog yazısı gösteriliyor`}
            >
              {displayedPosts.map((post, index) => (
                <BlogCard
                  key={post.id}
                  post={post}
                  priority={index < 3}
                  viewMode={viewMode}
                />
              ))}
            </div>

            {/* Load More Button - Only show when there are more posts to load */}
            {filteredPosts.length > blogDiscoveryConfig.loadMore.initialDisplayCount && (
              <div className="flex justify-center mt-12 lg:mt-16">
                <div className="cta-button-container">
                  <button
                    onClick={handleToggleShowAll}
                    className="cta-button uppercase tracking-wide bg-white"
                    aria-expanded={showAllPosts}
                    aria-controls="blog-posts-feed"
                    aria-describedby="load-more-desc"
                    title={showAllPosts ? blogDiscoveryConfig.loadMore.buttonText.hide : blogDiscoveryConfig.loadMore.buttonText.show}
                  >
                    {showAllPosts ? blogDiscoveryConfig.loadMore.buttonText.hide : blogDiscoveryConfig.loadMore.buttonText.show}
                  </button>
                  
                  {/* Shadow Element */}
                  <div className="cta-button-shadow" aria-hidden="true"></div>
                </div>
              </div>
            )}

          </div>

          {/* Right Section - Sidebar */}
          <div className={`${blogDiscoveryConfig.layout.grid.rightColumns} sidebar-spacing pt-8 lg:pt-12`}>
            
            {/* Category Filter Tags */}
            <CategoryTags
              title={blogDiscoveryConfig.sections.sidebar.categoryTitle}
              categories={blogDiscoveryConfig.categories}
              activeCategory={activeCategory}
              onCategoryChange={handleCategoryChange}
            />

            {/* Newsletter Subscription */}
            <Newsletter
              title={blogDiscoveryConfig.sections.sidebar.newsletterTitle}
              onSubmit={handleNewsletterSubmit}
            />

            {/* Social Links & Footer */}
            <SocialFooter variant="homepage" />

          </div>

        </div>

        {/* Screen Reader Descriptions */}
        <div id="blog-discovery-desc" className="sr-only">
          {blogDiscoveryConfig.accessibility.contentDescription}
        </div>

        <div id="load-more-desc" className="sr-only">
          Bu buton ile tüm blog yazılarını görüntüleyebilir veya sadece ilk beşini gösterebilirsiniz.
        </div>

      </div>
    </section>
  );
}




