import type { MetadataRoute } from "next";
import { projects } from "@/data/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  return [
    { url: siteUrl, lastModified: new Date() },
    ...projects.map((project) => ({ url: `${siteUrl}/projects/${project.slug}`, lastModified: new Date() }))
  ];
}
