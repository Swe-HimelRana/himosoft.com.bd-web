"use server";

import { cookies } from "next/headers";

import {
  CONSENT_COOKIE,
  type CookieConsentValue,
  isCookieConsentValue,
} from "@/lib/cookieConsent";

export async function setCookieConsent(value: CookieConsentValue): Promise<void> {
  if (!isCookieConsentValue(value)) return;

  const jar = await cookies();
  jar.set(CONSENT_COOKIE, value, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
}
