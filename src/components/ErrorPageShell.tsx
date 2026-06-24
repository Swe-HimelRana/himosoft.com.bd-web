import { BrandedErrorPage } from "@/components/BrandedErrorPage";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getLocale } from "@/lib/getLocale";
import { getSiteContent } from "@/lib/siteContent";
import type { SiteContent } from "@/types/site";

type ErrorVariant = keyof SiteContent["errors"];

type Props = {
  variant: ErrorVariant;
  showSitemap?: boolean;
};

export async function ErrorPageShell({ variant, showSitemap }: Props) {
  const locale = await getLocale();
  const site = await getSiteContent(locale);

  return (
    <div className="relative min-h-screen">
      <SiteHeader locale={locale} nav={site.nav} />
      <main id="main-content">
        <BrandedErrorPage
          copy={site.errors[variant]}
          showSitemap={showSitemap ?? variant === "notFound"}
        />
      </main>
      <SiteFooter footer={site.footer} meta={site.meta} nav={site.nav} />
    </div>
  );
}
