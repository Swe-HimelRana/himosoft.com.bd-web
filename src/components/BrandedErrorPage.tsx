import Image from "next/image";
import Link from "next/link";

import { SectionEyebrow } from "@/components/SectionEyebrow";

export type ErrorPageCopy = {
  eyebrow: string;
  title: string;
  description: string;
  homeLabel: string;
  sitemapLabel?: string;
  contactLabel?: string;
  retryLabel?: string;
};

type Props = {
  copy: ErrorPageCopy;
  onRetry?: () => void;
  showSitemap?: boolean;
};

export function BrandedErrorPage({ copy, onRetry, showSitemap = true }: Props) {
  return (
    <section className="relative flex min-h-[70vh] items-center py-20 sm:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-[var(--logo-teal)]/10 blur-3xl" />
        <div className="absolute -right-16 bottom-8 h-64 w-64 rounded-full bg-[var(--logo-green)]/10 blur-3xl" />
      </div>

      <div className="relative mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="glass-card overflow-hidden rounded-3xl p-8 sm:p-12">
          <div className="mb-8 flex items-center gap-4">
            <Link href="/" className="inline-flex shrink-0 items-center gap-3">
              <Image
                src="/logo.svg"
                alt="HimoSoft"
                width={44}
                height={44}
                className="h-11 w-11"
              />
              <span className="text-lg font-semibold text-white">HimoSoft</span>
            </Link>
          </div>

          <SectionEyebrow tone="light">{copy.eyebrow}</SectionEyebrow>
          <h1 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
            {copy.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/65">
            {copy.description}
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            {onRetry ? (
              <button
                type="button"
                onClick={onRetry}
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-brand to-purple-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand/25 transition hover:scale-[1.02] hover:shadow-brand/40"
              >
                {copy.retryLabel}
              </button>
            ) : null}
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full bg-brand/30 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-brand/45"
            >
              {copy.homeLabel}
            </Link>
            {showSitemap && copy.sitemapLabel ? (
              <Link
                href="/sitemap"
                className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/10"
              >
                {copy.sitemapLabel}
              </Link>
            ) : null}
            {copy.contactLabel ? (
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/10"
              >
                {copy.contactLabel}
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
