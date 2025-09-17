'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import Image from 'next/image';
import { useState, useCallback } from 'react';

// Import Swiper styles
import 'swiper/css';

interface FavoriteItem {
  id: number;
  ranking: string; // "Top 10 (2. Sıra)"
  artist: string;  // "50 CENT"
  album: string;   // "CURTIS"
  coverImage: string;
  platform: 'youtube' | 'spotify';
}

interface MonthlyFavoritesConfig {
  title: {
    text: string;
    lines: string[];
  };
  platforms: {
    youtube: {
      logo: string;
      alt: string;
    };
    spotify: {
      logo: string;
      alt: string;
    };
  };
  swiper: {
    slidesPerView: {
      mobile: number;
      tablet: number;
      desktop: number;
    };
    spaceBetween: {
      mobile: number;
      tablet: number;
      desktop: number;
    };
    autoplay: {
      delay: number;
      disableOnInteraction: boolean;
    };
    speed: number;
  };
  layout: {
    grid: {
      leftColumns: number;
      rightColumns: number;
    };
    typography: {
      titleSize: string;
      cardTitle: string;
      ranking: string;
    };
  };
  accessibility: {
    sectionLabel: string;
    progressLabel: string;
    slideDescription: string;
  };
}

// Design System Configuration - Enterprise Pattern
const monthlyFavoritesConfig: MonthlyFavoritesConfig = {
  title: {
    text: "AYIN FAVORİLERİ",
    lines: ["AYIN", "FAVORİLERİ"]
  },
  platforms: {
    youtube: {
      logo: "/images/youtube.svg",
      alt: "YouTube"
    },
    spotify: {
      logo: "/images/spotify.svg", 
      alt: "Spotify"
    }
  },
  swiper: {
    slidesPerView: {
      mobile: 1.2,
      tablet: 1.5,
      desktop: 2.5
    },
    spaceBetween: {
      mobile: 30,
      tablet: 30,
      desktop: 40
    },
    autoplay: {
      delay: 6000,
      disableOnInteraction: false
    },
    speed: 800
  },
  layout: {
    grid: {
      leftColumns: 5,
      rightColumns: 7
    },
    typography: {
      titleSize: "text-[60px] lg:text-[80px]",
      cardTitle: "text-xl lg:text-2xl",
      ranking: "text-sm lg:text-base"
    }
  },
  accessibility: {
    sectionLabel: "Ayın favorileri bölümü",
    progressLabel: "Favori seçimi",
    slideDescription: "Bu ayın en popüler müzik içeriklerini YouTube ve Spotify platformlarından keşfedin."
  }
};

// Mock data - Gerçek uygulamada API'den gelecek (Mevcut resimlerle)
const favoritesData: FavoriteItem[] = [
  {
    id: 1,
    ranking: "Top 10 (2. Sıra)",
    artist: "50 CENT",
    album: "CURTIS",
    coverImage: "/images/fiftycent.png",
    platform: "spotify"
  },
  {
    id: 2,
    ranking: "Top 10 (3. Sıra)",
    artist: "SNOOP DOGG",
    album: "ALGORITHM",
    coverImage: "/images/snop.png",
    platform: "youtube"
  },
  {
    id: 3,
    ranking: "Top 10 (1. Sıra)",
    artist: "RAPPER",
    album: "ALBUM",
    coverImage: "/images/rapper.png",
    platform: "spotify"
  },
  {
    id: 4,
    ranking: "Top 10 (4. Sıra)",
    artist: "50 CENT",
    album: "CURTIS",
    coverImage: "/images/fiftycent.png",
    platform: "youtube"
  },
  {
    id: 5,
    ranking: "Top 10 (5. Sıra)",
    artist: "SNOOP DOGG",
    album: "ALGORITHM",
    coverImage: "/images/snop.png",
    platform: "spotify"
  }
];

