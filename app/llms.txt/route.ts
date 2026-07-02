import { cannonicalUrl } from "@/data/config";
import data from "@/data/data.json";

export const dynamic = "force-static";

export async function GET() {
  const body = [
    "# Contribute.top",
    "",
    "> A curated catalog of crowdsourcing projects that use public participation to collect, validate, analyze, map, or publish open data in support of research, civic action, and social good.",
    "",
    "## Overview",
    "This catalog helps people find, understand, and compare crowdsourcing initiatives across open data, citizen science, participatory research, and civic technology. It is designed for researchers, volunteers, educators, journalists, policymakers, developers, and community organizers who want to discover projects and reuse their methods, data, or platform ideas.",
    "",
    "## What’s Included",
    "- Citizen science projects",
    "- Open data crowdsourcing platforms",
    "- Community mapping initiatives",
    "- Volunteer-based observation networks",
    "- Transcription and digitization projects",
    "- Participatory research projects",
    "- Public data collection campaigns",
    "- Environmental monitoring projects",
    "- Public health and epidemiology collaborations",
    "- Cultural heritage and archive contribution projects",
    "- Crisis response and humanitarian mapping efforts",
    "- Urban planning and mobility data projects",
    "- Biodiversity and ecology tracking projects",
    "- Scientific image/audio/text classification projects",
    "- Data validation and fact-checking initiatives",
    "- Community reporting and local knowledge platforms",
    "",
    "## Common Use Cases",
    "- Finding projects to join as a volunteer",
    "- Discovering datasets generated through public participation",
    "- Comparing crowdsourcing methods across domains",
    "- Studying how citizen science projects recruit, engage, and retain contributors",
    "- Researching open data governance, licensing, and attribution models",
    "- Identifying successful community engagement patterns",
    "- Comparing platforms and methodologies",
    "- Researching civic technology and open science",
    "- Identifying data sources for analysis",
    "- Exploring examples of community-driven data collection",
    "- Teaching crowdsourcing, civic tech, or open science",
    "- Supporting journalism, policy analysis, or academic literature reviews",
    "- Evaluating data quality approaches in distributed collection workflows",
    "- Exploring tools for annotation, mapping, transcription, or reporting",
    "- Benchmarking platforms for scalability, accessibility, and participation",
    "- Learning how projects handle moderation, validation, and duplicate detection",
    "- Investigating inclusion, bias, and geographic coverage in public participation",
    "- Reusing project structures for new civic or scientific initiatives",
    "- Connecting communities with local or global contribution opportunities",
    "",
    "## Projects",
    ...data.projects.map(
      (project) =>
        `- [${project.title}](/projects/${project.id}/md): ${project.description}`,
    ),
    "",
    "## Tools",
    ...data.tools.map(
      (tool) =>
        `- [${tool.title}](${cannonicalUrl}/tools/${tool.id}/md): ${tool.description}`,
    ),
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
