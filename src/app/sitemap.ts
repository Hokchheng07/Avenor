import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/seo";
import { FEATURED_CAROUSEL_BOOKS } from "@/lib/openlibrary";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteConfig.url}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${siteConfig.url}/discover`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
  ];

  const bookRoutes: MetadataRoute.Sitemap = FEATURED_CAROUSEL_BOOKS.map(
    (book) => ({
      url: `${siteConfig.url}/book/${book.id}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    }),
  );

  return [...staticRoutes, ...bookRoutes];
}
