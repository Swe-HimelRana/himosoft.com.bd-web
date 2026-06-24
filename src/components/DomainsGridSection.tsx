import type { SiteContent } from "@/types/site";

import { SectionEyebrow } from "@/components/SectionEyebrow";

type Props = Pick<SiteContent, "domains">;

export function DomainsGridSection({ domains }: Props) {
  return (
    <section id="domains" className="scroll-mt-28 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <SectionEyebrow>{domains.sectionEyebrow}</SectionEyebrow>
          <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            {domains.sectionTitle}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-white/60">{domains.sectionSubtitle}</p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {domains.items.map((domain, i) => (
            <a
              key={domain.title}
              href={domain.href}
              className="group relative rounded-2xl p-6 overflow-hidden transition hover:-translate-y-0.5"
            >
              {/* Gradient background */}
              <div className="absolute inset-0 z-0 bg-gradient-to-br from-brand/15 via-brand/5 to-transparent transition-all duration-500 group-hover:from-brand/25 group-hover:via-brand/10" />
              <div className="absolute -right-2 -top-2 h-14 w-14 rounded-full bg-brand/10 blur-lg" />
              
              <div className="relative z-10">
                <h3 className="text-base font-semibold tracking-tight text-white group-hover:text-brand">
                  {domain.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/60">{domain.description}</p>
                <span className="mt-5 inline-flex items-center gap-1 text-xs font-semibold text-brand opacity-0 transition group-hover:opacity-100">
                  {domains.linkHint}
                  <span aria-hidden>→</span>
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
