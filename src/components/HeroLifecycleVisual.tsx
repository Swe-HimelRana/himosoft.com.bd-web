"use client";

import { useEffect, useState } from "react";

const CYAN = "var(--brand)";
const GREEN = "#10b981"; // emerald-500

const STAGES = [
  {
    id: "discover",
    label: "Discover",
    short: "01",
    detail: "Requirements · stakeholders · scope",
    screen: "discover" as const,
  },
  {
    id: "design",
    label: "Design",
    short: "02",
    detail: "Architecture · UX · technical spec",
    screen: "design" as const,
  },
  {
    id: "develop",
    label: "Develop",
    short: "03",
    detail: "Sprints · APIs · integrations",
    screen: "develop" as const,
  },
  {
    id: "test",
    label: "Test",
    short: "04",
    detail: "QA · security · performance",
    screen: "test" as const,
  },
  {
    id: "deploy",
    label: "Deploy",
    short: "05",
    detail: "CI/CD · release · rollout",
    screen: "deploy" as const,
  },
  {
    id: "operate",
    label: "Operate",
    short: "06",
    detail: "Monitor · support · iterate",
    screen: "operate" as const,
  },
] as const;

type ScreenId = (typeof STAGES)[number]["screen"];

const CYCLE_MS = 2800;

function StageIcon({ id, active }: { id: ScreenId; active: boolean }) {
  const stroke = active ? CYAN : "rgba(255,255,255,0.45)";
  const fill = active ? "rgba(38,198,218,0.2)" : "transparent";

  switch (id) {
    case "discover":
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
          <circle cx="10" cy="10" r="6" fill={fill} stroke={stroke} strokeWidth="1.5" />
          <path d="M15 15l5 5" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "design":
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
          <rect x="3" y="4" width="8" height="6" rx="1" fill={fill} stroke={stroke} strokeWidth="1.5" />
          <rect x="13" y="8" width="8" height="10" rx="1" fill={fill} stroke={stroke} strokeWidth="1.5" />
        </svg>
      );
    case "develop":
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
          <path d="M8 7l-4 5 4 5M16 7l4 5-4 5" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "test":
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
          <path
            d="M6 12l4 4 8-9"
            fill="none"
            stroke={active ? GREEN : stroke}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      );
    case "deploy":
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
          <path
            d="M12 3v10M8 9l4 4 4-4M5 19h14"
            fill="none"
            stroke={stroke}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      );
    case "operate":
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
          <path
            d="M3 14c2-4 6-6 9-6s7 2 9 6"
            fill="none"
            stroke={active ? GREEN : stroke}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <circle cx="12" cy="14" r="2" fill={active ? GREEN : stroke} />
        </svg>
      );
  }
}

function LifecycleScreen({ screen }: { screen: ScreenId }) {
  return (
    <div className="lifecycle-screen relative flex h-full min-h-0 flex-1 flex-col overflow-hidden rounded-xl border border-white/10 bg-[#07090c] p-3 sm:p-4 lg:p-5">
      <div className="mb-2 flex items-center gap-2 border-b border-white/8 pb-2 lg:mb-3 lg:pb-3">
        <span className="h-2 w-2 rounded-full bg-[var(--brand)]/80 lg:h-2.5 lg:w-2.5" />
        <span className="h-2 w-2 rounded-full bg-white/20 lg:h-2.5 lg:w-2.5" />
        <span className="h-2 w-2 rounded-full bg-white/20 lg:h-2.5 lg:w-2.5" />
        <span className="ml-auto font-mono text-[10px] text-white/40 lg:text-xs">delivery.pipeline</span>
      </div>

      {screen === "discover" && (
        <div className="lifecycle-fade-in flex flex-1 flex-col gap-2 font-mono text-[11px] sm:text-xs lg:gap-3 lg:text-sm">
          <p className="text-[var(--brand)]">{"// discovery workshop"}</p>
          {["User journeys mapped", "Backlog prioritized", "Risks logged"].map((line, i) => (
            <p
              key={line}
              className="text-white/75"
              style={{ animationDelay: `${i * 0.35}s` }}
            >
              <span className="text-[var(--hero-green)]">✓</span> {line}
            </p>
          ))}
        </div>
      )}

      {screen === "design" && (
        <div className="lifecycle-fade-in grid flex-1 grid-cols-3 gap-2">
          <div className="rounded-lg border border-dashed border-[var(--brand)]/40 bg-[var(--brand)]/5 p-2" />
          <div className="rounded-lg border border-white/15 bg-white/5 p-2" />
          <div className="col-span-3 rounded-lg border border-[var(--hero-green)]/35 bg-[var(--hero-green)]/8 p-2">
            <div className="h-1.5 w-2/3 rounded bg-white/15" />
            <div className="mt-2 h-1.5 w-1/2 rounded bg-white/10" />
          </div>
        </div>
      )}

      {screen === "develop" && (
        <div className="lifecycle-fade-in flex flex-1 flex-col gap-1 font-mono text-[11px] sm:text-xs lg:gap-2 lg:text-sm">
          <p className="text-white/50">
            <span className="text-[var(--brand)]">const</span> release ={" "}
            <span className="text-[var(--hero-green)]">build()</span>;
          </p>
          <p className="text-white/50">
            <span className="text-[var(--brand)]">await</span> api.integrate(
            <span className="text-white/70">services</span>);
          </p>
          <p className="lifecycle-typing text-white/80">shipping feature branch…</p>
        </div>
      )}

      {screen === "test" && (
        <div className="lifecycle-fade-in flex flex-1 flex-col justify-center gap-2">
          {["Unit tests", "E2E flows", "Security scan"].map((t, i) => (
            <div
              key={t}
              className="flex items-center gap-2 text-xs text-white/80 lg:text-sm"
              style={{ animationDelay: `${i * 0.4}s` }}
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--hero-green)]/25 text-[10px] text-[var(--hero-green)]">
                ✓
              </span>
              {t}
            </div>
          ))}
        </div>
      )}

      {screen === "deploy" && (
        <div className="lifecycle-fade-in flex flex-1 flex-col items-center justify-center gap-3">
          <div className="lifecycle-pulse flex h-14 w-14 items-center justify-center rounded-2xl border border-[var(--brand)]/50 bg-[var(--brand)]/10 lg:h-20 lg:w-20">
            <svg viewBox="0 0 24 24" className="h-7 w-7 text-[var(--brand)] lg:h-10 lg:w-10" aria-hidden>
              <path
                d="M12 2L4 14h16L12 2z"
                fill="currentColor"
                opacity="0.9"
              />
            </svg>
          </div>
          <p className="font-mono text-xs text-white/70">Release v2.4 → production</p>
          <div className="h-1.5 w-full max-w-[200px] overflow-hidden rounded-full bg-white/10">
            <div className="lifecycle-deploy-bar h-full rounded-full bg-gradient-to-r from-[var(--brand)] to-emerald-500" />
          </div>
        </div>
      )}

      {screen === "operate" && (
        <div className="lifecycle-fade-in flex flex-1 flex-col justify-end">
          <svg viewBox="0 0 200 48" className="h-16 w-full text-[var(--hero-green)] lg:h-24" preserveAspectRatio="none" aria-hidden>
            <path
              className="lifecycle-graph-line"
              d="M0 40 Q30 36 50 28 T100 18 T150 24 T200 8"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
          <p className="mt-2 font-mono text-[10px] text-white/50">uptime · logs · alerts · iterate</p>
        </div>
      )}
    </div>
  );
}

