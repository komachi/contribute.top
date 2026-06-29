import { reactRouter } from "@react-router/dev/vite";
import autoprefixer from "autoprefixer";
import { defineConfig } from "vite";
import Sitemap from "vite-plugin-sitemap";
import { cannonicalUrl } from "./app/data/config";
import data from "./app/data/data.json";

export default defineConfig({
  css: {
    postcss: {
      plugins: [autoprefixer],
    },
  },
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [
    reactRouter(),
    Sitemap({
      hostname: cannonicalUrl,
      outDir: "build/client",
      dynamicRoutes: [
        "/about",
        "/projects",
        "/tools",
        ...data.projects.map((project) => `/projects/${project.id}`),
        ...data.tools.map((tool) => `/tools/${tool.id}`),
      ],
    }),
  ],
});
