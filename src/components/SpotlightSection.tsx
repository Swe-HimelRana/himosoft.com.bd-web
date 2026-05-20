import type { SiteContent } from "@/types/site";

import { SectionEyebrow } from "@/components/SectionEyebrow";

type Props = Pick<SiteContent, "spotlights">;

export function SpotlightSection({ spotlights }: Props) {
  return (
    <section className="bg-background py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <SectionEyebrow>{spotlights.sectionEyebrow}</SectionEyebrow>
          <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {spotlights.sectionTitle}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            {spotlights.sectionSubtitle}
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {spotlights.items.map((item) => (
            <article
              key={item.title}
              className="group flex flex-col rounded-3xl border border-black/[0.06] bg-card p-8 shadow-[0_18px_45px_-28px_rgba(15,23,42,0.35)] transition hover:-translate-y-0.5 hover:border-brand/25"
            >
              <h3 className="text-xl font-semibold tracking-tight text-foreground">
                {item.title}
              </h3>
              <p className="mt-4 flex-1 leading-relaxed text-muted">
                {item.description}
              </p>
              <a
                href={item.href}
                className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-brand transition group-hover:text-brand-deep"
              >
                {item.linkLabel}
                <span aria-hidden className="transition group-hover:translate-x-0.5">
                  →
                </span>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
