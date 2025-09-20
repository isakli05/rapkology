'use client';

import { useState, useCallback, useMemo } from 'react';
import Image from 'next/image';
import { TrendingUp } from 'lucide-react';
import Button, { ButtonShadow } from '../ui/Button';
import mockData from '../../mock-data.json';

interface TrendItem {
  id: string;
  number: string;
  title: string;
  author: {
    name: string;
    avatar: string;
  };
}

interface MiniTrendsProps {
  className?: string;
  initialShowCount?: number;
}

interface MiniTrendsConfig {
  typography: {
    sectionTitle: string;
    trendNumber: string;
    trendTitle: string;
    authorName: string;
    readMore: string;
  };
  layout: {
    container: string;
    grid: string;
    showCount: number;
  };
  interactions: {
    titleHover: string;
    readMoreHover: string;
    transition: string;
  };
}

// Configuration - Consistent with design system
const miniTrendsConfig: MiniTrendsConfig = {
  typography: {
    sectionTitle: "font-saira-condensed font-bold leading-[0.89] text-white",
    trendNumber: "font-saira-condensed font-bold text-display-md leading-[0.89] text-ink-700",
    trendTitle: "font-saira-condensed font-bold text-heading-lg leading-[1.04] uppercase text-white",
    authorName: "font-saira font-normal text-base text-white",
    readMore: "font-saira font-normal text-base text-white"
  },
  layout: {
    container: "mb-12 lg:mb-16",
    grid: "grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8",
    showCount: 4
  },
  interactions: {
    titleHover: "group-hover:text-brand-yellow",
    readMoreHover: "hover:text-brand-yellow",
    transition: "transition-colors duration-200"
  }
};

export default function MiniTrends({ className = "", initialShowCount = 4 }: MiniTrendsProps) {
  const [showAll, setShowAll] = useState<boolean>(false);

  // Use mock data for trends
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
    : trendsData.slice(0, initialShowCount);

  const handleToggleShowAll = useCallback(() => {
    setShowAll(prev => !prev);
  }, []);

  return (
    <section className={`${miniTrendsConfig.layout.container} ${className}`}>
      {/* Trends Title */}
      <div className="flex items-start justify-center lg:justify-start mb-8 lg:mb-12">
        <h2 className={`${miniTrendsConfig.typography.sectionTitle} flex items-center gap-4 mt-16 lg:mt-24 text-display-md`}>
          TRENDLER
          <TrendingUp 
            className="w-8 h-8 lg:w-10 lg:h-10 text-brand-yellow" 
            strokeWidth={2}
            aria-hidden="true"
          />
        </h2>
      </div>

      {/* Trends Grid - 2x2 Layout */}
      <div className={miniTrendsConfig.layout.grid}>
        {displayedTrends.map((trend) => (
          <article key={trend.id} className="group">
            <div className="flex gap-4 lg:gap-6">
              {/* Trend Number */}
              <div className="flex-shrink-0">
                <span className={miniTrendsConfig.typography.trendNumber}>
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
                  <span className={miniTrendsConfig.typography.authorName}>
                    {trend.author.name}
                  </span>
                </div>

                {/* Title */}
                <h3 className={`${miniTrendsConfig.typography.trendTitle} mb-4 ${miniTrendsConfig.interactions.titleHover} cursor-pointer ${miniTrendsConfig.interactions.transition}`}>
                  {trend.title}
                </h3>

                {/* Divider */}
                <div className="border-t border-ink-700 mb-4"></div>

                {/* Read More */}
                <button className={`${miniTrendsConfig.typography.readMore} ${miniTrendsConfig.interactions.readMoreHover} ${miniTrendsConfig.interactions.transition}`}>
                  Daha Fazla Oku
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Show All Button */}
      <div className="flex justify-center mt-8 lg:mt-12">
        <div className="cta-button-container">
          <Button
            variant="primary"
            size="md"
            onClick={handleToggleShowAll}
            className="uppercase tracking-wide"
            aria-expanded={showAll}
          >
            {showAll ? 'Daha Az Göster' : 'Tümünü Gör'}
          </Button>
          <ButtonShadow />
        </div>
      </div>
    </section>
  );
}
