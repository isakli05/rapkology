import Navbar from '../components/Navbar';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 font-saira">
            Rapkology
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto font-saira-condensed">
            Hip-hop, rap ve urban müzik kültürünün dijital platformu
          </p>
          
          {/* Coming Soon */}
          <div className="bg-gray-900 rounded-lg p-8 max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-brand-yellow mb-4 font-saira-condensed">
              Çok Yakında
            </h2>
            <p className="text-gray-400 font-saira">
              Platform geliştirme aşamasında. En güncel haberler, etkinlikler ve müzik içerikleri için takipte kalın.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-900 text-white py-8 absolute bottom-0 w-full">
        <div className="container mx-auto px-4 text-center">
          <p className="font-saira font-normal text-sm leading-none text-ink-500">
            © RAPKOLOGY All Rights Are Reserved 2024.
          </p>
        </div>
      </footer>
    </main>
  );
}