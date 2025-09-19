'use client';

import { useState, useCallback, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Eye, Heart, MessageCircle, TrendingUp } from 'lucide-react';
import Navbar from './Navbar';
import Newsletter from './Newsletter';
import SocialFooter from './SocialFooter';
import mockData from '../mock-data.json';

// Type Definitions - Enterprise Pattern
interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  coverImage: string;
  author: {
    name: string;
    avatar: string;
  };
  publishDate: string;
  tags: string[];
  category: string[];
  engagement: {
    viewCount: number;
    likeCount: number;
    commentCount: number;
  };
  seo: {
    metaTitle: string;
    metaDescription: string;
    canonicalURL: string;
  };
}

interface RelatedPost {
  id: string;
  title: string;
  slug: string;
  coverImage: string;
}

interface BlogDetailContentProps {
  post: BlogPost;
  slug: string;
}

interface BlogDetailConfig {
  layout: {
    grid: {
      leftColumns: string;
      rightColumns: string;
    };
    spacing: {
      section: string;
      content: string;
    };
  };
  typography: {
    title: string;
    excerpt: string;
    content: string;
    relatedTitle: string;
    relatedItemTitle: string;
  };
  engagement: {
    container: string;
    item: string;
    icon: string;
    count: string;
    label: string;
  };
  tags: {
    container: string;
    tag: string;
  };
  trends: {
    grid: {
      initial: string;
      full: string;
    };
    showCount: number;
  };
  accessibility: {
    sectionLabel: string;
    contentLabel: string;
    relatedLabel: string;
  };
}

// Design System Configuration - Enterprise Pattern  
const blogDetailConfig: BlogDetailConfig = {
  layout: {
    grid: {
      leftColumns: "lg:col-span-8",
      rightColumns: "lg:col-span-4"
    },
    spacing: {
      section: "py-16 lg:py-24",
      content: "space-y-6 lg:space-y-8"
    }
  },
  typography: {
    // Design System Responsive Typography - NOT pixel perfect
    title: "font-saira-condensed font-bold leading-[0.89] text-white",
    excerpt: "font-saira-condensed font-bold leading-[1.04] uppercase text-white",
    content: "font-saira font-normal leading-[1.2] tracking-[0.015em] text-white",
    relatedTitle: "font-saira-condensed font-bold leading-[0.89] text-white",
    relatedItemTitle: "font-saira font-bold leading-[1.2] tracking-[0.015em] text-white"
  },
  engagement: {
    container: "flex items-center gap-6 mb-8",
    item: "flex items-center gap-2",
    icon: "w-4 h-4",
    count: "font-saira font-bold text-base text-white",
    label: "font-saira font-normal text-base text-white"
  },
  tags: {
    container: "flex flex-wrap gap-3 mb-8 lg:mb-12",
    tag: "px-3 py-1 bg-ink-800 text-white font-saira font-normal text-sm"
  },
  trends: {
    grid: {
      initial: "grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8",
      full: "grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
    },
    showCount: 4 // 2x2 grid, show first 4
  },
  accessibility: {
    sectionLabel: "Blog yazısı detayı",
    contentLabel: "Blog yazısı içeriği", 
    relatedLabel: "İlgili yazılar"
  }
};

// Breadcrumb Component - Design System
const BlogBreadcrumb = ({ title }: { title: string }) => (
  <nav className="mb-6 lg:mb-8" aria-label="Breadcrumb">
    <div className="flex items-center space-x-2 font-saira font-normal text-sm text-white">
      <Link href="/" className="hover:text-brand-yellow transition-colors duration-200">
        ANA SAYFA
      </Link>
      <span className="text-ink-500">{'>'}</span>
      <Link href="/blog" className="hover:text-brand-yellow transition-colors duration-200">
        BLOG
      </Link>
      <span className="text-ink-500">{'>'}</span>
      <span className="text-white font-bold truncate max-w-xs" title={title}>
        {title.toUpperCase()}
      </span>
    </div>
  </nav>
);

// View Counter Component - Design System
const ViewCounter = ({ count }: { count: number }) => (
  <div className="flex items-center gap-2 mb-6 lg:mb-8">
    <Eye className="w-5 h-5 text-white" strokeWidth={2} />
    <span className="font-saira font-normal text-base text-white">
      {count.toLocaleString('tr-TR')}
    </span>
  </div>
);

// Blog Tags Component - Design System
const BlogTags = ({ tags }: { tags: string[] }) => (
  <div className={blogDetailConfig.tags.container}>
    {tags.map((tag, index) => (
      <span
        key={index}
        className={blogDetailConfig.tags.tag}
        role="button"
        tabIndex={0}
      >
        {tag}
      </span>
    ))}
  </div>
);

