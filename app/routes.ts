import { index, type RouteConfig, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("projects", "routes/projects.tsx"),
  route("tools", "routes/tools.tsx"),
  route("about", "routes/about.tsx"),
  route("projects/:id", "routes/project.tsx"),
  route("tools/:id", "routes/tool.tsx"),
] satisfies RouteConfig;
