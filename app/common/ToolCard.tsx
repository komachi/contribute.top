import { Box, Button, Card, HStack, Tag, Text } from "@chakra-ui/react";
import { type FC, memo } from "react";
import { Link as RRLink } from "react-router";
import { hardwareDict, platformsDict } from "@/data/filters";
import type { Tool } from "@/types";
import LinksList from "./LinksList";

const ToolCard: FC<Tool> = memo(
  ({ id, title, description, links, hardware, platforms }) => {
    return (
      <Card.Root h="100%">
        <Card.Body gap="2">
          <Card.Title mt="2">{title}</Card.Title>
          <Card.Description>{description}</Card.Description>
          <HStack mt="8px" wrap="wrap">
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
          <RRLink to={`/tools/${id}`}>
            <Button variant="outline">Learn more</Button>
          </RRLink>
          <Box gap="6px" display="flex">
            <LinksList links={links} />
          </Box>
        </Card.Footer>
      </Card.Root>
    );
  },
);

export default ToolCard;
