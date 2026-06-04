import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  // Ignore ESLint errors during production builds
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Ignore TypeScript errors during production builds
  typescript: {
    ignoreBuildErrors: true,
  },

  // Enable standalone output for Docker
  output: "standalone",

  // Fix workspace root detection with multiple lockfiles
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
    remotePatterns: [
      { protocol: "https", hostname: "source.unsplash.com" },
      { protocol: "https", hostname: "unsplash.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      {
        protocol: "http",
        hostname: "localhost",
        port: "4000",
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "4000",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "localhost",
        port: "4000",
      },

      // Allow backend images in Docker
      {
        protocol: "http",
        hostname: "backend",
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "backend",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "backend",
      },
    ],

    unoptimized: false,

    formats: ["image/avif", "image/webp"],

    dangerouslyAllowSVG: false,

    contentDispositionType: "attachment",

    contentSecurityPolicy:
      "default-src 'self'; script-src 'none'; sandbox;",
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), interest-cohort=()",
          },
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com; img-src 'self' data: https:; connect-src 'self' https: http://localhost:4000; font-src 'self' https://fonts.gstatic.com;",
          },
        ],
      },
    ];
  },
};

export default nextConfig;