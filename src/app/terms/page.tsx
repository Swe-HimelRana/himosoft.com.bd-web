import type { Metadata } from "next";

import { LegalDocumentPage } from "@/components/LegalDocumentPage";
import { LegalPageShell } from "@/components/LegalPageShell";
import { getLocale } from "@/lib/getLocale";
import { getLegalPage } from "@/lib/legalContent";
import { buildPageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const document = await getLegalPage(locale, "terms");
  return buildPageMetadata({
    locale,
    title: document.meta.title,
    description: document.meta.description,
    path: "/terms",
  });
}

export default async function TermsPage() {
  const locale = await getLocale();
  const document = await getLegalPage(locale, "terms");

  return (
    <LegalPageShell locale={locale} breadcrumb={{ label: document.meta.title, path: "/terms" }}>
      <LegalDocumentPage document={document} />
    </LegalPageShell>
  );
}
