import type { MetadataRoute } from "next";
import data from "@/data/data.json";
import type { Project, Tool } from "@/types";

export const dynamic = "force-static";

const routes = [
  "/about",
  "/projects",
  "/tools",
  ...(data.projects as Array<Project>).map(
    (project) => `/projects/${project.id}/`,
  ),
  ...(data.tools as Array<Tool>).map((tool) => `/tools/${tool.id}/`),
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((url) => ({
    url,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 1,
  }));
}
