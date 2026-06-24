import type { Metadata } from "next";
import { Inter, Noto_Sans_Bengali } from "next/font/google";

import "./globals.css";

import { CookieConsentBanner } from "@/components/CookieConsentBanner";
import { FloatingContactWidget } from "@/components/FloatingContactWidget";
import { JsonLd } from "@/components/JsonLd";
import { getLocale } from "@/lib/getLocale";
import { localeHtmlLang } from "@/lib/locale-options";
import { buildRootMetadata, organizationJsonLd, webSiteJsonLd } from "@/lib/seo";
import { getSiteContent } from "@/lib/siteContent";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const notoBengali = Noto_Sans_Bengali({
  subsets: ["bengali"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-bengali",
});

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const site = await getSiteContent(locale);
  return buildRootMetadata({
    locale,
    title: site.meta.siteTitle,
    description: site.meta.siteDescription,
  });
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const site = await getSiteContent(locale);

  return (
    <html
      lang={localeHtmlLang(locale)}
      suppressHydrationWarning
      className={`${inter.variable} ${notoBengali.variable} h-full antialiased`}
    >
      <body
        className="min-h-full bg-background text-foreground"
        suppressHydrationWarning
      >
        <JsonLd data={[organizationJsonLd(), webSiteJsonLd(locale)]} />
        {children}
        <FloatingContactWidget
          copy={site.floatingContact}
          labels={{
            contactEmailLabel: site.footer.contactEmailLabel,
            contactPhoneLabel: site.footer.contactPhoneLabel,
          }}
        />
        <CookieConsentBanner copy={site.cookieConsent} />
      </body>
    </html>
  );
}