// Engagement Stats Component - Design System
const EngagementStats = ({ 
  likeCount, 
  commentCount 
}: { 
  likeCount: number; 
  commentCount: number; 
}) => (
  <div className={blogDetailConfig.engagement.container}>
    {/* Likes */}
    <div className={blogDetailConfig.engagement.item}>
      <Heart 
        className={blogDetailConfig.engagement.icon} 
        strokeWidth={2} 
        fill="currentColor"
      />
      <span className={blogDetailConfig.engagement.count}>
        {likeCount}
      </span>
      <span className={blogDetailConfig.engagement.label}>
        Kişi Beğendi
      </span>
    </div>

    {/* Comments */}
    <div className={blogDetailConfig.engagement.item}>
      <MessageCircle 
        className={blogDetailConfig.engagement.icon} 
        strokeWidth={2}
      />
      <span className={blogDetailConfig.engagement.count}>
        {commentCount}
      </span>
    </div>
  </div>
);

// Related Content Component - Design System
const RelatedContent = () => {
  // Get related posts from mock data (first 3)
  const relatedPosts: RelatedPost[] = useMemo(() => {
    return mockData.slice(0, 3).map(item => ({
      id: item._id,
      title: item.attributes.title,
      slug: item.attributes.slug,
      coverImage: item.attributes.img
    }));
  }, []);

  return (
    <section className="mb-12 lg:mb-16" aria-label={blogDetailConfig.accessibility.relatedLabel}>
      {/* Section Title - Design System Typography */}
      <h2 className={`${blogDetailConfig.typography.relatedTitle} mb-8 lg:mb-12`} 
          style={{ fontSize: 'clamp(2.5rem, 4vw, 3.75rem)' }}>
        DAHA FAZLA İÇERİK
      </h2>

      {/* Related Posts List */}
      <div className="space-y-6">
        {relatedPosts.map((post, index) => (
          <div key={post.id}>
            <Link 
              href={`/blog/${post.slug}`}
              className="flex gap-4 lg:gap-6 group hover:opacity-80 transition-opacity duration-200"
            >
              {/* Post Image */}
              <div className="flex-shrink-0 relative w-20 h-16 lg:w-24 lg:h-20 bg-ink-900 rounded overflow-hidden">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 80px, 96px"
                />
              </div>

              {/* Post Title */}
              <div className="flex-1 flex items-center">
                <h3 className={blogDetailConfig.typography.relatedItemTitle}>
                  {post.title}
                </h3>
              </div>
            </Link>

            {/* Divider - Not for last item */}
            {index < relatedPosts.length - 1 && (
              <div className="mt-6 border-t border-ink-700" aria-hidden="true" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

// Mini Trends Component - Modified for Blog Detail
const MiniTrends = () => {
  const [showAll, setShowAll] = useState<boolean>(false);

  // Use first 8 items from mock data for trends
  const trendsData = useMemo(() => {
    return mockData.slice(0, 8).map((item, index) => ({
      id: item._id,
      number: (index + 1).toString().padStart(2, '0'),
      title: item.attributes.title,
      author: {
        name: item.attributes.authors[0] || 'Rapkology',
        avatar: index % 2 === 0 ? '/images/rapci_dayi.png' : '/images/rapci_abla.png'
      }
    }));
  }, []);

  const displayedTrends = showAll 
    ? trendsData 
    : trendsData.slice(0, blogDetailConfig.trends.showCount);

  const handleToggleShowAll = useCallback(() => {
    setShowAll(prev => !prev);
  }, []);

  return (
    <section className="mb-12 lg:mb-16">
      {/* Trends Title */}
      <div className="flex items-start justify-start mb-8 lg:mb-12">
        <h2 className={`${blogDetailConfig.typography.relatedTitle} flex items-center gap-4`}
            style={{ fontSize: 'clamp(2.5rem, 4vw, 3.75rem)' }}>
          TRENDLER
          <TrendingUp 
            className="w-8 h-8 lg:w-10 lg:h-10 text-brand-yellow" 
            strokeWidth={2}
            aria-hidden="true"
          />
        </h2>
      </div>

      {/* Trends Grid - 2x2 Layout */}
      <div className={blogDetailConfig.trends.grid.initial}>
        {displayedTrends.map((trend) => (
          <article key={trend.id} className="group">
            <div className="flex gap-4 lg:gap-6">
              {/* Trend Number */}
              <div className="flex-shrink-0">
                <span className="font-saira-condensed font-bold text-[60px] leading-[0.89] text-ink-700">
                  {trend.number}
                </span>
              </div>

              {/* Content */}
              <div className="flex-1 pt-2">
                {/* Author */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative w-8 h-8 rounded-full overflow-hidden">
                    <Image
                      src={trend.author.avatar}
                      alt={trend.author.name}
                      fill
                      className="object-cover"
                      sizes="32px"
                    />
                  </div>
                  <span className="font-saira font-normal text-base text-white">
                    {trend.author.name}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-saira-condensed font-bold text-[25px] leading-[1.04] uppercase text-white mb-4 group-hover:text-brand-yellow transition-colors duration-200 cursor-pointer">
                  {trend.title}
                </h3>

                {/* Divider */}
                <div className="border-t border-ink-700 mb-4"></div>

                {/* Read More */}
                <button className="font-saira font-normal text-base text-white hover:text-brand-yellow transition-colors duration-200">
                  Daha Fazla Oku
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Show All Button - Same CTA Design */}
      <div className="flex justify-center mt-8 lg:mt-12">
        <div className="cta-button-container">
          <button
            onClick={handleToggleShowAll}
            className="cta-button uppercase tracking-wide"
            aria-expanded={showAll}
          >
            {showAll ? 'Daha Az Göster' : 'Tümünü Gör'}
          </button>
          <div className="cta-button-shadow" aria-hidden="true"></div>
        </div>
      </div>
    </section>
  );
};

export default function BlogDetailContent({ post }: BlogDetailContentProps) {
  // Newsletter handler
  const handleNewsletterSubmit = useCallback(async (email: string) => {
    console.log('Newsletter subscription:', email);
  }, []);

  return (
    <>
      {/* Navbar */}
      <Navbar />
      
      <main className="relative w-full bg-black pt-16 lg:pt-20" role="main">
        <div className="container mx-auto px-4 lg:px-hero-gap-lg xl:px-hero-gap-xl">
        <div className={blogDetailConfig.layout.spacing.section}>
          
          {/* Grid Layout - 8-4 Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 lg:gap-36">
            
            {/* Left Section - Blog Content */}
            <article className={`${blogDetailConfig.layout.grid.leftColumns} ${blogDetailConfig.layout.spacing.content}`}>
              
              {/* Breadcrumb */}
              <BlogBreadcrumb title={post.title} />

              {/* View Counter */}
              <ViewCounter count={post.engagement.viewCount} />

              {/* Blog Title - Design System Responsive Typography */}
              <h1 
                className={blogDetailConfig.typography.title}
                style={{ fontSize: 'clamp(2.5rem, 5vw, 3.75rem)' }}
              >
                {post.title}
              </h1>

              {/* Blog Excerpt/Summary - Design System Typography */}
              <div 
                className={`${blogDetailConfig.typography.excerpt} my-6 lg:my-8`}
                style={{ fontSize: 'clamp(1.25rem, 2vw, 1.5rem)' }}
              >
                {post.excerpt}
              </div>

              {/* Blog Content - Design System Typography */}
              <div 
                className={`${blogDetailConfig.typography.content} prose prose-invert max-w-none`}
                style={{ fontSize: 'clamp(1rem, 1.2vw, 1.125rem)' }}
              >
                {/* Cover Image - Full Width */}
                <div className="relative w-full aspect-video mb-8 lg:mb-12 group cursor-pointer">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 800px"
                  />
                  
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 lg:w-20 lg:h-20 transition-transform duration-300 group-hover:scale-110">
                      <Image
                        src="/images/play.svg"
                        alt="Play video"
                        width={80}
                        height={80}
                        className="w-full h-full drop-shadow-lg"
                      />
                    </div>
                  </div>
                </div>

                {/* Content Text - Simulated blog content */}
                <div className="space-y-6">
                  <p>{post.content}</p>
                </div>
              </div>

              {/* Blog Tags */}
              <BlogTags tags={post.tags} />

              {/* Engagement Stats */}
              <EngagementStats 
                likeCount={post.engagement.likeCount}
                commentCount={post.engagement.commentCount}
              />

              {/* Related Content */}
              <RelatedContent />

              {/* Mini Trends */}
              <MiniTrends />

            </article>

            {/* Right Section - Sidebar */}
            <aside className={`${blogDetailConfig.layout.grid.rightColumns} sidebar-spacing pt-8 lg:pt-12`}>
              
              {/* Newsletter */}
              <Newsletter
                title="GELİŞMELERDEN İLK SEN HABERDAR OL!"
                onSubmit={handleNewsletterSubmit}
              />

              {/* Social Footer */}
              <SocialFooter variant="blog" />

            </aside>

          </div>

        </div>
      </div>
    </main>
    </>
  );
}
