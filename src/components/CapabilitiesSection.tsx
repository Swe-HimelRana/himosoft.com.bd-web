import type { SiteContent } from "@/types/site";

import { SectionEyebrow } from "@/components/SectionEyebrow";

type Props = Pick<SiteContent, "capabilities">;

export function CapabilitiesSection({ capabilities }: Props) {
  return (
    <section
      id="capabilities"
      className="relative scroll-mt-28 overflow-hidden py-16 text-white sm:py-20 lg:py-24"
    >
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <SectionEyebrow tone="light">{capabilities.sectionEyebrow}</SectionEyebrow>
          <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            {capabilities.sectionTitle}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-white/60">
            {capabilities.sectionSubtitle}
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {capabilities.pillars.map((pillar, i) => (
            <article
              key={pillar.title}
              className="group relative rounded-3xl p-8 overflow-hidden backdrop-blur-md"
            >
              {/* Gradient background */}
              <div className="absolute inset-0 z-0 bg-gradient-to-br from-brand/20 via-brand/10 to-transparent transition-all duration-500 group-hover:from-brand/30 group-hover:via-brand/15" />
              <div className="absolute -right-4 -top-4 h-28 w-28 rounded-full bg-brand/15 blur-2xl" />
              
              <div className="relative z-10">
                <h3 className="text-xl font-semibold tracking-tight">{pillar.title}</h3>
                <p className="mt-4 leading-relaxed text-white/60">{pillar.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
