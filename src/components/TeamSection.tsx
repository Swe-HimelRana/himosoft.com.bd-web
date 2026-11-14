import type { SiteContent } from "@/types/site";

import { SectionEyebrow } from "@/components/SectionEyebrow";

type Props = Pick<SiteContent, "team">;

export function TeamSection({ team }: Props) {
  return (
    <section id="team" className="scroll-mt-28 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <SectionEyebrow>{team.sectionEyebrow}</SectionEyebrow>
          <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {team.sectionTitle}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-foreground/60">{team.sectionSubtitle}</p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
          {team.members.map((member, i) => (
            <article
              key={member.name}
              className="group relative rounded-3xl p-8 overflow-hidden"
            >
              {/* Gradient background */}
              <div className="absolute inset-0 z-0 bg-gradient-to-br from-brand/20 via-brand/10 to-transparent transition-all duration-500 group-hover:from-brand/30 group-hover:via-brand/15" />
              <div className="absolute -right-3 -top-3 h-20 w-20 rounded-full bg-brand/15 blur-xl" />
              
              <div className="relative z-10 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand to-purple-600 text-lg font-bold text-foreground shadow-lg shadow-brand/30">
                  {member.name.slice(0, 1)}
                </div>
                <div>
                  <h3 className="text-lg font-semibold tracking-tight text-foreground">
                    {member.name}
                  </h3>
                  <p className="mt-1 text-sm font-semibold text-foreground/60">{member.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
