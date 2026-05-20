import type { SiteContent } from "@/types/site";

import { SectionEyebrow } from "@/components/SectionEyebrow";

type Props = Pick<SiteContent, "insights">;

export function InsightsSection({ insights }: Props) {
  return (
    <section id="insights" className="scroll-mt-28 bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <SectionEyebrow>{insights.sectionEyebrow}</SectionEyebrow>
          <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {insights.sectionTitle}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted">{insights.sectionSubtitle}</p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {insights.items.map((card) => (
            <article
              key={card.title}
              className="flex flex-col rounded-3xl border border-black/[0.06] bg-background p-7 transition hover:border-brand/25"
            >
              <span className="inline-flex w-fit rounded-full bg-brand/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-brand-deep">
                {card.badge}
              </span>
              <h3 className="mt-4 text-lg font-semibold leading-snug tracking-tight text-foreground">
                {card.title}
              </h3>
              {card.description ? (
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{card.description}</p>
              ) : (
                <div className="flex-1" />
              )}
              <a
                href={card.href}
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand hover:text-brand-deep"
              >
                {card.linkLabel}
                <span aria-hidden>→</span>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
