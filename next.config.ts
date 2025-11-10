import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['res.cloudinary.com', 'cdn.jsdelivr.net'],
    unoptimized: true,
  },
  /* config options here */
};

export default nextConfig;
