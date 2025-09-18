import { saira, sairaCondensed } from './fonts';
import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Rapkology - Hip-Hop & Türk Rap Kültürü',
  description: 'Hip-hop ve Türk rap müzik kültürü hakkında güncel haberler, yeni çıkan şarkılar, sanatçı röportajları ve daha fazlası. Rapkology ile rap dünyasını keşfedin.',
  keywords: ['rap', 'hip-hop', 'türk rap', 'müzik', 'sanatçı', 'album', 'klip', 'rapkology'],
  authors: [{ name: 'Rapkology' }],
  creator: 'Rapkology',
  publisher: 'Rapkology',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  // metadataBase: new URL('https://rapkology.com'), // Production'da enable edilecek
  openGraph: {
    title: 'Rapkology - Hip-Hop & Türk Rap Kültürü',
    description: 'Hip-hop ve Türk rap müzik kültürü hakkında güncel haberler, yeni çıkan şarkılar, sanatçı röportajları ve daha fazlası.',
    type: 'website',
    locale: 'tr_TR',
    siteName: 'Rapkology',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rapkology - Hip-Hop & Türk Rap Kültürü',
    description: 'Hip-hop ve Türk rap müzik kültürü hakkında güncel haberler ve daha fazlası.',
    creator: '@rapkology',
  },
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