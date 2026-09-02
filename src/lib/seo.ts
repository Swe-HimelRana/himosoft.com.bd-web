import type { Metadata } from "next";

import { localeHtmlLang, type Locale } from "@/lib/locale-options";
import { OG_IMAGE_PATH, OG_IMAGE_SIZE } from "@/lib/ogImage";

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

/** Public contact details for structured data (matches encode-contact.cjs defaults). */
export const SEO_CONTACT = {
  email: "hello@himosoft.com.bd",
  phone: "+8801316100897",
  phoneDisplay: "+880 1316-100897",
} as const;

export const SEO_SOCIAL_PROFILES = [
  "https://linkedin.com/company/himosoft",
  "https://facebook.com/himosoft",
  "https://twitter.com/himosoft",
  "https://youtube.com/@himosoft",
] as const;

export const DEFAULT_OG_ALT = "HimoSoft — Software Development & IT Solutions";

const OG_ROUTE_ALIASES: Record<string, string> = {
  "/sitemap": "/site-map",
};

/** Route path → Open Graph image URL (home uses static public asset). */
export function ogImageUrlForRoute(routePath: string): string {
  const normalized = routePath.startsWith("/") ? routePath : `/${routePath}`;
  if (normalized === "/") return OG_IMAGE_PATH;
  const ogPath = OG_ROUTE_ALIASES[normalized] ?? normalized;
  return `${ogPath}/opengraph-image`;
}

function ogImageAltForRoute(routePath: string, title?: string): string {
  if (routePath === "/") return DEFAULT_OG_ALT;
  if (title) return `${normalizePageTitle(title)} | HimoSoft`;
  return DEFAULT_OG_ALT;
}

const KEYWORDS_BY_LOCALE: Record<Locale, string[]> = {
  en: [
    "HimoSoft",
    "software development Bangladesh",
    "custom software company Dhaka",
    "web application development",
    "mobile app development",
    "IT solutions Bangladesh",
    "payment gateway integration",
    "Stripe integration Bangladesh",
    "bKash payment integration",
    "EPG payment integration",
    "software maintenance and support",
    "DevOps deployment",
    "cloud deployment AWS",
    "GDPR compliant development",
    "API development",
    "legacy software modernisation",
    "MVP development",
    "SaaS development",
    "e-commerce development",
    "healthcare software Bangladesh",
  ],
  bn: [
    "HimoSoft",
    "সফটওয়্যার ডেভেলপমেন্ট",
    "বাংলাদেশ সফটওয়্যার কোম্পানি",
    "ঢাকা সফটওয়্যার কোম্পানি",
    "ওয়েব অ্যাপ্লিকেশন ডেভেলপমেন্ট",
    "মোবাইল অ্যাপ ডেভেলপমেন্ট",
    "পেমেন্ট গেটওয়ে ইন্টিগ্রেশন",
    "বিকাশ পেমেন্ট ইন্টিগ্রেশন",
    "ক্লাউড ডিপ্লয়মেন্ট",
    "সফটওয়্যার রক্ষণাবেক্ষণ",
    "API ডেভেলপমেন্ট",
    "কাস্টম সফটওয়্যার",
  ],
  de: [
    "HimoSoft",
    "Softwareentwicklung Bangladesh",
    "individuelle Software",
    "Webentwicklung",
    "Mobile App Entwicklung",
    "Zahlungsgateway Integration",
    "Stripe Integration",
    "Cloud Deployment",
    "Software Wartung",
    "API Entwicklung",
  ],
  it: [
    "HimoSoft",
    "sviluppo software Bangladesh",
    "software su misura",
    "applicazioni web",
    "sviluppo mobile",
    "integrazione pagamenti",
    "Stripe integrazione",
    "deployment cloud",
    "manutenzione software",
  ],
  ro: [
    "HimoSoft",
    "dezvoltare software Bangladesh",
    "software personalizat",
    "aplicații web",
    "dezvoltare mobile",
    "integrare plăți",
    "integrare Stripe",
    "deployment cloud",
    "mentenanță software",
  ],
  pl: [
    "HimoSoft",
    "tworzenie oprogramowania Bangladesh",
    "oprogramowanie na zamówienie",
    "aplikacje webowe",
    "aplikacje mobilne",
    "integracja płatności",
    "integracja Stripe",
    "wdrożenie chmurowe",
    "utrzymanie oprogramowania",
  ],
};

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

const HIGH_PRIORITY_PATHS = new Set([
  "/",
  "/contact",
  "/services",
  "/solutions",
  "/about",
]);

const LEGAL_PATHS = new Set(["/privacy", "/terms", "/cookies"]);

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

type FaqItem = {
  question: string;
  answer: string;
};

type JsonLdEntity = Record<string, unknown>;

