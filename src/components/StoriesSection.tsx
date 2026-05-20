import type { SiteContent } from "@/types/site";

import { SectionEyebrow } from "@/components/SectionEyebrow";

type Props = Pick<SiteContent, "stories">;

export function StoriesSection({ stories }: Props) {
  return (
    <section id="stories" className="scroll-mt-28 border-b border-black/[0.06] bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <SectionEyebrow>{stories.sectionEyebrow}</SectionEyebrow>
          <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {stories.sectionTitle}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted">{stories.sectionSubtitle}</p>
        </div>

        <div className="mt-10 flex gap-4 overflow-x-auto pb-2 pt-1 [scrollbar-width:thin] sm:grid sm:grid-cols-2 sm:overflow-visible lg:grid-cols-3">
          {stories.items.map((item) => (
            <article
              key={item.title}
              className="min-w-[min(100%,320px)] shrink-0 snap-start rounded-3xl border border-black/[0.06] bg-background p-7 sm:min-w-0"
            >
              <h3 className="text-lg font-semibold leading-snug tracking-tight text-foreground">
                {item.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-muted">{item.description}</p>
              <a
                href={item.href}
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand hover:text-brand-deep"
              >
                {item.linkLabel}
                <span aria-hidden>→</span>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
