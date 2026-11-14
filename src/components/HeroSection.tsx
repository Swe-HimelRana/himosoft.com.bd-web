import type { SiteContent } from "@/types/site";

import { HeroLifecycleVisual } from "@/components/HeroLifecycleVisual";
import { SectionEyebrow } from "@/components/SectionEyebrow";

type Props = Pick<SiteContent, "hero">;

export function HeroSection({ hero }: Props) {
  return (
    <section className="relative -mt-[4.5rem] overflow-hidden text-foreground sm:-mt-20">
      <div className="relative mx-auto flex max-w-7xl flex-col gap-8 px-4 pb-20 pt-24 sm:px-6 sm:pt-32 lg:grid lg:grid-cols-12 lg:items-center lg:gap-8 lg:px-8 lg:pb-28 lg:pt-36 xl:gap-10">
        <div className="space-y-5 lg:col-span-6 lg:min-w-0 lg:pr-2 xl:pr-4">
          <SectionEyebrow tone="light">{hero.eyebrow}</SectionEyebrow>
          <h1 className="max-w-3xl text-balance text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:max-w-none lg:text-[2.75rem] lg:leading-[1.06] xl:text-6xl">
            {hero.title}
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-foreground/70 sm:text-xl lg:max-w-xl xl:max-w-2xl">
            {hero.subtitle}
          </p>

          <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center">
            <a
              href={hero.primaryCta.href}
              className="glass-card inline-flex items-center justify-center rounded-full bg-brand/30 px-6 py-3 text-sm font-semibold text-foreground shadow-[0_8px_28px_-8px_rgba(102,126,234,0.4)] backdrop-blur-md transition hover:bg-brand/50"
            >
              {hero.primaryCta.label}
            </a>
            <a
              href={hero.secondaryCta.href}
              className="inline-flex items-center justify-center rounded-full border border-foreground/20 bg-foreground/5 px-6 py-3 text-sm font-semibold text-foreground backdrop-blur-md transition hover:bg-foreground/10"
            >
              {hero.secondaryCta.label}
            </a>
          </div>
        </div>

        <div className="relative w-full lg:col-span-6 lg:min-w-0">
          <div className="relative aspect-video w-full min-h-[220px] overflow-hidden rounded-2xl sm:min-h-[280px] lg:min-h-[340px] xl:min-h-[400px]">
            <div className="absolute inset-0">
              <HeroLifecycleVisual />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
