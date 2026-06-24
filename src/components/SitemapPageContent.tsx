import Link from "next/link";

import { externalNavLinkProps } from "@/lib/navLink";
import type { SitemapGroup } from "@/lib/siteSitemap";
import { getSiteUrl } from "@/lib/seo";

type Props = {
  title: string;
  intro: string;
  xmlNote: string;
  homeLabel: string;
  groups: SitemapGroup[];
};

export function SitemapPageContent({ title, intro, xmlNote, homeLabel, groups }: Props) {
  const xmlUrl = `${getSiteUrl()}/sitemap.xml`;

  return (
    <article className="mx-auto max-w-3xl">
      <header className="border-b border-white/10 pb-8">
        <h1 className="text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          {title}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-white/60">{intro}</p>
        <p className="mt-4 text-sm leading-relaxed text-white/60">
          {xmlNote}{" "}
          <a
            href={xmlUrl}
            className="font-semibold text-brand hover:text-white hover:underline"
          >
            {xmlUrl}
          </a>
        </p>
      </header>

      <div className="mt-10 space-y-10">
        {groups.map((group) => (
          <section
            key={group.title}
            className="glass-card rounded-2xl border border-white/10 p-6 sm:p-8"
          >
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/60">
              {group.title}
            </h2>
            <ul className="mt-5 columns-1 gap-x-8 sm:columns-2">
              {group.links.map((link) => {
                const isInternal = link.href.startsWith("/");
                const className =
                  "mb-3 block text-[0.9375rem] font-semibold text-white hover:text-brand hover:underline break-inside-avoid";

                return (
                  <li key={`${group.title}-${link.href}-${link.label}`} className="break-inside-avoid">
                    {isInternal ? (
                      <Link href={link.href} className={className}>
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        {...externalNavLinkProps(link.href, link.external)}
                        className={className}
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>

      <footer className="mt-14 border-t border-white/10 pt-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-brand hover:text-white hover:underline"
        >
          ← {homeLabel}
        </Link>
      </footer>
    </article>
  );
}
