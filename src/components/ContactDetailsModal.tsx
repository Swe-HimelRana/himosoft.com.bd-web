"use client";

import { useCallback, useEffect, useId, useRef } from "react";

import { ContactInfoLinks } from "@/components/ContactInfoLinks";

export type ContactModalCopy = {
  title: string;
  description: string;
  closeLabel: string;
};

type ContactLabels = {
  emailLabel: string;
  phoneLabel: string;
  phoneEuLabel: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
  copy: ContactModalCopy;
  labels: ContactLabels;
};

export function ContactDetailsModal({ open, onClose, copy, labels }: Props) {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (!open) return;
    document.addEventListener("keydown", handleKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, handleKeyDown]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6">
      <button
        type="button"
        aria-label={copy.closeLabel}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className="glass-card relative w-full max-w-md overflow-hidden rounded-3xl border border-foreground/10 shadow-[0_24px_80px_-24px_rgba(0,0,0,0.5)] backdrop-blur-xl outline-none"
      >
        <div className="bg-foreground/5 px-6 pb-5 pt-6 sm:px-8 sm:pt-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">HimoSoft</p>
              <h2 id={titleId} className="mt-2 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                {copy.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-foreground/60">{copy.description}</p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-foreground/10 bg-foreground/5 text-foreground/60 transition hover:border-foreground/20 hover:bg-foreground/10 hover:text-foreground"
              aria-label={copy.closeLabel}
            >
              <span aria-hidden className="text-lg leading-none">
                ×
              </span>
            </button>
          </div>
        </div>

        <div className="px-6 pb-6 sm:px-8 sm:pb-8">
          <ContactInfoLinks labels={labels} loadingLabel="Loading contact details…" variant="cards" />
        </div>
      </div>
    </div>
  );
}
