import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Enable standalone output for Docker
  output: 'standalone',
  
  // Fix workspace root detection with multiple lockfiles
  // This ensures Next.js uses the correct directory as the root
  outputFileTracingRoot: process.cwd(),
  
  // Security: Disable X-Powered-By header
  poweredByHeader: false,
  
  // Security: Enable React strict mode
  reactStrictMode: true,
  
  // Security: Disable source maps in production
  productionBrowserSourceMaps: false,
  
  env: {
    MAP_BOX_ACCESS_TOKEN: process.env.MAP_BOX_ACCESS_TOKEN,
  },
  images: {
    // Security: Limit image domains
    remotePatterns: [
      { protocol: "https", hostname: "source.unsplash.com" },
      { protocol: "https", hostname: "unsplash.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "http", hostname: "localhost", port: "4000", pathname: "/uploads/**" },
      { protocol: "http", hostname: "localhost", port: "4000", pathname: "/**" },
      { protocol: "https", hostname: "localhost", port: "4000" },
      // Allow backend images in Docker
      { protocol: "http", hostname: "backend", pathname: "/uploads/**" },
      { protocol: "http", hostname: "backend", pathname: "/**" },
      { protocol: "https", hostname: "backend" },
    ],
    // Allow unoptimized images for backend (faster loading)
    // Set to true if image optimization fails on hosting platform
    unoptimized: process.env.NODE_ENV === 'production' ? false : false,
    // Ensure images are properly loaded
    formats: ['image/avif', 'image/webp'],
    // Security: Disable dangerous image optimization
    dangerouslyAllowSVG: false,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  
  // Security: Headers configuration
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()'
          },
        ],
      },
    ]
  },
};

export default nextConfig;
