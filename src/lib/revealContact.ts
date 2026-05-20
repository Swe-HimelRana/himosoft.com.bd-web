import { decodeContactPayload } from "@/lib/contactCipher";

/** @deprecated Use decodeContactPayload — kept for existing imports */
export function revealContact(encoded: string): string {
  return decodeContactPayload(encoded);
}
