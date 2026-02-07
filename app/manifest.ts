import type { MetadataRoute } from "next";

import { headers } from "next/headers";

import { getSiteUrl } from "./lib/site";

export const dynamic = "force-dynamic";

async function getOriginFromRequestHeaders(): Promise<URL> {
  const h = await headers();
  const forwardedProto = h.get("x-forwarded-proto");
  const forwardedHost = h.get("x-forwarded-host");
  const host = forwardedHost ?? h.get("host");
  const proto = forwardedProto ?? "https";

  if (host) return new URL(`${proto}://${host}`);

  return getSiteUrl();
}

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const siteUrl = await getOriginFromRequestHeaders();

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
        src: "/logo/logo.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    scope: "/",
    id: siteUrl.origin,
  };
}
