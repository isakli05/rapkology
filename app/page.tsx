import Navbar from '../components/Navbar';
import HeroSliderWrapper from '../components/HeroSliderWrapper';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black">
      {/* Navigation */}
      <Navbar />

      {/* Hero Slider */}
      <HeroSliderWrapper />

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