import { Box, Button, Heading, HStack, Text } from "@chakra-ui/react";
import type { Metadata } from "next";
import Link from "next/link";
import type { FC } from "react";
import { cannonicalUrl, title } from "@/data/config";

export const metadata: Metadata = {
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${cannonicalUrl}/`,
    siteName: title,
  },
  alternates: {
    canonical: "/",
  },
};

const Home: FC = () => {
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
          <Link href="/projects">Check projects</Link>
        </Button>
        <Button size="2xl" variant="outline" rounded="xl">
          <Link href="/tools">Check tools</Link>
        </Button>
      </HStack>
    </Box>
  );
};

export default Home;
