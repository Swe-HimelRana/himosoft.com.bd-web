"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";

import { ContactInfoLinks } from "@/components/ContactInfoLinks";
import { CONTACT_MARKER } from "@/lib/chatKnowledge";
import type { Locale } from "@/lib/locale";
import type { SiteContent } from "@/types/site";

type Props = {
  locale: Locale;
  copy: SiteContent["floatingContact"];
  labels: Pick<
    SiteContent["footer"],
    "contactEmailLabel" | "contactPhoneLabel" | "contactPhoneEuLabel"
  >;
};

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  showContact?: boolean;
};

function ChatIcon() {
  return (
    <svg aria-hidden className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 0 1-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
      />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg aria-hidden className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg aria-hidden className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
    </svg>
  );
}

function parseAssistantContent(raw: string): { content: string; showContact: boolean } {
  const showContact = raw.includes(CONTACT_MARKER);
  const content = raw
    .split(CONTACT_MARKER)
    .join("")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
  return { content, showContact };
}

async function readOpenRouterStream(
  body: ReadableStream<Uint8Array>,
  onDelta: (chunk: string) => void,
) {
  const reader = body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });

    const lines = buffer.split("\n");
    buffer = lines.pop() ?? "";

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith(":")) continue;
      if (!trimmed.startsWith("data:")) continue;
      const payload = trimmed.slice(5).trim();
      if (payload === "[DONE]") return;

      try {
        const json = JSON.parse(payload) as {
          choices?: { delta?: { content?: string } }[];
          error?: { message?: string };
        };
        if (json.error?.message) {
          throw new Error(json.error.message);
        }
        const delta = json.choices?.[0]?.delta?.content;
        if (delta) onDelta(delta);
      } catch (error) {
        if (error instanceof SyntaxError) continue;
        throw error;
      }
    }
  }
}

