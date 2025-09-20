'use client';

import { memo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { ViewMode } from '@/types/common';

interface NewsCardProps {
  news: {
    id: string;
    author: {
      name: string;
      avatar: string;
    };
    title: string;
    img: string;
    slug: string;
    publishDate: string;
  };
  priority?: boolean;
  viewMode?: ViewMode; // Uses unified ViewMode type: 'list' | 'grid' | 'single' | 'double'
}

// Senior Level NewsCard Component - Design System Pattern
const NewsCard = memo(function NewsCard({ news, priority = false, viewMode = 'double' }: NewsCardProps) {
  return (
    <article className="news-card group">
      {/* News Image - Sharp Corners */}
      <div className="news-card-image">
        <Image
          src={news.img}
          alt={news.title}
          fill
          priority={priority}
          className="object-cover"
          sizes={viewMode === 'single' ? '100vw' : '(max-width: 768px) 100vw, 25vw'}
        />
      </div>

      {/* Author Info - Mobile Above Title */}
      <div className="flex items-center gap-3 mb-4 lg:order-first">
        <div className="relative w-8 h-8 overflow-hidden flex-shrink-0">
          <Image
            src={news.author.avatar}
            alt={news.author.name}
            fill
            className="object-cover"
            sizes="32px"
          />
        </div>
        <span className="font-saira font-bold lg:font-normal text-sm text-white">
          {news.author.name}
        </span>
      </div>

      {/* Date Info - Figma Spec Typography */}
      <div className="news-card-date">
        {news.publishDate}
      </div>

      {/* News Content */}
      <div>
        {/* Title - Figma Spec Typography */}
        <h3 className="news-card-title group-hover:text-brand-yellow">
          {news.title}
        </h3>

        {/* Separator Line */}
        <div className="news-card-separator" aria-hidden="true"></div>

        {/* Read More Link - Figma Spec Typography */}
        <div>
          <Link 
            href={`/blog/${news.slug}`}
            className="news-card-link"
          >
            Daha Fazla Oku
          </Link>
        </div>
      </div>

      {/* Link overlay for full card clickability */}
      <Link 
        href={`/blog/${news.slug}`}
        className="absolute inset-0 z-10"
        aria-label={`${news.title} haberini oku`}
      />
    </article>
  );
});

export default NewsCard;
