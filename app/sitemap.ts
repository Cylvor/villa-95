import type { MetadataRoute } from "next";

import { getSiteUrl } from "./lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const lastModified = new Date();

  const routes = ["/", "/reservations", "/privacy-policy", "/terms-of-service"];

  return routes.map((path) => ({
    url: new URL(path, siteUrl).toString(),
    lastModified,
  }));
}