/** Landscape software delivery lifecycle — video-style looping timeline. */
export function HeroLifecycleVisual() {
  const [active, setActive] = useState(0);
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setAnimate(!mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!animate) return;
    const id = window.setInterval(() => {
      setActive((prev) => (prev + 1) % STAGES.length);
    }, CYCLE_MS);
    return () => window.clearInterval(id);
  }, [animate]);

  const stage = STAGES[active];

  return (
    <aside
      className="hero-lifecycle relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#07090c] shadow-[0_24px_64px_-20px_rgba(0,0,0,0.9),0_0_40px_-8px_rgba(16,185,129,0.3)]"
      aria-label="Software delivery lifecycle animation"
    >
      <div className="flex items-center justify-between gap-2 border-b border-white/8 px-3 py-2 sm:px-4 lg:px-5 lg:py-3">
        <div className="flex items-center gap-2">
          <span
            className={`h-2 w-2 rounded-full bg-[var(--brand)] ${animate ? "lifecycle-recording" : ""}`}
          />
          <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/55 sm:text-xs">
            Software lifecycle
          </span>
        </div>
        <span className="font-mono text-[10px] text-white/40">
          {stage.short} / 06 · {stage.label}
        </span>
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-2 p-2 sm:gap-3 sm:p-3 lg:gap-4 lg:p-4">
        <LifecycleScreen screen={stage.screen} />
        <p className="px-1 text-center text-[10px] text-white/45 sm:text-xs lg:text-sm">{stage.detail}</p>
      </div>

      <div className="border-t border-white/8 px-2 pb-2 pt-2 sm:px-3 sm:pb-3 lg:px-4 lg:pb-4 lg:pt-3">
        <div className="relative mb-2 h-1 overflow-hidden rounded-full bg-white/8">
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[var(--brand)] to-emerald-500"
            style={{
              width: `${((active + 1) / STAGES.length) * 100}%`,
              transition: animate ? `width ${CYCLE_MS}ms linear` : "none",
            }}
          />
          <div
            className="absolute top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-white shadow-[0_0_12px_rgba(38,198,218,0.9)]"
            style={{
              left: `calc(${((active + 0.5) / STAGES.length) * 100}% - 5px)`,
              transition: animate ? `left ${CYCLE_MS}ms linear` : "none",
            }}
          />
        </div>

        <ol className="grid grid-cols-6 gap-0.5 sm:gap-1">
          {STAGES.map((s, i) => {
            const isActive = i === active;
            const isPast = i < active;
            return (
              <li key={s.id} className="flex flex-col items-center gap-0.5">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-lg border transition-colors duration-300 sm:h-9 sm:w-9 lg:h-11 lg:w-11 ${
                    isActive
                      ? "border-[var(--hero-cyan)]/60 bg-[var(--hero-cyan)]/15"
                      : isPast
                        ? "border-[var(--hero-green)]/35 bg-[var(--hero-green)]/10"
                        : "border-white/10 bg-white/5"
                  }`}
                >
                  <StageIcon id={s.screen} active={isActive} />
                </div>
                <span
                  className={`hidden text-center text-[8px] font-semibold leading-tight sm:block sm:text-[9px] lg:text-[10px] ${
                    isActive ? "text-[var(--hero-cyan)]" : "text-white/40"
                  }`}
                >
                  {s.label}
                </span>
              </li>
            );
          })}
        </ol>
      </div>
    </aside>
  );
}
