import { NextResponse } from "next/server";
import { getGallery, getSponsorImages } from "@/lib/gallery";

const BASE_URL = "https://www.duvelnacht.be" as const;

export const revalidate = 60 * 60 * 24; // 24h

export async function GET() {
  const images = [...getGallery(), ...getSponsorImages()];

  const urlsetItems = images.map((item) => {
    const loc = `${BASE_URL}${item.src}`;
    const title = item.alt || item.id;
    return `\n  <url>\n    <loc>${BASE_URL}/</loc>\n    <image:image>\n      <image:loc>${loc}</image:loc>\n      <image:title>${escapeXml(title)}</image:title>\n    </image:image>\n  </url>`;
  }).join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">${urlsetItems}\n</urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": `public, max-age=${revalidate}, s-maxage=${revalidate}`,
    },
  });
}

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}


