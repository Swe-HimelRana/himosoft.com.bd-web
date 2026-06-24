import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { MarketingPageShell } from "@/components/MarketingPageShell";
import { getLocale } from "@/lib/getLocale";
import {
  getMarketingPage,
  isMarketingPageSlug,
  MARKETING_PAGE_SLUGS,
} from "@/lib/marketingPages";
import { buildPageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return MARKETING_PAGE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (!isMarketingPageSlug(slug)) return {};

  const locale = await getLocale();
  const page = await getMarketingPage(locale, slug);
  return buildPageMetadata({
    locale,
    title: page.meta.title,
    description: page.meta.description,
    path: `/${slug}`,
  });
}

export default async function MarketingSlugPage({ params }: Props) {
  const { slug } = await params;
  if (!isMarketingPageSlug(slug)) notFound();

  const locale = await getLocale();
  const page = await getMarketingPage(locale, slug);

  return <MarketingPageShell locale={locale} page={page} slug={slug} />;
}
