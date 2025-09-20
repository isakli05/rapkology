'use client';

import { memo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { ViewMode } from '@/types/common';

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

interface BlogCardProps {
  post: BlogPost;
  priority?: boolean;
  viewMode?: ViewMode;
}

interface BlogCardConfig {
  layout: {
    imageContainer: {
      aspectRatio: string;
      borderRadius: string;
    };
    contentSpacing: string;
  };
  typography: {
    authorName: string;
    publishDate: string;
    title: string;
    readMore: string;
  };
  interactions: {
    hoverTransition: string;
    titleHover: string;
    readMoreHover: string;
  };
  accessibility: {
    cardRole: string;
    imageAlt: (title: string) => string;
    authorAlt: (name: string) => string;
    readMoreLabel: (title: string) => string;
  };
}

// Design System Configuration - Enterprise Pattern
const blogCardConfig: BlogCardConfig = {
  layout: {
    imageContainer: {
      aspectRatio: "aspect-[4/3]",
      borderRadius: ""
    },
    contentSpacing: "space-y-4"
  },
  typography: {
    authorName: "font-saira font-normal text-base leading-[1.2] tracking-[0.015em] text-white",
    publishDate: "font-saira font-normal text-base leading-[1.2] tracking-[0.015em] text-ink-500",
    title: "font-saira-condensed font-bold text-heading-lg leading-[1.04] uppercase text-white", // migrated from text-[25px]
    readMore: "font-saira font-normal text-base leading-[1.2] tracking-[0.015em] text-white"
  },
  interactions: {
    hoverTransition: "transition-colors duration-200",
    titleHover: "hover:text-brand-yellow cursor-pointer",
    readMoreHover: "hover:text-brand-yellow"
  },
  accessibility: {
    cardRole: "article",
    imageAlt: (title: string) => `${title} blog yazısı kapak görseli`,
    authorAlt: (name: string) => `${name} profil resmi`,
    readMoreLabel: (title: string) => `${title} yazısını okumak için tıklayın`
  }
};

const BlogCard = memo(function BlogCard({ post, priority = false, viewMode = 'list' }: BlogCardProps) {

  // Grid view için kompakt layout
  if (viewMode === 'grid') {
    return (
      <Link 
        href={`/blog/${post.slug}`}
        className="block relative group cursor-pointer"
        aria-label={blogCardConfig.accessibility.readMoreLabel(post.title)}
      >
        <article 
          className="relative group transition-all duration-300 hover:shadow-lg hover:shadow-brand-yellow/10"
          role={blogCardConfig.accessibility.cardRole}
          aria-labelledby={`blog-title-${post.id}`}
        >
        <div className="flex flex-col space-y-4">
          
          {/* Cover Image - Compact */}
          <div className="relative">
            <div className={`relative ${blogCardConfig.layout.imageContainer.aspectRatio} ${blogCardConfig.layout.imageContainer.borderRadius} overflow-hidden`}>
              <Image
                src={post.coverImage}
                alt={blogCardConfig.accessibility.imageAlt(post.title)}
                fill
                priority={priority}
                className="blog-card-image object-contain w-full h-full"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 280px, 280px"
              />
            </div>
            
            {/* Date Below Image - Fixed Position */}
            <div className="mt-2">
              <span className={`${blogCardConfig.typography.publishDate} text-ink-500`}>
                {post.publishDate}
              </span>
            </div>
          </div>

          {/* Content Area - Compact */}
          <div className="space-y-3">
            
            {/* Author Info */}
            <div className="flex items-center gap-3">
              <div className="relative w-6 h-6 rounded-full overflow-hidden">
                <Image
                  src={post.author.avatar}
                  alt={blogCardConfig.accessibility.authorAlt(post.author.name)}
                  fill
                  className="object-cover"
                  sizes="24px"
                />
              </div>
              <span className="font-saira font-normal text-sm leading-[1.2] tracking-[0.015em] text-white">
                {post.author.name}
              </span>
            </div>

            {/* Blog Title - Compact */}
            <h3 
              id={`blog-title-${post.id}`}
              className="blog-card-title font-saira-condensed font-bold text-lg leading-[1.04] uppercase text-white group-hover:opacity-80 transition-opacity duration-300 line-clamp-2 max-w-[85%]"
            >
              {post.title}
            </h3>

            {/* Divider with spacing */}
            <div className="border-t border-ink-700 my-4"></div>

            {/* Read More Text - After divider */}
            <div>
              <span className="font-saira font-normal text-sm leading-[1.2] tracking-[0.015em] text-white group-hover:opacity-80 transition-opacity duration-300 inline-block">
                {post.readMoreText}
              </span>
            </div>

          </div>

        </div>
        </article>
      </Link>
    );
  }

  // List view için full layout (varsayılan)
  return (
    <Link 
      href={`/blog/${post.slug}`}
      className="block relative group cursor-pointer xl:w-[80%]"
      aria-label={blogCardConfig.accessibility.readMoreLabel(post.title)}
    >
      <article 
        className="relative group transition-all duration-300 hover:shadow-lg hover:shadow-brand-yellow/10 hover:bg-gray-900/30"
        role={blogCardConfig.accessibility.cardRole}
        aria-labelledby={`blog-title-${post.id}`}
      >
      <div className="flex flex-col">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          
          {/* Cover Image - Design System Component */}
          <div className="flex-shrink-0 w-full lg:w-80">
            <div className={`relative ${blogCardConfig.layout.imageContainer.aspectRatio} ${blogCardConfig.layout.imageContainer.borderRadius} overflow-hidden`}>
              <Image
                src={post.coverImage}
                alt={blogCardConfig.accessibility.imageAlt(post.title)}
                fill
                priority={priority}
                className="blog-card-image object-contain w-full h-full"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 320px, 320px"
              />
            </div>
            
            {/* Date Below Image - Fixed Position */}
            <div className="mt-2">
              <span className={`${blogCardConfig.typography.publishDate} text-ink-500`}>
                {post.publishDate}
              </span>
            </div>
          </div>

          {/* Content Area - Design System Layout */}
          <div className={`flex-1 ${blogCardConfig.layout.contentSpacing}`}>
            
            {/* Author Info */}
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-8 h-8 rounded-full overflow-hidden">
                <Image
                  src={post.author.avatar}
                  alt={blogCardConfig.accessibility.authorAlt(post.author.name)}
                  fill
                  className="object-cover"
                  sizes="32px"
                />
              </div>
              <span className={blogCardConfig.typography.authorName}>
                {post.author.name}
              </span>
            </div>

            {/* Blog Title - Clickable with hover effect */}
            <h2 
              id={`blog-title-${post.id}`}
              className={`blog-card-title ${blogCardConfig.typography.title} group-hover:opacity-80 transition-opacity duration-300 mb-4 max-w-[95%]`}
            >
              {post.title}
            </h2>

            {/* Excerpt if available */}
            {post.excerpt && (
              <p className={`${blogCardConfig.typography.authorName} mb-6 line-clamp-3`}>
                {post.excerpt}
              </p>
            )}

            {/* Divider with enhanced spacing */}
            <div className="border-t border-ink-700 my-6"></div>

            {/* Read More Text - After divider */}
            <div>
              <span className={`${blogCardConfig.typography.readMore} group-hover:opacity-80 transition-opacity duration-300 inline-block`}>
                {post.readMoreText}
              </span>
            </div>

          </div>
        </div>
      </div>
      </article>
    </Link>
  );
});

export default BlogCard;
