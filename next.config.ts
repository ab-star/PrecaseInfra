import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'images.unsplash.com', 
      'firebasestorage.googleapis.com',
      'storage.googleapis.com',
  'pub-ff6f7349f0ca4f698e9006f92b5c1c8a.r2.dev',
  'fujisilvertech.com'
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  }
};

export default nextConfig;