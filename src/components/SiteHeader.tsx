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
      className={`mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:px-8 ${featured ? "lg:grid-cols-[minmax(0,320px)_1fr]" : ""}`}
    >
      {featured ? (
        <aside className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-brand/20 via-white/5 to-transparent p-7 shadow-[0_8px_32px_rgba(102,126,234,0.15)]">
          <div className="absolute inset-0 bg-gradient-to-br from-brand/10 to-transparent pointer-events-none" />
          <div className="relative">
            {featured.eyebrow ? (
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
                {featured.eyebrow}
              </p>
            ) : null}
            <p className="mt-3 text-xl font-semibold leading-snug tracking-tight text-white">
              {featured.title}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-white/60">{featured.description}</p>
            <a
              href={featured.href}
              className="group mt-6 inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/20 backdrop-blur-md px-5 py-2.5 text-sm font-semibold text-white shadow-[0_4px_16px_rgba(102,126,234,0.25)] transition-all hover:bg-brand/40 hover:shadow-[0_8px_24px_rgba(102,126,234,0.35)]"
            >
              {featured.ctaLabel}
              <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
            </a>
          </div>
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
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/40">
                {column.title}
              </p>
            ) : (
              <span className="sr-only">{linkGroupSr}</span>
            )}
            <ul className={`mt-4 space-y-1 ${column.title ? "" : "mt-0"}`}>
              {column.links.map((link) => (
                <li key={`${link.href}-${link.label}`}>
                  <a
                    href={link.href}
                    className="group relative flex items-start justify-between gap-3 rounded-xl border border-transparent px-3 py-2.5 -mx-3 transition-all hover:border-white/10 hover:bg-white/5"
                  >
                    <span className="flex flex-col">
                      <span className="text-sm font-semibold text-white transition-colors group-hover:text-brand">
                        {link.label}
                      </span>
                      {link.description ? (
                        <span className="mt-0.5 text-xs leading-relaxed text-white/40">
                          {link.description}
                        </span>
                      ) : null}
                    </span>
                    <span
                      aria-hidden
                      className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand/20 text-brand opacity-0 transition-all group-hover:opacity-100"
                    >
                      →
                    </span>
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
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 sm:pt-5">
        <div className="glass-nav relative mx-auto max-w-7xl rounded-2xl border border-emerald-500/20 bg-gradient-to-b from-emerald-950/90 via-emerald-900/85 to-emerald-950/90 backdrop-blur-xl shadow-[0_8px_40px_-10px_rgba(0,0,0,0.5)]">
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
            <span className="text-sm font-bold tracking-tight text-white">
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
                      className={`flex shrink-0 items-center gap-1 whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium transition ${expanded ? "bg-white/20 text-white" : "text-white/70 hover:bg-white/10 hover:text-white"}`}
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
                  className="shrink-0 whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium text-white/70 transition hover:bg-white/10 hover:text-white"
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
              className="glass-card hidden shrink-0 whitespace-nowrap rounded-full border border-white/20 bg-brand/40 px-4 py-1.5 text-xs font-semibold text-white shadow-sm backdrop-blur-xl transition hover:bg-brand/60 lg:inline-flex"
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
            className="absolute left-1/2 -translate-x-1/2 top-full z-50 w-full max-w-6xl animate-in slide-in-from-top-2 fade-in duration-300"
            onMouseEnter={clearCloseTimer}
            onMouseLeave={scheduleClose}
          >
            {/* Glass mega menu */}
            <div className="relative mx-4 rounded-2xl border border-[var(--glass-border)] bg-gray-800 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)] overflow-hidden backdrop-blur-md">
              <MegaPanelBody panel={activeMega.mega} linkGroupSr={nav.a11y.megaLinkGroup} />
            </div>
          </div>
        ) : null}
        </div>
      </header>
      <div aria-hidden className="pointer-events-none h-[4.5rem] shrink-0 sm:h-20" />
    </>
  );
}
