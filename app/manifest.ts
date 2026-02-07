import type { MetadataRoute } from "next";

import { getSiteUrl } from "./lib/site";

export default function manifest(): MetadataRoute.Manifest {
  const siteUrl = getSiteUrl();

  return {
    name: "Villa 95 | Rangala",
    short_name: "Villa 95",
    description:
      "A private sanctuary above the clouds in the Knuckles Mountain Range, Sri Lanka.",
    start_url: "/",
    display: "standalone",
    background_color: "#0c0a09",
    theme_color: "#0c0a09",
    icons: [
      {
        src: "/logo/favicon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    scope: "/",
    id: siteUrl.origin,
  };
}
