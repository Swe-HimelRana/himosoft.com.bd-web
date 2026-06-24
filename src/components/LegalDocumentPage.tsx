import Link from "next/link";

import type { LegalPageContent } from "@/types/legal";

type Props = {
  document: LegalPageContent;
};

export function LegalDocumentPage({ document }: Props) {
  return (
    <article className="mx-auto max-w-3xl">
      <header className="border-b border-white/10 pb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
          Last updated: {document.meta.lastUpdated}
        </p>
        <h1 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          {document.meta.title}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-white/60">{document.intro}</p>
      </header>

      <nav
        aria-label={document.nav.onThisPageLabel}
        className="glass-card mt-8 rounded-2xl border border-white/10 p-5 sm:p-6"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
          {document.nav.onThisPageLabel}
        </p>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm font-medium text-white">
          {document.sections.map((section) => (
            <li key={section.id}>
              <a href={`#${section.id}`} className="text-brand hover:text-white hover:underline">
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
            className="scroll-mt-28 border-t border-white/10 pt-10 first:border-t-0 first:pt-0"
          >
            <h2 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
              {section.title}
            </h2>
            <div className="mt-4 space-y-4 text-[0.9375rem] leading-relaxed text-white/60 sm:text-base">
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

      <footer className="mt-14 border-t border-white/10 pt-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-brand hover:text-white hover:underline"
        >
          ← {document.nav.backLabel}
        </Link>
      </footer>
    </article>
  );
}
