"use client";

import { useEffect, useState } from "react";

import { BrandedErrorPage } from "@/components/BrandedErrorPage";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import enSite from "../../content/locales/en.json";
import { DEFAULT_LOCALE, LOCALE_COOKIE, type Locale, isLocale } from "@/lib/locale";
import type { SiteContent } from "@/types/site";

const LOCALE_LOADERS: Record<
  Locale,
  () => Promise<{ default: SiteContent }>
> = {
  en: () => import("../../content/locales/en.json"),
  bn: () => import("../../content/locales/bn.json"),
  de: () => import("../../content/locales/de.json"),
  it: () => import("../../content/locales/it.json"),
  ro: () => import("../../content/locales/ro.json"),
  pl: () => import("../../content/locales/pl.json"),
};

function readLocaleCookie(): Locale {
  if (typeof document === "undefined") return DEFAULT_LOCALE;
  const match = document.cookie.match(new RegExp(`(?:^|; )${LOCALE_COOKIE}=([^;]*)`));
  const value = match?.[1] ? decodeURIComponent(match[1]) : "";
  return value && isLocale(value) ? value : DEFAULT_LOCALE;
}

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorBoundaryPage({ error, reset }: Props) {
  const [locale, setLocale] = useState<Locale>(DEFAULT_LOCALE);
  const [site, setSite] = useState<SiteContent>(enSite as SiteContent);

  useEffect(() => {
    const activeLocale = readLocaleCookie();
    setLocale(activeLocale);
    LOCALE_LOADERS[activeLocale]()
      .then((mod) => setSite(mod.default))
      .catch(() => setSite(enSite as SiteContent));
  }, []);

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="relative min-h-screen">
      <SiteHeader locale={locale} nav={site.nav} />
      <main id="main-content">
        <BrandedErrorPage copy={site.errors.server} onRetry={reset} showSitemap={false} />
      </main>
      <SiteFooter footer={site.footer} meta={site.meta} nav={site.nav} />
    </div>
  );
}
