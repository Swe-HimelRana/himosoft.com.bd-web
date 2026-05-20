import Image from "next/image";

import type { PaymentPartnersData } from "@/lib/paymentPartners";

type Props = {
  data: PaymentPartnersData;
};

function PartnerLogo({ partner }: { partner: PaymentPartnersData["items"][number] }) {
  return (
    <div className="shrink-0" title={partner.name}>
      <span className="flex h-14 min-w-[8.5rem] items-center justify-center rounded-xl border border-black/[0.06] bg-white px-6 shadow-sm sm:min-w-[9.5rem] sm:px-7">
        <Image
          src={partner.icon}
          alt=""
          width={160}
          height={40}
          className="h-8 w-auto max-w-[9.5rem] object-contain opacity-80 sm:h-9"
          aria-hidden
        />
        <span className="sr-only">{partner.name}</span>
      </span>
    </div>
  );
}

/** How many times each partner set is tiled per half of the loop (fills wide screens). */
const TILES_PER_SEGMENT = 4;

function buildMarqueeItems(items: PaymentPartnersData["items"]) {
  const segment: { partner: PaymentPartnersData["items"][number]; key: string; hidden: boolean }[] =
    [];
  for (let tile = 0; tile < TILES_PER_SEGMENT; tile += 1) {
    for (const partner of items) {
      segment.push({
        partner,
        key: `${partner.id}-t${tile}`,
        hidden: false,
      });
    }
  }
  return [...segment, ...segment.map((entry) => ({ ...entry, key: `${entry.key}-dup`, hidden: true }))];
}

export function PaymentPartnersMarquee({ data }: Props) {
  const marqueeItems = buildMarqueeItems(data.items);

  return (
    <section
      aria-label={data.label ?? "Technology partners"}
      className="border-b border-black/[0.06] bg-[linear-gradient(180deg,#fff_0%,var(--background)_100%)] py-8 sm:py-10"
    >
      <div className="payment-partners-marquee relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent sm:w-24" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[var(--background)] to-transparent sm:w-24" />

        <ul className="payment-partners-track flex w-max flex-row items-center gap-5 px-4 sm:gap-6 sm:px-6">
          {marqueeItems.map(({ partner, key, hidden }) => (
            <li key={key} aria-hidden={hidden || undefined}>
              <PartnerLogo partner={partner} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
