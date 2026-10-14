import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'standalone',
  // sharp (optimizador next/image) fuera del bundler, como el resto server-only
  serverExternalPackages: ['sequelize', 'mysql2', 'sharp'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'tisolercdn.nyc3.cdn.digitaloceanspaces.com',
      },
    ],
    formats: ['image/avif', 'image/webp'], // AVIF first as it's more efficient
    minimumCacheTTL: 2592000, // 30 días en segundos
    qualities: [25, 50, 75, 80, 85, 90],
  },
  reactStrictMode: true,
  turbopack: {
    root: __dirname, // repo root explícito (evita que infiera el workspace incorrectamente)
  },
  // htmlLimitedBots: /.*/, Descomentar para Lighthouse, evita el metadata streaming y así asegura los metedata en el head. NextJS lo hace automáticamente para crawdlers y bots, no se necesita en producción.
};

export default nextConfig;
