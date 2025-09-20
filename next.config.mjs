/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['swiper'],
  },
  // Swiper için gerekli ayarlar
  transpilePackages: ['swiper'],
  
  // Image optimization enhanced
  images: {
    formats: ['image/webp', 'image/avif'], // Modern formats first
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/dgbjlgpfh/**',
      },
    ],
  },
};

export default nextConfig;