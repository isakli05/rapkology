'use client';

import { useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Button, { ButtonShadow } from '../ui/Button';
import mockData from '../../mock-data.json';

interface ClipItem {
  id: string;
  title: string;
  img: string;
  slug: string;
}

interface ClipsSectionProps {
  className?: string;
  clipCount?: number;
}

interface ClipsSectionConfig {
  typography: {
    sectionTitle: string;
    clipTitle: string;
  };
  layout: {
    container: string;
    titleContainer: string;
    grid: string;
    clipContainer: string;
    buttonContainer: string;
  };
  interactions: {
    clipHover: string;
    transition: string;
  };
  accessibility: {
    sectionLabel: string;
    clipLabel: (title: string) => string;
  };
}

// Configuration - Consistent with design system
const clipsSectionConfig: ClipsSectionConfig = {
  typography: {
    sectionTitle: "font-saira-condensed font-bold text-white text-display-md",
    clipTitle: "font-saira font-normal text-base text-white leading-[1.2] w-full overflow-hidden"
  },
  layout: {
    container: "w-full overflow-hidden",
    titleContainer: "flex items-center gap-4 mb-8 px-0",
    grid: "grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mb-8 overflow-hidden",
    clipContainer: "relative w-full overflow-hidden",
    buttonContainer: "flex justify-center"
  },
  interactions: {
    clipHover: "hover:opacity-80",
    transition: "transition-opacity duration-200"
  },
  accessibility: {
    sectionLabel: "Video klipler",
    clipLabel: (title: string) => `${title} klibini izle`
  }
};

export default function ClipsSection({ className = "", clipCount = 3 }: ClipsSectionProps) {
  // Use mock data for clips
  const clipsData = useMemo(() => {
    return mockData.slice(0, clipCount).map(item => ({
      id: item._id,
      title: item.attributes.title,
      img: item.attributes.img,
      slug: item.attributes.slug
    }));
  }, [clipCount]);

  return (
    <section className={`${clipsSectionConfig.layout.container} ${className}`}>
      {/* Klipler Title with Icon */}
      <div className={clipsSectionConfig.layout.titleContainer}>
        <h2 className={clipsSectionConfig.typography.sectionTitle}>
          KLİPLER
        </h2>
        <Image
          src="/icons/clip.svg"
          alt=""
          width={49}
          height={29}
          className="w-12 h-auto flex-shrink-0"
          aria-hidden="true"
        />
      </div>

      {/* Clips Grid */}
      <div className={clipsSectionConfig.layout.grid}>
        {clipsData.map((clip) => (
          <div key={clip.id} className={clipsSectionConfig.layout.clipContainer}>
            {/* Clip Image with Play Button */}
            <div className="relative w-full h-0 pb-[56.25%] mb-4 overflow-hidden">
              <Image
                src={clip.img}
                alt={clip.title}
                fill
                className="absolute inset-0 w-full h-full object-cover"
                sizes="(max-width: 640px) 100vw, 33vw"
              />
              
              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-14 h-14">
                  <Image
                    src="/icons/play.svg"
                    alt="Play clip"
                    width={57}
                    height={56}
                    className="w-full h-full drop-shadow-lg"
                  />
                </div>
              </div>
            </div>

            {/* Clip Title */}
            <h3 className={clipsSectionConfig.typography.clipTitle}>
              {clip.title}
            </h3>

            {/* Link overlay */}
            <Link 
              href={`/blog/${clip.slug}`}
              className={`absolute inset-0 ${clipsSectionConfig.interactions.clipHover} ${clipsSectionConfig.interactions.transition}`}
              aria-label={clipsSectionConfig.accessibility.clipLabel(clip.title)}
            />
          </div>
        ))}
      </div>

      {/* Daha Fazla Gör Button */}
      <div className={clipsSectionConfig.layout.buttonContainer}>
        <div className="cta-button-container">
          <Button
            variant="primary"
            size="md"
            className="uppercase tracking-wide"
          >
            Daha Fazla Gör
          </Button>
          <ButtonShadow />
        </div>
      </div>
    </section>
  );
}
