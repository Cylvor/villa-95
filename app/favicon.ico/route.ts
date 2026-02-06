import { readFile } from "node:fs/promises";
import path from "node:path";

export async function GET(): Promise<Response> {
  const iconPath = path.join(process.cwd(), "public", "logo", "favicon.png");
  const bytes = await readFile(iconPath);

  return new Response(bytes, {
    headers: {
      "Content-Type": "image/png",
      // Cache aggressively; change filename if you need to bust cache.
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
