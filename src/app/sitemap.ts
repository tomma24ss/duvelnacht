import type { MetadataRoute } from "next";

// Note: We hardcode the production base URL to ensure absolute URLs in the sitemap.
// If you deploy to multiple environments, consider reading from ENV and defaulting to production.
const BASE_URL = "https://duvelnacht.be" as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  // Static routes in the application. Add paths here if you add new pages.
  const staticPaths: Array<{ path: string; changefreq: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number }> = [
    { path: "/", changefreq: "weekly", priority: 1.0 },
  ];

  const entries: MetadataRoute.Sitemap = staticPaths.map(({ path, changefreq, priority }) => ({
    url: `${BASE_URL}${path}`,
    lastModified: now,
    changeFrequency: changefreq,
    priority,
  }));

  return entries;
}


