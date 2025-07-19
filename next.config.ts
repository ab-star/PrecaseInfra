import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com'], // if using external images
  },
};

export default nextConfig;
