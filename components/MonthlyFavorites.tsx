'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import Image from 'next/image';
import { useState, useCallback, useEffect } from 'react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/autoplay';

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
      mobile: number | 'auto';
      tablet: number | 'auto';
      desktop: number | 'auto';
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
      mobile: 1,
      tablet: 'auto',
      desktop: 'auto'
    },
    spaceBetween: {
      mobile: 12,
      tablet: 16,
      desktop: 18
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
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Check if mobile on client side
  useEffect(() => {
    const checkMobile = () => {
      const newIsMobile = window.innerWidth < 1024;
      setIsMobile(newIsMobile);
      
      // Autoplay her zaman aktif - sadece yeniden başlat
      if (swiperInstance && swiperInstance.autoplay && typeof swiperInstance.autoplay.start === 'function') {
        setTimeout(() => {
          try {
            swiperInstance.autoplay.start();
          } catch (error) {
            console.warn('Autoplay restart error:', error);
          }
        }, 100);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, [swiperInstance]);

  // Performance: Memoized handlers

  const handleSwiperInit = useCallback((swiper: SwiperType) => {
    setSwiperInstance(swiper);
    
    // Güvenli autoplay başlatma
    if (swiper && swiper.autoplay && typeof swiper.autoplay.start === 'function') {
      setTimeout(() => {
        try {
          swiper.autoplay.start();
        } catch (error) {
          console.warn('Autoplay start error:', error);
        }
      }, 100);
    }
  }, []);

  const handlePrevSlide = useCallback(() => {
    swiperInstance?.slidePrev();
  }, [swiperInstance]);

  const handleNextSlide = useCallback(() => {
    swiperInstance?.slideNext();
  }, [swiperInstance]);

  return (
    <section 
      className="relative w-full bg-black py-20 lg:py-32"
      role="region"
      aria-label={monthlyFavoritesConfig.accessibility.sectionLabel}
      aria-describedby="favorites-desc"
    >
      <div className="w-full">
        
        {/* Mobile: Vertical Layout | Desktop: Grid Layout */}
        {isMobile ? (
          /* MOBILE: Vertical Layout - Clip-path → Title → Slider */
          <div className="w-full flex flex-col lg:hidden">
            
            {/* 1. CLIP-PATH Section - Platform Logos */}
            <div className="relative w-full flex justify-center mb-12">
              <div className="favorites-logo-container">
                <div className="relative">
                  <Image
                    src={monthlyFavoritesConfig.platforms.youtube.logo}
                    alt={monthlyFavoritesConfig.platforms.youtube.alt}
                    width={80}
                    height={40}
                    className="h-5 w-auto"
                    priority={false}
                  />
                </div>
                <div className="relative">
                  <Image
                    src={monthlyFavoritesConfig.platforms.spotify.logo}
                    alt={monthlyFavoritesConfig.platforms.spotify.alt}
                    width={120}
                    height={60}
                    className="h-7 w-auto"
                    priority={false}
                  />
                </div>
              </div>
            </div>

            {/* 2. TITLE Section - Centered */}
            <div className="w-full flex justify-center mt-10 lg:mt-0 py-12">
              <h2 className={`font-saira-condensed font-bold ${monthlyFavoritesConfig.layout.typography.titleSize} leading-[1.1] text-white text-center`}>
                {monthlyFavoritesConfig.title.lines.map((line, index) => (
                  <span key={index} className="block mb-2">{line}</span>
                ))}
              </h2>
            </div>

            {/* 3. SLIDER Section - Full Width - MOVED TO UNIVERSAL SECTION */}
          </div>
        ) : (
          /* DESKTOP: Original Grid Layout - Left (Logos+Title) | Right (Slider) */
          <div className="favorites-grid hidden lg:grid">
            
            {/* Left Section - Platform Logos */}
            <div className="favorites-left-section">
              <div className="favorites-logo-container">
                <div className="relative">
                  <Image
                    src={monthlyFavoritesConfig.platforms.youtube.logo}
                    alt={monthlyFavoritesConfig.platforms.youtube.alt}
                    width={80}
                    height={40}
                    className="h-7 w-auto"
                    priority={false}
                  />
                </div>
                <div className="relative">
                  <Image
                    src={monthlyFavoritesConfig.platforms.spotify.logo}
                    alt={monthlyFavoritesConfig.platforms.spotify.alt}
                    width={120}
                    height={60}
                    className="h-9 w-auto"
                    priority={false}
                  />
                </div>
              </div>
            </div>

            {/* Section Title - Overlay Position (Desktop) */}
            <div className="favorites-title-container">
              <h2 className={`font-saira-condensed font-bold ${monthlyFavoritesConfig.layout.typography.titleSize} leading-[0.89] text-white`}>
                {monthlyFavoritesConfig.title.lines.map((line, index) => (
                  <span key={index} className="block">{line}</span>
                ))}
              </h2>
            </div>

            {/* Right Section - Desktop Slider */}
            <div className="favorites-right-section overflow-hidden">
              <div className="relative h-full flex justify-end items-center">
                {/* Desktop Slider Container */}
                <div className="desktop-monthly-favorites-swiper relative z-10">
                  <Swiper
                    id="monthly-favorites-swiper-desktop"
                    modules={[Autoplay, Navigation]}
                    spaceBetween={15}
                    slidesPerView={2.5}
                    centeredSlides={false}
                    autoplay={{
                      delay: 5000,
                      disableOnInteraction: false,
                      pauseOnMouseEnter: false,
                      stopOnLastSlide: false
                    }}
                    allowSlideNext={true}
                    allowSlidePrev={true}
                    loop={true}
                    speed={monthlyFavoritesConfig.swiper.speed}
                    onSlideChange={(swiper) => {
                      // Desktop: sadece 3 meaningful position var (0,1,2)
                      const realIndex = swiper.realIndex % 3;
                      setActiveIndex(realIndex);
                    }}
                    onSwiper={handleSwiperInit}
                    className="overflow-visible"
                    aria-live="polite"
                    aria-label="Ayın favorileri desktop slider - 5 içerik, 3 konum"
                  >
                    {favoritesData.map((favorite, slideIndex) => (
                      <SwiperSlide 
                        key={`desktop-${favorite.id}`}
                        className="relative monthly-favorites-slide desktop-slide"
                        role="group"
                        aria-roledescription="slide"
                        aria-label={`${slideIndex + 1} / ${favoritesData.length}: ${favorite.artist} - ${favorite.album}`}
                      >
                        {/* Desktop Card */}
                        <div className="favorites-card">
                          
                          {/* Cover Image */}
                          <div className="favorites-card-cover">
                            <Image
                              src={favorite.coverImage}
                              alt={`${favorite.artist} - ${favorite.album} kapak görseli`}
                              fill
                              className="object-cover"
                              sizes="250px"
                              priority={slideIndex < 3}
                            />
                          </div>

                          {/* Content Area */}
                          <div className="favorites-card-content">
                            
                            {/* Ranking Badge */}
                            <div className="favorites-ranking-badge">
                              <span className={`font-saira font-normal ${monthlyFavoritesConfig.layout.typography.ranking} leading-[1.2] tracking-[0.015em] text-white`}>
                                {favorite.ranking.split('(')[0]}
                              </span>
                              <span className={`font-saira font-bold ${monthlyFavoritesConfig.layout.typography.ranking} leading-[1.2] tracking-[0.015em] text-white`}>
                                ({favorite.ranking.split('(')[1]}
                              </span>
                            </div>

                            {/* Artist & Album - Desktop Layout */}
                            <div className="space-y-1">
                              <h3 className={`font-saira-condensed font-normal ${monthlyFavoritesConfig.layout.typography.cardTitle} leading-[1.04] uppercase text-white`}>
                                {favorite.artist.split(' ')[0]} {favorite.artist.split(' ')[1] || ''}
                              </h3>
                              <p className={`font-saira-condensed font-bold ${monthlyFavoritesConfig.layout.typography.cardTitle} leading-[1.04] uppercase text-white`}>
                                {favorite.album}
                              </p>
                            </div>

                          </div>

                          {/* Torn Mask */}
                          <div className="favorites-mask-container">
                            <Image
                              src="/images/swiper_tear.png"
                              alt="Torn mask effect"
                              fill
                              className="object-cover object-bottom"
                            />
                            <div className="favorites-mask-gradient"></div>
                          </div>

                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                  
                  {/* Progress Bar - Desktop */}
                  <div 
                    className="mt-8 lg:mt-12"
                    role="tablist"
                    aria-label={monthlyFavoritesConfig.accessibility.progressLabel}
                  >
                    <div className="favorites-progress-bar">
                      <div 
                        className="favorites-progress-fill"
                        style={{ 
                          width: `${((activeIndex + 1) / 3) * 100}%` 
                        }}
                        aria-hidden="true"
                      />
                      <div className="absolute inset-0 flex items-center justify-between px-1">
                        {[0, 1, 2].map((slideIndex) => (
                          <button
                            key={slideIndex}
                            onClick={() => swiperInstance?.slideToLoop(slideIndex)}
                            disabled={!swiperInstance}
                            role="tab"
                            aria-selected={activeIndex === slideIndex}
                            tabIndex={activeIndex === slideIndex ? 0 : -1}
                            className="w-2 h-2 rounded-full bg-transparent focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:ring-offset-2"
                            aria-label={`${slideIndex + 1}. slide`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* MOBILE ONLY SLIDER */}
        {isMobile && (
          <div className="w-full overflow-hidden mt-8">
            <div className="relative h-full w-full">
          
              <Swiper
                id="monthly-favorites-swiper-mobile"
                modules={[Autoplay, Navigation]}
                spaceBetween={20}
                slidesPerView={1}
                centeredSlides={true}
                autoplay={{
                  delay: 4000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: false
                }}
                loop={true}
                speed={monthlyFavoritesConfig.swiper.speed}
                onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                onSwiper={handleSwiperInit}
                className="overflow-visible"
                aria-live="polite"
                aria-label="Ayın favorileri mobil slider - 5 içerik"
              >
                {favoritesData.map((favorite, slideIndex) => (
                  <SwiperSlide 
                    key={`mobile-${favorite.id}`}
                    className="relative monthly-favorites-slide mobile-slide"
                    role="group"
                    aria-roledescription="slide"
                    aria-label={`${slideIndex + 1} / ${favoritesData.length}: ${favorite.artist} - ${favorite.album}`}
                  >
                    {/* Mobile Card */}
                    <div className="favorites-card w-full">
                      
                      {/* Cover Image */}
                      <div className="favorites-card-cover">
                        <Image
                          src={favorite.coverImage}
                          alt={`${favorite.artist} - ${favorite.album} kapak görseli`}
                          fill
                          className="object-cover"
                          sizes="calc(100vw - 3rem)"
                          priority={slideIndex < 3}
                        />
                      </div>

                      {/* Content Area */}
                      <div className="favorites-card-content">
                        
                        {/* Ranking Badge */}
                        <div className="favorites-ranking-badge">
                          <span className={`font-saira font-normal ${monthlyFavoritesConfig.layout.typography.ranking} leading-[1.2] tracking-[0.015em] text-white`}>
                            {favorite.ranking.split('(')[0]}
                          </span>
                          <span className={`font-saira font-bold ${monthlyFavoritesConfig.layout.typography.ranking} leading-[1.2] tracking-[0.015em] text-white`}>
                            ({favorite.ranking.split('(')[1]}
                          </span>
                        </div>

                        {/* Artist & Album - Mobile Layout */}
                        <div className="space-y-1">
                          <h3 className={`font-saira-condensed ${monthlyFavoritesConfig.layout.typography.cardTitle} leading-[1.04] uppercase text-white`}>
                            <span className="font-normal">{favorite.artist}</span>
                            <span className="font-normal"> - </span>
                            <span className="font-bold">{favorite.album}</span>
                          </h3>
                        </div>

                      </div>

                      {/* Torn Mask */}
                      <div className="favorites-mask-container">
                        <Image
                          src="/images/swiper_tear.png"
                          alt="Torn mask effect"
                          fill
                          className="object-cover object-bottom"
                        />
                        <div className="favorites-mask-gradient"></div>
                      </div>

                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Progress Bar - Mobile */}
              <div 
                className="mt-8"
                role="tablist"
                aria-label={monthlyFavoritesConfig.accessibility.progressLabel}
              >
                <div className="favorites-progress-bar">
                  <div 
                    className="favorites-progress-fill"
                    style={{ 
                      width: `${((activeIndex + 1) / favoritesData.length) * 100}%` 
                    }}
                    aria-hidden="true"
                  />
                  <div className="absolute inset-0 flex items-center justify-between px-1">
                        {favoritesData.map((favorite, index) => (
                          <button
                            key={index}
                            onClick={() => swiperInstance?.slideToLoop(index)}
                            disabled={!swiperInstance}
                            role="tab"
                            aria-selected={activeIndex === index}
                            tabIndex={activeIndex === index ? 0 : -1}
                            className="w-2 h-2 rounded-full bg-transparent focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:ring-offset-2"
                            aria-label={`${index + 1}. favori: ${favorite.artist}`}
                          />
                        ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Screen Reader Description */}
        <div id="favorites-desc" className="sr-only">
          {monthlyFavoritesConfig.accessibility.slideDescription}
        </div>

      </div>
    </section>
  );
}