import type { SiteContent } from "@/types/site";

import { SectionEyebrow } from "@/components/SectionEyebrow";

type Props = Pick<SiteContent, "platformTriad">;

export function PlatformTriadSection({ platformTriad }: Props) {
  return (
    <section
      id="platform"
      className="scroll-mt-28 border-b border-black/[0.06] bg-background py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <SectionEyebrow>{platformTriad.sectionEyebrow}</SectionEyebrow>
          <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {platformTriad.sectionTitle}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            {platformTriad.sectionSubtitle}
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {platformTriad.items.map((item, index) => (
            <article
              key={item.title}
              className="relative flex flex-col rounded-3xl border border-black/[0.06] bg-card p-8 shadow-[0_18px_45px_-28px_rgba(15,23,42,0.35)]"
            >
              <div className="absolute right-8 top-8 text-5xl font-black leading-none text-brand/10">
                {index + 1}
              </div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand">
                {item.eyebrow}
              </p>
              <h3 className="mt-4 text-xl font-semibold tracking-tight text-foreground">
                {item.title}
              </h3>
              <p className="mt-4 flex-1 leading-relaxed text-muted">{item.description}</p>
              {item.href && item.linkLabel ? (
                <a
                  href={item.href}
                  className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-brand hover:text-brand-deep"
                >
                  {item.linkLabel}
                  <span aria-hidden>→</span>
                </a>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
