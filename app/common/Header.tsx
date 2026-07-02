"use client";

import {
  Box,
  Button,
  Heading,
  HStack,
  Link,
  Menu,
  Portal,
  Separator,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import type { FC } from "react";
import { LuExternalLink, LuMenu } from "react-icons/lu";
import {
  ColorModeButton,
  ColorModeLinkButton,
} from "@/components/ui/color-mode";
import { sourceCode, title } from "@/data/config";

const Header: FC = () => {
  const segment = useSelectedLayoutSegment();

  return (
    <>
      <HStack gap="6" paddingY="2" justify="space-between">
        <Heading
          as="h1"
          size={{ base: "2xl", md: "4xl" }}
          fontWeight="light"
          asChild
        >
          <NextLink href="/">{title}</NextLink>
        </Heading>

        <Box>
          <Button asChild variant={segment === "projects" ? "subtle" : "ghost"}>
            <NextLink href="/projects">Projects</NextLink>
          </Button>
          <Button asChild variant={segment === "tools" ? "subtle" : "ghost"}>
            <NextLink href="/tools">Tools</NextLink>
          </Button>
        </Box>

        <Box display={{ base: "none", md: "block" }}>
          <Button variant="ghost" asChild>
            <NextLink href="/about">About</NextLink>
          </Button>
          <ColorModeButton />
        </Box>
        <Box display={{ base: "block", md: "none" }}>
          <Menu.Root>
            <Menu.Trigger asChild>
              <Button variant="outline" size="sm" aria-label="Open menu">
                <LuMenu />
              </Button>
            </Menu.Trigger>
            <Portal>
              <Menu.Positioner>
                <Menu.Content>
                  <Menu.Item value="projects">
                    <Button variant="plain" asChild size="sm">
                      <NextLink href="/projects">Projects</NextLink>
                    </Button>
                  </Menu.Item>
                  <Menu.Item value="tools">
                    <Button variant="plain" asChild size="sm">
                      <NextLink href="/tools">Tools</NextLink>
                    </Button>
                  </Menu.Item>
                  <Menu.Item value="about">
                    <Button variant="plain" asChild size="sm">
                      <NextLink href="/about">About</NextLink>
                    </Button>
                  </Menu.Item>
                  <Menu.Item value="source">
                    <Button variant="plain" asChild size="sm">
                      <Link href={sourceCode} target="_blank" rel="noopener">
                        Source code <LuExternalLink />
                      </Link>
                    </Button>
                  </Menu.Item>
                  <Menu.Item value="colormode">
                    <ColorModeLinkButton />
                  </Menu.Item>
                </Menu.Content>
              </Menu.Positioner>
            </Portal>
          </Menu.Root>
        </Box>
      </HStack>
      <Separator />
    </>
  );
};

export default Header;
