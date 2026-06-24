import { createBrandedOgImage, OG_IMAGE_SIZE } from "@/lib/ogImage";

export const alt = "HimoSoft — Terms of Service";
export const size = OG_IMAGE_SIZE;
export const contentType = "image/png";

export default function OpenGraphImage() {
  return createBrandedOgImage("Terms of Service", "himosoft.com.bd");
}
