import { NextResponse } from "next/server";

import { buildChatSystemPrompt } from "@/lib/chatKnowledge";
import { isLocale, type Locale } from "@/lib/locale";
import { getSiteContent } from "@/lib/siteContent";

export const runtime = "nodejs";

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
const MAX_MESSAGES = 16;
const MAX_MESSAGE_CHARS = 2000;

type ChatRole = "user" | "assistant";

type IncomingMessage = {
  role: ChatRole;
  content: string;
};

function cleanMessages(raw: unknown): IncomingMessage[] | null {
  if (!Array.isArray(raw)) return null;
  const messages: IncomingMessage[] = [];

  for (const item of raw.slice(-MAX_MESSAGES)) {
    if (!item || typeof item !== "object") return null;
    const role = (item as { role?: unknown }).role;
    const content = (item as { content?: unknown }).content;
    if (role !== "user" && role !== "assistant") return null;
    if (typeof content !== "string") return null;
    const trimmed = content.trim().slice(0, MAX_MESSAGE_CHARS);
    if (!trimmed) continue;
    messages.push({ role, content: trimmed });
  }

  if (messages.length === 0) return null;
  if (messages[messages.length - 1]?.role !== "user") return null;
  return messages;
}

export async function POST(request: Request) {
  const apiKey = process.env.OPENROUTER_API_KEY?.trim();
  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          "Live chat is not configured yet. Add OPENROUTER_API_KEY to the server environment.",
      },
      { status: 503 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const localeValue =
    body && typeof body === "object" && "locale" in body
      ? String((body as { locale?: unknown }).locale ?? "en")
      : "en";
  const locale: Locale = isLocale(localeValue) ? localeValue : "en";
  const messages = cleanMessages(
    body && typeof body === "object" && "messages" in body
      ? (body as { messages?: unknown }).messages
      : null,
  );

  if (!messages) {
    return NextResponse.json({ error: "Invalid chat messages." }, { status: 400 });
  }

  const site = await getSiteContent(locale);
  const model =
    process.env.OPENROUTER_MODEL?.trim() || "openai/gpt-4o-mini";
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://himosoft.com.bd";

  const upstream = await fetch(OPENROUTER_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": siteUrl,
      "X-Title": "HimoSoft Live Chat",
    },
    body: JSON.stringify({
      model,
      stream: true,
      temperature: 0.5,
      max_tokens: 700,
      messages: [
        { role: "system", content: buildChatSystemPrompt(site, locale) },
        ...messages,
      ],
    }),
  });

  if (!upstream.ok || !upstream.body) {
    const detail = await upstream.text().catch(() => "");
    console.error("OpenRouter error", upstream.status, detail.slice(0, 500));
    return NextResponse.json(
      { error: "The assistant is temporarily unavailable. Please try again shortly." },
      { status: 502 },
    );
  }

  return new Response(upstream.body, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
