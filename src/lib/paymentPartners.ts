import { readFile } from "node:fs/promises";
import path from "node:path";
import { cache } from "react";

export type PaymentPartner = {
  id: string;
  name: string;
  icon: string;
};

export type PaymentPartnersData = {
  label?: string;
  items: PaymentPartner[];
};

export const getPaymentPartners = cache(async (): Promise<PaymentPartnersData> => {
  const filePath = path.join(process.cwd(), "content", "payment-partners.json");
  const raw = await readFile(filePath, "utf8");
  return JSON.parse(raw) as PaymentPartnersData;
});
