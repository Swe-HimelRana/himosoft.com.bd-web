import { createBrandedOgImage, OG_IMAGE_SIZE } from "@/lib/ogImage";

export const alt = "HimoSoft — Cookie Policy";
export const size = OG_IMAGE_SIZE;
export const contentType = "image/png";

export default function OpenGraphImage() {
  return createBrandedOgImage("Cookie Policy", "himosoft.com.bd");
}
