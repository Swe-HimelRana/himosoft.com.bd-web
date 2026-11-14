"use client";

import { useSyncExternalStore } from "react";

import {
  applyTheme,
  DEFAULT_THEME,
  isTheme,
  THEME_STORAGE_KEY,
  type Theme,
} from "@/lib/theme";

function subscribe(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener("himosoft-theme", onStoreChange);
  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener("himosoft-theme", onStoreChange);
  };
}

function readTheme(): Theme {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (isTheme(stored)) return stored;
  } catch {
    /* ignore */
  }
  return DEFAULT_THEME;
}

function getServerTheme(): Theme {
  return DEFAULT_THEME;
}

export function ThemeSwitcher() {
  const theme = useSyncExternalStore(subscribe, readTheme, getServerTheme);
  const next: Theme = theme === "light" ? "green" : "light";

  return (
    <button
      type="button"
      aria-label={theme === "light" ? "Switch to green theme" : "Switch to light theme"}
      title={theme === "light" ? "Green theme" : "Light theme"}
      className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-foreground/15 bg-foreground/5 text-foreground transition hover:border-foreground/25 hover:bg-foreground/10"
      onClick={() => {
        applyTheme(next);
        try {
          localStorage.setItem(THEME_STORAGE_KEY, next);
        } catch {
          /* ignore */
        }
        window.dispatchEvent(new Event("himosoft-theme"));
      }}
    >
      {theme === "light" ? (
        <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.75">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3v1.5M12 19.5V21M4.5 12H3M21 12h-1.5M6.34 6.34 5.28 5.28M18.72 18.72l-1.06-1.06M6.34 17.66l-1.06 1.06M18.72 5.28l-1.06 1.06"
          />
          <circle cx="12" cy="12" r="3.25" />
        </svg>
      ) : (
        <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.75">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 14.5A8.5 8.5 0 0 1 9.5 3 7 7 0 1 0 21 14.5Z"
          />
        </svg>
      )}
    </button>
  );
}
