export function getConfiguredSiteUrl(): URL | undefined {
  const configured = process.env.NEXT_PUBLIC_SITE_URL;
  if (configured && configured.trim().length > 0) {
    const value = configured.trim();
    return new URL(value.startsWith("http") ? value : `https://${value}`);
  }

  const vercelUrl = process.env.VERCEL_URL;
  if (vercelUrl && vercelUrl.trim().length > 0) {
    return new URL(`https://${vercelUrl.trim()}`);
  }

  return undefined;
}

export function getSiteUrl(): URL {
  const configured = getConfiguredSiteUrl();
  if (configured) return configured;

  // Fallbacks:
  // - Local dev should default to localhost.
  // - Production should default to the canonical domain if env vars are missing.
  if (process.env.NODE_ENV === "production") {
    return new URL("https://villa95rangala.com");
  }

  return new URL("http://localhost:3000");
}
