import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import type { SwiperOptions } from 'swiper/types';

// Merkezi Swiper Configuration System - Design System Level
// Bu dosya tüm swiper instance'larını tutarlı hale getirir

// Optimized Base configuration - sadece ortak ayarlar
export const SWIPER_DEFAULTS: Partial<SwiperOptions> = {
  loop: true,
  speed: 800,
  allowSlideNext: true,
  allowSlidePrev: true,
  watchSlidesProgress: true,
  preventInteractionOnTransition: false,
  // modules her config'de spesifik olarak tanımlanacak
};

// Specific configurations - her swiper tipi için özelleştirilmiş ayarlar
export const SWIPER_VARIANTS = {
  // HeroSlider configuration - sadece Autoplay
  hero: {
    ...SWIPER_DEFAULTS,
    modules: [Autoplay],
    autoplay: {
      delay: 8000,
      disableOnInteraction: false,
    },
    spaceBetween: 0,
    slidesPerView: 1,
    centeredSlides: false,
  } as SwiperOptions,

  // NewsSlider configuration - Autoplay + Pagination
  news: {
    ...SWIPER_DEFAULTS,
    modules: [Autoplay, Pagination],
    autoplay: {
      delay: 6000,
      disableOnInteraction: false,
    },
    spaceBetween: 0,
    slidesPerView: 1,
    centeredSlides: false,
  } as SwiperOptions,

  // MonthlyFavorites Desktop - Autoplay + Navigation
  favoritesDesktop: {
    ...SWIPER_DEFAULTS,
    modules: [Autoplay, Navigation],
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

  // MonthlyFavorites Mobile - Autoplay + Navigation
  favoritesMobile: {
    ...SWIPER_DEFAULTS,
    modules: [Autoplay, Navigation],
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
