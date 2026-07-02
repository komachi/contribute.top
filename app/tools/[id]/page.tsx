import { Box, GridItem, Heading, SimpleGrid } from "@chakra-ui/react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { FC } from "react";
import { JsonLd } from "react-schemaorg";
import type { SoftwareApplication } from "schema-dts";
import Markdown from "@/common/Markdown";
import ProjectCard from "@/common/ProjectCard";
import ToolInfobox from "@/common/ToolInfobox";
import { title } from "@/data/config";
import data from "@/data/data.json";
import { getTool } from "@/lib/data";
import type { Tool } from "@/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { tool } = await getTool(id);
  if (!tool) {
    return {};
  }
  return {
    title: `${tool.title} — ${title}`,
    description: tool.description,
    openGraph: {
      title: tool.title,
      description: tool.description,
      url: `/tools/${id}/`,
      type: "website",
      locale: "en_US",
      siteName: title,
    },
    alternates: {
      canonical: `/tools/${id}/`,
      types: {
        "text/markdown": `/tools/${id}/md`,
      },
    },
  } satisfies Metadata;
}

export async function generateStaticParams() {
  return (data.tools as Array<Tool>).map(({ id }) => ({ id }));
}

const ToolPage: FC<{ params: Promise<{ id: string }> }> = async ({
  params,
}) => {
  const { id } = await params;
  const { tool, projects, description } = await getTool(id);
  if (!tool) {
    return notFound();
  }

  return (
    <>
      <JsonLd<SoftwareApplication>
        item={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: tool.title,
          description: tool.description,
        }}
      />
      <Box py="16px">
        <SimpleGrid columns={12} gap="8px">
          <GridItem colSpan={{ base: 12, lg: 8 }}>
            <Markdown markdown={description} />
          </GridItem>
          <GridItem colSpan={{ base: 12, lg: 4 }}>
            <ToolInfobox {...tool} />
          </GridItem>
        </SimpleGrid>
        {projects.length > 0 && (
          <>
            <Heading mt="16px" mb="16px" id="tools">
              Projects
            </Heading>
            <SimpleGrid
              columns={{ base: 1, sm: 3, xl: 4 }}
              gap="8px"
              gridAutoRows="1fr"
            >
              {(projects || []).map((project) => (
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
