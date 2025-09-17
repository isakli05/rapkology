import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
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
          300: '#8B8B8B',
        },
      },
      spacing: {
        'nav-gap': 'clamp(2rem, 6vw, 6rem)',
        'hero-gap': 'clamp(1rem, 4vw, 2rem)',
        'hero-gap-lg': 'clamp(1.5rem, 5vw, 3rem)',
        'hero-gap-xl': 'clamp(2rem, 6vw, 4rem)',
        'banner-logo-divider': '2rem',
        // Monthly Favorites Design System
        'favorites-logo-width': 'clamp(400px, 30vw, 500px)',
        'favorites-logo-height': 'clamp(80px, 6vw, 96px)',
        'favorites-logo-gap': 'clamp(1.5rem, 4vw, 2rem)',
        'favorites-card-height': 'clamp(256px, 20vw, 320px)',
        'favorites-card-offset': 'clamp(-1.5rem, -2vw, -2rem)',
      },
      zIndex: {
        'nav': '50',
        'slider-content': '10',
        'slider-mask': '20', 
        'slider-pagination': '30',
        'banner-cloud': '0',
        'banner-people': '10',
        'banner-content': '20',
        'banner-mask': '50',
        // Monthly Favorites Z-Index Layers
        'favorites-logo': '20',
        'favorites-cover': '10',
        'favorites-content': '20',
        'favorites-mask': '30',
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
    },
  },
  plugins: [],
};

export default config;

