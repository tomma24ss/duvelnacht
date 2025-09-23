import type { NextConfig } from "next";

const CDN_BASE = process.env.NEXT_PUBLIC_CDN_BASE;
let remotePatterns: NonNullable<NextConfig['images']>['remotePatterns'] = [];
if (CDN_BASE) {
  try {
    const u = new URL(CDN_BASE);
    remotePatterns = [{ protocol: u.protocol.replace(':','') as 'http' | 'https', hostname: u.hostname, pathname: '**' }];
  } catch {
    // ignore invalid URL
  }
}

const nextConfig: NextConfig = {
  output: 'standalone',
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react'],
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns,
  },
};

export default nextConfig;
