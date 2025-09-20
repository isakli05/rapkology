'use client';

import Image from 'next/image';
import { useState, useCallback } from 'react';
import { TrendingUp } from 'lucide-react';
import Button, { ButtonShadow } from '@/components/ui/Button';

interface TrendItem {
  id: number;
  number: string;
  author: {
    name: string;
    avatar: string;
  };
  title: string;
  readMoreText: string;
}

interface TrendsConfig {
  title: string;
  showAllButton: {
    show: string;
    hide: string;
  };
  initialDisplayCount: number;
}

// Design System Configuration - Centralized & Typed
const trendsConfig: TrendsConfig = {
  title: "TRENDLER",
  showAllButton: {
    show: "Tümünü Gör",
    hide: "Daha Az Göster"
  },
  initialDisplayCount: 6
};

// Mock data - Bu gerçek uygulamada API'den gelecek
const trendsData: TrendItem[] = [
  {
    id: 1,
    number: "01",
    author: {
      name: "Jonathan Stewart",
      avatar: "/images/rapci_dayi.png"
    },
    title: "LOREM IPSUM DOLOR SIT AMET CONSECTETUR ADIPISCING ELIT UT ET MASSA MI.",
    readMoreText: "Daha Fazla Oku"
  },
  {
    id: 2,
    number: "02", 
    author: {
      name: "Steve Rogerson",
      avatar: "/images/rapci_abla.png"
    },
    title: "PRAESENT LOREM ORCI, MATTIS NON EFFICITUR ID CURABITUR AT RISUS SODALES AENEAN AT.",
    readMoreText: "Daha Fazla Oku"
  },
  {
    id: 3,
    number: "03",
    author: {
      name: "İsmail Kor", 
      avatar: "/images/rapci_dayi.png"
    },
    title: "ULTRICIES DIGNISSIM NIBH UT CURSUS. NAM ET QUAM SIT AMET TURPIS FINIBUS MAXIMUS ...",
    readMoreText: "Daha Fazla Oku"
  },
  {
    id: 4,
    number: "04",
    author: {
      name: "Jonathan Stewart",
      avatar: "/images/rapci_abla.png"
    },
    title: "LOREM IPSUM DOLOR SIT AMET CONSECTETUR ADIPISCING ELIT UT ET MASSA MI.",
    readMoreText: "Daha Fazla Oku"
  },
  {
    id: 5,
    number: "05",
    author: {
      name: "Steve Rogerson", 
      avatar: "/images/rapci_dayi.png"
    },
    title: "PRAESENT LOREM ORCI, MATTIS NON EFFICITUR ID CURABITUR AT RISUS SODALES AENEAN AT.",
    readMoreText: "Daha Fazla Oku"
  },
  {
    id: 6,
    number: "06",
    author: {
      name: "İsmail Kor",
      avatar: "/images/rapci_abla.png"
    },
    title: "ULTRICIES DIGNISSIM NIBH UT CURSUS. NAM ET QUAM SIT AMET TURPIS FINIBUS MAXIMUS ...",
    readMoreText: "Daha Fazla Oku"
  },
  // Ek trendler - "Tümünü Gör" butonuna tıklandığında görünecek
  {
    id: 7,
    number: "07",
    author: {
      name: "Jonathan Stewart",
      avatar: "/images/rapci_dayi.png"
    },
    title: "LOREM IPSUM DOLOR SIT AMET CONSECTETUR ADIPISCING ELIT UT ET MASSA MI.",
    readMoreText: "Daha Fazla Oku"
  },
  {
    id: 8,
    number: "08",
    author: {
      name: "Steve Rogerson",
      avatar: "/images/rapci_abla.png"
    },
    title: "PRAESENT LOREM ORCI, MATTIS NON EFFICITUR ID CURABITUR AT RISUS SODALES AENEAN AT.",
    readMoreText: "Daha Fazla Oku"
  }
];

