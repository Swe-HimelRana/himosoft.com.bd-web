import Image from "next/image";
import Link from "next/link";

import { ProtectedContactLinks } from "@/components/ProtectedContactLinks";
import { externalNavLinkProps } from "@/lib/navLink";
import type { SiteContent } from "@/types/site";

type Props = Pick<SiteContent, "footer" | "meta" | "nav">;

export function SiteFooter({ footer, meta, nav }: Props) {
  return (
    <footer id="footer" className="border-t border-black/[0.06] bg-foreground text-white">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-md">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            >
              <Image
                src="/logo.svg"
                alt=""
                width={44}
                height={44}
                className="h-9 w-9 object-contain sm:h-10 sm:w-10"
              />
              <span className="text-lg font-bold tracking-tight sm:text-xl">
                {nav.brand}
              </span>
            </Link>
            <p className="mt-4 leading-relaxed text-white/75">{footer.tagline}</p>
            <p className="mt-3 text-sm leading-relaxed text-white/60">
              {footer.registrationLicense}
            </p>
          </div>

          <div className="grid flex-1 grid-cols-1 gap-10 sm:grid-cols-2 lg:max-w-xl">
            {footer.columns.map((col) => (
              <div key={col.title}>
                <p className="text-sm font-semibold uppercase tracking-wide text-white/55">
                  {col.title}
                </p>
                <ul className="mt-4 space-y-3">
                  {col.links.map((link) => {
                    const isInternal = link.href.startsWith("/");
                    const className =
                      "text-sm font-semibold text-white/85 hover:text-white";

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
                    <ProtectedContactLinks
                      emailLabel={footer.contactEmailLabel}
                      phoneLabel={footer.contactPhoneLabel}
                      mobileLabel={footer.contactMobileLabel}
                    />
                  ) : null}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8">
          <p className="text-xs text-white/45">{meta.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
