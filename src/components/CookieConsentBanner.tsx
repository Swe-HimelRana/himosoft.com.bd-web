"use client";

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
      className="h-7 w-7 text-brand"
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
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[100] flex justify-center px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 sm:px-5 sm:pb-[max(1.25rem,env(safe-area-inset-bottom))]">
      <section
        role="region"
        aria-labelledby="cookie-consent-title"
        className="cookie-consent-panel pointer-events-auto flex max-h-[min(78dvh,calc(100dvh-1.5rem))] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-black/[0.08] bg-white/95 shadow-[0_-8px_40px_-12px_rgba(15,23,42,0.35)] ring-1 ring-black/[0.06] backdrop-blur-md"
      >
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4 sm:px-6 sm:py-5">
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand/10 ring-1 ring-brand/20">
              <CookieIcon />
            </div>
            <div className="min-w-0 flex-1">
              <h2
                id="cookie-consent-title"
                className="text-base font-semibold tracking-tight text-foreground sm:text-lg"
              >
                {copy.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">{copy.description}</p>
            </div>
          </div>

          <ul className="mt-4 space-y-2.5 border-t border-black/[0.06] pt-4 sm:space-y-3 sm:pt-5">
            {copy.categories.map((category) => (
              <li
                key={category.title}
                className="rounded-xl bg-background/80 px-3 py-2.5 ring-1 ring-black/[0.05] sm:px-4 sm:py-3"
              >
                <p className="text-sm font-semibold text-foreground">{category.title}</p>
                <p className="mt-1 text-xs leading-relaxed text-muted sm:text-sm">
                  {category.description}
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-4 space-y-2 text-xs leading-relaxed text-muted sm:text-sm">
            <p>{copy.necessaryNote}</p>
            <p>{copy.rightsNote}</p>
            <p>{copy.retentionNote}</p>
          </div>
        </div>

        <div className="shrink-0 border-t border-black/[0.08] bg-white/95 px-4 py-3 sm:px-6 sm:py-4">
          <div className="flex flex-col-reverse gap-2.5 sm:flex-row sm:justify-end sm:gap-3">
            <button
              type="button"
              disabled={pending}
              onClick={() => respond("rejected")}
              className="inline-flex items-center justify-center rounded-full border border-black/[0.12] bg-white px-5 py-2.5 text-sm font-semibold text-foreground transition hover:bg-zinc-50 disabled:opacity-60"
            >
              {copy.rejectLabel}
            </button>
            <button
              type="button"
              disabled={pending}
              onClick={() => respond("accepted")}
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[var(--hero-cyan)] to-[var(--hero-green)] px-5 py-2.5 text-sm font-semibold text-[#041012] shadow-[0_6px_20px_-8px_rgba(38,198,218,0.5)] transition hover:brightness-105 disabled:opacity-60"
            >
              {copy.acceptLabel}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
