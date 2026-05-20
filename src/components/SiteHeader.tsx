"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";

import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { MobileNav } from "@/components/MobileNav";
import type { Locale } from "@/lib/locale";
import { externalNavLinkProps } from "@/lib/navLink";
import type { MegaMenuPanel, NavItem, SiteContent } from "@/types/site";

function isMega(item: NavItem): item is NavItem & { mega: MegaMenuPanel } {
  return "mega" in item && Boolean(item.mega);
}

function MegaPanelBody({
  panel,
  linkGroupSr,
}: {
  panel: MegaMenuPanel;
  linkGroupSr: string;
}) {
  const featured = panel.featured;

  return (
    <div
      className={`mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:px-8 ${featured ? "lg:grid-cols-[minmax(0,300px)_1fr]" : ""}`}
    >
      {featured ? (
        <aside className="rounded-3xl bg-gradient-to-br from-brand/15 via-white to-brand/5 p-7 ring-1 ring-brand/15">
          {featured.eyebrow ? (
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-deep">
              {featured.eyebrow}
            </p>
          ) : null}
          <p className="mt-3 text-xl font-semibold leading-snug tracking-tight text-foreground">
            {featured.title}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted">{featured.description}</p>
          <a
            href={featured.href}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-deep"
          >
            {featured.ctaLabel}
            <span aria-hidden>→</span>
          </a>
        </aside>
      ) : null}

      <div
        className={`grid gap-8 sm:grid-cols-2 sm:gap-x-10 ${panel.columns.length >= 3 ? "xl:grid-cols-3" : ""}`}
      >
        {panel.columns.map((column) => (
          <div
            key={column.title ?? column.links[0]?.href}
            className="min-w-[11.5rem] sm:min-w-[12.5rem]"
          >
            {column.title ? (
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
                {column.title}
              </p>
            ) : (
              <span className="sr-only">{linkGroupSr}</span>
            )}
            <ul className={`mt-4 space-y-4 ${column.title ? "" : "mt-0"}`}>
              {column.links.map((link) => (
                <li key={`${link.href}-${link.label}`}>
                  <a
                    href={link.href}
                    className="group block rounded-xl px-2 py-1 -mx-2 hover:bg-black/[0.03]"
                  >
                    <span className="flex items-start justify-between gap-3">
                      <span className="whitespace-nowrap text-sm font-semibold text-foreground group-hover:text-brand-deep">
                        {link.label}
                      </span>
                      <span
                        aria-hidden
                        className="mt-0.5 text-muted opacity-0 transition group-hover:opacity-100"
                      >
                        →
                      </span>
                    </span>
                    {link.description ? (
                      <span className="mt-1 block text-xs leading-relaxed text-muted">
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
    </div>
  );
}

type Props = {
  locale: Locale;
  nav: SiteContent["nav"];
};

export function SiteHeader({ locale, nav }: Props) {
  const uid = useId();
  const pathname = usePathname();
  const router = useRouter();
  const [openId, setOpenId] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goHome = (e: React.MouseEvent<HTMLAnchorElement>) => {
    setOpenId(null);
    if (pathname !== "/") return;

    e.preventDefault();
    router.push("/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const clearCloseTimer = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const scheduleClose = () => {
    clearCloseTimer();
    closeTimer.current = setTimeout(() => setOpenId(null), 140);
  };

  const openPanel = useCallback((id: string) => {
    clearCloseTimer();
    setOpenId(id);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenId(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => () => clearCloseTimer(), []);

  const activeMega = nav.items.find(
    (item): item is NavItem & { mega: MegaMenuPanel } =>
      isMega(item) && item.id === openId,
  );

  return (
    <header className="sticky top-0 z-50">
      <div className="relative border-b border-[var(--nav-border)] bg-[var(--nav-bg)]">
        <div className="mx-auto grid max-w-7xl grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-2 px-4 py-2 sm:gap-x-3 sm:px-6 lg:px-8">
          <Link
            href="/"
            onClick={goHome}
            className="relative z-[60] flex items-center gap-2 rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            <Image
              src="/logo.svg"
              alt=""
              width={40}
              height={40}
              priority
              className="h-8 w-8 object-contain sm:h-9 sm:w-9"
            />
            <span className="text-sm font-bold tracking-tight text-zinc-800">
              {nav.brand}
            </span>
          </Link>

          <nav
            className="header-main-nav hidden min-w-0 lg:block"
            aria-label={nav.a11y.mainNav}
          >
            <div className="flex items-center justify-center gap-0.5 px-1 xl:gap-1">
            {nav.items.map((item) => {
              if (isMega(item)) {
                const expanded = openId === item.id;
                const panelId = `${uid}-${item.id}-panel`;

                return (
                  <div
                    key={item.id}
                    className="relative"
                    onMouseEnter={() => openPanel(item.id)}
                    onMouseLeave={scheduleClose}
                  >
                    <button
                      type="button"
                      className={`flex shrink-0 items-center gap-1 whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium transition ${expanded ? "bg-zinc-300/70 text-zinc-900" : "text-zinc-600 hover:bg-zinc-300/55 hover:text-zinc-900"}`}
                      aria-expanded={expanded}
                      aria-controls={panelId}
                      aria-haspopup="true"
                      onFocus={() => openPanel(item.id)}
                      onClick={() => setOpenId(expanded ? null : item.id)}
                    >
                      {item.label}
                      <svg
                        aria-hidden
                        className={`mt-px h-3.5 w-3.5 shrink-0 opacity-60 transition ${expanded ? "rotate-180" : ""}`}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>
                );
              }

              return (
                <a
                  key={item.id}
                  href={item.href}
                  {...externalNavLinkProps(item.href, item.external)}
                  className="shrink-0 whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium text-zinc-600 transition hover:bg-zinc-300/55 hover:text-zinc-900"
                >
                  {item.label}
                </a>
              );
            })}
            </div>
          </nav>

          <div className="relative z-20 flex shrink-0 items-center gap-2 sm:gap-3">
            <LanguageSwitcher locale={locale} />
            <a
              href={nav.ctaHref}
              className="hidden shrink-0 whitespace-nowrap rounded-full bg-brand px-4 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-brand-deep lg:inline-flex"
            >
              {nav.ctaLabel}
            </a>
            <MobileNav
              items={nav.items}
              ctaLabel={nav.ctaLabel}
              ctaHref={nav.ctaHref}
              menuLabel={nav.menuLabel}
              a11y={nav.a11y}
            />
          </div>
        </div>

        {activeMega ? (
          <div
            id={`${uid}-${activeMega.id}-panel`}
            className="absolute left-0 right-0 top-full border-t border-black/[0.06] bg-white shadow-[0_28px_70px_-36px_rgba(15,23,42,0.55)]"
            onMouseEnter={clearCloseTimer}
            onMouseLeave={scheduleClose}
          >
            <MegaPanelBody panel={activeMega.mega} linkGroupSr={nav.a11y.megaLinkGroup} />
          </div>
        ) : null}
      </div>
    </header>
  );
}
