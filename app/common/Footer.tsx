import { HStack, Link, Separator, Text } from "@chakra-ui/react";
import type { FC } from "react";
import { LuCreativeCommons } from "react-icons/lu";
import { SiGithub } from "react-icons/si";
import { sourceCode } from "@/data/config";

const Footer: FC = () => {
  return (
    <>
      <Separator />
      <HStack gap="6" paddingY="2" justify="space-between">
        <Link
          href={sourceCode}
          fontSize="sm"
          target="_blank"
          rel="noopener"
          color="gray.600"
        >
          <SiGithub /> Source code
        </Link>
        <Text
          color="gray.600"
          fontSize="sm"
          display="flex"
          alignItems="center"
          gap="4px"
        >
          <LuCreativeCommons />{" "}
          <Link
            variant="underline"
            color="gray.600"
            fontSize="sm"
            href="https://creativecommons.org/licenses/by-sa/4.0/"
            rel="license noopener"
            target="_blank"
          >
            CC BY-SA 4.0
          </Link>
        </Text>
      </HStack>
    </>
  );
};

export default Footer;
