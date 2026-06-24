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

const HIGH_PRIORITY_PATHS = new Set([
  "/",
  "/contact",
  "/services",
  "/solutions",
  "/about",
]);

const LEGAL_PATHS = new Set(["/privacy", "/terms", "/cookies"]);

const SERVICE_SLUGS = new Set([
  "services",
  "custom-software",
  "web-applications",
  "mobile-apps",
  "databases",
  "apis-webhooks",
  "cloud-deployment",
  "security-compliance",
  "support-sla",
  "support-plans",
  "discovery",
  "sprints-releases",
  "qa-observability",
  "post-launch",
  "ecommerce-retail",
  "education-training",
  "healthcare",
  "logistics-operations",
  "mvps-launches",
  "legacy-modernisation",
  "api-first",
  "design-systems-ux",
]);

function sitemapEntryMeta(routePath) {
  if (routePath === "/") return { priority: "1.0", changefreq: "weekly" };
  if (HIGH_PRIORITY_PATHS.has(routePath)) return { priority: "0.9", changefreq: "monthly" };
  if (routePath === "/sitemap") return { priority: "0.7", changefreq: "monthly" };
  if (LEGAL_PATHS.has(routePath)) return { priority: "0.3", changefreq: "yearly" };
  const slug = routePath.replace(/^\//, "");
  if (SERVICE_SLUGS.has(slug)) return { priority: "0.8", changefreq: "monthly" };
  return { priority: "0.6", changefreq: "monthly" };
}

function escapeXml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

const lastModified = new Date().toISOString();
const ogImageUrl = `${siteUrl}/og-image.png`;

const urls = paths
  .map((p) => {
    const loc = `${siteUrl}${p}`;
    const { priority, changefreq } = sitemapEntryMeta(p);
    const imageBlock =
      p === "/"
        ? `
    <image:image>
      <image:loc>${escapeXml(ogImageUrl)}</image:loc>
      <image:title>${escapeXml("HimoSoft — Software Development &amp; IT Solutions")}</image:title>
    </image:image>`
        : "";

    return `  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${lastModified}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>${imageBlock}
  </url>`;
  })
  .join("\n");

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls}
</urlset>
`;

const robotsTxt = `# https://www.robotstxt.org/robotstxt.html
User-agent: *
Allow: /
Disallow: /api/

User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

Host: ${siteUrl}
Sitemap: ${siteUrl}/sitemap.xml
`;

const publicDir = path.join(process.cwd(), "public");
fs.mkdirSync(publicDir, { recursive: true });
fs.writeFileSync(path.join(publicDir, "sitemap.xml"), sitemapXml);
fs.writeFileSync(path.join(publicDir, "robots.txt"), robotsTxt);
console.log(`Wrote public/sitemap.xml (${paths.length} URLs) and public/robots.txt`);
