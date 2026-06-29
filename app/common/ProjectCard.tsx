import { Button, Card, HStack, Link, Tag, Text } from "@chakra-ui/react";
import { type FC, memo } from "react";
import { LuExternalLink } from "react-icons/lu";
import { Link as RRLink } from "react-router";
import { categoriesDict, hardwareDict } from "@/data/filters";
import type { Project } from "@/types";

const ProjectCard: FC<Project> = memo(
  ({ id, title, description, website, categories, hardware }) => {
    return (
      <Card.Root h="100%">
        <Card.Body gap="2">
          <Card.Title mt="2">{title}</Card.Title>
          <Card.Description>{description}</Card.Description>
          <HStack mt="8px" wrap="wrap">
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
          <RRLink to={`/projects/${id}`}>
            <Button variant="outline">Learn more</Button>
          </RRLink>
          <Link href={website} target="_blank" rel="noopener">
            Website <LuExternalLink />
          </Link>
        </Card.Footer>
      </Card.Root>
    );
  },
);

export default ProjectCard;
