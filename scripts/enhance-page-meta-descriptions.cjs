/**
 * Expands short marketing page meta descriptions from each page intro (locale-aware).
 * Run: node scripts/enhance-page-meta-descriptions.cjs
 */
const fs = require("node:fs");
const path = require("node:path");

const pagesDir = path.join(process.cwd(), "content/pages");
const locales = ["en", "bn", "de", "it", "ro", "pl"];
const MAX_LEN = 158;

function trimDescription(text) {
  const normalized = text.replace(/\s+/g, " ").trim();
  if (normalized.length <= MAX_LEN) return normalized;
  const cut = normalized.slice(0, MAX_LEN - 1);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > 80 ? cut.slice(0, lastSpace) : cut).trim()}…`;
}

function buildDescription(page) {
  const title = (page.meta?.title || page.title || "")
    .replace(/\s*\|\s*HimoSoft\s*$/i, "")
    .trim();
  const intro = (page.intro || "").replace(/\s+/g, " ").trim();
  if (!intro) return page.meta?.description ?? title;

  if (intro.length >= 90) return trimDescription(intro);

  const combined = `${title} — ${intro}`;
  return trimDescription(combined);
}

let updated = 0;

for (const locale of locales) {
  const filePath = path.join(pagesDir, `${locale}.json`);
  if (!fs.existsSync(filePath)) continue;

  const pages = JSON.parse(fs.readFileSync(filePath, "utf8"));
  for (const page of Object.values(pages)) {
    if (!page?.meta) continue;
    const next = buildDescription(page);
    if (next && next !== page.meta.description) {
      page.meta.description = next;
      updated += 1;
    }
  }

  fs.writeFileSync(filePath, `${JSON.stringify(pages, null, 2)}\n`);
  console.log(`Updated ${locale}.json`);
}

console.log(`Enhanced ${updated} page meta descriptions.`);
