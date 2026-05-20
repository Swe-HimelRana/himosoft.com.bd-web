"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";

import { setLocale } from "@/app/actions/setLocale";
import type { Locale } from "@/lib/locale";
import { SITE_LOCALES } from "@/lib/locale-options";

type Props = {
  locale: Locale;
};

export function LanguageSwitcher({ locale }: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  return (
    <select
      aria-label="Site language"
      disabled={pending}
      value={locale}
      onChange={(event) => {
        const next = event.target.value as Locale;
        startTransition(async () => {
          await setLocale(next);
          router.refresh();
        });
      }}
      className="max-w-[11rem] cursor-pointer truncate rounded-full border border-[var(--nav-border)] bg-white/70 px-2.5 py-1.5 text-[11px] font-medium tracking-wide text-zinc-700 shadow-sm transition hover:border-brand/35 hover:bg-white disabled:opacity-60 lg:max-w-[12rem]"
    >
      {SITE_LOCALES.map((row) => (
        <option key={row.code} value={row.code}>
          {`${row.flag} ${row.nativeLabel}`}
        </option>
      ))}
    </select>
  );
}
