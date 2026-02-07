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

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = await getOriginFromRequestHeaders();
  const lastModified = new Date();

  const routes = ["/", "/reservations", "/privacy-policy", "/terms-of-service"];

  return routes.map((path) => ({
    url: new URL(path, siteUrl).toString(),
    lastModified,
  }));
}
