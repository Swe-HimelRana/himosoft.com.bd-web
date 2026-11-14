import { SectionEyebrow } from "@/components/SectionEyebrow";
import type { SiteContent } from "@/types/site";

type Props = Pick<SiteContent, "faq">;

export function FaqSection({ faq }: Props) {
  return (
    <section id="faq" className="scroll-mt-28 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <SectionEyebrow>{faq.sectionEyebrow}</SectionEyebrow>
          <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {faq.sectionTitle}
          </h2>
          {faq.sectionSubtitle ? (
            <p className="mt-4 text-lg leading-relaxed text-foreground/60">{faq.sectionSubtitle}</p>
          ) : null}
        </div>

        <div className="mt-10 divide-y divide-foreground/10 rounded-2xl border border-foreground/10 bg-foreground/[0.03]">
          {faq.items.map((item) => (
            <details key={item.question} className="group px-5 py-1 sm:px-6">
              <summary className="cursor-pointer list-none py-4 text-base font-medium text-foreground marker:content-none sm:text-lg [&::-webkit-details-marker]:hidden">
                <span className="flex items-start justify-between gap-4">
                  <span>{item.question}</span>
                  <span
                    aria-hidden
                    className="mt-1 shrink-0 text-[#1FD9CA] transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </span>
              </summary>
              <p className="pb-5 text-base leading-relaxed text-foreground/65">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
