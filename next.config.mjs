/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['swiper'],
  },
  // Swiper için gerekli ayarlar
  transpilePackages: ['swiper'],
  // External images configuration
  images: {
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

