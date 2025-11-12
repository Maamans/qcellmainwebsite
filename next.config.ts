import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    MAP_BOX_ACCESS_TOKEN: process.env.MAP_BOX_ACCESS_TOKEN,
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "source.unsplash.com" },
      { protocol: "https", hostname: "unsplash.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
    // For Netlify, we can use unoptimized images or let Next.js handle it
    unoptimized: process.env.NODE_ENV === "production" ? false : false,
  },
  // Output configuration for static export if needed
  output: "standalone",
};

export default nextConfig;
