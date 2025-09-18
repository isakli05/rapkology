'use client';

import Image from 'next/image';
import { useCallback } from 'react';
import { Heart, ChevronDown, Star } from 'lucide-react';


interface BannerConfig {
  content: {
    title: {
      main: string;
      highlight: string;
    };
    subtitle: string;
    buttons: {
      follow: string;
      subscribe: string;
    };
  };
  assets: {
    bottomTear: string;
    bannerPeople: string;
    bannerCloud: string;
    rapperLeft: string;
    rapperRight: string;
    twitchLogo: string;
  };
  layout: {
    rotation: string;
    opacity: {
      cloud: number;
      divider: number;
    };
    objectPosition: {
      crowd: string;
      mask: string;
    };
    positioning: {
      crowd: {
        top: string;
        height: string;
      };
      mask: {
        top: string;
      };
      rapperLeft: {
        bottom: string;
        left: string;
        scale: number;
      };
      rapperRight: {
        bottom: string;
        right: string;
      };
    };
  };
}

// Design System Configuration - Centralized & Typed
const bannerConfig: BannerConfig = {
  content: {
    title: {
      main: "HER HAFTA",
      highlight: "CANLIDAYIZ!"
    },
    subtitle: "Bizi Takip Edin!",
    buttons: {
      follow: "Takip Et",
      subscribe: "Abone Ol"
    }
  },
  assets: {
    bottomTear: "/images/bottom-tear.png",
    bannerPeople: "/images/banner-people.png", 
    bannerCloud: "/images/banner-black-cloud.png",
    rapperLeft: "/images/rapci_dayi.png",
    rapperRight: "/images/rapci_abla.png",
    twitchLogo: "/images/twitch_logo.png"
  },
  layout: {
    rotation: "-rotate-6 lg:-rotate-6",
    opacity: {
      cloud: 0,
      divider: 0.6
    },
    objectPosition: {
      crowd: "center center",
      mask: "bottom center"
    },
    positioning: {
      crowd: {
        top: "35%",
        height: "90%"
      },
      mask: {
        top: "70%"
      },
      rapperLeft: {
        bottom: "30%",
        left: "60%", 
        scale: 1.5
      },
      rapperRight: {
        bottom: "0%",
        right: "50%"
      }
    }
  }
};

