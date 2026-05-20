import type { SiteContent } from "@/types/site";

import { SectionEyebrow } from "@/components/SectionEyebrow";

type Props = Pick<SiteContent, "services">;

export function ServicesSection({ services }: Props) {
  return (
    <section id="services" className="scroll-mt-28 bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <SectionEyebrow>{services.sectionEyebrow}</SectionEyebrow>
          <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {services.sectionTitle}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            {services.sectionSubtitle}
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.items.map((service) => (
            <article
              key={service.title}
              className="rounded-3xl border border-black/[0.06] bg-background p-7"
            >
              <div className="h-1 w-12 rounded-full bg-brand" />
              <h3 className="mt-5 text-lg font-semibold tracking-tight text-foreground">
                {service.title}
              </h3>
              <p className="mt-3 leading-relaxed text-muted">{service.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
