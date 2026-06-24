import type { SiteContent } from "@/types/site";

import { SectionEyebrow } from "@/components/SectionEyebrow";

type Props = Pick<SiteContent, "platformTriad">;

export function PlatformTriadSection({ platformTriad }: Props) {
  return (
    <section
      id="platform"
      className="scroll-mt-28 border-b border-[var(--glass-border)] bg-[var(--background)] py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <SectionEyebrow>{platformTriad.sectionEyebrow}</SectionEyebrow>
          <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            {platformTriad.sectionTitle}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-white/60">
            {platformTriad.sectionSubtitle}
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {platformTriad.items.map((item, index) => (
            <article
              key={item.title}
              className="group relative flex flex-col rounded-3xl p-8 overflow-hidden"
            >
              {/* Gradient background */}
              <div className="absolute inset-0 z-0 bg-gradient-to-br from-brand/25 via-brand/10 to-transparent transition-all duration-500 group-hover:from-brand/35 group-hover:via-brand/15" />
              <div className="absolute -right-4 -top-4 h-28 w-28 rounded-full bg-brand/20 blur-2xl" />
              
              {/* Large number */}
              <div className="absolute right-6 top-6 text-5xl font-black leading-none text-white/10 z-0">
                {index + 1}
              </div>
              
              <div className="relative z-10">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand">
                  {item.eyebrow}
                </p>
                <h3 className="mt-4 text-xl font-semibold tracking-tight text-white">
                  {item.title}
                </h3>
                <p className="mt-4 flex-1 leading-relaxed text-white/60">{item.description}</p>
                {item.href && item.linkLabel ? (
                  <a
                    href={item.href}
                    className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-brand hover:text-white transition"
                  >
                    {item.linkLabel}
                    <span aria-hidden>→</span>
                  </a>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
