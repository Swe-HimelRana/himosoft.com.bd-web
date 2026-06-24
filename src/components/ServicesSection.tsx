import type { SiteContent } from "@/types/site";

import { SectionEyebrow } from "@/components/SectionEyebrow";

type Props = Pick<SiteContent, "services">;

export function ServicesSection({ services }: Props) {
  return (
    <section id="services" className="scroll-mt-28 bg-[var(--background)] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <SectionEyebrow>{services.sectionEyebrow}</SectionEyebrow>
          <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            {services.sectionTitle}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-white/60">
            {services.sectionSubtitle}
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.items.map((service, i) => (
            <article
              key={service.title}
              className="group relative rounded-3xl p-7 overflow-hidden"
            >
              {/* Gradient background */}
              <div className="absolute inset-0 z-0 bg-gradient-to-br from-brand/15 via-brand/5 to-transparent transition-all duration-500 group-hover:from-brand/25 group-hover:via-brand/10" />
              <div className="absolute -right-2 -top-2 h-16 w-16 rounded-full bg-brand/10 blur-lg" />
              
              <div className="relative z-10">
                <div className="h-1 w-12 rounded-full bg-gradient-to-r from-brand to-brand-deep" />
                <h3 className="mt-5 text-lg font-semibold tracking-tight text-white">
                  {service.title}
                </h3>
                <p className="mt-3 leading-relaxed text-white/60">{service.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