export default function Banner() {
  // Performance: Memoized handlers
  const handleFollowClick = useCallback(() => {
    // Twitch follow logic
    console.log('Follow clicked');
  }, []);

  const handleSubscribeClick = useCallback(() => {
    // Twitch subscribe logic  
    console.log('Subscribe clicked');
  }, []);

  return (
    <section 
      className="relative w-full h-screen lg:h-screen overflow-hidden bg-black"
      role="region"
      aria-label="Banner section"
      aria-describedby="banner-desc"
    >
      {/* Background Cloud Layer - Design System Component */}
      <div className="absolute inset-0 z-banner-cloud">
        <Image
          src={bannerConfig.assets.bannerCloud}
          alt="Background cloud"
          fill
          className="object-contain w-full h-full"
          style={{ opacity: bannerConfig.layout.opacity.cloud }}
          priority={false}
        />
      </div>

      {/* Concert Crowd Layer - Responsive Design System */}
      <div className="absolute inset-0 z-banner-people overflow-hidden">
        <div 
          className="absolute inset-x-0"
          style={{
            top: bannerConfig.layout.positioning.crowd.top,
            height: bannerConfig.layout.positioning.crowd.height
          }}
        >
          <Image
            src={bannerConfig.assets.bannerPeople}
            alt="Concert crowd"
            fill
            className="object-cover w-full h-full"
            style={{ objectPosition: bannerConfig.layout.objectPosition.crowd }}
            priority={true}
            sizes="100vw"
          />
        </div>
      </div>

      {/* Content Flex - Simple Layout System */}
      <div className="absolute inset-0 z-banner-content">
        <div className="h-full flex items-center justify-center">
          
          {/* Left Rapper - Design System Positioned */}
          <div className="hidden lg:block flex-none w-64 xl:w-80 relative h-full">
            <div 
              className="absolute w-full h-5/6"
              style={{
                bottom: bannerConfig.layout.positioning.rapperLeft.bottom,
                left: bannerConfig.layout.positioning.rapperLeft.left
              }}
            >
              <Image
                src={bannerConfig.assets.rapperLeft}
                alt="Rapper"
                fill
                className="object-contain object-bottom"
                style={{
                  transform: `scale(${bannerConfig.layout.positioning.rapperLeft.scale})`
                }}
                priority={true}
                sizes="(max-width: 1024px) 0vw, (max-width: 1280px) 256px, 320px"
              />
            </div>
          </div>
          
          {/* Center Content - Flexible */}
          <div className="flex-1 text-center px-hero-gap lg:px-hero-gap-lg xl:px-hero-gap-xl flex flex-col justify-center min-h-full py-16 lg:py-0">
            
            {/* Unified Rotation Container - Design System */}
            <div className={`transform ${bannerConfig.layout.rotation} flex flex-col items-center space-y-6 lg:space-y-8`}>
              
              {/* Main Content Section */}
              <div className="flex flex-col lg:flex-row items-center justify-start space-y-6 lg:space-y-0 lg:gap-0">
                
                {/* Twitch Logo - Design System Component */}
                <div className="flex-shrink-0">
                  <Image
                    src={bannerConfig.assets.twitchLogo}
                    alt="Twitch"
                    width={256}
                    height={128}
                    className="banner-twitch-logo"
                    priority={true}
                    sizes="(max-width: 640px) 150px, (max-width: 1024px) 200px, 256px"
                  />
                </div>
                
                {/* Vertical Divider - Design System Component */}
                <div className="banner-logo-divider"></div>
                
                {/* Title Text - 32px from Divider */}
                <div className="text-center lg:text-left lg:ml-8">
                  {/* HER HAFTA - White Light */}
                  <h2 className="font-saira-condensed font-light text-3xl sm:text-4xl lg:text-5xl xl:text-6xl leading-tight text-white">
                    {bannerConfig.content.title.main}
                  </h2>
                  
                  {/* CANLIDAYIZ! - Brand Yellow Bold */}
                  <h2 className="font-saira-condensed font-bold text-3xl sm:text-4xl lg:text-5xl xl:text-6xl leading-tight text-brand-yellow">
                    {bannerConfig.content.title.highlight}
                  </h2>
                  
                  {/* Subtitle - Directly Below */}
                  <p className="font-saira font-bold text-base lg:text-lg xl:text-xl leading-tight text-center lg:text-left text-white mt-1 lg:mt-2">
                    {bannerConfig.content.subtitle}
                  </p>
                </div>
              </div>

              {/* Action Buttons - Perfectly Aligned */}
              <div className="inline-flex items-center justify-center gap-3 lg:gap-4 px-4 py-3 lg:px-6 lg:py-4 rounded-2xl border border-ink-500 w-fit h-fit">
                
                {/* Follow Button - Twitch Purple with Outline Heart */}
                <button
                  onClick={handleFollowClick}
                  className="banner-button banner-button-primary"
                  aria-label="Twitch'te takip et"
                >
                  <Heart className="w-4 h-4" strokeWidth={4} />
                  {bannerConfig.content.buttons.follow}
                </button>

                {/* Subscribe Button - Star + Text + Arrow */}
                <button
                  onClick={handleSubscribeClick}
                  className="banner-button banner-button-dark"
                  aria-label="Twitch'te abone ol"
                >
                  <Star className="w-4 h-4" strokeWidth={4} />
                  {bannerConfig.content.buttons.subscribe}
                  <ChevronDown className="w-4 h-4" strokeWidth={4} />
                </button>

              </div>
              
            </div>

            {/* Screen reader description */}
            <div id="banner-desc" className="sr-only">
              Twitch platformunda her hafta canlı yayınlarımızı takip edebilir, takip et ve abone ol butonları ile kanalımıza katılabilirsiniz.
            </div>

          </div>
          
          {/* Right Rapper - Design System Positioned */}
          <div className="hidden lg:block flex-none w-64 xl:w-80 relative h-full">
            <div 
              className="absolute w-full h-5/6"
              style={{
                bottom: bannerConfig.layout.positioning.rapperRight.bottom,
                right: bannerConfig.layout.positioning.rapperRight.right
              }}
            >
              <Image
                src={bannerConfig.assets.rapperRight}
                alt="Rapper"
                fill
                className="object-contain object-bottom"
                priority={true}
                sizes="(max-width: 1024px) 0vw, (max-width: 1280px) 256px, 320px"
              />
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Tear Mask - Design System Component */}
      <div 
        className="absolute left-0 right-0 z-banner-mask pointer-events-none"
        style={{
          top: bannerConfig.layout.positioning.mask.top,
          bottom: "0"
        }}
      >
        <Image
          src={bannerConfig.assets.bottomTear}
          alt="Section divider"
          fill
          className="object-cover w-full h-full"
          style={{ objectPosition: bannerConfig.layout.objectPosition.mask }}
          priority={true}
          sizes="100vw"
        />
      </div>

    </section>
  );
}
