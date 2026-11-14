"use client";

import Link from "next/link";
import { useState } from "react";

import {
  ContactDetailsModal,
  type ContactModalCopy,
} from "@/components/ContactDetailsModal";
import { externalNavLinkProps } from "@/lib/navLink";
import type { MarketingPageContent } from "@/types/marketingPage";

type ContactLabels = {
  emailLabel: string;
  phoneLabel: string;
  phoneEuLabel: string;
};

type Props = {
  cta: NonNullable<MarketingPageContent["cta"]>;
  /** On /contact, open a modal instead of navigating to the same page. */
  openContactModal?: boolean;
  contactModal?: ContactModalCopy;
  contactLabels: ContactLabels;
};

const defaultModalCopy: ContactModalCopy = {
  title: "Get in touch",
  description: "Email or call us — we typically reply within one business day.",
  closeLabel: "Close",
};

const buttonClass =
  "mt-6 inline-flex rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand/90";

export function MarketingPageCta({
  cta,
  openContactModal = false,
  contactModal = defaultModalCopy,
  contactLabels,
}: Props) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <aside className="glass-card mt-12 rounded-3xl border border-foreground/10 p-8">
      <h2 className="text-xl font-semibold text-foreground">{cta.title}</h2>
      <p className="mt-3 text-foreground/60">{cta.subtitle}</p>

      {openContactModal ? (
        <>
          <button type="button" className={buttonClass} onClick={() => setModalOpen(true)}>
            {cta.label}
          </button>
          <ContactDetailsModal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            copy={contactModal}
            labels={contactLabels}
          />
        </>
      ) : (
        <Link href={cta.href} {...externalNavLinkProps(cta.href)} className={buttonClass}>
          {cta.label}
        </Link>
      )}
    </aside>
  );
}
