import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  tone?: "light" | "dark";
};

export function SectionEyebrow({ children, tone = "dark" }: Props) {
  const cls =
    tone === "light"
      ? "text-sky-200/90"
      : "text-brand tracking-[0.22em] uppercase";

  return (
    <p className={`text-xs font-semibold ${cls}`}>{children}</p>
  );
}
