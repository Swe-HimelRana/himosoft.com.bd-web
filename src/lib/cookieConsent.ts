export const CONSENT_COOKIE = "himosoft.cookie-consent";

export type CookieConsentValue = "accepted" | "rejected";

export function isCookieConsentValue(value: string): value is CookieConsentValue {
  return value === "accepted" || value === "rejected";
}

/** Read consent from document.cookie (client only). */
export function readConsentCookie(): CookieConsentValue | null {
  if (typeof document === "undefined") return null;
  const escaped = CONSENT_COOKIE.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = document.cookie.match(new RegExp(`(?:^|; )${escaped}=([^;]*)`));
  const raw = match?.[1] ? decodeURIComponent(match[1]) : null;
  return raw && isCookieConsentValue(raw) ? raw : null;
}
