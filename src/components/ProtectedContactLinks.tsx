"use client";

import { useRevealedContact } from "@/hooks/useRevealedContact";

type Props = {
  emailLabel: string;
  phoneLabel: string;
  phoneEuLabel: string;
};

const linkClass =
  "text-left text-sm font-semibold text-foreground/85 transition hover:text-foreground";

export function ProtectedContactLinks({ emailLabel, phoneLabel, phoneEuLabel }: Props) {
  const revealed = useRevealedContact();

  if (!revealed) {
    return (
      <>
        <div>
          <span className="text-sm text-foreground/40" aria-hidden>
            ••••••••
          </span>
          <span className="sr-only">{emailLabel}</span>
        </div>
        <div>
          <span className="text-sm text-foreground/40" aria-hidden>
            ••••••••
          </span>
        </div>
        <div>
          <span className="text-sm text-foreground/40" aria-hidden>
            ••••••••
          </span>
        </div>
      </>
    );
  }

  return (
    <>
      <div>
        <button
          type="button"
          onClick={() => {
            window.location.href = `mailto:${revealed.email}`;
          }}
          className={linkClass}
        >
          {emailLabel}: {revealed.email}
        </button>
      </div>
      <div>
        <button
          type="button"
          onClick={() => {
            window.location.href = `tel:${revealed.phone}`;
          }}
          className={linkClass}
        >
          {phoneLabel}: {revealed.phone}
        </button>
      </div>
      <div>
        <button
          type="button"
          onClick={() => {
            window.location.href = `tel:${revealed.phoneEu}`;
          }}
          className={linkClass}
        >
          {phoneEuLabel}: {revealed.phoneEu}
        </button>
      </div>
    </>
  );
}
