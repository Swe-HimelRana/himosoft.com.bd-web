import type { SiteContent } from "@/types/site";

type Props = Pick<SiteContent, "trustStrip">;

export function TrustStrip({ trustStrip }: Props) {
  return (
    <section className="border-b border-black/[0.06] bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <p className="max-w-4xl text-balance text-xl font-semibold leading-snug tracking-tight text-foreground sm:text-2xl">
          {trustStrip.headline}
        </p>

        <div className="mt-10 grid grid-cols-2 gap-6 lg:grid-cols-4">
          {trustStrip.stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-black/[0.06] bg-background px-5 py-5"
            >
              <p className="text-3xl font-semibold tracking-tight text-brand-deep sm:text-4xl">
                {stat.value}
              </p>
              <p className="mt-2 text-sm font-semibold text-muted">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
