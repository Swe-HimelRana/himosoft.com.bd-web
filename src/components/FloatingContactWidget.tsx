"use client";

import { useCallback, useEffect, useId, useState } from "react";

import { ContactInfoLinks } from "@/components/ContactInfoLinks";
import type { SiteContent } from "@/types/site";

type Props = {
  copy: SiteContent["floatingContact"];
  labels: Pick<
    SiteContent["footer"],
    "contactEmailLabel" | "contactPhoneLabel" | "contactMobileLabel"
  >;
};

function ChatIcon() {
  return (
    <svg aria-hidden className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 0 1-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
      />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg aria-hidden className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

export function FloatingContactWidget({ copy, labels }: Props) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, close]);

  return (
    <div
      className="pointer-events-none fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))] z-[101] flex flex-col items-end gap-3 sm:bottom-6 sm:right-6"
    >
      <div
        id={panelId}
        role="dialog"
        aria-modal="false"
        aria-hidden={!open}
        aria-label={copy.chatTitle}
        className={`pointer-events-auto w-[min(100vw-2rem,22rem)] origin-bottom-right transition-all duration-300 ease-out ${
          open
            ? "translate-y-0 scale-100 opacity-100"
            : "pointer-events-none translate-y-3 scale-95 opacity-0"
        }`}
      >
        <div className="flex max-h-[min(70dvh,28rem)] flex-col overflow-hidden rounded-2xl border border-black/[0.08] bg-white shadow-[0_16px_48px_-12px_rgba(15,23,42,0.35)] ring-1 ring-black/[0.06]">
          <header className="flex shrink-0 items-center gap-3 border-b border-black/[0.06] bg-gradient-to-r from-brand/10 to-brand/5 px-4 py-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand text-sm font-bold text-white">
              H
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-foreground">{copy.chatTitle}</p>
              <p className="flex items-center gap-1.5 text-xs text-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden />
                {copy.onlineLabel}
              </p>
            </div>
            <button
              type="button"
              onClick={close}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-muted transition hover:bg-black/[0.06] hover:text-foreground"
              aria-label={copy.closeLabel}
            >
              <ChevronDownIcon />
            </button>
          </header>

          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain bg-[#f4f6f8] px-3 py-4">
            <div className="space-y-3">
              <div className="flex justify-start">
                <div className="max-w-[92%] rounded-2xl rounded-tl-md bg-white px-3.5 py-2.5 text-sm leading-relaxed text-foreground shadow-sm ring-1 ring-black/[0.04]">
                  {copy.welcomeMessage}
                </div>
              </div>
              <div className="flex justify-start">
                <div className="max-w-[92%] rounded-2xl rounded-tl-md bg-white px-3.5 py-2.5 text-xs leading-relaxed text-muted shadow-sm ring-1 ring-black/[0.04]">
                  {copy.chatSubtitle}
                </div>
              </div>
              <div className="flex justify-start">
                <div className="w-full max-w-[92%]">
                  <ContactInfoLinks
                    labels={labels}
                    loadingLabel={copy.loadingLabel}
                    variant="chat"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((prev) => !prev)}
        className="pointer-events-auto inline-flex items-center gap-2 rounded-full bg-brand px-4 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_-6px_rgba(15,23,42,0.45)] transition hover:bg-brand-deep hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
      >
        <ChatIcon />
        <span>{copy.buttonLabel}</span>
      </button>
    </div>
  );
}
