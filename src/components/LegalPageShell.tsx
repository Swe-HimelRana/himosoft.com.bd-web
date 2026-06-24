import { JsonLd } from "@/components/JsonLd";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import type { Locale } from "@/lib/locale";
import { breadcrumbJsonLd } from "@/lib/seo";
import { getSiteContent } from "@/lib/siteContent";

type Props = {
  locale: Locale;
  children: React.ReactNode;
  breadcrumb: { label: string; path: string };
};

export async function LegalPageShell({ locale, children, breadcrumb }: Props) {
  const site = await getSiteContent(locale);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: breadcrumb.label, path: breadcrumb.path },
        ])}
      />
      <SiteHeader locale={locale} nav={site.nav} />
      <main id="main-content" className="min-h-[60vh] py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">{children}</div>
      </main>
      <SiteFooter footer={site.footer} meta={site.meta} nav={site.nav} />
    </>
  );
}
