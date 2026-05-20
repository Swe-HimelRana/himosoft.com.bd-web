import { readFile } from "node:fs/promises";
import path from "node:path";
import { cache } from "react";

import { DEFAULT_LOCALE, type Locale } from "@/lib/locale";

import type { SiteContent } from "@/types/site";

export const getSiteContent = cache(async (locale: Locale): Promise<SiteContent> => {
  const filePath = path.join(process.cwd(), "content", "locales", `${locale}.json`);
  try {
    const raw = await readFile(filePath, "utf8");
    return JSON.parse(raw) as SiteContent;
  } catch (err) {
    const code = err && typeof err === "object" && "code" in err ? (err as NodeJS.ErrnoException).code : undefined;
    if (code !== "ENOENT") throw err;

    const fallbackPath = path.join(
      process.cwd(),
      "content",
      "locales",
      `${DEFAULT_LOCALE}.json`,
    );
    const raw = await readFile(fallbackPath, "utf8");
    const parsed = JSON.parse(raw) as SiteContent;
    return { ...parsed, meta: { ...parsed.meta, locale } };
  }
});
