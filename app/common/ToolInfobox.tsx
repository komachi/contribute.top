import { Box, Card, HStack, Tag, Text } from "@chakra-ui/react";
import type { FC } from "react";
import { hardwareDict, platformsDict } from "@/data/filters";
import type { Tool } from "@/types";
import LinksList from "./LinksList";

const ToolInfobox: FC<Tool> = ({
  title,
  platforms,
  hardware,
  links,
  enwiki,
  wikidata,
}) => {
  return (
    <Card.Root>
      <Card.Body gap="2">
        <Card.Title mt="2">{title}</Card.Title>
        <HStack align="center" display="flex" mt="8px" wrap="wrap">
          <Text textStyle="xs">Platforms:</Text>
          {platforms.map((platform) => (
            <Tag.Root key={platform} size="sm">
              <Tag.Label>{platformsDict[platform]}</Tag.Label>
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
        <Box gap="6px" display="flex" flexDirection="column">
          <LinksList
            links={links}
            withTitles
            enwiki={enwiki}
            wikidata={wikidata}
          />
        </Box>
      </Card.Footer>
    </Card.Root>
  );
};

export default ToolInfobox;
