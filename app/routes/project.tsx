import { Box, GridItem, Heading, SimpleGrid } from "@chakra-ui/react";
import jsonata from "jsonata";
import type { FC } from "react";
import { JsonLd } from "react-schemaorg";
import type { Organization } from "schema-dts";
import Markdown from "@/common/Markdown";
import ProjectInfobox from "@/common/ProjectInfobox";
import ToolCard from "@/common/ToolCard";
import { cannonicalUrl, title } from "@/data/config";
import type { Project, Tool } from "@/types";
import type { Route } from "./+types/project";

export function meta({ loaderData, params }: Route.MetaArgs) {
  return [
    { title: `${loaderData.project.title} — ${title}` },
    {
      property: "og:title",
      content: `${loaderData.project.title} — ${title}`,
    },
    {
      name: "description",
      content: loaderData.project.description,
    },
    {
      name: "og:description",
      content: loaderData.project.description,
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
      content: `${cannonicalUrl}/projects/${params.id}`,
    },
  ];
}

export async function loader({ params }: Route.ClientLoaderArgs) {
  const [data, markdown] = await Promise.all([
    import("../data/data.json").then(async (data) => {
      const project = data.projects.find((project) => project.id === params.id);
      const expression = jsonata(
        `$append([], tools[
        projects[$ = "${params.id}"]
      ])`,
      );
      return { project, tools: await expression.evaluate(data) };
    }),
    import(`../data/projects/${params.id}.md?raw`)
      .then((data) => data.default)
      .catch(() => null),
  ]);
  const description = markdown || data.project?.description || "";

  return {
    project: data.project,
    description,
    tools: data.tools,
  } as { project: Project; description: string; tools: Array<Tool> };
}

const ProjectPage: FC<Route.ComponentProps> = ({ loaderData }) => {
  return (
    <>
      <JsonLd<Organization>
        item={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: loaderData.project.title,
          description: loaderData.project.description,
          url: loaderData.project.website,
        }}
      />
      <Box py="16px">
        <SimpleGrid columns={12} gap="8px">
          <GridItem colSpan={{ base: 12, lg: 8 }}>
            <Markdown markdown={loaderData.description} />
          </GridItem>
          <GridItem colSpan={{ base: 12, lg: 4 }}>
            <ProjectInfobox {...loaderData.project} />
          </GridItem>
        </SimpleGrid>
        {loaderData.tools.length > 0 && (
          <>
            <Heading mt="16px" mb="16px" id="tools">
              Tools
            </Heading>

            <SimpleGrid
              columns={{ base: 1, sm: 3, xl: 4 }}
              gap="8px"
              gridAutoRows="1fr"
            >
              {(loaderData.tools || []).map((tool) => (
                <ToolCard key={tool.id} {...tool} />
              ))}
            </SimpleGrid>
          </>
        )}
      </Box>
    </>
  );
};
export default ProjectPage;
