"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState, useTransition } from "react";

import { setLocale } from "@/app/actions/setLocale";
import type { Locale } from "@/lib/locale";
import { SITE_LOCALES } from "@/lib/locale-options";

type Props = {
  locale: Locale;
};

function FlagBadge({
  src,
  size = "sm",
}: {
  src: string;
  size?: "sm" | "md";
}) {
  const dim = size === "md" ? "h-5 w-5" : "h-4 w-4";
  return (
    <span
      aria-hidden
      className={`relative inline-flex ${dim} shrink-0 overflow-hidden rounded-full ring-1 ring-foreground/10 shadow-sm`}
    >
      <Image
        src={src}
        alt=""
        width={20}
        height={20}
        className="h-full w-full object-cover"
      />
    </span>
  );
}

export function LanguageSwitcher({ locale }: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();

  const current =
    SITE_LOCALES.find((row) => row.code === locale) ?? SITE_LOCALES[0];

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node | null;
      if (rootRef.current && target && !rootRef.current.contains(target)) {
        setOpen(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const choose = (next: Locale) => {
    setOpen(false);
    if (next === locale) return;
    startTransition(async () => {
      await setLocale(next);
      router.refresh();
    });
  };

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        aria-label="Site language"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        disabled={pending}
        onClick={() => setOpen((value) => !value)}
        className="inline-flex h-8 max-w-[10.5rem] items-center gap-1.5 rounded-full border border-foreground/15 bg-foreground/5 px-2.5 text-[11px] font-medium tracking-wide text-foreground shadow-sm transition hover:border-foreground/25 hover:bg-foreground/10 disabled:opacity-60 sm:max-w-[12rem]"
      >
        <FlagBadge src={current.flagSrc} />
        <span className="truncate">{current.nativeLabel}</span>
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          className={`h-3.5 w-3.5 shrink-0 opacity-60 transition ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open ? (
        <ul
          id={listId}
          role="listbox"
          aria-label="Site language"
          className="mega-menu-panel absolute right-0 z-[70] mt-2 min-w-[12.5rem] overflow-hidden rounded-2xl border border-[var(--glass-border)] py-1.5 backdrop-blur-xl"
        >
          {SITE_LOCALES.map((row) => {
            const selected = row.code === locale;
            return (
              <li key={row.code} role="option" aria-selected={selected}>
                <button
                  type="button"
                  disabled={pending}
                  onClick={() => choose(row.code)}
                  className={`flex w-full items-center gap-2.5 px-3 py-2.5 text-left text-xs font-medium transition ${
                    selected
                      ? "bg-brand/15 text-foreground"
                      : "text-foreground/80 hover:bg-foreground/5 hover:text-foreground"
                  }`}
                >
                  <FlagBadge src={row.flagSrc} size="md" />
                  <span className="flex-1 truncate">{row.nativeLabel}</span>
                  {selected ? (
                    <svg
                      aria-hidden
                      viewBox="0 0 24 24"
                      className="h-3.5 w-3.5 shrink-0 text-brand"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : null}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
