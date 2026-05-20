import { readFile } from "node:fs/promises";
import path from "node:path";
import { cache } from "react";

import { DEFAULT_LOCALE, type Locale } from "@/lib/locale";
import type { MarketingPageContent } from "@/types/marketingPage";

export const MARKETING_PAGE_SLUGS = [
  "solutions",
  "services",
  "delivery",
  "stories",
  "platform",
  "domains",
  "capabilities",
  "partners",
  "about",
  "team",
  "insights",
  "contact",
  "ecommerce-retail",
  "education-training",
  "healthcare",
  "logistics-operations",
  "mvps-launches",
  "legacy-modernisation",
  "api-first",
  "design-systems-ux",
  "custom-software",
  "web-applications",
  "mobile-apps",
  "databases",
  "apis-webhooks",
  "cloud-deployment",
  "security-compliance",
  "support-sla",
  "discovery",
  "sprints-releases",
  "qa-observability",
  "post-launch",
  "tech-stack",
  "support-plans",
  "careers",
] as const;

export type MarketingPageSlug = (typeof MARKETING_PAGE_SLUGS)[number];

export function isMarketingPageSlug(value: string): value is MarketingPageSlug {
  return (MARKETING_PAGE_SLUGS as readonly string[]).includes(value);
}

async function readPagesFile(locale: Locale): Promise<Record<string, MarketingPageContent> | null> {
  const filePath = path.join(process.cwd(), "content", "pages", `${locale}.json`);
  try {
    const raw = await readFile(filePath, "utf8");
    return JSON.parse(raw) as Record<string, MarketingPageContent>;
  } catch (err) {
    const code = err && typeof err === "object" && "code" in err ? (err as NodeJS.ErrnoException).code : undefined;
    if (code === "ENOENT") return null;
    throw err;
  }
}

export const getMarketingPage = cache(
  async (locale: Locale, slug: MarketingPageSlug): Promise<MarketingPageContent> => {
    const localized = await readPagesFile(locale);
    const page = localized?.[slug];
    if (page) return page;

    if (locale !== DEFAULT_LOCALE) {
      const fallback = await readPagesFile(DEFAULT_LOCALE);
      const enPage = fallback?.[slug];
      if (enPage) return enPage;
    }

    throw new Error(`Missing marketing page: content/pages/${locale}.json → "${slug}"`);
  },
);

export const ALL_MARKETING_PATHS = MARKETING_PAGE_SLUGS.map((slug) => `/${slug}`);
