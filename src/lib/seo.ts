import { publicEnv } from "./public-env";

export const siteConfig = {
  name: "Avenor",
  url: publicEnv.siteUrl,
  description: "Discover books, authors, and stories worth keeping.",
  ogImage: "/og-image.jpg",
} as const;

export function absoluteUrl(path: string): string {
  return new URL(path, siteConfig.url).toString();
}
