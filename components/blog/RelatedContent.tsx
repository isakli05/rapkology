'use client';

import { useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import mockData from '../../mock-data.json';

// Related Post Interface - Extracted from BlogDetailContent
interface RelatedPost {
  id: string;
  title: string;
  slug: string;
  coverImage: string;
}

interface RelatedContentProps {
  // Could be extended to accept currentPostId to filter out current post
  className?: string;
}

interface RelatedContentConfig {
  typography: {
    sectionTitle: string;
    itemTitle: string;
  };
  layout: {
    container: string;
    spacing: string;
    itemSpacing: string;
  };
  accessibility: {
    sectionLabel: string;
  };
}

// Configuration - Consistent with parent component
const relatedContentConfig: RelatedContentConfig = {
  typography: {
    sectionTitle: "font-saira-condensed font-bold leading-[0.89] text-white",
    itemTitle: "font-saira font-bold leading-[1.2] tracking-[0.015em] text-white"
  },
  layout: {
    container: "mb-12 lg:mb-16",
    spacing: "space-y-6", 
    itemSpacing: "mt-6"
  },
  accessibility: {
    sectionLabel: "İlgili yazılar"
  }
};

export default function RelatedContent({ className = "" }: RelatedContentProps) {
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
    <section 
      className={`${relatedContentConfig.layout.container} ${className}`} 
      aria-label={relatedContentConfig.accessibility.sectionLabel}
    >
      {/* Section Title - Design System Typography */}
      <h2 className={`${relatedContentConfig.typography.sectionTitle} mb-8 lg:mb-12 mt-16 lg:mt-24 text-display-md`}>
        DAHA FAZLA İÇERİK
      </h2>

      {/* Related Posts List */}
      <div className={relatedContentConfig.layout.spacing}>
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
                <h3 className={relatedContentConfig.typography.itemTitle}>
                  {post.title}
                </h3>
              </div>
            </Link>

            {/* Divider - Not for last item */}
            {index < relatedPosts.length - 1 && (
              <div className={`${relatedContentConfig.layout.itemSpacing} border-t border-ink-700`} aria-hidden="true" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
