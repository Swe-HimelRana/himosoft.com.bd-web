import type { SiteContent } from "@/types/site";

type Props = Pick<SiteContent, "ctaBand">;

export function CtaBand({ ctaBand }: Props) {
  return (
    <section id="contact" className="scroll-mt-28 border-t border-black/[0.06] bg-white">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 px-4 py-14 sm:flex-row sm:items-center sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {ctaBand.title}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted">{ctaBand.subtitle}</p>
        </div>
        <a
          href={ctaBand.primaryCta.href}
          className="inline-flex shrink-0 items-center justify-center rounded-full bg-brand px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-deep"
        >
          {ctaBand.primaryCta.label}
        </a>
      </div>
    </section>
  );
}
