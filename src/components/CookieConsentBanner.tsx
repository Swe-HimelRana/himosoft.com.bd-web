"use client";

import Link from "next/link";
import { useState, useSyncExternalStore, useTransition } from "react";

import { setCookieConsent } from "@/app/actions/setCookieConsent";
import { readConsentCookie, type CookieConsentValue } from "@/lib/cookieConsent";
import type { SiteContent } from "@/types/site";

type Props = {
  copy: SiteContent["cookieConsent"];
};

function CookieIcon() {
  return (
    <svg
      aria-hidden
      className="h-5 w-5 text-brand"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 2c-1.5 3-4 3.5-4 7a4 4 0 0 0 8 0c0-3.5-2.5-4-4-7z"
      />
      <circle cx="8.5" cy="11" r="1" fill="currentColor" stroke="none" />
      <circle cx="12" cy="14" r="1" fill="currentColor" stroke="none" />
      <circle cx="15.5" cy="10" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function needsConsentChoice(): boolean {
  return readConsentCookie() === null;
}

export function CookieConsentBanner({ copy }: Props) {
  const [settled, setSettled] = useState(false);
  const [pending, startTransition] = useTransition();
  const showBanner = useSyncExternalStore(
    () => () => {},
    needsConsentChoice,
    () => false,
  );

  const respond = (value: CookieConsentValue) => {
    startTransition(async () => {
      await setCookieConsent(value);
      setSettled(true);
    });
  };

  if (!showBanner || settled) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[100] flex justify-center px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2 sm:px-4 sm:pb-[max(1rem,env(safe-area-inset-bottom))]">
      <section
        role="region"
        aria-labelledby="cookie-consent-title"
        className="cookie-consent-panel pointer-events-auto w-full max-w-xl overflow-hidden rounded-xl border border-black/[0.08] bg-white/95 shadow-[0_-4px_24px_-8px_rgba(15,23,42,0.28)] ring-1 ring-black/[0.06] backdrop-blur-md"
      >
        <div className="flex flex-col gap-3 p-3.5 sm:flex-row sm:items-center sm:gap-4 sm:p-4">
          <div className="flex min-w-0 flex-1 items-start gap-2.5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand/10 ring-1 ring-brand/20">
              <CookieIcon />
            </div>
            <div className="min-w-0 flex-1">
              <h2
                id="cookie-consent-title"
                className="text-sm font-semibold tracking-tight text-foreground"
              >
                {copy.title}
              </h2>
              <p className="mt-0.5 text-xs leading-snug text-muted">{copy.description}</p>
            </div>
          </div>

          <div className="flex shrink-0 flex-row gap-2 sm:flex-col sm:gap-1.5 lg:flex-row">
            <button
              type="button"
              disabled={pending}
              onClick={() => respond("rejected")}
              className="inline-flex flex-1 items-center justify-center rounded-full border border-black/[0.12] bg-white px-3.5 py-2 text-xs font-semibold text-foreground transition hover:bg-zinc-50 disabled:opacity-60 sm:flex-none sm:px-4"
            >
              {copy.rejectLabel}
            </button>
            <button
              type="button"
              disabled={pending}
              onClick={() => respond("accepted")}
              className="inline-flex flex-1 items-center justify-center rounded-full bg-gradient-to-r from-[var(--hero-cyan)] to-[var(--hero-green)] px-3.5 py-2 text-xs font-semibold text-[#041012] shadow-[0_4px_14px_-6px_rgba(38,198,218,0.45)] transition hover:brightness-105 disabled:opacity-60 sm:flex-none sm:px-4"
            >
              {copy.acceptLabel}
            </button>
          </div>
        </div>

        <details className="group border-t border-black/[0.06]">
          <summary className="cursor-pointer list-none px-3.5 py-2 text-xs font-semibold text-brand-deep transition hover:text-brand sm:px-4 [&::-webkit-details-marker]:hidden">
            <span className="inline-flex items-center gap-1">
              {copy.detailsLabel}
              <span
                aria-hidden
                className="inline-block transition group-open:rotate-180"
              >
                ▾
              </span>
            </span>
          </summary>
          <div className="max-h-[40dvh] overflow-y-auto overscroll-contain border-t border-black/[0.04] bg-background/50 px-3.5 py-2.5 sm:px-4">
            <ul className="space-y-2">
              {copy.categories.map((category) => (
                <li key={category.title}>
                  <p className="text-xs font-semibold text-foreground">{category.title}</p>
                  <p className="mt-0.5 text-[0.6875rem] leading-relaxed text-muted">
                    {category.description}
                  </p>
                </li>
              ))}
            </ul>
            <div className="mt-2.5 space-y-1 text-[0.6875rem] leading-relaxed text-muted">
              <p>{copy.necessaryNote}</p>
              <p>{copy.rightsNote}</p>
              <p>{copy.retentionNote}</p>
            </div>
            <Link
              href="/cookies"
              className="mt-2 inline-block text-xs font-semibold text-brand-deep hover:text-brand hover:underline"
            >
              {copy.privacyLinkLabel}
            </Link>
          </div>
        </details>
      </section>
    </div>
  );
}
