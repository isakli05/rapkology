'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import Image from 'next/image';
import { useState, useCallback, useMemo } from 'react';
import Link from 'next/link';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// Import mock data
import mockData from '@/mock-data.json';

// Type Definitions - Senior Level Type Safety
interface NewsItem {
  _id: string;
  attributes: {
    title: string;
    desc: string;
    img: string;
    slug: string;
    category: string[];
    tags: string[];
  };
  createdAt: string;
}

interface FeaturedNewsCardProps {
  news: NewsItem;
  isActive: boolean;
}

interface SideNewsCardProps {
  news: NewsItem;
}

// Senior Level Component Composition Pattern
const NewsBreadcrumb = () => (
  <nav className="flex items-center space-x-2 text-sm font-saira font-normal text-ink-700" aria-label="Breadcrumb">
    <Link href="/" className="cursor-pointer">
      ANA SAYFA
    </Link>
    <span className="text-ink-500">{'>'}</span>
    <Link href="/blog" className="cursor-pointer">
      BLOG
    </Link>
    <span className="text-ink-500">{'>'}</span>
    <span className="text-ink-700 font-bold truncate">
      LOREM IPSUM DOLOR ... AMET
    </span>
  </nav>
);

// Featured News Card - Design System Component
const FeaturedNewsCard = ({ news, isActive }: FeaturedNewsCardProps) => (
  <div className="news-featured-card group">
    {/* Main Image */}
    <div className="news-featured-image">
      <Image
        src={news.attributes.img}
        alt={news.attributes.title}
        fill
        priority={isActive}
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 70vw, 60vw"
      />
      
      {/* Dark overlay for better text readability */}
      <div className="news-featured-overlay" />
    </div>

    {/* Content Overlay */}
    <div className="news-featured-content">
      <div className="news-featured-layout">
        {/* Title - Left Bottom */}
        <div className="flex-1 mr-4">
          <h2 className="news-featured-title">
            {news.attributes.title}
          </h2>
        </div>

        {/* Play Button - Right */}
        <div className="news-play-button">
          <Image
            src="/images/play.svg"
            alt="Play video"
            width={80}
            height={80}
            className="w-full h-full drop-shadow-lg"
          />
        </div>
      </div>
    </div>

    {/* Link overlay for accessibility */}
    <Link 
      href={`/haberler/${news.attributes.slug}`}
      className="absolute inset-0 z-15"
      aria-label={`${news.attributes.title} haberini oku`}
    />
  </div>
);

// Side News Card - Design System Component
const SideNewsCard = ({ news }: SideNewsCardProps) => (
  <div className="news-side-card group">
    {/* Image - Optimized Aspect Ratio */}
    <div className="news-side-image">
      <Image
        src={news.attributes.img}
        alt={news.attributes.title}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 176px, 208px"
      />
    </div>

    {/* Content - Only Title */}
    <div className="news-side-content">
      <h3 className="news-side-title">
        {news.attributes.title}
      </h3>
    </div>

    {/* Link overlay */}
    <Link 
      href={`/haberler/${news.attributes.slug}`}
      className="absolute inset-0"
      aria-label={`${news.attributes.title} haberini oku`}
    />
  </div>
);

// Background Layers Component - Senior Level Abstraction
const NewsBackgroundLayers = () => (
  <>
    {/* Shape Background - PNG */}
    <div className="news-background-layer news-shape-png">
      <Image
        src="/images/shape.png"
        alt=""
        fill
        className="object-contain"
        priority
        aria-hidden="true"
      />
    </div>

    {/* Back Shape Background - SVG */}
    <div className="news-background-layer news-shape-svg">
      <Image
        src="/slider_assets/back_shape.svg"
        alt=""
        fill
        className="object-cover"
        priority
        aria-hidden="true"
      />
    </div>
  </>
);

// Pagination Component - Senior Level Component Composition
interface PaginationProps {
  featuredNews: NewsItem[];
  activeIndex: number;
  swiperInstance: SwiperType | null;
  onDotClick: (index: number) => void;
}

