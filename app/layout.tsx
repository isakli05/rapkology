import { saira, sairaCondensed } from './fonts';
import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Rapkology - Landing & Blog',
  description: 'Modern landing page and blog built with Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className={`${saira.variable} ${sairaCondensed.variable}`}>
      <body className="bg-black text-white antialiased">{children}</body>
    </html>
  );
}