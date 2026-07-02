import { notFound } from "next/navigation";
import type { NextRequest } from "next/server";
import { cannonicalUrl } from "@/data/config";
import data from "@/data/data.json";
import { categoriesDict, hardwareDict } from "@/data/filters";
import { getProject } from "@/lib/data";
import type { Project } from "@/types";

export const dynamic = "force-static";

export async function generateStaticParams() {
  return (data.projects as Array<Project>).map(({ id }) => ({ id }));
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const { project, tools } = await getProject(id);
  if (!project) {
    return notFound();
  }
  const body = [
    `# ${project.title}`,
    "",
    `> ${project.description}`,
    "",
    project.wikidata
      ? `Wikidata item: https://www.wikidata.org/wiki/${project.wikidata}`
      : undefined,
    "",
    project.website ? `Website: ${project.website}` : undefined,
    "## Categories",
    ...project.categories.map((category) => `- ${categoriesDict[category]}`),
    "",
    "## Hardware",
    ...project.hardware.map((hardware) => `- ${hardwareDict[hardware]}`),
    "",
    "## Tools",
    ...(tools || []).map(
      (tool) =>
        `- [${tool.title}](${cannonicalUrl}/tools/${tool.id}/md): ${tool.description}`,
    ),
  ]
    .filter((item) => item !== undefined)
    .join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
