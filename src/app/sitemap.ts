import type { MetadataRoute } from "next";
import { docsData } from "@/config/docs";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://astryx.ndjp.net";

  return [
    {
      url: `${baseUrl}/`,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...Object.keys(docsData).map((slug) => ({
      url: `${baseUrl}/docs/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
