import type { Metadata } from "next";

import { ErrorPageShell } from "@/components/ErrorPageShell";
import { getLocale } from "@/lib/getLocale";
import { buildPageMetadata } from "@/lib/seo";
import { getSiteContent } from "@/lib/siteContent";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const site = await getSiteContent(locale);
  const copy = site.errors.notFound;

  return {
    ...buildPageMetadata({
      locale,
      title: `${copy.title} | HimoSoft`,
      description: copy.description,
      path: "/404",
      noIndex: true,
    }),
    title: { absolute: `${copy.title} | HimoSoft` },
  };
}

export default function NotFound() {
  return <ErrorPageShell variant="notFound" />;
}
