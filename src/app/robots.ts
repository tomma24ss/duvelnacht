import type { MetadataRoute } from "next";

const BASE_URL = "https://duvelnacht.be" as const;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: [
      `${BASE_URL}/sitemap.xml`,
      `${BASE_URL}/images-sitemap.xml`,
    ],
    host: BASE_URL,
  };
}


