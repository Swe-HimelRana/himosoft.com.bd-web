"use client";

import { useState } from "react";

import { externalNavLinkProps } from "@/lib/navLink";
import type { MegaMenuPanel, NavItem, SiteContent } from "@/types/site";

function isMega(item: NavItem): item is NavItem & { mega: MegaMenuPanel } {
  return "mega" in item && Boolean(item.mega);
}

type Props = {
  items: NavItem[];
  ctaLabel: string;
  ctaHref: string;
  menuLabel: string;
  a11y: SiteContent["nav"]["a11y"];
};

export function MobileNav({ items, ctaLabel, ctaHref, menuLabel, a11y }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleMega = (id: string) => {
    setExpandedId((current) => (current === id ? null : id));
  };

  return (
    <div className="relative flex lg:hidden">
      <button
        type="button"
        aria-expanded={menuOpen}
        aria-controls="mobile-nav-sheet"
        className="glass-card inline-flex items-center justify-center rounded-full px-2.5 py-1.5 text-xs font-medium text-white shadow-sm backdrop-blur-md"
        onClick={() => setMenuOpen((open) => !open)}
      >
        {menuLabel}
      </button>

      {menuOpen ? (
        <>
          <button
            type="button"
            aria-label={a11y.closeMenuBackdrop}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
            onClick={() => setMenuOpen(false)}
          />
          <div
            id="mobile-nav-sheet"
            className="glass-card fixed inset-x-0 top-[52px] z-50 max-h-[min(82vh,calc(100dvh-52px))] overflow-y-auto border-b border-white/10 shadow-xl lg:hidden backdrop-blur-xl"
          >
            <nav className="space-y-1 px-4 py-4" aria-label={a11y.mobileNav}>
              {items.map((item) => {
                if (isMega(item)) {
                  const expanded = expandedId === item.id;

                  return (
                    <div key={item.id} className="rounded-2xl border border-white/10 bg-white/5">
                      <button
                        type="button"
                        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm font-semibold text-white"
                        aria-expanded={expanded}
                        onClick={() => toggleMega(item.id)}
                      >
                        {item.label}
                        <svg
                          aria-hidden
                          className={`h-4 w-4 shrink-0 transition ${expanded ? "rotate-180" : ""}`}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>

                      {expanded ? (
                        <div className="space-y-5 border-t border-white/10 px-4 py-4">
                          {item.mega.featured ? (
                            <div className="glass-card rounded-2xl p-4">
                              {item.mega.featured.eyebrow ? (
                                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand">
                                  {item.mega.featured.eyebrow}
                                </p>
                              ) : null}
                              <p className="mt-2 text-base font-semibold text-white">
                                {item.mega.featured.title}
                              </p>
                              <p className="mt-2 text-xs leading-relaxed text-white/60">
                                {item.mega.featured.description}
                              </p>
                              <a
                                href={item.mega.featured.href}
                                className="mt-3 inline-flex text-sm font-semibold text-brand"
                                onClick={() => setMenuOpen(false)}
                              >
                                {item.mega.featured.ctaLabel} →
                              </a>
                            </div>
                          ) : null}

                          {item.mega.columns.map((column) => (
                            <div key={column.title ?? column.links[0]?.href}>
                              {column.title ? (
                                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/50">
                                  {column.title}
                                </p>
                              ) : null}
                              <ul className={`space-y-2 ${column.title ? "mt-3" : ""}`}>
                                {column.links.map((link) => (
                                  <li key={`${link.href}-${link.label}`}>
                                    <a
                                      href={link.href}
                                      className="block rounded-xl px-3 py-2 text-sm font-semibold text-white hover:bg-white/5"
                                      onClick={() => setMenuOpen(false)}
                                    >
                                      {link.label}
                                      {link.description ? (
                                        <span className="mt-1 block text-xs font-normal leading-relaxed text-white/50">
                                          {link.description}
                                        </span>
                                      ) : null}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  );
                }

                return (
                  <a
                    key={item.id}
                    href={item.href}
                    {...externalNavLinkProps(item.href, item.external)}
                    className="block rounded-2xl px-4 py-3 text-sm font-semibold text-white hover:bg-white/5"
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                );
              })}

              <a
                href={ctaHref}
                className="mt-3 flex items-center justify-center rounded-full bg-brand/80 backdrop-blur-sm px-4 py-3 text-sm font-semibold text-white hover:bg-brand"
                onClick={() => setMenuOpen(false)}
              >
                {ctaLabel}
              </a>
            </nav>
          </div>
        </>
      ) : null}
    </div>
  );
}
