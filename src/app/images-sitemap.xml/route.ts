import { NextResponse } from "next/server";
import { getGallery, getSponsorImages } from "@/lib/gallery";

const BASE_URL = "https://www.duvelnacht.be" as const;

export const revalidate = 86400; // 24h

export async function GET() {
  const images = [...getGallery(), ...getSponsorImages()];

  // Add favicon to images sitemap for better SEO
  const faviconItem = `\n  <url>\n    <loc>${BASE_URL}/</loc>\n    <image:image>\n      <image:loc>${BASE_URL}/favicon.ico</image:loc>\n      <image:title>${escapeXml("Duvelnacht Favicon")}</image:title>\n    </image:image>\n  </url>`;

  const urlsetItems = images.map((item) => {
    const loc = /^https?:\/\//i.test(item.src) ? item.src : `${BASE_URL}${item.src}`;
    const title = item.alt || item.id;
    return `\n  <url>\n    <loc>${BASE_URL}/</loc>\n    <image:image>\n      <image:loc>${loc}</image:loc>\n      <image:title>${escapeXml(title)}</image:title>\n    </image:image>\n  </url>`;
  }).join("");

  const allUrlsetItems = faviconItem + urlsetItems;

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">${allUrlsetItems}\n</urlset>`;

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


