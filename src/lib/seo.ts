import type { Metadata } from "next";

import { localeHtmlLang, type Locale } from "@/lib/locale-options";

/** Public site URL (no trailing slash). Set NEXT_PUBLIC_SITE_URL in production. */
export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const base = raw && raw.length > 0 ? raw : "https://himosoft.com.bd";
  return base.replace(/\/$/, "");
}

export const SEO_ROUTES = {
  home: "/",
  sitemap: "/sitemap",
  terms: "/terms",
  cookies: "/cookies",
  privacy: "/privacy",
} as const;

const KEYWORDS_BY_LOCALE: Record<Locale, string[]> = {
  en: [
    "HimoSoft",
    "software development Bangladesh",
    "custom software company",
    "web application development",
    "mobile app development",
    "IT solutions Dhaka",
    "payment gateway integration",
    "Stripe integration",
    "bKash integration",
    "software maintenance",
    "DevOps deployment",
    "GDPR compliant development",
  ],
  bn: [
    "HimoSoft",
    "সফটওয়্যার ডেভেলপমেন্ট",
    "বাংলাদেশ সফটওয়্যার কোম্পানি",
    "ওয়েব অ্যাপ্লিকেশন",
    "মোবাইল অ্যাপ ডেভেলপমেন্ট",
    "পেমেন্ট গেটওয়ে ইন্টিগ্রেশন",
  ],
  de: [
    "HimoSoft",
    "Softwareentwicklung",
    "Webentwicklung",
    "Mobile App Entwicklung",
    "Zahlungsgateway Integration",
  ],
  it: [
    "HimoSoft",
    "sviluppo software",
    "applicazioni web",
    "sviluppo mobile",
    "integrazione pagamenti",
  ],
  ro: [
    "HimoSoft",
    "dezvoltare software",
    "aplicații web",
    "dezvoltare mobile",
    "integrare plăți",
  ],
  pl: [
    "HimoSoft",
    "tworzenie oprogramowania",
    "aplikacje webowe",
    "aplikacje mobilne",
    "integracja płatności",
  ],
};

type RootMetaInput = {
  locale: Locale;
  title: string;
  description: string;
};

type PageMetaInput = {
  locale: Locale;
  title: string;
  description: string;
  path: keyof typeof SEO_ROUTES | (string & {});
  noIndex?: boolean;
};

function absoluteUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${getSiteUrl()}${normalized}`;
}

function openGraphLocale(locale: Locale): string {
  const map: Record<Locale, string> = {
    en: "en_US",
    bn: "bn_BD",
    de: "de_DE",
    it: "it_IT",
    ro: "ro_RO",
    pl: "pl_PL",
  };
  return map[locale] ?? "en_US";
}

function sharedOpenGraph(
  locale: Locale,
  title: string,
  description: string,
  path: string,
): Metadata["openGraph"] {
  const url = absoluteUrl(path);
  return {
    type: "website",
    locale: openGraphLocale(locale),
    url,
    title,
    description,
    siteName: "HimoSoft",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "HimoSoft — Software Development & IT Solutions",
      },
    ],
  };
}

function sharedTwitter(title: string, description: string): Metadata["twitter"] {
  return {
    card: "summary_large_image",
    title,
    description,
    images: ["/opengraph-image"],
  };
}

export function buildRootMetadata({ locale, title, description }: RootMetaInput): Metadata {
  const siteUrl = getSiteUrl();
  const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim();

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: title,
      template: "%s | HimoSoft",
    },
    description,
    keywords: KEYWORDS_BY_LOCALE[locale],
    authors: [{ name: "HimoSoft" }],
    creator: "HimoSoft",
    publisher: "HimoSoft",
    category: "technology",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    alternates: {
      canonical: absoluteUrl(SEO_ROUTES.home),
      languages: {
        "x-default": absoluteUrl(SEO_ROUTES.home),
      },
    },
    openGraph: sharedOpenGraph(locale, title, description, SEO_ROUTES.home),
    twitter: sharedTwitter(title, description),
    other: {
      "geo.region": "BD",
      "geo.placename": "Bangladesh",
    },
    ...(googleVerification
      ? { verification: { google: googleVerification } }
      : {}),
    icons: {
      icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
      apple: [{ url: "/apple-icon.svg", type: "image/svg+xml" }],
      shortcut: [{ url: "/icon.svg", type: "image/svg+xml" }],
    },
  };
}

export function buildPageMetadata({
  locale,
  title,
  description,
  path,
  noIndex = false,
}: PageMetaInput): Metadata {
  const routePath = typeof path === "string" ? path : SEO_ROUTES[path];
  const canonical = absoluteUrl(routePath);

  return {
    title,
    description,
    keywords: KEYWORDS_BY_LOCALE[locale],
    alternates: { canonical },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
        },
    openGraph: sharedOpenGraph(locale, `${title} | HimoSoft`, description, routePath),
    twitter: sharedTwitter(`${title} | HimoSoft`, description),
  };
}

export function organizationJsonLd() {
  const siteUrl = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: "HimoSoft",
    url: siteUrl,
    logo: `${siteUrl}/logo.svg`,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      url: `${siteUrl}/contact`,
      availableLanguage: ["en", "bn"],
    },
    foundingDate: "2020",
    address: {
      "@type": "PostalAddress",
      addressCountry: "BD",
    },
    areaServed: ["BD", "US", "EU", "Worldwide"],
    knowsAbout: [
      "Software Development",
      "Web Development",
      "Mobile Applications",
      "Payment Gateway Integration",
      "Cloud Deployment",
      "Application Maintenance",
    ],
  };
}

export function webSiteJsonLd(locale: Locale) {
  const siteUrl = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: siteUrl,
    name: "HimoSoft",
    description:
      locale === "bn"
        ? "সফটওয়্যার ডেভেলপমেন্ট ও আইটি সমাধান — বাংলাদেশ ভিত্তিক, বিশ্বমানের ডেলিভারি।"
        : "Software development and IT solutions — Bangladesh-based, globally disciplined delivery.",
    publisher: { "@id": `${siteUrl}/#organization` },
    inLanguage: localeHtmlLang(locale),
  };
}

export function professionalServiceJsonLd() {
  const siteUrl = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${siteUrl}/#service`,
    name: "HimoSoft Software Development",
    url: siteUrl,
    image: `${siteUrl}/logo.svg`,
    provider: { "@id": `${siteUrl}/#organization` },
    serviceType: [
      "Custom Software Development",
      "Web Application Development",
      "Mobile App Development",
      "Payment Integration",
      "DevOps and Deployment",
      "Software Maintenance and Support",
    ],
    areaServed: {
      "@type": "GeoCircle",
      geoMidpoint: { "@type": "GeoCoordinates", latitude: 23.8103, longitude: 90.4125 },
      geoRadius: "20000000",
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