export function absoluteUrl(path: string): string {
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

function normalizePageTitle(title: string): string {
  return title.replace(/\s*\|\s*HimoSoft\s*$/i, "").trim();
}

function pageMetadataTitle(title: string): Metadata["title"] {
  if (/\|\s*HimoSoft\s*$/i.test(title)) {
    return { absolute: title.trim() };
  }
  return title.trim();
}

function pageDisplayTitle(title: string): string {
  const normalized = normalizePageTitle(title);
  return /\|\s*HimoSoft\s*$/i.test(title) ? title.trim() : `${normalized} | HimoSoft`;
}

function sharedOpenGraph(
  locale: Locale,
  title: string,
  description: string,
  path: string,
  pageTitle?: string,
): Metadata["openGraph"] {
  const url = absoluteUrl(path);
  const imagePath = ogImageUrlForRoute(path);
  const imageAlt = ogImageAltForRoute(path, pageTitle ?? title);

  return {
    type: "website",
    locale: openGraphLocale(locale),
    url,
    title,
    description,
    siteName: "HimoSoft",
    images: [
      {
        url: imagePath,
        width: OG_IMAGE_SIZE.width,
        height: OG_IMAGE_SIZE.height,
        alt: imageAlt,
        ...(imagePath === OG_IMAGE_PATH ? { type: "image/png" } : {}),
      },
    ],
  };
}

function sharedTwitter(title: string, description: string, path: string, pageTitle?: string) {
  return {
    card: "summary_large_image" as const,
    site: "@himosoft",
    creator: "@himosoft",
    title,
    description,
    images: [ogImageUrlForRoute(path)],
  };
}

export function buildRootMetadata({ locale, title, description }: RootMetaInput): Metadata {
  const siteUrl = getSiteUrl();
  const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim();
  const bingVerification = process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION?.trim();

  return {
    metadataBase: new URL(siteUrl),
    applicationName: "HimoSoft",
    title: {
      default: title,
      template: "%s | HimoSoft",
    },
    description,
    keywords: KEYWORDS_BY_LOCALE[locale],
    authors: [{ name: "HimoSoft", url: siteUrl }],
    creator: "HimoSoft",
    publisher: "HimoSoft",
    category: "technology",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
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
    twitter: sharedTwitter(title, description, SEO_ROUTES.home),
    manifest: "/manifest.webmanifest",
    other: {
      "geo.region": "BD-C",
      "geo.placename": "Dhaka, Bangladesh",
      "geo.position": "23.8103;90.4125",
      ICBM: "23.8103, 90.4125",
      "business:contact_data:locality": "Dhaka",
      "business:contact_data:country_name": "Bangladesh",
      "business:contact_data:email": SEO_CONTACT.email,
      "business:contact_data:phone_number": SEO_CONTACT.phone,
    },
    ...(googleVerification || bingVerification
      ? {
          verification: {
            ...(googleVerification ? { google: googleVerification } : {}),
            ...(bingVerification ? { other: { "msvalidate.01": bingVerification } } : {}),
          },
        }
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
  const displayTitle = pageDisplayTitle(title);

  return {
    title: pageMetadataTitle(title),
    description,
    keywords: KEYWORDS_BY_LOCALE[locale],
    alternates: { canonical },
    robots: noIndex
      ? { index: false, follow: false }
      : {
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
    openGraph: sharedOpenGraph(locale, displayTitle, description, routePath, title),
    twitter: sharedTwitter(displayTitle, description, routePath, title),
  };
}

export function organizationJsonLd(): JsonLdEntity {
  const siteUrl = getSiteUrl();
  return {
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: "HimoSoft",
    alternateName: "HimoSoft IT Solutions",
    url: siteUrl,
    logo: {
      "@type": "ImageObject",
      "@id": `${siteUrl}/#logo`,
      url: `${siteUrl}/logo.svg`,
      contentUrl: `${siteUrl}/logo.svg`,
      caption: "HimoSoft logo",
    },
    image: { "@id": `${siteUrl}/#logo` },
    email: SEO_CONTACT.email,
    telephone: SEO_CONTACT.phone,
    sameAs: [...SEO_SOCIAL_PROFILES],
    slogan: "Software development and IT solutions — Bangladesh-based, globally disciplined delivery.",
    foundingDate: "2020",
    numberOfEmployees: {
      "@type": "QuantitativeValue",
      minValue: 10,
      maxValue: 50,
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        email: SEO_CONTACT.email,
        telephone: SEO_CONTACT.phone,
        url: `${siteUrl}/contact`,
        areaServed: ["BD", "US", "EU", "Worldwide"],
        availableLanguage: ["English", "Bengali", "German", "Italian", "Romanian", "Polish"],
      },
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: SEO_CONTACT.email,
        telephone: SEO_CONTACT.phone,
        url: `${siteUrl}/contact`,
        areaServed: ["BD", "US", "EU", "Worldwide"],
        availableLanguage: ["English", "Bengali"],
      },
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dhaka",
      addressCountry: "BD",
    },
    areaServed: ["BD", "US", "EU", "Worldwide"],
    knowsAbout: [
      "Custom Software Development",
      "Web Application Development",
      "Mobile Application Development",
      "Payment Gateway Integration",
      "Stripe Integration",
      "bKash Integration",
      "Cloud Deployment",
      "DevOps",
      "Application Maintenance",
      "API Development",
      "Legacy Modernisation",
      "GDPR Compliance",
    ],
  };
}

export function webSiteJsonLd(locale: Locale): JsonLdEntity {
  const siteUrl = getSiteUrl();
  return {
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: siteUrl,
    name: "HimoSoft",
    alternateName: "HimoSoft IT Solutions",
    description:
      locale === "bn"
        ? "সফটওয়্যার ডেভেলপমেন্ট ও আইটি সমাধান — বাংলাদেশ ভিত্তিক, বিশ্বমানের ডেলিভারি।"
        : "Software development and IT solutions — Bangladesh-based, globally disciplined delivery.",
    publisher: { "@id": `${siteUrl}/#organization` },
    copyrightHolder: { "@id": `${siteUrl}/#organization` },
    inLanguage: localeHtmlLang(locale),
    potentialAction: {
      "@type": "CommunicateAction",
      name: "Contact HimoSoft",
      target: `${siteUrl}/contact`,
    },
  };
}

export function professionalServiceJsonLd(): JsonLdEntity {
  const siteUrl = getSiteUrl();
  return {
    "@type": "ProfessionalService",
    "@id": `${siteUrl}/#service`,
    name: "HimoSoft Software Development",
    url: siteUrl,
    image: `${siteUrl}${OG_IMAGE_PATH}`,
    email: SEO_CONTACT.email,
    telephone: SEO_CONTACT.phone,
    priceRange: "$$",
    provider: { "@id": `${siteUrl}/#organization` },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dhaka",
      addressCountry: "BD",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    serviceType: [
      "Custom Software Development",
      "Web Application Development",
      "Mobile App Development",
      "Payment Integration",
      "DevOps and Deployment",
      "Software Maintenance and Support",
      "API Development",
      "Legacy Modernisation",
      "MVP Development",
    ],
    areaServed: [
      { "@type": "Country", name: "Bangladesh" },
      { "@type": "AdministrativeArea", name: "Worldwide" },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "HimoSoft Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Custom Software Development",
            provider: { "@id": `${siteUrl}/#organization` },
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Web Application Development",
            provider: { "@id": `${siteUrl}/#organization` },
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Mobile App Development",
            provider: { "@id": `${siteUrl}/#organization` },
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Payment Gateway Integration",
            provider: { "@id": `${siteUrl}/#organization` },
          },
        },
      ],
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  const lastPath = items.at(-1)?.path ?? "/";
  return {
    "@type": "BreadcrumbList",
    "@id": `${absoluteUrl(lastPath)}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function servicesItemListJsonLd(
  items: { title: string; description: string }[],
): JsonLdEntity {
  const siteUrl = getSiteUrl();
  return {
    "@type": "ItemList",
    "@id": `${siteUrl}/#services`,
    name: "HimoSoft Services",
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        name: item.title,
        description: item.description,
        provider: { "@id": `${siteUrl}/#organization` },
        areaServed: "Worldwide",
      },
    })),
  };
}

