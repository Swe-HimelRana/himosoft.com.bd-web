import type { SiteContent } from "@/types/site";

import { SectionEyebrow } from "@/components/SectionEyebrow";

type Props = Pick<SiteContent, "insights">;

export function InsightsSection({ insights }: Props) {
  return (
    <section id="insights" className="scroll-mt-28 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <SectionEyebrow>{insights.sectionEyebrow}</SectionEyebrow>
          <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            {insights.sectionTitle}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-white/60">{insights.sectionSubtitle}</p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {insights.items.map((card, i) => (
            <article
              key={card.title}
              className="group relative flex flex-col rounded-3xl p-7 overflow-hidden transition hover:border-white/20"
            >
              {/* Gradient background */}
              <div className="absolute inset-0 z-0 bg-gradient-to-br from-brand/20 via-brand/10 to-transparent transition-all duration-500 group-hover:from-brand/30 group-hover:via-brand/15" />
              <div className="absolute -right-3 -top-3 h-20 w-20 rounded-full bg-brand/15 blur-xl" />
              
              <div className="relative z-10">
                <span className="inline-flex w-fit rounded-full bg-brand/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white backdrop-blur-sm">
                  {card.badge}
                </span>
                <h3 className="mt-4 text-lg font-semibold leading-snug tracking-tight text-white">
                  {card.title}
                </h3>
                {card.description ? (
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-white/60">{card.description}</p>
                ) : (
                  <div className="flex-1" />
                )}
                <a
                  href={card.href}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand hover:text-white transition"
                >
                  {card.linkLabel}
                  <span aria-hidden>→</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
