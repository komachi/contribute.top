import { Box, Button, Heading, Text } from "@chakra-ui/react";
import Link from "next/link";

export default function NotFound() {
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
        Page not found
      </Heading>
      <Text
        fontSize={{ base: "md", md: "lg" }}
        color="gray.600"
        textAlign="center"
      >
        This page don't exist anymore or never existed.
      </Text>
      <Button mt="32px" size="2xl" variant="solid" rounded="xl" asChild>
        <Link href="/">Go to homepage</Link>
      </Button>
    </Box>
  );
}
