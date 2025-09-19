'use client';

import Image from 'next/image';
import { useCallback } from 'react';
import Newsletter from './Newsletter';
import SocialFooter from './SocialFooter';

interface BlogFooterConfig {
  logo: {
    src: string;
    alt: string;
    width: number;
    height: number;
    responsive: {
      mobile: string;
      desktop: string;
    };
  };
  newsletter: {
    title: string;
  };
  layout: {
    container: string;
    grid: {
      base: string;
      desktop: string;
    };
    leftSection: string;
    rightSection: string;
    spacing: {
      section: string;
      logo: string;
    };
    newsletter: {
      wrapper: string;
    };
  };
  accessibility: {
    sectionRole: string;
    sectionLabel: string;
    logoLabel: string;
  };
}

// Design System Configuration - Enterprise Pattern
const blogFooterConfig: BlogFooterConfig = {
  logo: {
    src: '/images/logo.svg',
    alt: 'Rapkology',
    width: 236, // Original SVG width
    height: 61,  // Original SVG height
    responsive: {
      // Figma specs: 23x22px scaled 4x bigger as requested
      mobile: 'w-[184px] h-[48px]', // 8x scale for mobile
      desktop: 'w-[230px] h-[60px]' // 10x scale for desktop (4x bigger than previous)
    }
  },
  newsletter: {
    title: "GELİŞMELERDEN İLK SEN HABERDAR OL!"
  },
  layout: {
    container: "w-full bg-black",
    grid: {
      base: "grid grid-cols-1 gap-12",
      desktop: "lg:grid-cols-12 lg:gap-16"
    },
    leftSection: "lg:col-span-8 space-y-8",
    rightSection: "lg:col-span-4 lg:pt-[108px]", // Align with newsletter title level (logo mb + title spacing)
    spacing: {
      section: "py-8 lg:py-24",
      logo: "mb-8 lg:mb-12"
    },
    newsletter: {
      wrapper: "max-w-xl" // Limit newsletter width
    }
  },
  accessibility: {
    sectionRole: "contentinfo",
    sectionLabel: "Blog footer - logo, newsletter ve sosyal medya linkleri",
    logoLabel: "Rapkology ana sayfaya git"
  }
};

export default function BlogFooter() {
  
  // Performance: Memoized newsletter submission handler
  const handleNewsletterSubmit = useCallback(async (email: string) => {
    try {
      // Newsletter subscription logic - could integrate with API
      console.log('Blog Newsletter subscription:', email);
      
      // TODO: Implement actual newsletter API integration
      // await subscribeToNewsletter(email);
      
    } catch (error) {
      console.error('Newsletter subscription failed:', error);
      throw new Error('Newsletter aboneliği başarısız oldu. Lütfen tekrar deneyin.');
    }
  }, []);

  return (
    <footer 
      className={blogFooterConfig.layout.container}
      role={blogFooterConfig.accessibility.sectionRole}
      aria-label={blogFooterConfig.accessibility.sectionLabel}
    >
      <div className="container mx-auto px-4 lg:px-hero-gap-lg xl:px-hero-gap-xl">
        <div className={blogFooterConfig.layout.spacing.section}>
          
          {/* Grid Layout - Design System */}
          <div className={`${blogFooterConfig.layout.grid.base} ${blogFooterConfig.layout.grid.desktop}`}>
            
            {/* Left Section - Logo + Newsletter */}
            <div className={blogFooterConfig.layout.leftSection}>
              
              {/* Rapkology Logo - Hidden on Mobile */}
              <div className={`hidden lg:block ${blogFooterConfig.layout.spacing.logo}`}>
                <Image
                  src={blogFooterConfig.logo.src}
                  alt={blogFooterConfig.logo.alt}
                  width={blogFooterConfig.logo.width}
                  height={blogFooterConfig.logo.height}
                  className={`${blogFooterConfig.logo.responsive.mobile} ${blogFooterConfig.logo.responsive.desktop}`}
                  priority={false}
                  aria-label={blogFooterConfig.accessibility.logoLabel}
                />
              </div>

              {/* Newsletter Subscription - Width Limited */}
              <div className={blogFooterConfig.layout.newsletter.wrapper}>
                <Newsletter
                  title={blogFooterConfig.newsletter.title}
                  onSubmit={handleNewsletterSubmit}
                />
              </div>

            </div>

            {/* Right Section - Social Footer */}
            <div className={blogFooterConfig.layout.rightSection}>
              <SocialFooter variant="blog" />
            </div>

          </div>

        </div>
      </div>
    </footer>
  );
}
