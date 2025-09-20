'use client';

import dynamic from 'next/dynamic';

// Dynamic import for performance - NewsSlider with Swiper is heavy
const NewsSlider = dynamic(() => import('./NewsSlider'), {
  ssr: false,
  loading: () => (
    <section className="w-full bg-black py-8 flex items-center justify-center min-h-[400px]">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-brand-yellow border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-white font-saira">Haberler Yükleniyor...</p>
      </div>
    </section>
  ),
});

export default function NewsSliderWrapper() {
  return <NewsSlider />;
}
