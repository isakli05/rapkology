import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: '0px',
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1610px',
        },
      },
      fontFamily: {
        'saira': ['var(--font-saira)'],
        'saira-condensed': ['var(--font-saira-condensed)'],
        'helvetica': ['ui-sans-serif', 'system-ui', 'Helvetica', 'Arial', 'sans-serif'],
      },
      colors: {
        brand: {
          yellow: '#F0E74D',
        },
        ink: {
          900: '#2A2A2A',
          800: '#323232',
          700: '#3B3B3B',
          500: '#5C5C5C',
          400: '#4A4A4A',
          300: '#8B8B8B',
        },
      },
      spacing: {
        'nav-gap': 'clamp(2rem, 6vw, 6rem)',
        'hero-gap': 'clamp(1rem, 4vw, 2rem)',
        'hero-gap-lg': 'clamp(1.5rem, 5vw, 3rem)',
        'hero-gap-xl': 'clamp(0px, 0.05vw, 1px)',
        'banner-logo-divider': '2rem',
        // Monthly Favorites Design System
        'favorites-logo-width': 'clamp(280px, 40vw, 600px)',
        'favorites-logo-height': 'clamp(80px, 6vw, 96px)',
        'favorites-logo-gap': 'clamp(1.5rem, 4vw, 2rem)',
        // News Slider Design System - Professional Spacing
        'news-section-gap': 'clamp(2rem, 4vw, 3rem)',
        'news-card-gap': 'clamp(1.5rem, 2.5vw, 1.75rem)',
        'news-tear-offset': 'clamp(-2rem, -2.5vw, -2.5rem)',
        'news-description-height': 'clamp(6rem, 12vh, 9rem)',
        // Removed - using direct CSS values now
        // 'favorites-card-width': 'clamp(180px, 14vw, 240px)',
        // 'favorites-card-height': 'clamp(256px, 20vw, 320px)',
        // 'favorites-card-offset': 'clamp(-1.5rem, -2vw, -2rem)',
      },
      zIndex: {
        'nav': '50',
        'slider-content': '10',
        'slider-mask': '20', 
        'slider-pagination': '30',
        'banner-cloud': '0',
        'banner-people': '10',
        'banner-content': '20',
        'banner-mask': '20',
        // Monthly Favorites Z-Index Layers
        'favorites-logo': '20',
        'favorites-cover': '10',
        'favorites-content': '20',
        'favorites-title': '25',
        'favorites-mask': '30',
        // News Slider Z-Index System
        'news-backgrounds': '0',
        'news-content': '10',
        'news-tear': '20',
        'news-overlay': '15',
        // NewsDiscovery Z-Index System
        'discovery-diamond': '-10',
        'discovery-content': '10',
      },
      boxShadow: {
        'brand': '5.55px 5.55px 0px 0px #000000',
        'twitch-glow': '0 4px 12px rgba(147, 51, 234, 0.3)',
      },
      clipPath: {
        'skew-button': 'polygon(0 5%, 100% 0%, 91% 100%, 7% 92%)',
        'favorites-logo': 'polygon(0 0, 100% 0%, 90% 82%, 0% 100%)',
      },
      backdropBlur: {
        'nav': '12px',
      },
      fontSize: {
        // News Slider Typography Design System
        'news-fluid-base': ['clamp(1.125rem, 1.5vw, 1.5rem)', { lineHeight: '1.25' }],
        'news-fluid-lg': ['clamp(1.25rem, 2vw, 1.75rem)', { lineHeight: '1.2' }],
        'news-fluid-xl': ['clamp(1.5rem, 2.5vw, 2rem)', { lineHeight: '1.1' }],
        // News Card Typography Design System - Figma Spec Responsive
        'news-date': ['clamp(0.875rem, 1.2vw, 1rem)', { lineHeight: '1.2', letterSpacing: '0.015em' }],
        'news-title': ['clamp(1.125rem, 1.5vw, 1.25rem)', { lineHeight: '1.04', letterSpacing: '0em' }],
        'news-link': ['clamp(0.875rem, 1.2vw, 1rem)', { lineHeight: '1.2', letterSpacing: '0.015em' }],
      },
    },
  },
  plugins: [],
};

export default config;

