import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // O projeto tem instruções próprias para assistentes de IA (CLAUDE.md e
  // docs/05 - contribuicao/). Isto impede o `next dev` de gerar um AGENTS.md
  // concorrente na raiz.
  agentRules: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['res.cloudinary.com', 'cdn.jsdelivr.net'],
    unoptimized: true,
  },
};

export default nextConfig;
