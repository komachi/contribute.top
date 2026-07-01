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
import type { FC } from "react";
import { LuExternalLink, LuMenu } from "react-icons/lu";
import { Link as RRLink, useLocation } from "react-router";
import {
  ColorModeButton,
  ColorModeLinkButton,
} from "@/components/ui/color-mode";
import { sourceCode, title } from "@/data/config";

const Header: FC = () => {
  const { pathname } = useLocation();

  return (
    <>
      <HStack gap="6" paddingY="2" justify="space-between">
        <Heading
          as="h1"
          size={{ base: "2xl", md: "4xl" }}
          fontWeight="light"
          asChild
        >
          <RRLink to="/">{title}</RRLink>
        </Heading>

        <Box>
          <Button
            asChild
            variant={
              pathname.replace("/", "") === "projects" ? "subtle" : "ghost"
            }
          >
            <RRLink to="/projects">Projects</RRLink>
          </Button>
          <Button
            asChild
            variant={pathname.replace("/", "") === "tools" ? "subtle" : "ghost"}
          >
            <RRLink to="/tools">Tools</RRLink>
          </Button>
        </Box>

        <Box display={{ base: "none", md: "block" }}>
          <Button variant="ghost" asChild>
            <RRLink to="/about">About</RRLink>
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
                      <RRLink to="/projects">Projects</RRLink>
                    </Button>
                  </Menu.Item>
                  <Menu.Item value="tools">
                    <Button variant="plain" asChild size="sm">
                      <RRLink to="/tools">Tools</RRLink>
                    </Button>
                  </Menu.Item>
                  <Menu.Item value="about">
                    <Button variant="plain" asChild size="sm">
                      <RRLink to="/about">About</RRLink>
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
