"use client";

import { useRevealedContact } from "@/hooks/useRevealedContact";

type Props = {
  emailLabel: string;
  phoneLabel: string;
  mobileLabel: string;
};

const linkClass =
  "text-left text-sm font-semibold text-white/85 transition hover:text-white";

export function ProtectedContactLinks({ emailLabel, phoneLabel, mobileLabel }: Props) {
  const revealed = useRevealedContact();

  if (!revealed) {
    return (
      <>
        <li>
          <span className="text-sm text-white/40" aria-hidden>
            ••••••••
          </span>
          <span className="sr-only">{emailLabel}</span>
        </li>
        <li>
          <span className="text-sm text-white/40" aria-hidden>
            ••••••••
          </span>
        </li>
        <li>
          <span className="text-sm text-white/40" aria-hidden>
            ••••••••
          </span>
        </li>
      </>
    );
  }

  const openMail = () => {
    window.location.href = `mailto:${revealed.email}`;
  };

  const call = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  return (
    <>
      <li>
        <button type="button" onClick={openMail} className={linkClass}>
          {emailLabel}: {revealed.email}
        </button>
      </li>
      <li>
        <button type="button" onClick={() => call(revealed.phones[0])} className={linkClass}>
          {phoneLabel}: {revealed.phones[0]}
        </button>
      </li>
      <li>
        <button type="button" onClick={() => call(revealed.phones[1])} className={linkClass}>
          {mobileLabel}: {revealed.phones[1]}
        </button>
      </li>
    </>
  );
}
