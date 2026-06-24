import { createStaticOgImage, OG_IMAGE_SIZE } from "@/lib/ogImage";

export const alt = "HimoSoft — Software Development & IT Solutions";
export const size = OG_IMAGE_SIZE;
export const contentType = "image/png";

export default async function OpenGraphImage() {
  return createStaticOgImage();
}
