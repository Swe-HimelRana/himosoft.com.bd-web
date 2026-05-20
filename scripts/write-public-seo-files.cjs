/**
 * Writes public/sitemap.xml and public/robots.txt after build so crawlers
 * get 200 even if metadata route registration is skipped on the host.
 * Run: node scripts/write-public-seo-files.cjs
 */
const fs = require("node:fs");
const path = require("node:path");

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://himosoft.com.bd").replace(
  /\/$/,
  "",
);

const marketingSlugs = [];
const marketingSrc = fs.readFileSync(
  path.join(process.cwd(), "src/lib/marketingPages.ts"),
  "utf8",
);
const slugMatch = marketingSrc.match(/MARKETING_PAGE_SLUGS = \[([\s\S]*?)\] as const/);
if (slugMatch) {
  for (const m of slugMatch[1].matchAll(/"([^"]+)"/g)) {
    marketingSlugs.push(m[1]);
  }
}

const paths = [
  "/",
  "/sitemap",
  "/privacy",
  "/terms",
  "/cookies",
  ...marketingSlugs.map((slug) => `/${slug}`),
];

function escapeXml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

const lastModified = new Date().toISOString();
const urls = paths
  .map((p) => {
    const loc = `${siteUrl}${p}`;
    const priority = p === "/" ? "1.0" : p === "/sitemap" ? "0.6" : "0.5";
    const changefreq = p === "/" ? "weekly" : "monthly";
    return `  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${lastModified}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
  })
  .join("\n");

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

const robotsTxt = `User-Agent: *
Allow: /
Disallow: /api/

Host: ${siteUrl}
Sitemap: ${siteUrl}/sitemap.xml
`;

const publicDir = path.join(process.cwd(), "public");
fs.mkdirSync(publicDir, { recursive: true });
fs.writeFileSync(path.join(publicDir, "sitemap.xml"), sitemapXml);
fs.writeFileSync(path.join(publicDir, "robots.txt"), robotsTxt);
console.log(`Wrote public/sitemap.xml (${paths.length} URLs) and public/robots.txt`);
