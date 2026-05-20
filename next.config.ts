import { createRequire } from "node:module";

import type { NextConfig } from "next";

const require = createRequire(import.meta.url);
const punycodeUserland = require.resolve("punycode/");

const nextConfig: NextConfig = {
  turbopack: {
    resolveAlias: {
      punycode: punycodeUserland,
    },
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      punycode: punycodeUserland,
    };
    return config;
  },
  async rewrites() {
    return [
      // HTML site map stays at /sitemap; route lives under /site-map to avoid
      // conflicting with Next.js metadata convention for sitemap.xml.
      { source: "/sitemap", destination: "/site-map" },
    ];
  },
};

export default nextConfig;
