'use client';

import dynamic from 'next/dynamic';

// Dynamic import for performance - MonthlyFavorites is a large component
const MonthlyFavorites = dynamic(() => import('./MonthlyFavorites'), {
  ssr: false,
  loading: () => (
    <section className="w-full bg-black py-16 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-brand-yellow border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-white font-saira">Ayın Favorileri Yükleniyor...</p>
      </div>
    </section>
  ),
});

export default function MonthlyFavoritesWrapper() {
  return <MonthlyFavorites />;
}
