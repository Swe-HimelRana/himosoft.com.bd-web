import Image from "next/image";
import Link from "next/link";

import { ProtectedContactLinks } from "@/components/ProtectedContactLinks";
import { externalNavLinkProps } from "@/lib/navLink";
import type { SiteContent } from "@/types/site";

type Props = Pick<SiteContent, "footer" | "meta" | "nav">;

const SOCIAL_LINKS = [
  {
    label: "LinkedIn",
    href: "https://linkedin.com/company/himosoft",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden>
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://facebook.com/himosoft",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden>
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
  {
    label: "Twitter",
    href: "https://twitter.com/himosoft",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://youtube.com/@himosoft",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden>
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
  },
];

export function SiteFooter({ footer, meta, nav }: Props) {
  return (
    <footer
      id="footer"
      className="relative overflow-hidden text-white"
    >
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="flex flex-col gap-14 lg:flex-row lg:items-start lg:justify-between">
          {/* Brand Column */}
          <div className="max-w-sm">
            <Link
              href="/"
              className="group inline-flex items-center gap-3 rounded-xl p-1.5 transition-all hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            >
              <div className="relative">
                <Image
                  src="/logo.svg"
                  alt=""
                  width={48}
                  height={48}
                  className="h-12 w-12 object-contain transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 rounded-full bg-brand/20 blur-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
              <span className="text-2xl font-bold tracking-tight">
                {nav.brand}
              </span>
            </Link>

            <p className="mt-5 leading-relaxed text-white/70 text-base">
              {footer.tagline}
            </p>

            <div className="mt-5 flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/20">
                <svg viewBox="0 0 24 24" className="h-4 w-4 text-emerald-400" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-sm text-white/60">{footer.registrationLicense}</p>
            </div>

            {/* Social Links */}
            <div className="mt-6">
              <p className="text-sm font-semibold uppercase tracking-wider text-white/40 mb-3">
                Connect With Us
              </p>
              <div className="flex items-center gap-3">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/60 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/50 hover:bg-emerald-500/10 hover:text-emerald-400"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="grid flex-1 grid-cols-1 gap-12 sm:grid-cols-2 lg:max-w-2xl">
            {footer.columns.map((col) => (
              <div key={col.title} className="group">
                <div className="flex items-center gap-2">
                  <div className="h-1 w-1 rounded-full bg-brand" />
                  <p className="text-sm font-bold uppercase tracking-wider text-white/90">
                    {col.title}
                  </p>
                </div>
                <ul className="mt-5 space-y-3.5">
                  {col.links.map((link) => {
                    const isInternal = link.href.startsWith("/");
                    const className =
                      "group/link relative text-sm text-white/60 transition-all duration-200 hover:text-white pl-4 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-1.5 before:w-1.5 before:rounded-full before:bg-brand/50 before:opacity-0 before:transition-opacity hover:pl-5 hover:before:opacity-100";

                    return (
                      <li key={`${link.href}-${link.label}`}>
                        {isInternal ? (
                          <Link href={link.href} className={className}>
                            {link.label}
                          </Link>
                        ) : (
                          <a
                            href={link.href}
                            {...externalNavLinkProps(link.href)}
                            className={className}
                          >
                            {link.label}
                          </a>
                        )}
                      </li>
                    );
                  })}
                  {col.protectedContacts ? (
                    <li className="pt-2">
                      <ProtectedContactLinks
                        emailLabel={footer.contactEmailLabel}
                        phoneLabel={footer.contactPhoneLabel}
                        mobileLabel={footer.contactMobileLabel}
                      />
                    </li>
                  ) : null}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 relative">
          <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-white/5 bg-white/[0.02] px-6 py-5 sm:flex-row">
            <div className="flex items-center gap-3">
              <div className="flex h-2 w-2 items-center justify-center">
                <span className="absolute h-2 w-2 animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative h-2 w-2 rounded-full bg-emerald-500" />
              </div>
              <p className="text-sm text-white/50">Systems operational</p>
            </div>

            <p className="text-sm text-white/40">{meta.copyright}</p>

            <div className="flex items-center gap-4">
              <Link href="/privacy" className="text-sm text-white/40 transition-colors hover:text-white/70">
                Privacy
              </Link>
              <span className="text-white/20">·</span>
              <Link href="/terms" className="text-sm text-white/40 transition-colors hover:text-white/70">
                Terms
              </Link>
              <span className="text-white/20">·</span>
              <Link href="/cookies" className="text-sm text-white/40 transition-colors hover:text-white/70">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
