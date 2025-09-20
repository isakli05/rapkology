import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import type { SwiperOptions } from 'swiper/types';

// Merkezi Swiper Configuration System - Design System Level
// Bu dosya tüm swiper instance'larını tutarlı hale getirir

// Base configuration - tüm swiper'larda ortak olan ayarlar
export const SWIPER_DEFAULTS: Partial<SwiperOptions> = {
  modules: [Autoplay, Navigation],
  loop: true,
  speed: 800,
  allowSlideNext: true,
  allowSlidePrev: true,
  watchSlidesProgress: true,
  preventInteractionOnTransition: false,
};

// Specific configurations - her swiper tipi için özelleştirilmiş ayarlar
export const SWIPER_VARIANTS = {
  // HeroSlider configuration
  hero: {
    ...SWIPER_DEFAULTS,
    autoplay: {
      delay: 8000,
      disableOnInteraction: false,
    },
    spaceBetween: 0,
    slidesPerView: 1,
    centeredSlides: false,
  } as SwiperOptions,

  // NewsSlider configuration
  news: {
    ...SWIPER_DEFAULTS,
    autoplay: {
      delay: 6000,
      disableOnInteraction: false,
    },
    spaceBetween: 0,
    slidesPerView: 1,
    centeredSlides: false,
  } as SwiperOptions,

  // MonthlyFavorites Desktop configuration
  favoritesDesktop: {
    ...SWIPER_DEFAULTS,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
      pauseOnMouseEnter: false,
      stopOnLastSlide: false,
    },
    spaceBetween: 15,
    slidesPerView: 2.5,
    centeredSlides: false,
  } as SwiperOptions,

  // MonthlyFavorites Mobile configuration
  favoritesMobile: {
    ...SWIPER_DEFAULTS,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
      pauseOnMouseEnter: false,
    },
    spaceBetween: 20,
    slidesPerView: 1,
    centeredSlides: true,
  } as SwiperOptions,
};

// Helper functions - configuration'ları kolay kullanmak için
export const getSwiperConfig = (variant: keyof typeof SWIPER_VARIANTS): SwiperOptions => {
  const config = SWIPER_VARIANTS[variant];
  if (!config) {
    console.warn(`Swiper variant '${variant}' not found. Using default config.`);
    return SWIPER_DEFAULTS as SwiperOptions;
  }
  return config;
};

// Type exports
export type SwiperVariant = keyof typeof SWIPER_VARIANTS;
