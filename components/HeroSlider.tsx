'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import Image from 'next/image';
import { useState, useCallback } from 'react';

// Import Swiper styles
import 'swiper/css';

interface SlideData {
  id: number;
  title: string;
  description: string;
  backgroundImage: string;
  mainImage: string;
  buttonText: string;
}

const slidesData: SlideData[] = [
  {
    id: 1,
    title: "DÜNYA RAP TRENDLERİNİ KONUŞUYORUZ.",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi",
    backgroundImage: "/images/first_slide_asset_2.jpg",
    mainImage: "/images/first_slide_asset_1.png",
    buttonText: "Devamını Oku"
  },
  {
    id: 2,
    title: "MÜZİK DÜNYASINDAKİ SON GELİŞMELER",
    description: "Müzik endüstrisindeki en güncel haberler, yeni çıkan albümler ve sanatçı röportajları ile müzik dünyasının nabzını tutuyoruz.",
    backgroundImage: "/images/first_slide_asset_2.jpg",
    mainImage: "/images/first_slide_asset_1.png",
    buttonText: "Devamını Oku"
  },
  {
    id: 3,
    title: "ETKİNLİKLER VE KONSERLERİ KAÇIRMAYIN",
    description: "Yaklaşan konserler, festivaller ve özel etkinlikler hakkında detaylı bilgiler. En sevdiğiniz sanatçıları canlı dinleme fırsatı.",
    backgroundImage: "/images/first_slide_asset_2.jpg",
    mainImage: "/images/first_slide_asset_1.png",
    buttonText: "Devamını Oku"
  },{
    id: 4,
    title: "ETKİNLİKLER VE KONSERLERİ KAÇIRMAYIN",
    description: "Yaklaşan konserler, festivaller ve özel etkinlikler hakkında detaylı bilgiler. En sevdiğiniz sanatçıları canlı dinleme fırsatı.",
    backgroundImage: "/images/first_slide_asset_2.jpg",
    mainImage: "/images/first_slide_asset_1.png",
    buttonText: "Devamını Oku"
  },
  {
    id: 5,
    title: "ETKİNLİKLER VE KONSERLERİ KAÇIRMAYIN",
    description: "Yaklaşan konserler, festivaller ve özel etkinlikler hakkında detaylı bilgiler. En sevdiğiniz sanatçıları canlı dinleme fırsatı.",
    backgroundImage: "/images/first_slide_asset_2.jpg",
    mainImage: "/images/first_slide_asset_1.png",
    buttonText: "Devamını Oku"
  },
  {
    id: 6,
    title: "ETKİNLİKLER VE KONSERLERİ KAÇIRMAYIN",
    description: "Yaklaşan konserler, festivaller ve özel etkinlikler hakkında detaylı bilgiler. En sevdiğiniz sanatçıları canlı dinleme fırsatı.",
    backgroundImage: "/images/first_slide_asset_2.jpg",
    mainImage: "/images/first_slide_asset_1.png",
    buttonText: "Devamını Oku"
  }
];

