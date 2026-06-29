import { Box, GridItem, Heading, SimpleGrid } from "@chakra-ui/react";
import jsonata from "jsonata";
import type { FC } from "react";
import { JsonLd } from "react-schemaorg";
import type { SoftwareApplication } from "schema-dts";
import Markdown from "@/common/Markdown";
import ProjectCard from "@/common/ProjectCard";
import ToolInfobox from "@/common/ToolInfobox";
import { cannonicalUrl, title } from "@/data/config";
import type { Project, Tool } from "@/types";
import type { Route } from "./+types/tool";

export function meta({ loaderData, params }: Route.MetaArgs) {
  return [
    { title: `${loaderData.tool.title} — ${title}` },
    {
      property: "og:title",
      content: `${loaderData.tool.title} — ${title}`,
    },
    {
      name: "description",
      content: loaderData.tool.description,
    },
    {
      name: "og:description",
      content: loaderData.tool.description,
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
      content: `${cannonicalUrl}/tools/${params.id}`,
    },
  ];
}

export async function loader({ params }: Route.ClientLoaderArgs) {
  const [data, markdown] = await Promise.all([
    import("../data/data.json").then(async (data) => {
      const tool = data.tools.find((project) => project.id === params.id);
      const expression = jsonata(`(
        $ids := tools[id="${params.id}"].projects[];
        $append([], projects[id in $ids])
      )`);
      return { tool, projects: await expression.evaluate(data) };
    }),
    import(`../data/tools/${params.id}.md?raw`)
      .then((data) => data.default)
      .catch(() => null),
  ]);
  const description = markdown || data.tool?.description || "";
  return {
    tool: data.tool,
    description,
    projects: data.projects,
  } as { tool: Tool; description: string; projects: Array<Project> };
}

const ToolPage: FC<Route.ComponentProps> = ({ loaderData }) => {
  return (
    <>
      <JsonLd<SoftwareApplication>
        item={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: loaderData.tool.title,
          description: loaderData.tool.description,
        }}
      />
      <Box py="16px">
        <SimpleGrid columns={12} gap="8px">
          <GridItem colSpan={{ base: 12, lg: 8 }}>
            <Markdown markdown={loaderData.description} />
          </GridItem>
          <GridItem colSpan={{ base: 12, lg: 4 }}>
            <ToolInfobox {...loaderData.tool} />
          </GridItem>
        </SimpleGrid>
        {loaderData.projects.length > 0 && (
          <>
            <Heading mt="16px" mb="16px" id="tools">
              Projects
            </Heading>
            <SimpleGrid
              columns={{ base: 1, sm: 3, xl: 4 }}
              gap="8px"
              gridAutoRows="1fr"
            >
              {(loaderData.projects || []).map((project) => (
                <ProjectCard key={project.id} {...project} />
              ))}
            </SimpleGrid>
          </>
        )}
      </Box>
    </>
  );
};
export default ToolPage;
