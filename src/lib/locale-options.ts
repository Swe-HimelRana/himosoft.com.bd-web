/** Display order in language selector. */
export const SITE_LOCALES = [
  {
    code: "en",
    htmlLang: "en",
    nativeLabel: "English",
    flag: "\u{1F1EC}\u{1F1E7}",
    flagSrc: "/flags/gb.png",
  },
  {
    code: "de",
    htmlLang: "de",
    nativeLabel: "Deutsch",
    flag: "\u{1F1E9}\u{1F1EA}",
    flagSrc: "/flags/de.png",
  },
  {
    code: "it",
    htmlLang: "it",
    nativeLabel: "Italiano",
    flag: "\u{1F1EE}\u{1F1F9}",
    flagSrc: "/flags/it.png",
  },
  {
    code: "ro",
    htmlLang: "ro",
    nativeLabel: "Rom\u00E2n\u0103",
    flag: "\u{1F1F7}\u{1F1F4}",
    flagSrc: "/flags/ro.png",
  },
  {
    code: "pl",
    htmlLang: "pl",
    nativeLabel: "Polski",
    flag: "\u{1F1F5}\u{1F1F1}",
    flagSrc: "/flags/pl.png",
  },
  {
    code: "bn",
    htmlLang: "bn",
    nativeLabel: "\u09AC\u09BE\u0982\u09B2\u09BE",
    flag: "\u{1F1E7}\u{1F1E9}",
    flagSrc: "/flags/bd.png",
  },
] as const;

export type Locale = (typeof SITE_LOCALES)[number]["code"];

export function localeHtmlLang(locale: Locale): string {
  const row = SITE_LOCALES.find((l) => l.code === locale);
  return row?.htmlLang ?? "en";
}
