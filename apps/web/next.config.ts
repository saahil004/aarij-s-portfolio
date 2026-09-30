import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  transpilePackages: ['@aarij/shared'],
  images: {
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
