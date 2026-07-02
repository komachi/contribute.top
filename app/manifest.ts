import type { MetadataRoute } from "next";
import { title } from "@/data/config";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: title,
    short_name: title,
    description: "Help crowdsourcing projects in open data and citizen science",
    start_url: "/",
    display: "standalone",
  };
}
