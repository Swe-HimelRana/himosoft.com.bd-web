import type { SiteContent } from "@/types/site";

type Props = Pick<SiteContent, "ctaBand">;

export function CtaBand({ ctaBand }: Props) {
  return (
    <section id="contact" className="scroll-mt-28">
      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Card with gradient background */}
        <div className="group relative overflow-hidden rounded-3xl border border-brand/30 p-10 sm:p-14">
          {/* Gradient background */}
          <div className="absolute inset-0 z-0 bg-gradient-to-br from-brand/30 via-brand/15 to-purple-900/20 transition-all duration-500 group-hover:from-brand/40 group-hover:via-brand/25" />
          
          {/* Decorative circles */}
          <div className="absolute -right-10 -top-10 z-0 h-40 w-40 rounded-full bg-brand/25 blur-3xl" />
          <div className="absolute -bottom-10 -left-10 z-0 h-32 w-32 rounded-full bg-purple-600/20 blur-2xl" />
          
          {/* Content */}
          <div className="relative z-10 flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                {ctaBand.title}
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-foreground/70 sm:text-xl">
                {ctaBand.subtitle}
              </p>
            </div>
            <a
              href={ctaBand.primaryCta.href}
              className="group/btn inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand to-purple-600 px-8 py-4 text-base font-bold text-white shadow-xl shadow-brand/30 transition-all duration-300 hover:shadow-brand/50 hover:scale-105"
            >
              {ctaBand.primaryCta.label}
              <span className="transition-transform group-hover/btn:translate-x-1">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
