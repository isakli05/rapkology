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

    </main>
  );
}