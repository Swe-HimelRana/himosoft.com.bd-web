import type { SiteContent } from "@/types/site";

import { SectionEyebrow } from "@/components/SectionEyebrow";

type Props = Pick<SiteContent, "team">;

export function TeamSection({ team }: Props) {
  return (
    <section id="team" className="scroll-mt-28 bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <SectionEyebrow>{team.sectionEyebrow}</SectionEyebrow>
          <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {team.sectionTitle}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted">{team.sectionSubtitle}</p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
          {team.members.map((member) => (
            <article
              key={member.name}
              className="rounded-3xl border border-black/[0.06] bg-background p-8"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand/15 text-lg font-bold text-brand-deep">
                  {member.name.slice(0, 1)}
                </div>
                <div>
                  <h3 className="text-lg font-semibold tracking-tight text-foreground">
                    {member.name}
                  </h3>
                  <p className="mt-1 text-sm font-semibold text-muted">{member.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