export function LiveChatWidget({ locale, copy, labels }: Props) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content: copy.welcomeMessage,
    },
  ]);
  const panelId = useId();
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, close]);

  useEffect(() => {
    if (!open) return;
    const node = listRef.current;
    if (!node) return;
    node.scrollTop = node.scrollHeight;
  }, [messages, open, pending]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const send = async () => {
    const text = input.trim();
    if (!text || pending) return;

    setError(null);
    setInput("");
    const userMessage: ChatMessage = {
      id: `u-${Date.now()}`,
      role: "user",
      content: text,
    };

    // Keep the welcome bubble in the UI; only send real turns to the API.
    const apiMessages = [...messages, userMessage]
      .filter((m) => m.id !== "welcome")
      .map(({ role, content }) => ({ role, content }));

    const assistantId = `a-${Date.now()}`;
    setMessages((prev) => [
      ...prev,
      userMessage,
      { id: assistantId, role: "assistant", content: "" },
    ]);
    setPending(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          locale,
          messages: apiMessages,
        }),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error || copy.errorLabel);
      }

      if (!response.body) {
        throw new Error(copy.errorLabel);
      }

      let raw = "";
      await readOpenRouterStream(response.body, (delta) => {
        raw += delta;
        const parsed = parseAssistantContent(raw);
        setMessages((prev) =>
          prev.map((message) =>
            message.id === assistantId
              ? {
                  ...message,
                  content: parsed.content,
                  showContact: parsed.showContact,
                }
              : message,
          ),
        );
      });

      const parsed = parseAssistantContent(raw);
      if (!parsed.content.trim() && !parsed.showContact) {
        setMessages((prev) =>
          prev.map((message) =>
            message.id === assistantId
              ? { ...message, content: copy.errorLabel }
              : message,
          ),
        );
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : copy.errorLabel;
      setError(message);
      setMessages((prev) =>
        prev.map((item) =>
          item.id === assistantId
            ? { ...item, content: message }
            : item,
        ),
      );
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="pointer-events-none fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))] z-[101] flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      <div
        id={panelId}
        role="dialog"
        aria-modal="false"
        aria-hidden={!open}
        aria-label={copy.chatTitle}
        className={`pointer-events-auto w-[min(100vw-2rem,24rem)] origin-bottom-right transition-all duration-300 ease-out ${
          open
            ? "translate-y-0 scale-100 opacity-100"
            : "pointer-events-none translate-y-3 scale-95 opacity-0"
        }`}
      >
        <div className="glass-card flex h-[min(70dvh,32rem)] flex-col overflow-hidden rounded-2xl border border-foreground/10 shadow-[0_16px_48px_-12px_rgba(0,0,0,0.4)] backdrop-blur-xl">
          <header className="flex shrink-0 items-center gap-3 border-b border-foreground/10 bg-foreground/5 px-4 py-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand text-sm font-bold text-white">
              H
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-foreground">{copy.chatTitle}</p>
              <p className="flex items-center gap-1.5 text-xs text-foreground/60">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden />
                {copy.onlineLabel}
              </p>
            </div>
            <button
              type="button"
              onClick={close}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-foreground/60 transition hover:bg-foreground/10 hover:text-foreground"
              aria-label={copy.closeLabel}
            >
              <ChevronDownIcon />
            </button>
          </header>

          <div
            ref={listRef}
            className="min-h-0 flex-1 space-y-3 overflow-y-auto overscroll-contain bg-foreground/5 px-3 py-4"
          >
            <p className="px-1 text-[11px] leading-relaxed text-foreground/50">{copy.chatSubtitle}</p>

            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className="max-w-[92%] space-y-2">
                  {message.content ? (
                    <div
                      className={`rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed shadow-sm whitespace-pre-wrap ${
                        message.role === "user"
                          ? "rounded-tr-md bg-brand text-white"
                          : "glass-card rounded-tl-md text-foreground"
                      }`}
                    >
                      {message.content}
                    </div>
                  ) : null}

                  {message.showContact ? (
                    <div className="space-y-2">
                      <p className="px-1 text-xs text-foreground/55">{copy.contactHint}</p>
                      <ContactInfoLinks
                        labels={{
                          emailLabel: labels.contactEmailLabel,
                          phoneLabel: labels.contactPhoneLabel,
                          phoneEuLabel: labels.contactPhoneEuLabel,
                        }}
                        loadingLabel={copy.loadingLabel}
                        variant="chat"
                      />
                    </div>
                  ) : null}
                </div>
              </div>
            ))}

            {pending ? (
              <p className="px-1 text-xs text-foreground/45">{copy.typingLabel}</p>
            ) : null}
            {error && !pending ? (
              <p className="px-1 text-xs text-red-500/90">{error}</p>
            ) : null}
          </div>

          <form
            className="shrink-0 border-t border-foreground/10 bg-foreground/5 p-3"
            onSubmit={(event) => {
              event.preventDefault();
              void send();
            }}
          >
            <div className="flex items-end gap-2">
              <textarea
                ref={inputRef}
                rows={1}
                value={input}
                disabled={pending}
                placeholder={copy.placeholder}
                suppressHydrationWarning
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    void send();
                  }
                }}
                className="max-h-28 min-h-[2.5rem] flex-1 resize-none rounded-xl border border-foreground/10 bg-background/80 px-3 py-2 text-sm text-foreground outline-none transition placeholder:text-foreground/40 focus:border-brand/40 disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={pending || !input.trim()}
                aria-label={copy.sendLabel}
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand text-white transition hover:bg-brand/90 disabled:opacity-50"
              >
                <SendIcon />
              </button>
            </div>
          </form>
        </div>
      </div>

      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((prev) => !prev)}
        className="pointer-events-auto inline-flex items-center gap-2 rounded-full bg-brand px-4 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_-6px_rgba(102,126,234,0.4)] transition hover:bg-brand/90 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
      >
        <ChatIcon />
        <span>{copy.buttonLabel}</span>
      </button>
    </div>
  );
}
