import type { SiteContent } from "@/types/site";

import { SectionEyebrow } from "@/components/SectionEyebrow";

type Props = Pick<SiteContent, "partners">;

export function PartnersSection({ partners }: Props) {
  return (
    <section
      id="partners"
      className="scroll-mt-28 border-t border-black/[0.06] bg-background py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <SectionEyebrow>{partners.sectionEyebrow}</SectionEyebrow>
          <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {partners.sectionTitle}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted">{partners.sectionSubtitle}</p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {partners.items.map((partner) => (
            <article
              key={partner.title}
              className="flex flex-col rounded-3xl border border-black/[0.06] bg-card p-8 shadow-[0_18px_45px_-28px_rgba(15,23,42,0.35)]"
            >
              <h3 className="text-xl font-semibold tracking-tight text-foreground">
                {partner.title}
              </h3>
              <p className="mt-4 flex-1 leading-relaxed text-muted">{partner.description}</p>
              <a
                href={partner.href}
                className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-brand hover:text-brand-deep"
              >
                {partner.linkLabel}
                <span aria-hidden>→</span>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
