/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['swiper'],
  },
  // Swiper için gerekli ayarlar
  transpilePackages: ['swiper'],
};

export default nextConfig;