export default function HeroSlider() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

  // Performance: Memoized handlers to prevent unnecessary re-renders
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

  const handleDotClick = useCallback((index: number) => {
    swiperInstance?.slideToLoop(index);
  }, [swiperInstance]);

  return (
    <section 
      className="relative w-full h-screen overflow-hidden"
      role="region"
      aria-label="Hero slider"
      aria-roledescription="carousel"
    >
      <Swiper
        id="hero-slider"
        modules={[Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation={false}
        autoplay={{
          delay: 8000,
          disableOnInteraction: false,
        }}
        loop={true}
        speed={1000}
        onSlideChange={handleSlideChange}
        onSwiper={handleSwiperInit}
        className="h-full w-full"
        aria-live="polite"
        aria-label={`${slidesData.length} slide'dan oluşan hero slider`}
      >
        {slidesData.map((slide, slideIndex) => (
          <SwiperSlide 
            key={slide.id} 
            className="relative"
            role="group"
            aria-roledescription="slide"
            aria-label={`${slideIndex + 1} / ${slidesData.length}: ${slide.title}`}
            id={`slide-${slide.id}`}
          >
            <div className="relative w-full h-full bg-white">
              {/* Rapçi Dayı - Tam Genişlikte Background */}
              <div className="absolute inset-0 w-full h-full">
                <Image
                  src={slide.mainImage}
                  alt={slide.title}
                  fill
                  priority={slide.id === 1}
                  className="object-cover w-full h-full"
                />
              </div>

              {/* Content Grid - Semantic Layout System */}
              <div className="absolute inset-0 z-slider-content">
                <div className="h-full grid grid-cols-1 lg:grid-cols-12 items-center">
                  {/* Empty space for rapper image - responsive columns */}
                  <div className="hidden lg:block lg:col-span-6 xl:col-span-7"></div>
                  
                  {/* Text content - professional spacing */}
                  <div className="col-span-1 lg:col-span-5 xl:col-span-4 text-black space-y-6 px-hero-gap lg:px-hero-gap-lg xl:px-hero-gap-xl lg:pr-hero-gap-xl xl:pr-16">
                    {/* Slider Title - Typography Constraints */}
                    <h1 className="font-saira-condensed font-bold text-4xl sm:text-5xl lg:text-6xl leading-tight tracking-tight text-black max-w-md">
                      {slide.title}
                    </h1>

                    {/* Slider Description - Design System Typography */}
                    <p className="font-saira font-normal text-base leading-tight tracking-normal text-black">
                      {slide.description}
                    </p>

                    {/* CTA Button - Tailwind Design System Component */}
                    <div className="cta-button-container">
                      {/* Button Element */}
                      <button 
                        className="cta-button"
                        aria-describedby={`slide-${slide.id}-desc`}
                        title={`${slide.title} - ${slide.buttonText}`}
                      >
                        {slide.buttonText}
                      </button>
                      
                      {/* Shadow Element */}
                      <div className="cta-button-shadow" aria-hidden="true"></div>
                      
                      {/* Screen reader description */}
                      <div id={`slide-${slide.id}-desc`} className="sr-only">
                        {slide.title}: {slide.description}
                      </div>
                    </div>

                    
                  </div>
                </div>
              </div>

              {/* Bottom Tear Mask - Now black */}
              <div className="absolute bottom-0 left-0 right-0 z-slider-mask pointer-events-none">
                <Image
                  src="/images/bottom-tear.png"
                  alt="Bottom tear"
                  width={1920}
                  height={100}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}

        {/* Professional Custom Navigation */}
        <button
          type="button"
          onClick={handlePrevSlide}
          disabled={!swiperInstance}
          aria-label={`Önceki slide - Şu anda ${activeIndex + 1}/${slidesData.length}`}
          aria-controls="hero-slider"
          className="absolute top-1/2 left-8 -translate-y-1/2 z-slider-pagination text-white hover:text-brand-yellow transition-all duration-300 hover:scale-110 disabled:opacity-50 hidden lg:block focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:ring-offset-2"
        >
          <svg width="26" height="27" viewBox="0 0 26 27" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
            <path d="M25 13.3232H1" stroke="currentColor" strokeWidth="1.7648" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M13.0001 1.32324L1.00012 13.3232L13.0001 25.3232" stroke="currentColor" strokeWidth="1.7648" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <button
          type="button"
          onClick={handleNextSlide}
          disabled={!swiperInstance}
          aria-label={`Sonraki slide - Şu anda ${activeIndex + 1}/${slidesData.length}`}
          aria-controls="hero-slider"
          className="absolute top-1/2 right-8 -translate-y-1/2 z-slider-pagination text-white hover:text-brand-yellow transition-all duration-300 hover:scale-110 disabled:opacity-50 hidden lg:block focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:ring-offset-2"
        >
          <svg width="26" height="27" viewBox="0 0 26 27" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
            <path d="M1 13.3232H25" stroke="currentColor" strokeWidth="1.7648" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12.9999 1.32324L24.9999 13.3232L12.9999 25.3232" stroke="currentColor" strokeWidth="1.7648" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

      </Swiper>

      {/* DESKTOP-ONLY PAGINATION: Clean & Professional */}
      <div 
        className="absolute bottom-52 left-1/2 transform -translate-x-1/2 hidden lg:flex lg:left-3/4 xl:left-2/3 z-slider-pagination"
        role="tablist"
        aria-label="Slide seçimi"
      >
        <div className="flex gap-2">
          {slidesData.map((slide, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              disabled={!swiperInstance}
              role="tab"
              aria-selected={activeIndex === index}
              aria-controls={`slide-${slide.id}`}
              tabIndex={activeIndex === index ? 0 : -1}
              className={`rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:ring-offset-2 ${
                activeIndex === index
                  ? 'w-4 h-4 bg-brand-yellow'
                  : 'w-3 h-3 bg-gray-800 hover:bg-gray-600'
              }`}
              aria-label={`${index + 1}/${slidesData.length}: ${slide.title}`}
              title={slide.title}
            />
          ))}
        </div>
      </div>

    </section>
  );
}
