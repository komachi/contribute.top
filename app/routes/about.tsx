import { Box, Code, Heading, Link, List, Text } from "@chakra-ui/react";
import type { FC } from "react";
import { cannonicalUrl, sourceCode, title } from "@/data/config";
import type { Route } from "./+types/about";

export function meta() {
  return [
    { title: `About ${title}` },
    {
      property: "og:title",
      content: `About ${title}`,
    },
    {
      name: "description",
      content: `Information about ${title} project`,
    },
    {
      name: "og:description",
      content: `Information about ${title} project`,
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
      content: `${cannonicalUrl}/about`,
    },
  ];
}

const About: FC<Route.ComponentProps> = () => {
  return (
    <Box py="16px">
      <Heading size="3xl" as="h2" mb="8px">
        About
      </Heading>
      <Text>
        {title} aims to document{" "}
        <Link
          variant="underline"
          href="https://en.wikipedia.org/wiki/Open_data"
          target="_blank"
          rel="noopener"
        >
          open data
        </Link>
        ,{" "}
        <Link
          variant="underline"
          href="https://en.wikipedia.org/wiki/Citizen_science"
          target="_blank"
          rel="noopener"
        >
          citizen science
        </Link>
        , and other{" "}
        <Link
          variant="underline"
          href="https://en.wikipedia.org/wiki/Open_collaboration"
          target="_blank"
          rel="noopener"
        >
          open collaboration
        </Link>{" "}
        projects which you can contribute to without much specific knowledge.
      </Text>
      <Text>
        While contributing to{" "}
        <Link
          variant="underline"
          href="https://en.wikipedia.org/wiki/Free_software"
          target="_blank"
          rel="noopener"
        >
          free software
        </Link>{" "}
        is widely known, there is much more ways ordinary people can help with
        without programming knowledge, and make a real impact.
      </Text>

      <Heading size="3xl" as="h2" my="8px">
        Why should I contribute?
      </Heading>
      <Text>
        There are many reasons, and the most important one is that it's fun. But
        if you need more motivation, here are some:
      </Text>
      <List.Root listStylePosition="inside" as="ul" mt="8px">
        <List.Item as="li">You're solving real-world problems.</List.Item>
        <List.Item as="li">
          You can join a community of like-minded people.
        </List.Item>
        <List.Item as="li">
          You can see real impact from your contributions.
        </List.Item>
        <List.Item as="li">
          You can learn practical skills that help in school and future jobs.
        </List.Item>
        <List.Item as="li">
          Your contributions can open new ways for others to use data to make
          the world better.
        </List.Item>
        <List.Item as="li">
          You empower nonprofits and community groups by making high-quality
          data available without paywalls or invasive surveillance.
        </List.Item>
        <List.Item as="li">You help preserve knowledge over time.</List.Item>
        <List.Item as="li">
          You get the satisfaction of making knowledge more accessible to
          others.
        </List.Item>
        <List.Item as="li">
          You can help scientists and researchers support new discoveries.
        </List.Item>
      </List.Root>

      <Heading size="3xl" as="h2" my="8px">
        Which ways I can contribute?
      </Heading>
      <Text>
        For some projects, contributing can be as simple as using an app on your
        phone. For others, it may involve surveying, refining data, or hosting
        specific hardware.
      </Text>
      <Text>
        Look through the available options and filters to find something that
        fits your time and comfort level.
      </Text>

      <Heading size="3xl" as="h2" my="8px">
        Contributing to {title}
      </Heading>
      <Text>
        Source code and data used on {title} is open by itself. You can check
        source code{" "}
        <Link
          variant="underline"
          href={sourceCode}
          target="_blank"
          rel="noopener"
        >
          here
        </Link>
        , create issue for missing project/tools, or directly contribute to
        database. Database stored in <Code>app/data/data.json</Code> file.{" "}
        <Link
          variant="underline"
          href="https://en.wikipedia.org/wiki/Markdown"
          target="_blank"
          rel="noopener"
        >
          Markdown
        </Link>
        files describing projects/tools are stored in relevant dirs in{" "}
        <Code>app/data</Code>.
      </Text>

      <Heading size="3xl" as="h2" my="8px">
        License
      </Heading>
      <Text>
        Data and source code are available under{" "}
        <Link
          variant="underline"
          href="https://creativecommons.org/licenses/by-sa/4.0/"
          target="_blank"
          rel="noopener"
        >
          Creative Common Attribution-ShareAlike 4.0 license
        </Link>
        .
      </Text>
    </Box>
  );
};
export default About;
