import { Box, Button, Heading, HStack, Text } from "@chakra-ui/react";
import type { FC } from "react";
import { Link } from "react-router";
import { cannonicalUrl, title } from "@/data/config";
import type { Route } from "./+types/home";

export function meta() {
  return [
    { title },
    {
      property: "og:title",
      content: title,
    },
    {
      name: "description",
      content: "Help crowdsourcing projects in open data and citizen science",
    },
    {
      name: "og:description",
      content: "Help crowdsourcing projects in open data and citizen science",
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
      content: cannonicalUrl,
    },
  ];
}

const Home: FC<Route.ComponentProps> = () => {
  return (
    <Box
      p={{ base: 6, md: 10 }}
      mt="64px"
      display="flex"
      alignItems="center"
      flexDirection="column"
    >
      <Heading
        textAlign="center"
        size={{ base: "3xl", md: "4xl" }}
        lineHeight="shorter"
      >
        Help crowdsourcing projects in open data &amp; citizen science
      </Heading>
      <Text
        fontSize={{ base: "md", md: "lg" }}
        color="gray.600"
        textAlign="center"
      >
        Explore projects worldwide that are looking for your help.
      </Text>
      <HStack mt="32px" gap="16px">
        <Button size="2xl" variant="solid" rounded="xl" asChild>
          <Link to="/projects">Check projects</Link>
        </Button>
        <Button size="2xl" variant="outline" rounded="xl">
          <Link to="/tools">Check tools</Link>
        </Button>
      </HStack>
    </Box>
  );
};

export default Home;
