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
      className="max-w-[11rem] cursor-pointer truncate rounded-full border border-white/20 bg-white/10 px-2.5 py-1.5 text-[11px] font-medium tracking-wide text-white shadow-sm backdrop-blur-md transition hover:border-white/30 hover:bg-white/15 disabled:opacity-60 lg:max-w-[12rem]"
    >
      {SITE_LOCALES.map((row) => (
        <option key={row.code} value={row.code} className="bg-[var(--background)] text-white">
          {`${row.flag} ${row.nativeLabel}`}
        </option>
      ))}
    </select>
  );
}
