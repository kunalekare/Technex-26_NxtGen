import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Ensure the build is optimized for Node 22.11.0
  serverExternalPackages: ["mysql2"],
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  // Custom headers for security and accessibility
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
        ],
      },
    ];
  },
};

export default nextConfig;