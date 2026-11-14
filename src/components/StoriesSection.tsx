import type { SiteContent } from "@/types/site";

import { SectionEyebrow } from "@/components/SectionEyebrow";

type Props = Pick<SiteContent, "stories">;

export function StoriesSection({ stories }: Props) {
  return (
    <section id="stories" className="scroll-mt-28 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <SectionEyebrow>{stories.sectionEyebrow}</SectionEyebrow>
          <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {stories.sectionTitle}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-foreground/60">{stories.sectionSubtitle}</p>
        </div>

        <div className="mt-10 flex gap-4 overflow-x-auto pb-2 pt-1 [scrollbar-width:thin] sm:grid sm:grid-cols-2 sm:overflow-visible lg:grid-cols-3">
          {stories.items.map((item, i) => (
            <article
              key={item.title}
              className="group relative min-w-[min(100%,320px)] shrink-0 snap-start rounded-3xl p-7 overflow-hidden sm:min-w-0"
            >
              {/* Gradient background */}
              <div className="absolute inset-0 z-0 bg-gradient-to-br from-brand/20 via-brand/10 to-transparent transition-all duration-500 group-hover:from-brand/30 group-hover:via-brand/15" />
              <div className="absolute -right-3 -top-3 h-20 w-20 rounded-full bg-brand/15 blur-xl" />
              
              <div className="relative z-10">
                <h3 className="text-lg font-semibold leading-snug tracking-tight text-foreground">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-foreground/60">{item.description}</p>
                <a
                  href={item.href}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand hover:text-foreground transition"
                >
                  {item.linkLabel}
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
