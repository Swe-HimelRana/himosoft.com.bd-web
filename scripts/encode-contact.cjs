/**
 * Encode email/phones for obfuscatedContact.ts
 * Run: node scripts/encode-contact.cjs
 */
const CIPHER_KEY = 0x5a;

function encode(plain) {
  const xored = [...plain]
    .map((char, index) =>
      String.fromCharCode(char.charCodeAt(0) ^ CIPHER_KEY ^ (index % 17)),
    )
    .join("");
  return Buffer.from(xored, "latin1").toString("base64");
}

const email = process.argv[2] ?? "hello@himosoft.com.bd";
const phone1 = process.argv[3] ?? "+8809644342003";
const phone2 = process.argv[4] ?? "+8809658231357";

console.log(
  JSON.stringify(
    { email: encode(email), phones: [encode(phone1), encode(phone2)] },
    null,
    2,
  ),
);
