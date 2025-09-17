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
          700: '#3B3B3B',
          500: '#5C5C5C',
        },
      },
      spacing: {
        'nav-gap': 'clamp(2rem, 6vw, 6rem)',
        'hero-gap': 'clamp(1rem, 4vw, 2rem)',
        'hero-gap-lg': 'clamp(1.5rem, 5vw, 3rem)',
        'hero-gap-xl': 'clamp(2rem, 6vw, 4rem)',
        'banner-logo-divider': '2rem',
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
      },
      boxShadow: {
        'brand': '5.55px 5.55px 0px 0px #000000',
        'twitch-glow': '0 4px 12px rgba(147, 51, 234, 0.3)',
      },
      clipPath: {
        'skew-button': 'polygon(0 5%, 100% 0%, 91% 100%, 7% 92%)',
      },
      backdropBlur: {
        'nav': '12px',
      },
    },
  },
  plugins: [],
};

export default config;

