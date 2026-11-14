import Image from "next/image";

import type { SiteContent } from "@/types/site";

import { SectionEyebrow } from "@/components/SectionEyebrow";

type Props = Pick<SiteContent, "webPresence">;

export function WebPresenceSection({ webPresence }: Props) {
  return (
    <section className="scroll-mt-28 py-12 sm:py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <SectionEyebrow>{webPresence.eyebrow}</SectionEyebrow>
          <h2 className="mt-3 text-balance text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            {webPresence.title}
          </h2>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {webPresence.items.map((item) => (
            <a
              key={item.host}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group glass-card relative overflow-hidden rounded-3xl border border-foreground/10 p-6 transition hover:border-brand/30 sm:p-7"
            >
              <div className="absolute inset-0 z-0 bg-gradient-to-br from-brand/15 via-transparent to-[var(--logo-green)]/10 opacity-80 transition group-hover:opacity-100" />
              <div className="relative z-10 flex items-start gap-4">
                <span className="relative mt-0.5 inline-flex h-11 w-11 shrink-0 overflow-hidden rounded-full ring-1 ring-foreground/10 shadow-sm">
                  <Image
                    src={item.flagSrc}
                    alt=""
                    width={44}
                    height={44}
                    className="h-full w-full object-cover"
                  />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground/45">
                    {item.region}
                  </p>
                  <p className="mt-2 truncate text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                    {item.host}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/60">
                    {item.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand transition group-hover:gap-2.5">
                    {webPresence.visitLabel}
                    <span aria-hidden>→</span>
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
