import { Box, GridItem, Heading, SimpleGrid } from "@chakra-ui/react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { FC } from "react";
import { JsonLd } from "react-schemaorg";
import type { Organization } from "schema-dts";
import Markdown from "@/common/Markdown";
import ProjectInfobox from "@/common/ProjectInfobox";
import ToolCard from "@/common/ToolCard";
import { title } from "@/data/config";
import data from "@/data/data.json";
import { getProject } from "@/lib/data";
import type { Project } from "@/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { project } = await getProject(id);
  if (!project) {
    return {};
  }
  return {
    title: `${project.title} — ${title}`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      url: `/projects/${id}/`,
      type: "website",
      locale: "en_US",
      siteName: title,
    },
    alternates: {
      canonical: `/projects/${id}/`,
      types: {
        "text/markdown": `/projects/${id}/md`,
      },
    },
  } satisfies Metadata;
}

export async function generateStaticParams() {
  return (data.projects as Array<Project>).map(({ id }) => ({ id }));
}

const ProjectPage: FC<{ params: Promise<{ id: string }> }> = async ({
  params,
}) => {
  const { id } = await params;
  const { project, tools, description } = await getProject(id);

  if (!project) {
    return notFound();
  }

  return (
    <>
      <JsonLd<Organization>
        item={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: project.title,
          description: description,
          url: project.website,
        }}
      />
      <Box py="16px">
        <SimpleGrid columns={12} gap="8px">
          <GridItem colSpan={{ base: 12, lg: 8 }}>
            <Markdown markdown={description} />
          </GridItem>
          <GridItem colSpan={{ base: 12, lg: 4 }}>
            <ProjectInfobox {...project} />
          </GridItem>
        </SimpleGrid>
        {tools.length > 0 && (
          <>
            <Heading mt="16px" mb="16px" id="tools">
              Tools
            </Heading>

            <SimpleGrid
              columns={{ base: 1, sm: 3, xl: 4 }}
              gap="8px"
              gridAutoRows="1fr"
            >
              {(tools || []).map((tool) => (
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
