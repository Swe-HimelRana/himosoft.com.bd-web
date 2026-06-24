import type { SiteContent } from "@/types/site";

import { SectionEyebrow } from "@/components/SectionEyebrow";

type Props = Pick<SiteContent, "about">;

export function AboutSection({ about }: Props) {
  return (
    <section id="about" className="scroll-mt-28 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-8 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionEyebrow>{about.sectionEyebrow}</SectionEyebrow>
          <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            {about.sectionTitle}
          </h2>
        </div>
        <div className="space-y-5 lg:col-span-7">
          {about.paragraphs.map((paragraph, index) => (
            <p key={index} className="text-lg leading-relaxed text-white/60">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
