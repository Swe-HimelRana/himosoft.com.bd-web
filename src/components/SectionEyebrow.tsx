import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  tone?: "light" | "dark";
};

export function SectionEyebrow({ children, tone = "dark" }: Props) {
  const cls =
    tone === "light"
      ? "text-foreground/50"
      : "text-brand tracking-[0.22em] uppercase";

  return (
    <p className={`text-xs font-semibold ${cls}`}>{children}</p>
  );
}
