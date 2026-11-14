import type { SiteContent } from "@/types/site";

export const CONTACT_MARKER = "[[SHOW_CONTACT]]";

/** Compact company knowledge injected into the chat system prompt. */
export function buildChatKnowledge(site: SiteContent): string {
  const services = site.services.items
    .map((item) => `- ${item.title}: ${item.description}`)
    .join("\n");

  const domains = site.domains.items
    .map((item) => `- ${item.title}: ${item.description}`)
    .join("\n");

  const faq = site.faq.items
    .map((item) => `Q: ${item.question}\nA: ${item.answer}`)
    .join("\n\n");

  const products = [
    site.newProducts.playProtect,
    site.newProducts.mikrotikConnect,
    site.newProducts.linuxMirror,
  ]
    .map(
      (product) =>
        `- ${product.name} (${product.category}, ${product.status}): ${product.description}${product.href ? ` — ${product.href}` : ""}`,
    )
    .join("\n");

  const presence = site.webPresence.items
    .map((item) => `- ${item.host} (${item.region}): ${item.description}`)
    .join("\n");

  return [
    "COMPANY: HimoSoft — software development studio founded in 2020 (Dhaka, Bangladesh; European presence).",
    `TAGLINE: ${site.footer.tagline}`,
    `ABOUT:\n${site.about.paragraphs.join("\n")}`,
    `SERVICES:\n${services}`,
    `INDUSTRY DOMAINS:\n${domains}`,
    `PRODUCTS:\n${products}`,
    `WEB PRESENCE:\n${presence}`,
    `FAQ:\n${faq}`,
    "ENGAGEMENT: Discovery → roadmap → design/engineering squad → iterative releases with QA. Post-launch support available.",
    "PAYMENTS EXPERIENCE: Stripe, bKash, Easy Payment Gateway, NOWPayments, and similar integrations.",
  ].join("\n\n");
}

export function buildChatSystemPrompt(site: SiteContent, locale: string): string {
  const knowledge = buildChatKnowledge(site);

  return `You are a friendly HimoSoft teammate in a live website chat — not a generic AI assistant.
Speak as “we/our team” so visitors feel they are talking with HimoSoft.
Be warm, concise, and professional. Prefer short paragraphs and light bullet lists.
Reply in the visitor’s language when possible. Site locale hint: ${locale}.

STRICT SCOPE:
- Only discuss HimoSoft: services, products, delivery process, domains/industries we serve, collaboration, pricing process (high level — we estimate after discovery), and how to get in touch.
- If asked about unrelated topics (politics, homework, other companies’ secrets, general trivia, medical/legal advice, etc.), politely decline and steer back to how HimoSoft can help digitally.
- Do not invent clients, case studies, prices, SLAs, or capabilities that are not in the knowledge below.
- Do not claim you are a human; if asked, say you are HimoSoft’s website assistant and can connect them with the team.

HUMAN / CUSTOMER SERVICE:
- Do NOT show contact details by default.
- Only when the visitor clearly needs a human (sales call, quote follow-up, support, “talk to someone”, “customer service”, “email me”, “call me”, or similar), include the exact token ${CONTACT_MARKER} on its own line once, and briefly say they can use the contact options shown.
- Do not invent email or phone numbers yourself — the UI will show the official contacts only after ${CONTACT_MARKER}.

KNOWLEDGE BASE:
${knowledge}`;
}
