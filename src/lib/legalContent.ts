import { readFile } from "node:fs/promises";
import path from "node:path";
import { cache } from "react";

import { DEFAULT_LOCALE, type Locale } from "@/lib/locale";
import type { LegalPageContent, LegalPageSlug } from "@/types/legal";

async function readLegalFile(
  locale: Locale,
  slug: LegalPageSlug,
): Promise<LegalPageContent | null> {
  const filePath = path.join(process.cwd(), "content", "legal", locale, `${slug}.json`);
  try {
    const raw = await readFile(filePath, "utf8");
    return JSON.parse(raw) as LegalPageContent;
  } catch (err) {
    const code = err && typeof err === "object" && "code" in err ? (err as NodeJS.ErrnoException).code : undefined;
    if (code === "ENOENT") return null;
    throw err;
  }
}

export const getLegalPage = cache(
  async (locale: Locale, slug: LegalPageSlug): Promise<LegalPageContent> => {
    const localized = await readLegalFile(locale, slug);
    if (localized) return localized;

    if (locale !== DEFAULT_LOCALE) {
      const fallback = await readLegalFile(DEFAULT_LOCALE, slug);
      if (fallback) return fallback;
    }

    throw new Error(`Missing legal content: content/legal/${locale}/${slug}.json`);
  },
);
