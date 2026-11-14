/**
 * Encode email/phone for obfuscatedContact.ts
 * Run: node scripts/encode-contact.cjs [email] [phone] [phoneEu]
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
const phone = process.argv[3] ?? "+8801316100897";
const phoneEu = process.argv[4] ?? "+40774842849";

console.log(
  JSON.stringify(
    { email: encode(email), phone: encode(phone), phoneEu: encode(phoneEu) },
    null,
    2,
  ),
);
