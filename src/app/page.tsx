import type { Metadata } from "next";

import { AboutSection } from "@/components/AboutSection";
import { JsonLd } from "@/components/JsonLd";
import { CapabilitiesSection } from "@/components/CapabilitiesSection";
import { CtaBand } from "@/components/CtaBand";
import { DomainsGridSection } from "@/components/DomainsGridSection";
import { HeroSection } from "@/components/HeroSection";
import { PaymentPartnersMarquee } from "@/components/PaymentPartnersMarquee";
import { InsightsSection } from "@/components/InsightsSection";
import { PartnersSection } from "@/components/PartnersSection";
import { PlatformTriadSection } from "@/components/PlatformTriadSection";
import { ServicesSection } from "@/components/ServicesSection";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { SpotlightSection } from "@/components/SpotlightSection";
import { StoriesSection } from "@/components/StoriesSection";
import { TeamSection } from "@/components/TeamSection";
import { TrustStrip } from "@/components/TrustStrip";
import { getLocale } from "@/lib/getLocale";
import { getPaymentPartners } from "@/lib/paymentPartners";
import { buildRootMetadata, professionalServiceJsonLd, webSiteJsonLd } from "@/lib/seo";
import { getSiteContent } from "@/lib/siteContent";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const site = await getSiteContent(locale);
  return buildRootMetadata({
    locale,
    title: site.meta.siteTitle,
    description: site.meta.siteDescription,
  });
}

export default async function Home() {
  const locale = await getLocale();
  const [site, paymentPartners] = await Promise.all([
    getSiteContent(locale),
    getPaymentPartners(),
  ]);

  return (
    <>
      <JsonLd data={[webSiteJsonLd(locale), professionalServiceJsonLd()]} />
      <SiteHeader locale={locale} nav={site.nav} />
      <main id="main-content">
        <HeroSection hero={site.hero} />
        <PaymentPartnersMarquee data={paymentPartners} />
        <TrustStrip trustStrip={site.trustStrip} />
        <StoriesSection stories={site.stories} />
        <SpotlightSection spotlights={site.spotlights} />
        <PlatformTriadSection platformTriad={site.platformTriad} />
        <ServicesSection services={site.services} />
        <DomainsGridSection domains={site.domains} />
        <CapabilitiesSection capabilities={site.capabilities} />
        <PartnersSection partners={site.partners} />
        <AboutSection about={site.about} />
        <TeamSection team={site.team} />
        <InsightsSection insights={site.insights} />
        <CtaBand ctaBand={site.ctaBand} />
      </main>
      <SiteFooter footer={site.footer} meta={site.meta} nav={site.nav} />
    </>
  );
}
