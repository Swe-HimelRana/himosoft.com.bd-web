import Image from "next/image";

import type { PaymentPartnersData } from "@/lib/paymentPartners";

type Props = {
  data: PaymentPartnersData;
};

function PartnerLogo({ partner }: { partner: PaymentPartnersData["items"][number] }) {
  return (
    <div className="shrink-0" title={partner.name}>
      <span className="payment-partner-card flex h-14 min-w-[8.5rem] items-center justify-center rounded-xl px-6 sm:min-w-[9.5rem] sm:px-7">
        <Image
          src={partner.icon}
          alt=""
          width={160}
          height={40}
          className="h-8 w-auto max-w-[9.5rem] object-contain sm:h-9"
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
      className="py-8 sm:py-10"
    >
      <div className="payment-partners-marquee relative overflow-hidden">

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
