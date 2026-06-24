import { createBrandedOgImage, OG_IMAGE_SIZE } from "@/lib/ogImage";

export const alt = "HimoSoft — Site Map";
export const size = OG_IMAGE_SIZE;
export const contentType = "image/png";

export default function OpenGraphImage() {
  return createBrandedOgImage("Site Map", "himosoft.com.bd");
}
