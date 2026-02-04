export function getSiteUrl(): URL {
  const configured = process.env.NEXT_PUBLIC_SITE_URL;
  if (configured && configured.trim().length > 0) {
    const value = configured.trim();
    return new URL(value.startsWith("http") ? value : `https://${value}`);
  }

  const vercelUrl = process.env.VERCEL_URL;
  if (vercelUrl && vercelUrl.trim().length > 0) {
    return new URL(`https://${vercelUrl.trim()}`);
  }

  return new URL("https://www.booking.com/hotel/lk/villa-95-kandy.en-gb.html");
}
