import { notFound } from "next/navigation";
import type { NextRequest } from "next/server";
import { cannonicalUrl } from "@/data/config";
import data from "@/data/data.json";
import { hardwareDict, platformsDict } from "@/data/filters";
import { getTool } from "@/lib/data";
import type { Tool } from "@/types";

export const dynamic = "force-static";

export async function generateStaticParams() {
  return (data.tools as Array<Tool>).map(({ id }) => ({ id }));
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const { tool, projects } = await getTool(id);
  if (!tool) {
    return notFound();
  }
  const body = [
    `# ${tool.title}`,
    "",
    `> ${tool.description}`,
    "",
    tool.wikidata
      ? `Wikidata item: https://www.wikidata.org/wiki/${tool.wikidata}`
      : undefined,
    "",
    tool.links.website ? `Website: ${tool.links.website}` : undefined,
    "",
    "## Hardware",
    ...tool.hardware.map((hardware) => `- ${hardwareDict[hardware]}`),
    "",
    "## Platforms",
    ...tool.platforms.map((platform) => `- ${platformsDict[platform]}`),
    "",
    "## Projects",
    ...projects.map(
      (project) =>
        `- [${project.title}](${cannonicalUrl}/projects/${project.id}/md): ${project.description}`,
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
