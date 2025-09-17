'use client';

import dynamic from 'next/dynamic';

// Dynamic import for SSR compatibility
const HeroSlider = dynamic(() => import('./HeroSlider'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-brand-yellow border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-white font-saira">Yükleniyor...</p>
      </div>
    </div>
  ),
});

export default function HeroSliderWrapper() {
  return <HeroSlider />;
}