export default function MonthlyFavorites() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

  // Performance: Memoized handlers
  const handleSlideChange = useCallback((swiper: SwiperType) => {
    setActiveIndex(swiper.realIndex);
  }, []);

  const handleSwiperInit = useCallback((swiper: SwiperType) => {
    setSwiperInstance(swiper);
  }, []);

  const handlePrevSlide = useCallback(() => {
    swiperInstance?.slidePrev();
  }, [swiperInstance]);

  const handleNextSlide = useCallback(() => {
    swiperInstance?.slideNext();
  }, [swiperInstance]);

  return (
    <section 
      className="relative w-full bg-black py-16 lg:py-24"
      role="region"
      aria-label={monthlyFavoritesConfig.accessibility.sectionLabel}
      aria-describedby="favorites-desc"
    >
      <div className="w-full">
        
        {/* Design System Grid Layout */}
        <div className="favorites-grid">
          
          {/* Left Section - Platform Logos + Title */}
          <div className="favorites-left-section">
            
            {/* Platform Logos - Design System Component */}
            <div className="favorites-logo-container">
              <div className="relative">
                <Image
                  src={monthlyFavoritesConfig.platforms.youtube.logo}
                  alt={monthlyFavoritesConfig.platforms.youtube.alt}
                  width={80}
                  height={40}
                  className="h-5 lg:h-7 w-auto"
                  priority={false}
                />
              </div>
              <div className="relative">
                <Image
                  src={monthlyFavoritesConfig.platforms.spotify.logo}
                  alt={monthlyFavoritesConfig.platforms.spotify.alt}
                  width={120}
                  height={60}
                  className="h-7 lg:h-9 w-auto"
                  priority={false}
                />
              </div>
            </div>

            {/* Section Title - Typography System */}
            <div className="favorites-title-container">
              <h2 className={`font-saira-condensed font-bold ${monthlyFavoritesConfig.layout.typography.titleSize} leading-[0.89] text-white`}>
                {monthlyFavoritesConfig.title.lines.map((line, index) => (
                  <span key={index} className="block">{line}</span>
                ))}
              </h2>
            </div>

          </div>

          {/* Right Section - Swiper Container */}
          <div className="favorites-right-section">
            {/* Swiper Container - In 7 Column Area */}
            <div className="relative h-full">
          
          <Swiper
            id="monthly-favorites-swiper"
            modules={[Autoplay, Navigation]}
            spaceBetween={monthlyFavoritesConfig.swiper.spaceBetween.mobile}
            slidesPerView={monthlyFavoritesConfig.swiper.slidesPerView.mobile}
            breakpoints={{
              640: {
                slidesPerView: monthlyFavoritesConfig.swiper.slidesPerView.tablet,
                spaceBetween: monthlyFavoritesConfig.swiper.spaceBetween.tablet,
              },
              1024: {
                slidesPerView: monthlyFavoritesConfig.swiper.slidesPerView.desktop,
                spaceBetween: monthlyFavoritesConfig.swiper.spaceBetween.desktop,
              },
            }}
            autoplay={monthlyFavoritesConfig.swiper.autoplay}
            loop={true}
            speed={monthlyFavoritesConfig.swiper.speed}
            onSlideChange={handleSlideChange}
            onSwiper={handleSwiperInit}
            className="overflow-visible"
            aria-live="polite"
            aria-label={`${favoritesData.length} favori içerik'den oluşan slider`}
          >
            {favoritesData.map((favorite, slideIndex) => (
              <SwiperSlide 
                key={favorite.id}
                className="relative"
                role="group"
                aria-roledescription="slide"
                aria-label={`${slideIndex + 1} / ${favoritesData.length}: ${favorite.artist} - ${favorite.album}`}
              >
                {/* Card Container - Design System Component */}
                <div className="favorites-card">
                  
                  {/* Cover Image - Design System Positioned */}
                  <div className="favorites-card-cover">
                    <Image
                      src={favorite.coverImage}
                      alt={`${favorite.artist} - ${favorite.album} kapak görseli`}
                      fill
                      className="object-contain rounded-lg"
                      sizes="(max-width: 768px) 128px, 160px"
                      priority={slideIndex < 3}
                    />
                  </div>

                  {/* Content Area - Design System Layout */}
                  <div className="favorites-card-content">
                    
                    {/* Ranking Badge - Design System Component */}
                    <div className="favorites-ranking-badge">
                      <span className={`font-saira font-normal ${monthlyFavoritesConfig.layout.typography.ranking} leading-[1.2] tracking-[0.015em] text-white`}>
                        {favorite.ranking.split('(')[0]}
                      </span>
                      <span className={`font-saira font-bold ${monthlyFavoritesConfig.layout.typography.ranking} leading-[1.2] tracking-[0.015em] text-white`}>
                        ({favorite.ranking.split('(')[1]}
                      </span>
                    </div>

                    {/* Artist & Album - Typography System */}
                    <div className="space-y-1">
                      {/* Artist Name - First Line */}
                      <h3 className={`font-saira-condensed font-normal ${monthlyFavoritesConfig.layout.typography.cardTitle} leading-[1.04] uppercase text-white`}>
                        {favorite.artist.split(' ')[0]} {favorite.artist.split(' ')[1] || ''}
                      </h3>
                      {/* Album Name - Second Line (Bold) */}
                      <p className={`font-saira-condensed font-bold ${monthlyFavoritesConfig.layout.typography.cardTitle} leading-[1.04] uppercase text-white`}>
                        {favorite.album}
                      </p>
                    </div>

                  </div>

                  {/* Torn Mask - Design System Component */}
                  <div className="favorites-mask-container">
                    {/* Torn mask image */}
                    <Image
                      src="/images/swiper_tear.png"
                      alt="Torn mask effect"
                      fill
                      className="object-cover object-bottom"
                    />
                    
                    {/* Gradient overlay - Design System Blend */}
                    <div className="favorites-mask-gradient"></div>
                  </div>

                </div>
              </SwiperSlide>
            ))}
            </Swiper>

            {/* Progress Bar - Design System Component */}
            <div 
              className="mt-8 lg:mt-12"
              role="tablist"
              aria-label={monthlyFavoritesConfig.accessibility.progressLabel}
            >
              <div className="favorites-progress-bar">
                {/* Progress Fill */}
                <div 
                  className="favorites-progress-fill"
                  style={{ 
                    width: `${((activeIndex + 1) / favoritesData.length) * 100}%` 
                  }}
                  aria-hidden="true"
                />
                
                {/* Progress Track Markers */}
                <div className="absolute inset-0 flex items-center justify-between px-1">
                  {favoritesData.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => swiperInstance?.slideToLoop(index)}
                      disabled={!swiperInstance}
                      role="tab"
                      aria-selected={activeIndex === index}
                      tabIndex={activeIndex === index ? 0 : -1}
                      className="w-2 h-2 rounded-full bg-transparent focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:ring-offset-2"
                      aria-label={`${index + 1}. favori: ${favoritesData[index].artist}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            </div>
          </div>

        </div>

        {/* Screen Reader Description */}
        <div id="favorites-desc" className="sr-only">
          {monthlyFavoritesConfig.accessibility.slideDescription}
        </div>

      </div>
    </section>
  );
}
