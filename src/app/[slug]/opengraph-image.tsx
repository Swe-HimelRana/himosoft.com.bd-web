import { notFound } from "next/navigation";

import { getLocale } from "@/lib/getLocale";
import { getMarketingPage, isMarketingPageSlug } from "@/lib/marketingPages";
import { createBrandedOgImage, OG_IMAGE_SIZE } from "@/lib/ogImage";

export const alt = "HimoSoft";
export const size = OG_IMAGE_SIZE;
export const contentType = "image/png";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function Image({ params }: Props) {
  const { slug } = await params;
  if (!isMarketingPageSlug(slug)) notFound();

  const locale = await getLocale();
  const page = await getMarketingPage(locale, slug);
  const title = page.meta.title.replace(/\s*\|\s*HimoSoft\s*$/i, "").trim();

  return createBrandedOgImage(title, "himosoft.com.bd");
}
