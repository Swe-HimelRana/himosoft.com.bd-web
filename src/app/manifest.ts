import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "HimoSoft — Software Development & IT Solutions",
    short_name: "HimoSoft",
    description:
      "Custom software, web and mobile apps, payment integrations, deployment, and maintenance.",
    start_url: "/",
    display: "standalone",
    background_color: "#f4f6f8",
    theme_color: "#26c6da",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/logo.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "maskable",
      },
    ],
  };
}
