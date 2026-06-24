import { JsonLd } from "@/components/JsonLd";
import { MarketingPage } from "@/components/MarketingPage";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import type { Locale } from "@/lib/locale";
import { breadcrumbJsonLd } from "@/lib/seo";
import { getSiteContent } from "@/lib/siteContent";
import type { MarketingPageContent } from "@/types/marketingPage";

type Props = {
  locale: Locale;
  page: MarketingPageContent;
  slug: string;
};

export async function MarketingPageShell({ locale, page, slug }: Props) {
  const site = await getSiteContent(locale);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: page.title, path: `/${slug}` },
        ])}
      />
      <SiteHeader locale={locale} nav={site.nav} />
      <main id="main-content" className="min-h-[60vh] py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <MarketingPage
            page={page}
            slug={slug}
            team={page.showTeam ? site.team : undefined}
            contactLabels={{
              contactEmailLabel: site.footer.contactEmailLabel,
              contactPhoneLabel: site.footer.contactPhoneLabel,
            }}
          />
        </div>
      </main>
      <SiteFooter footer={site.footer} meta={site.meta} nav={site.nav} />
    </>
  );
}
