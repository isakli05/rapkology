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
      },
      zIndex: {
        'nav': '50',
        'slider-content': '10',
        'slider-mask': '20', 
        'slider-pagination': '30',
      },
      boxShadow: {
        'brand': '5.55px 5.55px 0px 0px #000000',
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

