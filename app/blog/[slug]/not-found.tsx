import Link from 'next/link';
import { ArrowLeft, Search } from 'lucide-react';

// Senior Level 404 Page - Enterprise Pattern
export default function BlogNotFound() {
  return (
    <main className="relative w-full bg-black min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4 lg:px-hero-gap-lg xl:px-hero-gap-xl">
        <div className="max-w-2xl mx-auto text-center py-16 lg:py-24">
          
          {/* 404 Title - Design System Typography */}
          <h1 className="font-saira-condensed font-bold text-white mb-8" 
              style={{ fontSize: 'clamp(4rem, 8vw, 8rem)' }}>
            404
          </h1>

          {/* Error Message - Design System Typography */}
          <div className="space-y-6 mb-12">
            <h2 className="font-saira-condensed font-bold text-white"
                style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)' }}>
              BLOG YAZISI BULUNAMADI
            </h2>
            
            <p className="font-saira font-normal text-base leading-[1.2] tracking-[0.015em] text-ink-400 max-w-md mx-auto">
              Aradığınız blog yazısı mevcut değil veya kaldırılmış olabilir. 
              Ana sayfaya dönerek diğer içerikleri keşfedebilirsiniz.
            </p>
          </div>

          {/* Action Buttons - Design System Components */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            
            {/* Back to Blog Button */}
            <Link 
              href="/blog"
              className="inline-flex items-center gap-3 px-6 py-3 bg-brand-yellow text-black font-saira font-bold text-sm hover:bg-opacity-80 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:ring-offset-2 focus:ring-offset-black"
            >
              <ArrowLeft className="w-4 h-4" strokeWidth={2} />
              BLOG'A GERİ DÖN
            </Link>

            {/* Search Button */}
            <Link 
              href="/blog?search=true"
              className="inline-flex items-center gap-3 px-6 py-3 border border-ink-500 text-white font-saira font-normal text-sm hover:border-brand-yellow hover:text-brand-yellow transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:ring-offset-2 focus:ring-offset-black"
            >
              <Search className="w-4 h-4" strokeWidth={2} />
              ARAMA YAP
            </Link>

          </div>

          {/* Helpful Links */}
          <div className="mt-12 pt-8 border-t border-ink-700">
            <p className="font-saira font-normal text-sm text-ink-500 mb-4">
              Popüler kategoriler:
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {['Türk Rap', 'Yabancı Rap', 'Rap Haberleri', 'Haftanın Klipleri'].map((category) => (
                <Link
                  key={category}
                  href={`/blog?category=${encodeURIComponent(category)}`}
                  className="px-3 py-1 bg-ink-800 text-white font-saira font-normal text-sm hover:bg-brand-yellow hover:text-black transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:ring-offset-2 focus:ring-offset-black"
                >
                  {category}
                </Link>
              ))}
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
