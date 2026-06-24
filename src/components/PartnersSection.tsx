import type { SiteContent } from "@/types/site";

import { SectionEyebrow } from "@/components/SectionEyebrow";

type Props = Pick<SiteContent, "partners">;

export function PartnersSection({ partners }: Props) {
  return (
    <section
      id="partners"
      className="scroll-mt-28 py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <SectionEyebrow>{partners.sectionEyebrow}</SectionEyebrow>
          <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            {partners.sectionTitle}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-white/60">{partners.sectionSubtitle}</p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {partners.items.map((partner, i) => (
            <article
              key={partner.title}
              className="group relative flex flex-col rounded-3xl p-8 overflow-hidden"
            >
              {/* Gradient background */}
              <div className="absolute inset-0 z-0 bg-gradient-to-br from-brand/20 via-brand/10 to-transparent transition-all duration-500 group-hover:from-brand/30 group-hover:via-brand/15" />
              <div className="absolute -right-3 -top-3 h-20 w-20 rounded-full bg-brand/15 blur-xl" />
              
              <div className="relative z-10">
                <h3 className="text-xl font-semibold tracking-tight text-white">
                  {partner.title}
                </h3>
                <p className="mt-4 flex-1 leading-relaxed text-white/60">{partner.description}</p>
                <a
                  href={partner.href}
                  className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-brand hover:text-white transition"
                >
                  {partner.linkLabel}
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
