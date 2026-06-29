import type { FC } from "react";
import ToolsList from "@/common/ToolsList";
import { cannonicalUrl, title } from "@/data/config";
import type { DataSchema } from "@/types";
import type { Route } from "./+types/tools";

export function meta() {
  return [
    { title: `Tools — ${title}` },
    {
      property: "og:title",
      content: `Tools — ${title}`,
    },
    {
      name: "description",
      content:
        "List of tools to contribute to open data and citizen science projects",
    },
    {
      name: "og:description",
      content:
        "List of tools to contribute to open data and citizen science projects",
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
      content: `${cannonicalUrl}/tools`,
    },
  ];
}

export async function loader() {
  const data = await import("../data/data.json");
  return data as DataSchema;
}

const Tools: FC<Route.ComponentProps> = ({ loaderData }) => {
  return <ToolsList data={loaderData} />;
};
export default Tools;
