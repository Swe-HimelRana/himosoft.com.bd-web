import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      // HTML site map stays at /sitemap; route lives under /site-map to avoid
      // conflicting with Next.js metadata convention for sitemap.xml.
      { source: "/sitemap", destination: "/site-map" },
    ];
  },
};

export default nextConfig;
