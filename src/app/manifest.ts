import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "HimoSoft — Software Development & IT Solutions",
    short_name: "HimoSoft",
    description:
      "Custom software, web and mobile apps, payment integrations, deployment, and maintenance — Bangladesh-based, globally disciplined delivery.",
    start_url: "/",
    display: "standalone",
    background_color: "#050608",
    theme_color: "#1fd9ca",
    orientation: "portrait-primary",
    categories: ["business", "productivity", "technology"],
    lang: "en",
    dir: "ltr",
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
