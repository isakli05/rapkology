import Navbar from '../components/Navbar';
import HeroSliderWrapper from '../components/HeroSliderWrapper';
import Banner from '../components/Banner';
import Trends from '../components/Trends';
import MonthlyFavorites from '../components/MonthlyFavorites';
import BlogDiscovery from '../components/BlogDiscovery';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black">
      {/* Navigation */}
      <Navbar />

      {/* Hero Slider */}
      <HeroSliderWrapper />

      {/* Banner */}
      <Banner />

      {/* Trends */}
      <Trends />

      {/* Monthly Favorites */}
      <MonthlyFavorites />

      {/* Blog Discovery - Keşfet Section */}
      <BlogDiscovery />

      {/* Footer */}
      <footer className="bg-black border-t border-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="font-saira font-normal text-sm leading-none text-ink-500">
            © RAPKOLOGY All Rights Are Reserved 2024.
          </p>
        </div>
      </footer>
    </main>
  );
}