"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";

export type ProductDeploymentModalCopy = {
  title: string;
  subtitle: string;
  closeLabel: string;
  statusDone: string;
  statusOngoing: string;
  steps: {
    planning: string;
    requirementAnalysis: string;
    development: string;
    testing: string;
    deployment: string;
  };
};

type StepKey = keyof ProductDeploymentModalCopy["steps"];

const STEP_KEYS: StepKey[] = [
  "planning",
  "requirementAnalysis",
  "development",
  "testing",
  "deployment",
];

type Props = {
  open: boolean;
  onClose: () => void;
  productName: string;
  variant: "brand" | "emerald";
  copy: ProductDeploymentModalCopy;
};

export function ProductDeploymentModal({ open, onClose, productName, variant, copy }: Props) {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const [visibleCount, setVisibleCount] = useState(0);
  const [progressWidth, setProgressWidth] = useState(0);

  const accent =
    variant === "brand"
      ? {
          eyebrow: "text-brand",
          ring: "ring-brand/40",
          dot: "bg-brand shadow-[0_0_12px_rgba(102,126,234,0.6)]",
          bar: "from-brand to-purple-500",
          ongoing: "border-brand/40 bg-brand/10 text-brand",
          line: "from-brand/60",
        }
      : {
          eyebrow: "text-emerald-400",
          ring: "ring-emerald-500/40",
          dot: "bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.6)]",
          bar: "from-emerald-500 to-teal-400",
          ongoing: "border-emerald-500/40 bg-emerald-500/10 text-emerald-400",
          line: "from-emerald-500/60",
        };

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (!open) {
      setVisibleCount(0);
      setProgressWidth(0);
      return;
    }

    document.addEventListener("keydown", handleKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();

    const stepTimers = STEP_KEYS.map((_, index) =>
      window.setTimeout(() => setVisibleCount(index + 1), 180 + index * 220),
    );

    const progressTimer = window.setTimeout(() => setProgressWidth(80), 200);
    const progressPulse = window.setInterval(() => {
      setProgressWidth((current) => (current >= 88 ? 80 : current + 0.4));
    }, 50);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = prevOverflow;
      stepTimers.forEach(clearTimeout);
      clearTimeout(progressTimer);
      clearInterval(progressPulse);
    };
  }, [open, handleKeyDown]);

  if (!open) return null;

  const subtitle = copy.subtitle.replace("{productName}", productName);

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6">
      <button
        type="button"
        aria-label={copy.closeLabel}
        className="product-modal-backdrop absolute inset-0 bg-black/65 backdrop-blur-sm"
        onClick={onClose}
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className="product-modal-panel glass-card relative w-full max-w-lg overflow-hidden rounded-3xl border border-foreground/10 shadow-[0_24px_80px_-24px_rgba(0,0,0,0.55)] backdrop-blur-xl outline-none"
      >
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-brand/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-emerald-500/15 blur-3xl" />

        <div className="relative px-6 pb-2 pt-6 sm:px-8 sm:pt-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className={`text-xs font-semibold uppercase tracking-[0.18em] ${accent.eyebrow}`}>
                {copy.title}
              </p>
              <h2 id={titleId} className="mt-2 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                {productName}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-foreground/60">{subtitle}</p>
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

          <div className="mt-6">
            <div className="h-1.5 overflow-hidden rounded-full bg-foreground/10">
              <div
                className={`product-modal-progress h-full rounded-full bg-gradient-to-r ${accent.bar} transition-[width] duration-700 ease-out`}
                style={{ width: `${progressWidth}%` }}
              />
            </div>
            <p className="mt-2 text-right text-xs tabular-nums text-foreground/45">{Math.round(progressWidth)}%</p>
          </div>
        </div>

        <div className="relative px-6 pb-6 sm:px-8 sm:pb-8">
          <ol className="space-y-0">
            {STEP_KEYS.map((key, index) => {
              const isDone = index < 4;
              const isOngoing = index === 4;
              const isVisible = visibleCount > index;
              const isLast = index === STEP_KEYS.length - 1;

              return (
                <li
                  key={key}
                  className={`product-step-row relative flex gap-4 ${isVisible ? "product-step-visible" : "opacity-0"}`}
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  {!isLast && (
                    <span
                      className={`product-step-line absolute left-[15px] top-9 h-[calc(100%-4px)] w-px bg-gradient-to-b ${accent.line} to-transparent`}
                      aria-hidden
                    />
                  )}

                  <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center">
                    {isDone ? (
                      <span
                        className={`flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/20 ring-2 ${accent.ring} ${isVisible ? "product-step-check-pop" : ""}`}
                      >
                        <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden>
                          <path
                            d="M3.5 8.5l2.5 2.5 6.5-6.5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.75"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className={`text-emerald-400 ${isVisible ? "product-step-check-draw" : ""}`}
                          />
                        </svg>
                      </span>
                    ) : (
                      <span
                        className={`relative flex h-8 w-8 items-center justify-center rounded-full border ${accent.ongoing} ${isVisible ? "product-step-ongoing-pulse" : ""}`}
                      >
                        <span className={`h-2.5 w-2.5 rounded-full ${accent.dot}`} />
                      </span>
                    )}
                  </div>

                  <div className={`min-w-0 flex-1 ${isLast ? "pb-0" : "pb-6"}`}>
                    <div className="flex flex-wrap items-center gap-2 pt-0.5">
                      <p className="text-sm font-medium text-foreground">{copy.steps[key]}</p>
                      {isDone && isVisible && (
                        <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-400">
                          {copy.statusDone}
                        </span>
                      )}
                      {isOngoing && isVisible && (
                        <span
                          className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${accent.ongoing}`}
                        >
                          {copy.statusOngoing}
                        </span>
                      )}
                    </div>

                    {isOngoing && isVisible && (
                      <div className="mt-3 overflow-hidden rounded-full bg-foreground/10">
                        <div
                          className={`product-step-deploy-bar h-1 rounded-full bg-gradient-to-r ${accent.bar}`}
                        />
                      </div>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </div>
  );
}
