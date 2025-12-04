import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Enable standalone output for Docker
  output: 'standalone',
  
  env: {
    MAP_BOX_ACCESS_TOKEN: process.env.MAP_BOX_ACCESS_TOKEN,
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "source.unsplash.com" },
      { protocol: "https", hostname: "unsplash.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "http", hostname: "localhost", port: "4000" },
      { protocol: "https", hostname: "localhost", port: "4000" },
      // Allow backend images in Docker
      { protocol: "http", hostname: "backend" },
      { protocol: "https", hostname: "backend" },
    ],
  },
};

export default nextConfig;
