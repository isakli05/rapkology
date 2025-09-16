import { Saira, Saira_Condensed } from 'next/font/google';

export const saira = Saira({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-saira',
  weight: ['300', '400', '700'],
});

export const sairaCondensed = Saira_Condensed({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-saira-condensed',
  weight: ['300', '700'],
});