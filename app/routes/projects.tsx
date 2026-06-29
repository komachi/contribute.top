import type { FC } from "react";
import ProjectsList from "@/common/ProjectsList";
import { cannonicalUrl, title } from "@/data/config";
import type { Project } from "@/types";
import type { Route } from "./+types/projects";

export function meta() {
  return [
    { title: `Projects ­— ${title}` },
    {
      property: "og:title",
      content: `Projects — ${title}`,
    },
    {
      name: "description",
      content: "List of open data and citizen science projects",
    },
    {
      name: "og:description",
      content: "List of open data and citizen science projects",
    },
    {
      name: "og:type",
      content: "website",
    },
    {
      name: "twitter:card",
      content: "summary",
    },
    {
      name: "og:url",
      content: `${cannonicalUrl}/projects`,
    },
  ];
}

export async function loader() {
  const data = await import("../data/data.json");
  return data.projects as Array<Project>;
}

const Projects: FC<Route.ComponentProps> = ({ loaderData }) => {
  return <ProjectsList projects={loaderData} />;
};
export default Projects;
