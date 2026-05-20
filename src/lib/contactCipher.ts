/** XOR key — must match scripts/encode-contact.cjs */
const CIPHER_KEY = 0x5a;

/**
 * Decodes contact payloads (client-only).
 * Payloads use XOR + Base64 — not plain text in HTML or view-source.
 */
export function decodeContactPayload(encoded: string): string {
  if (typeof window === "undefined") return "";
  try {
    const binary = atob(encoded);
    return Array.from(binary, (char, index) =>
      String.fromCharCode(char.charCodeAt(0) ^ CIPHER_KEY ^ (index % 17)),
    ).join("");
  } catch {
    return "";
  }
}
