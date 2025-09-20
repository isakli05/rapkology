'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import Image from 'next/image';
import { useState, useCallback } from 'react';
import { getSwiperConfig } from '@/lib/swiper-configs';

// Import Swiper styles
import 'swiper/css';

interface SlideData {
  id: number;
  title: string;
  description: string;
  backgroundImage: string;
  mainImage: string;
  buttonText: string;
  textColor?: string;
}

const slidesData: SlideData[] = [
  {
    id: 1,
    title: "DÜNYA RAP TRENDLERİNİ KONUŞUYORUZ.",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi",
    backgroundImage: "/images/first_slide_asset_2.jpg",
    mainImage: "/images/first_slide_asset_1.png",
    buttonText: "Devamını Oku",
    textColor: "black"
  },
  {
    id: 2,
    title: "TÜRKÇE RAP VE DÜNYA MÜZİK HABERLERİNİ TAKİP ET",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi",
    backgroundImage: "/images/first_slide_asset_2.jpg",
    mainImage: "/images/second_slider.png",
    buttonText: "Devamını Oku",
    textColor: "white"
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
      className="relative w-full h-screen lg:h-screen overflow-hidden"
      role="region"
      aria-label="Hero slider"
      aria-roledescription="carousel"
    >
      <Swiper
        id="hero-slider"
        {...getSwiperConfig('hero')}
        navigation={false} // override: navigation arrows handled separately
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
            {/* Mobile Layout - Vertical Stack */}
            <div className="lg:hidden w-full h-full flex flex-col bg-black">
              
              {/* Content Section - Top */}
              <div className="flex-shrink-0 pt-20 pb-6 px-hero-gap">
                <div className="w-full max-w-md mx-auto text-center space-y-6 text-white">
                  {/* Slider Title - Mobile (Always White) */}
                  <h1 className="font-saira-condensed font-bold text-4xl sm:text-5xl leading-tight tracking-tight text-white">
                    {slide.title}
                  </h1>

                  {/* Slider Description - Mobile (Always White) */}
                  <p className="font-saira font-normal text-base leading-tight tracking-normal text-white">
                    {slide.description}
                  </p>

                  {/* CTA Button - Mobile */}
                  <div className="cta-button-container">
                    <button 
                      className="cta-button-hero"
                      aria-describedby={`slide-${slide.id}-desc-mobile`}
                      title={`${slide.title} - ${slide.buttonText}`}
                    >
                      {slide.buttonText}
                    </button>
                    <div className="cta-button-shadow" aria-hidden="true"></div>
                    
                    {/* Screen reader description - Mobile */}
                    <div id={`slide-${slide.id}-desc-mobile`} className="sr-only">
                      {slide.title}: {slide.description}
                    </div>
                  </div>
                </div>
              </div>

              {/* Image Section - Bottom */}
              <div className="flex-1 relative overflow-hidden">
                <Image
                  src={slide.mainImage}
                  alt={slide.title}
                  fill
                  priority={slide.id === 1}
                  className="object-cover w-full h-full"
                />
              </div>
              
            </div>

            {/* Desktop Layout - Original Grid System */}
            <div className="hidden lg:block relative w-full h-full bg-white overflow-hidden">
              {/* Rapçi Dayı - Tam Genişlikte Background */}
              <div className="absolute inset-0 w-full h-full">
                <div className={`relative w-full h-full ${slide.id === 2 ? 'lg:-left-[20%]' : ''}`}>
                  <Image
                    src={slide.mainImage}
                    alt={slide.title}
                    fill
                    priority={slide.id === 1}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>

              {/* Linear Gradient Overlay */}
              <div 
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(to right, transparent 60%, rgba(0,0,0,0.8) 100%)'
                }}
                aria-hidden="true"
              ></div>

              {/* Desktop Content Layout */}
              <div className="absolute inset-0 z-slider-content">
                <div className="h-full grid grid-cols-12 items-center">
                  {/* Empty space for rapper image - responsive columns */}
                  <div className="col-span-6 xl:col-span-7"></div>
                  
                  {/* Text content - professional spacing */}
                  <div className={`col-span-5 xl:col-span-4 space-y-6 px-hero-gap-lg xl:px-hero-gap-xl pr-hero-gap-xl xl:pr-16 ${slide.textColor === 'white' ? 'text-white' : 'text-black'}`}>
                    {/* Slider Title - Typography Constraints */}
                    <h1 className={`font-saira-condensed font-bold text-4xl sm:text-5xl lg:text-6xl leading-tight tracking-tight max-w-md ${slide.textColor === 'white' ? 'text-white' : 'text-black'}`}>
                      {slide.title}
                    </h1>

                    {/* Slider Description - Design System Typography */}
                    <p className={`font-saira font-normal text-base leading-tight tracking-normal ${slide.textColor === 'white' ? 'text-white' : 'text-black'}`}>
                      {slide.description}
                    </p>

                    {/* CTA Button - Tailwind Design System Component */}
                    <div className="cta-button-container">
                      {/* Button Element */}
                      <button 
                        className="cta-button-hero"
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
            </div>

            {/* Bottom Tear Mask - Desktop Only */}
            <div className="hidden lg:block absolute bottom-0 left-0 right-0 z-slider-mask pointer-events-none">
              <Image
                src="/images/bottom-tear.png"
                alt="Bottom tear"
                width={1920}
                height={100}
                className="w-full h-auto"
              />
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
