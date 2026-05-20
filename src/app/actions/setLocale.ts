"use server";

import { cookies } from "next/headers";

import {
  DEFAULT_LOCALE,
  LOCALE_COOKIE,
  type Locale,
  isLocale,
} from "@/lib/locale";

export async function setLocale(locale: string): Promise<void> {
  const next: Locale = isLocale(locale) ? locale : DEFAULT_LOCALE;
  const jar = await cookies();
  jar.set(LOCALE_COOKIE, next, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
}