const NewsPagination = ({ featuredNews, activeIndex, swiperInstance, onDotClick }: PaginationProps) => (
  <div className="news-pagination-dots">
    {featuredNews.map((_, index) => (
      <button
        key={index}
        onClick={() => onDotClick(index)}
        disabled={!swiperInstance}
        className={`news-pagination-dot ${
          activeIndex === index
            ? 'news-pagination-dot--active'
            : 'news-pagination-dot--inactive'
        }`}
        aria-label={`Slide ${index + 1}`}
      />
    ))}
  </div>
);

// Main Component - Senior Level Architecture
export default function NewsSlider() {
  // State Management - Professional Pattern
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

  // Data Processing - Memoized for Performance Optimization
  const newsData = useMemo(() => 
    mockData.slice(0, 8) as NewsItem[], 
    []
  );

  const featuredNews = useMemo(() => 
    newsData.slice(0, 4), 
    [newsData]
  );

  const sideNews = useMemo(() => 
    newsData.slice(4, 8), 
    [newsData]
  );

  // Event Handlers - Memoized to Prevent Unnecessary Re-renders
  const handleSlideChange = useCallback((swiper: SwiperType) => {
    setActiveIndex(swiper.realIndex);
  }, []);

  const handleSwiperInit = useCallback((swiper: SwiperType) => {
    setSwiperInstance(swiper);
  }, []);

  const handleDotClick = useCallback((index: number) => {
    swiperInstance?.slideToLoop(index);
  }, [swiperInstance]);

  return (
    <section 
      className="relative min-h-screen bg-brand-yellow overflow-hidden"
      role="region"
      aria-label="Haberler slider"
    >
      {/* Background Layers - Component Abstraction */}
      <NewsBackgroundLayers />

      {/* Content Container - Design System Architecture */}
      <div className="news-content-container pt-20 lg:pt-28">
        <div className="container mx-auto px-4 pb-24 lg:px-hero-gap-lg xl:px-hero-gap-xl">
          {/* Breadcrumb */}
          <div className="mb-8">
            <NewsBreadcrumb />
          </div>

          {/* Page Title */}
          <div className="mb-12">
            <h1 className="font-saira-condensed font-bold text-6xl lg:text-8xl xl:text-9xl leading-none text-black">
              BLOG
            </h1>
          </div>

          {/* Slider Layout - Professional Grid System */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16">
            {/* Main Slider - Left Side */}
            <div className="lg:col-span-8">
              <div className="relative h-96 lg:h-[500px] xl:h-[600px]">
                <Swiper
                  modules={[Autoplay]}
                  spaceBetween={0}
                  slidesPerView={1}
                  navigation={false}
                  autoplay={{
                    delay: 6000,
                    disableOnInteraction: false,
                  }}
                  loop={true}
                  speed={800}
                  onSlideChange={handleSlideChange}
                  onSwiper={handleSwiperInit}
                  className="h-full w-full"
                  aria-label={`${featuredNews.length} öne çıkan haberden oluşan slider`}
                >
                  {featuredNews.map((news, index) => (
                    <SwiperSlide key={news._id}>
                      <FeaturedNewsCard 
                        news={news} 
                        isActive={index === activeIndex}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              {/* Description and Pagination - Design System Layout */}
              <div className="news-pagination-layout">
                {/* Description - Left Side */}
                <div className="flex-1 max-w-2xl">
                  <p className="news-description">
                    {featuredNews[activeIndex]?.attributes.desc}
                  </p>
                </div>

                {/* Pagination Dots - Right Side */}
                <NewsPagination 
                  featuredNews={featuredNews}
                  activeIndex={activeIndex}
                  swiperInstance={swiperInstance}
                  onDotClick={handleDotClick}
                />
              </div>
            </div>

            {/* Side News Cards - Right Side */}
            <div className="lg:col-span-4">
              <div className="space-y-6 lg:space-y-7">
                {sideNews.map((news) => (
                  <div key={news._id} className="relative">
                    <SideNewsCard news={news} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Tear Effect - Design System Component */}
      <div className="news-tear-effect">
        <Image
          src="/images/bottom-tear.png"
          alt=""
          width={1920}
          height={100}
          className="w-full h-auto"
          priority
          aria-hidden="true"
        />
      </div>
    </section>
  );
}