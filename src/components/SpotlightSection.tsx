import type { SiteContent } from "@/types/site";

import { SectionEyebrow } from "@/components/SectionEyebrow";

type Props = Pick<SiteContent, "spotlights">;

export function SpotlightSection({ spotlights }: Props) {
  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <SectionEyebrow>{spotlights.sectionEyebrow}</SectionEyebrow>
          <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            {spotlights.sectionTitle}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-white/60">
            {spotlights.sectionSubtitle}
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {spotlights.items.map((item, i) => (
            <article
              key={item.title}
              className="group relative flex flex-col rounded-3xl p-8 overflow-hidden transition hover:-translate-y-0.5"
            >
              {/* Gradient background */}
              <div className="absolute inset-0 z-0 bg-gradient-to-br from-brand/20 via-brand/10 to-transparent transition-all duration-500 group-hover:from-brand/30 group-hover:via-brand/15" />
              <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-brand/15 blur-xl" />
              
              <div className="relative z-10">
                <h3 className="text-xl font-semibold tracking-tight text-white">
                  {item.title}
                </h3>
                <p className="mt-4 flex-1 leading-relaxed text-white/60">
                  {item.description}
                </p>
                <a
                  href={item.href}
                  className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-brand transition hover:text-white"
                >
                  {item.linkLabel}
                  <span aria-hidden className="transition group-hover:translate-x-0.5">
                    →
                  </span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