export default function Trends() {
  const [showAll, setShowAll] = useState<boolean>(false);

  // Performance: Memoized handlers
  const handleToggleShowAll = useCallback(() => {
    setShowAll(prev => !prev);
  }, []);

  // Calculate displayed trends
  const displayedTrends = showAll 
    ? trendsData 
    : trendsData.slice(0, trendsConfig.initialDisplayCount);

  return (
    <section 
      className="relative w-full bg-black py-16 lg:py-24"
      role="region"
      aria-label="Trendler bölümü"
      aria-describedby="trends-desc"
    >
      <div className="container mx-auto px-hero-gap lg:px-hero-gap-lg xl:px-hero-gap-xl">
        
        {/* Section Header - Design System Typography */}
        <div className="flex items-start justify-center lg:justify-start mb-12 lg:mb-16">
          <h2 className="font-saira-condensed font-bold text-display-md leading-[0.89] text-white flex items-center gap-4"> {/* migrated from text-[60px] */}
            {trendsConfig.title}
            <TrendingUp 
              className="w-8 h-8 lg:w-10 lg:h-10 text-brand-yellow" 
              strokeWidth={2}
              aria-hidden="true"
            />
          </h2>
        </div>

        {/* Trends Grid - Responsive 3 Column Layout */}
        <div 
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-12 mb-12 lg:mb-16"
          role="list"
          aria-label={`${displayedTrends.length} trend gösteriliyor`}
        >
          {displayedTrends.map((trend, index) => (
            <article 
              key={trend.id}
              className="relative group"
              role="listitem"
              aria-labelledby={`trend-${trend.id}-title`}
            >
              <div className="flex gap-4 lg:gap-6">
                
                {/* Trend Number - Design System Typography */}
                <div className="flex-shrink-0">
                  <span 
                    className="font-saira-condensed font-bold text-display-md leading-[0.89] text-ink-700" // migrated from text-[60px]
                    aria-label={`Trend numarası ${trend.number}`}
                  >
                    {trend.number}
                  </span>
                </div>

                {/* Content Area */}
                <div className="flex-1 pt-2">
                  
                  {/* Author Info */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="relative w-8 h-8 rounded-full overflow-hidden">
                      <Image
                        src={trend.author.avatar}
                        alt={`${trend.author.name} profil resmi`}
                        fill
                        className="object-cover"
                        sizes="32px"
                      />
                    </div>
                    <span className="font-saira font-normal text-base leading-[1.2] tracking-[0.015em] text-white">
                      {trend.author.name}
                    </span>
                  </div>

                  {/* Trend Title - Clickable with hover effect */}
                  <h3 
                    id={`trend-${trend.id}-title`}
                    className="font-saira-condensed font-bold text-heading-lg leading-[1.04] uppercase text-white mb-4 group-hover:text-brand-yellow hover:text-brand-yellow cursor-pointer transition-colors duration-200" // migrated from text-[25px]
                  >
                    {trend.title}
                  </h3>

                  {/* Divider - Between title and button */}
                  <div className="border-t border-ink-700 mb-4"></div>

                  {/* Read More Link - Clickable */}
                  <button 
                    className="font-saira font-normal text-base leading-[1.2] tracking-[0.015em] text-white hover:text-brand-yellow transition-colors duration-200"
                    aria-describedby={`trend-${trend.id}-title`}
                  >
                    {trend.readMoreText}
                  </button>

                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Show All Button - Unified Button Component */}
        <div className="flex justify-center">
          <div className="cta-button-container">
            <Button
              variant="primary"
              size="md"
              onClick={handleToggleShowAll}
              className="uppercase tracking-wide"
              aria-expanded={showAll}
              aria-controls="trends-grid"
              aria-describedby="show-all-desc"
              title={showAll ? trendsConfig.showAllButton.hide : trendsConfig.showAllButton.show}
            >
              {showAll ? trendsConfig.showAllButton.hide : trendsConfig.showAllButton.show}
            </Button>
            
            {/* Shadow Element */}
            <ButtonShadow />
          </div>
        </div>

        {/* Screen Reader Descriptions */}
        <div id="trends-desc" className="sr-only">
          En güncel müzik trendlerini ve haberleri keşfedin. Her trend için yazar bilgisi ve detaylı açıklama mevcuttur.
        </div>

        <div id="show-all-desc" className="sr-only">
          Bu buton ile tüm trendleri görüntüleyebilir veya sadece ilk altısını gösterebilirsiniz.
        </div>

      </div>
    </section>
  );
}
