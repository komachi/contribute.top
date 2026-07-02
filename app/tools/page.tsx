import type { Metadata } from "next";
import type { FC } from "react";
import ToolsList from "@/common/ToolsList";
import { title } from "@/data/config";

export const metadata: Metadata = {
  title: `Tools ­— ${title}`,
  description:
    "List of tools to contribute to open data and citizen science projects",
  openGraph: {
    title: `Tools ­— ${title}`,
    description:
      "List of tools to contribute to open data and citizen science projects",
    url: "/tools/",
    type: "website",
    locale: "en_US",
    siteName: title,
  },
  alternates: {
    canonical: "/tools/",
  },
};
const Tools: FC = () => {
  return <ToolsList />;
};

export default Tools;
