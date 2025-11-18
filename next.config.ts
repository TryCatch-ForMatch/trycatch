import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['res.cloudinary.com', 'cdn.jsdelivr.net'],
    unoptimized: true,
  },
  serverActions: {
    bodySizeLimit: '5mb', // define o limite do body para 5 MB
  },
};

export default nextConfig;
