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
    },
  },
  plugins: [],
};

export default config;

