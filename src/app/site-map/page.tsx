import type { Metadata } from "next";

import { JsonLd } from "@/components/JsonLd";
import { SitemapPageContent } from "@/components/SitemapPageContent";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getLocale } from "@/lib/getLocale";
import { buildPageMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { getSiteContent } from "@/lib/siteContent";
import { buildSitemapGroups } from "@/lib/siteSitemap";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const site = await getSiteContent(locale);
  return buildPageMetadata({
    locale,
    title: site.sitemap.pageTitle,
    description: site.sitemap.metaDescription,
    path: "/sitemap",
  });
}

export default async function SitemapPage() {
  const locale = await getLocale();
  const site = await getSiteContent(locale);
  const groups = await buildSitemapGroups(site, locale);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: site.sitemap.pageTitle, path: "/sitemap" },
        ])}
      />
      <SiteHeader locale={locale} nav={site.nav} />
      <main id="main-content" className="min-h-[60vh] py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SitemapPageContent
            title={site.sitemap.pageTitle}
            intro={site.sitemap.intro}
            xmlNote={site.sitemap.xmlNote}
            homeLabel={site.sitemap.homeLabel}
            groups={groups}
          />
        </div>
      </main>
      <SiteFooter footer={site.footer} meta={site.meta} nav={site.nav} />
    </>
  );
}
