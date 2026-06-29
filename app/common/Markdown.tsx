import { Code, Heading, Link, List, Text } from "@chakra-ui/react";
import type { FC } from "react";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";

const components: Components = {
  h1: (props) => <Heading as="h2" size="3xl" my="8px" {...props} />,
  h2: (props) => <Heading as="h3" size="2xl" my="8px" {...props} />,
  h3: (props) => <Heading as="h4" size="xl" my="8px" {...props} />,
  ul: (props) => <List.Root listStylePosition="inside" as="ul" {...props} />,
  ol: (props) => <List.Root listStylePosition="inside" as="ul" {...props} />,
  li: (props) => <List.Item as="li" {...props} />,
  code: Code,
  a: (props) => <Link variant="underline" {...props} />,
  p: Text,
};
const remarkPlugins = [remarkGfm];

const Markdown: FC<{ markdown: string }> = ({ markdown }) => {
  return (
    <ReactMarkdown remarkPlugins={remarkPlugins} components={components}>
      {markdown}
    </ReactMarkdown>
  );
};

export default Markdown;
