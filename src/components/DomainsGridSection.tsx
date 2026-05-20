import type { SiteContent } from "@/types/site";

import { SectionEyebrow } from "@/components/SectionEyebrow";

type Props = Pick<SiteContent, "domains">;

export function DomainsGridSection({ domains }: Props) {
  return (
    <section id="domains" className="scroll-mt-28 bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <SectionEyebrow>{domains.sectionEyebrow}</SectionEyebrow>
          <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {domains.sectionTitle}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted">{domains.sectionSubtitle}</p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {domains.items.map((domain) => (
            <a
              key={domain.title}
              href={domain.href}
              className="group rounded-2xl border border-black/[0.06] bg-background p-6 transition hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-[0_16px_40px_-28px_rgba(15,23,42,0.45)]"
            >
              <h3 className="text-base font-semibold tracking-tight text-foreground group-hover:text-brand-deep">
                {domain.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{domain.description}</p>
              <span className="mt-5 inline-flex items-center gap-1 text-xs font-semibold text-brand opacity-0 transition group-hover:opacity-100">
                {domains.linkHint}
                <span aria-hidden>→</span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
