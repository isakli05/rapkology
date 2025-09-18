'use client';

import Image from 'next/image';
import Link from 'next/link';

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
  viewMode?: 'single' | 'double';
}

// Senior Level NewsCard Component - Design System Pattern
export default function NewsCard({ news, priority = false, viewMode = 'double' }: NewsCardProps) {
  return (
    <article className="relative group cursor-pointer">
      {/* Author Info */}
      <div className="flex items-center gap-3 mb-4">
        <div className="relative w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
          <Image
            src={news.author.avatar}
            alt={news.author.name}
            fill
            className="object-cover"
            sizes="32px"
          />
        </div>
        <span className="font-saira font-normal text-sm text-white">
          {news.author.name}
        </span>
      </div>

      {/* News Image */}
      <div className="relative aspect-video overflow-hidden rounded-lg mb-4">
        <Image
          src={news.img}
          alt={news.title}
          fill
          priority={priority}
          className="object-cover"
          sizes={viewMode === 'single' ? '100vw' : '(max-width: 768px) 100vw, 25vw'}
        />
      </div>

      {/* Date Info */}
      <div className="mb-3">
        <span className="font-saira font-normal text-sm text-ink-400">
          {news.publishDate}
        </span>
      </div>

      {/* News Content */}
      <div className="space-y-4">
        {/* Title */}
        <h3 className="font-saira-condensed font-bold text-base lg:text-lg leading-tight text-white line-clamp-3 group-hover:text-brand-yellow transition-colors duration-200">
          {news.title}
        </h3>

        {/* Read More Link */}
        <div>
          <Link 
            href={`/haberler/${news.slug}`}
            className="font-saira font-normal text-sm text-ink-300 hover:text-brand-yellow transition-colors duration-200"
          >
            Daha Fazla Oku
          </Link>
        </div>
      </div>

      {/* Link overlay for full card clickability */}
      <Link 
        href={`/haberler/${news.slug}`}
        className="absolute inset-0 z-10"
        aria-label={`${news.title} haberini oku`}
      />
    </article>
  );
}
