import type { SiteContent } from "@/types/site";

type Props = Pick<SiteContent, "trustStrip">;

export function TrustStrip({ trustStrip }: Props) {
  return (
    <section>
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <p className="max-w-4xl text-balance text-xl font-semibold leading-snug tracking-tight text-foreground sm:text-2xl">
          {trustStrip.headline}
        </p>

        <div className="mt-10 grid grid-cols-2 gap-6 lg:grid-cols-4">
          {trustStrip.stats.map((stat, i) => (
            <div
              key={stat.label}
              className="group relative rounded-2xl px-5 py-5 overflow-hidden"
            >
              {/* Gradient background */}
              <div className="absolute inset-0 z-0 bg-gradient-to-br from-brand/20 via-brand/10 to-transparent transition-all duration-500 group-hover:from-brand/30 group-hover:via-brand/15" />
              <div className="absolute -right-2 -top-2 h-16 w-16 rounded-full bg-brand/15 blur-lg" />
              
              <div className="relative z-10">
                <p className="text-3xl font-semibold tracking-tight text-brand sm:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm font-semibold text-foreground/60">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
