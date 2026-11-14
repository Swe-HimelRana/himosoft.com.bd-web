import Link from "next/link";

import { MarketingPageCta } from "@/components/MarketingPageCta";
import { SectionEyebrow } from "@/components/SectionEyebrow";
import { TeamSection } from "@/components/TeamSection";
import { externalNavLinkProps } from "@/lib/navLink";
import type { MarketingPageContent } from "@/types/marketingPage";
import type { SiteContent } from "@/types/site";

type Props = {
  page: MarketingPageContent;
  team?: SiteContent["team"];
  slug?: string;
  contactLabels?: Pick<
    SiteContent["footer"],
    "contactEmailLabel" | "contactPhoneLabel" | "contactPhoneEuLabel"
  >;
};

export function MarketingPage({ page, team, slug, contactLabels }: Props) {
  return (
    <article className="mx-auto max-w-4xl">
      <header className="border-b border-foreground/10 pb-8">
        <SectionEyebrow>{page.eyebrow}</SectionEyebrow>
        <h1 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {page.title}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-foreground/60">{page.intro}</p>
      </header>

      {page.sections.length > 1 ? (
        <nav
          aria-label={page.nav.onThisPageLabel}
          className="glass-card mt-8 rounded-2xl border border-foreground/10 p-5 sm:p-6"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground/60">
            {page.nav.onThisPageLabel}
          </p>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm font-medium text-foreground">
            {page.sections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="text-brand hover:text-foreground hover:underline"
                >
                  {section.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      ) : null}

      <div className="mt-10 space-y-12">
        {page.sections.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className="scroll-mt-28 border-t border-foreground/10 pt-10 first:border-t-0 first:pt-0"
          >
            <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
              {section.title}
            </h2>
            <div className="mt-4 space-y-4 text-[0.9375rem] leading-relaxed text-foreground/60 sm:text-base">
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 48)}>{paragraph}</p>
              ))}
              {section.list ? (
                <ul className="list-disc space-y-2 pl-5">
                  {section.list.map((item) => (
                    <li key={item.slice(0, 48)}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </div>
            {section.cards && section.cards.length > 0 ? (
              <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                {section.cards.map((card) => (
                  <li
                    key={card.title}
                    className="glass-card rounded-2xl border border-foreground/10 p-5"
                  >
                    <h3 className="font-semibold text-foreground">{card.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-foreground/60">{card.description}</p>
                    {card.href && card.linkLabel ? (
                      <Link
                        href={card.href}
                        {...externalNavLinkProps(card.href)}
                        className="mt-4 inline-flex text-sm font-semibold text-brand hover:text-foreground hover:underline"
                      >
                        {card.linkLabel} →
                      </Link>
                    ) : null}
                  </li>
                ))}
              </ul>
            ) : null}
          </section>
        ))}
      </div>

      {page.showTeam && team ? (
        <div className="mt-14 border-t border-black/[0.06] pt-12">
          <TeamSection team={team} />
        </div>
      ) : null}

      {page.relatedLinks && page.relatedLinks.length > 0 ? (
        <aside className="glass-card mt-12 rounded-2xl border border-foreground/10 p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground/60">
            Related
          </p>
          <ul className="mt-4 flex flex-wrap gap-3">
            {page.relatedLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="rounded-full border border-foreground/10 bg-foreground/5 px-4 py-2 text-sm font-semibold text-foreground hover:border-brand/30 hover:text-brand"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      ) : null}

      {page.cta && contactLabels ? (
        <MarketingPageCta
          cta={page.cta}
          openContactModal={slug === "contact"}
          contactModal={page.contactModal}
          contactLabels={{
            emailLabel: contactLabels.contactEmailLabel,
            phoneLabel: contactLabels.contactPhoneLabel,
            phoneEuLabel: contactLabels.contactPhoneEuLabel,
          }}
        />
      ) : null}

      <footer className="mt-14 border-t border-foreground/10 pt-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-brand hover:text-foreground hover:underline"
        >
          ← {page.nav.backLabel}
        </Link>
      </footer>
    </article>
  );
}
