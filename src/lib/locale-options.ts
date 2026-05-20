/** Display order in language selector (Unicode regional flags render in select options). */
export const SITE_LOCALES = [
  { code: "en", htmlLang: "en", nativeLabel: "English", flag: "\u{1F1EC}\u{1F1E7}" },
  { code: "de", htmlLang: "de", nativeLabel: "Deutsch", flag: "\u{1F1E9}\u{1F1EA}" },
  { code: "it", htmlLang: "it", nativeLabel: "Italiano", flag: "\u{1F1EE}\u{1F1F9}" },
  { code: "ro", htmlLang: "ro", nativeLabel: "Rom\u00E2n\u0103", flag: "\u{1F1F7}\u{1F1F4}" },
  { code: "pl", htmlLang: "pl", nativeLabel: "Polski", flag: "\u{1F1F5}\u{1F1F1}" },
  { code: "bn", htmlLang: "bn", nativeLabel: "\u09AC\u09BE\u0982\u09B2\u09BE", flag: "\u{1F1E7}\u{1F1E9}" },
] as const;

export type Locale = (typeof SITE_LOCALES)[number]["code"];

export function localeHtmlLang(locale: Locale): string {
  const row = SITE_LOCALES.find((l) => l.code === locale);
  return row?.htmlLang ?? "en";
}