function webPageSchemaType(slug: string): string {
  if (slug === "contact") return "ContactPage";
  if (slug === "about") return "AboutPage";
  return "WebPage";
}

export function marketingPageJsonLd(input: {
  slug: string;
  title: string;
  description: string;
  locale: Locale;
}): JsonLdEntity[] {
  const siteUrl = getSiteUrl();
  const path = `/${input.slug}`;
  const url = absoluteUrl(path);
  const pageName = normalizePageTitle(input.title);

  const entities: JsonLdEntity[] = [
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: pageName, path },
    ]),
    {
      "@type": webPageSchemaType(input.slug),
      "@id": `${url}#webpage`,
      url,
      name: pageName,
      description: input.description,
      isPartOf: { "@id": `${siteUrl}/#website` },
      about: { "@id": `${siteUrl}/#service` },
      inLanguage: localeHtmlLang(input.locale),
      breadcrumb: { "@id": `${url}#breadcrumb` },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: absoluteUrl(ogImageUrlForRoute(path)),
      },
    },
  ];

  if (SERVICE_SLUGS.has(input.slug)) {
    entities.push({
      "@type": "Service",
      "@id": `${url}#service`,
      name: pageName,
      description: input.description,
      url,
      provider: { "@id": `${siteUrl}/#organization` },
      areaServed: "Worldwide",
      serviceType: pageName,
    });
  }

  return entities;
}

export function faqPageJsonLd(items: FaqItem[]): JsonLdEntity {
  const siteUrl = getSiteUrl();
  return {
    "@type": "FAQPage",
    "@id": `${siteUrl}/#faq`,
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function sitemapEntryMeta(path: string): {
  priority: string;
  changefreq: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
} {
  if (path === "/") return { priority: "1.0", changefreq: "weekly" };
  if (HIGH_PRIORITY_PATHS.has(path)) return { priority: "0.9", changefreq: "monthly" };
  if (path === "/sitemap") return { priority: "0.7", changefreq: "monthly" };
  if (LEGAL_PATHS.has(path)) return { priority: "0.3", changefreq: "yearly" };
  if (SERVICE_SLUGS.has(path.replace(/^\//, ""))) {
    return { priority: "0.8", changefreq: "monthly" };
  }
  return { priority: "0.6", changefreq: "monthly" };
}
