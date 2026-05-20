"use client";

import { useRevealedContact } from "@/hooks/useRevealedContact";

export type ContactLabels = {
  emailLabel: string;
  phoneLabel: string;
  mobileLabel: string;
};

type Props = {
  labels: ContactLabels;
  loadingLabel: string;
  variant?: "cards" | "chat";
};

function MailIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden className={className ?? "h-4 w-4"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 0 0 2.22 0L21 8M5 19h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z" />
    </svg>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden className={className ?? "h-4 w-4"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"
      />
    </svg>
  );
}

export function ContactInfoLinks({ labels, loadingLabel, variant = "cards" }: Props) {
  const revealed = useRevealedContact();

  if (!revealed) {
    return (
      <p className="rounded-xl bg-white/80 px-3 py-4 text-center text-sm text-muted">{loadingLabel}</p>
    );
  }

  const items = [
    { key: "email", label: labels.emailLabel, value: revealed.email, href: `mailto:${revealed.email}`, Icon: MailIcon },
    { key: "phone", label: labels.phoneLabel, value: revealed.phones[0], href: `tel:${revealed.phones[0]}`, Icon: PhoneIcon },
    { key: "mobile", label: labels.mobileLabel, value: revealed.phones[1], href: `tel:${revealed.phones[1]}`, Icon: PhoneIcon },
  ] as const;

  if (variant === "chat") {
    return (
      <div className="space-y-2">
        {items.map(({ key, label, value, href, Icon }) => (
          <a
            key={key}
            href={href}
            className="flex items-center gap-3 rounded-2xl rounded-tl-md border border-black/[0.06] bg-white px-3 py-2.5 text-sm shadow-sm transition hover:border-brand/25 hover:bg-brand/[0.03]"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-brand-deep">
              <Icon />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[0.65rem] font-semibold uppercase tracking-wide text-muted">{label}</span>
              <span className="block truncate font-semibold text-foreground">{value}</span>
            </span>
          </a>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {items.map(({ key, label, value, href, Icon }) => (
        <a
          key={key}
          href={href}
          className="group flex items-center gap-4 rounded-2xl border border-black/[0.06] bg-background p-4 transition hover:border-brand/25 hover:bg-brand/[0.04] hover:shadow-sm"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand/10 text-brand-deep ring-1 ring-brand/20">
            <Icon className="h-5 w-5" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-xs font-semibold uppercase tracking-wide text-muted">{label}</span>
            <span className="mt-0.5 block truncate text-base font-semibold text-foreground group-hover:text-brand-deep">
              {value}
            </span>
          </span>
        </a>
      ))}
    </div>
  );
}
