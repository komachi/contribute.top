import { Box, Card, HStack, Link, Tag, Text } from "@chakra-ui/react";
import type { FC } from "react";
import { LuExternalLink } from "react-icons/lu";
import { SiWikidata, SiWikipedia } from "react-icons/si";
import { categoriesDict, hardwareDict } from "@/data/filters";
import type { Project } from "@/types";

const ProjectInfobox: FC<Project> = ({
  title,
  website,
  categories,
  hardware,
  enwiki,
  wikidata,
}) => {
  return (
    <Card.Root>
      <Card.Body gap="2">
        <Card.Title mt="2">{title}</Card.Title>
        <HStack align="center" display="flex" mt="8px">
          <Text textStyle="xs">Categories:</Text>
          {categories.map((category) => (
            <Tag.Root key={category} size="sm">
              <Tag.Label>{categoriesDict[category]}</Tag.Label>
            </Tag.Root>
          ))}
        </HStack>
        <HStack mt="4px" wrap="wrap">
          <Text textStyle="xs">Hardware:</Text>
          {hardware.map((item) => (
            <Tag.Root key={item} size="sm" variant="solid">
              <Tag.Label>{hardwareDict[item]}</Tag.Label>
            </Tag.Root>
          ))}
        </HStack>
      </Card.Body>
      <Card.Footer justifyContent="space-between">
        <Box gap="8px" display="flex">
          <Link href={website} target="_blank" rel="noopener">
            Website <LuExternalLink />
          </Link>
          {enwiki && (
            <Link
              href={`https://en.wikipedia.org/wiki/${encodeURIComponent(enwiki.replace(/ /g, "_"))}`}
              target="_blank"
              rel="noopener"
            >
              <SiWikipedia /> Wikipedia
            </Link>
          )}
          {wikidata && (
            <Link
              href={`https://www.wikidata.org/wiki/${wikidata}`}
              target="_blank"
              rel="noopener"
            >
              <SiWikidata /> Wikidata
            </Link>
          )}
        </Box>
      </Card.Footer>
    </Card.Root>
  );
};

export default ProjectInfobox;
