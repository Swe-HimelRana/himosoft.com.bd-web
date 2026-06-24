import { createBrandedOgImage, OG_IMAGE_SIZE } from "@/lib/ogImage";

export const alt = "HimoSoft — Privacy Policy";
export const size = OG_IMAGE_SIZE;
export const contentType = "image/png";

export default function OpenGraphImage() {
  return createBrandedOgImage("Privacy Policy", "himosoft.com.bd");
}
