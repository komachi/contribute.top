import type { Config } from "@react-router/dev/config";
import data from "./app/data/data.json";

export default {
  ssr: false,
  prerender: {
    paths: [
      "/",
      "/about",
      "/projects",
      "/tools",
      ...data.projects.map((project) => `/projects/${project.id}`),
      ...data.tools.map((tool) => `/tools/${tool.id}`),
    ],
    concurrency: 4,
  },
} satisfies Config;
