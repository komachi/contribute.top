import jsonata from "jsonata";
import { cache } from "react";
import data from "@/data/data.json";
import type { Project, Tool } from "@/types";

export const getProject = cache(async (id: string) => {
  const project = (data.projects as Array<Project>).find(
    (project) => project.id === id,
  );
  const expression = jsonata(
    `$append([], tools[
      projects[$ = "${id}"]
    ])`,
  );
  const tools: Array<Tool> = await expression.evaluate(data);
  const description = project?.description || "";

  return { project, tools, description };
});

export const getTool = cache(async (id: string) => {
  const tool = (data.tools as Array<Tool>).find((tool) => tool.id === id);
  const expression = jsonata(`(
    $ids := tools[id="${id}"].projects[];
    $append([], projects[id in $ids])
  )`);

  const projects: Array<Project> = await expression.evaluate(data);
  const description = tool?.description || "";

  return { tool, projects, description };
});
