import { cookies } from "next/headers";

import {
  DEFAULT_LOCALE,
  LOCALE_COOKIE,
  type Locale,
  isLocale,
} from "@/lib/locale";

export async function getLocale(): Promise<Locale> {
  const jar = await cookies();
  const raw = jar.get(LOCALE_COOKIE)?.value;
  if (raw && isLocale(raw)) return raw;
  return DEFAULT_LOCALE;
}
