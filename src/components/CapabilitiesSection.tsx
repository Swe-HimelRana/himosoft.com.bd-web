import type { SiteContent } from "@/types/site";

import { SectionEyebrow } from "@/components/SectionEyebrow";

type Props = Pick<SiteContent, "capabilities">;

export function CapabilitiesSection({ capabilities }: Props) {
  return (
    <section
      id="capabilities"
      className="relative isolate scroll-mt-28 overflow-hidden bg-[linear-gradient(135deg,var(--hero-from),var(--hero-via),var(--hero-to))] py-16 text-white sm:py-20 lg:py-24"
    >
      <div className="hero-grid pointer-events-none absolute inset-0 opacity-40" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <SectionEyebrow tone="light">{capabilities.sectionEyebrow}</SectionEyebrow>
          <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            {capabilities.sectionTitle}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-white/80">
            {capabilities.sectionSubtitle}
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {capabilities.pillars.map((pillar) => (
            <article
              key={pillar.title}
              className="rounded-3xl border border-white/15 bg-white/10 p-8 backdrop-blur-md"
            >
              <h3 className="text-xl font-semibold tracking-tight">{pillar.title}</h3>
              <p className="mt-4 leading-relaxed text-white/78">{pillar.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
