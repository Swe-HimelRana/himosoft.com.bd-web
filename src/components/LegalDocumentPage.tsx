import Link from "next/link";

import type { LegalPageContent } from "@/types/legal";

type Props = {
  document: LegalPageContent;
};

export function LegalDocumentPage({ document }: Props) {
  return (
    <article className="mx-auto max-w-3xl">
      <header className="border-b border-black/[0.08] pb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-deep">
          Last updated: {document.meta.lastUpdated}
        </p>
        <h1 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {document.meta.title}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted">{document.intro}</p>
      </header>

      <nav
        aria-label={document.nav.onThisPageLabel}
        className="mt-8 rounded-2xl border border-black/[0.06] bg-white p-5 sm:p-6"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
          {document.nav.onThisPageLabel}
        </p>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm font-medium text-foreground">
          {document.sections.map((section) => (
            <li key={section.id}>
              <a href={`#${section.id}`} className="text-brand-deep hover:text-brand hover:underline">
                {section.title}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div className="mt-10 space-y-12">
        {document.sections.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className="scroll-mt-28 border-t border-black/[0.06] pt-10 first:border-t-0 first:pt-0"
          >
            <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
              {section.title}
            </h2>
            <div className="mt-4 space-y-4 text-[0.9375rem] leading-relaxed text-muted sm:text-base">
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 48)}>{paragraph}</p>
              ))}
              {section.list ? (
                <ul className="list-disc space-y-2 pl-5">
                  {section.list.map((item) => (
                    <li key={item.slice(0, 48)}>{item}</li>
                  ))}
                </ul>
              ) : null}
              {section.afterList?.map((paragraph) => (
                <p key={paragraph.slice(0, 48)}>{paragraph}</p>
              ))}
            </div>
          </section>
        ))}
      </div>

      <footer className="mt-14 border-t border-black/[0.08] pt-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-brand-deep hover:text-brand hover:underline"
        >
          ← {document.nav.backLabel}
        </Link>
      </footer>
    </article>
  );
}
