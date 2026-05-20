import type { Locale } from "@/lib/locale-options";
import { SITE_LOCALES } from "@/lib/locale-options";

export const LOCALE_COOKIE = "himosoft.locale";

export { SITE_LOCALES, type Locale } from "@/lib/locale-options";

export const DEFAULT_LOCALE: Locale = "en";

export const SUPPORTED_LOCALES: Locale[] = SITE_LOCALES.map((l) => l.code);

export function isLocale(value: string): value is Locale {
  return SUPPORTED_LOCALES.includes(value as Locale);
}
