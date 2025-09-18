import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import BlogFooter from '@/components/BlogFooter';
import NewsSlider from '@/components/NewsSlider';
import NewsDiscovery from '@/components/NewsDiscovery';

export const metadata: Metadata = {
  title: 'Haberler - Rapkology | Hip-Hop & Türk Rap Haberleri',
  description: 'Türk rap ve hip-hop dünyasından en güncel haberler, yeni çıkan şarkılar, sanatçı röportajları ve müzik dünyasının son gelişmeleri.',
  keywords: ['rap haberleri', 'türk rap', 'hip-hop haberleri', 'müzik haberleri', 'sanatçı röportajları', 'rapkology'],
  openGraph: {
    title: 'Haberler - Rapkology | Hip-Hop & Türk Rap Haberleri',
    description: 'Türk rap ve hip-hop dünyasından en güncel haberler, yeni çıkan şarkılar ve müzik dünyasının son gelişmeleri.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Haberler - Rapkology | Hip-Hop & Türk Rap Haberleri',
    description: 'Türk rap ve hip-hop dünyasından en güncel haberler ve müzik dünyasının son gelişmeleri.',
  },
};

export default function HaberlerPage() {
  return (
    <main className="min-h-screen bg-black">
      {/* Navigation */}
      <Navbar />
      
      {/* News Hero Section */}
      <NewsSlider />
      
      {/* News Discovery Section */}
      <NewsDiscovery />
      
      {/* Blog Footer */}
      <BlogFooter />
    </main>
  );
}