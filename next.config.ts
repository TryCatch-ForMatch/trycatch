import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['res.cloudinary.com', 'cdn.jsdelivr.net'],
  },
  /* config options here */
};

export default nextConfig;
