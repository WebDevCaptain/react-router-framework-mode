import { type RouteConfig, index, route, layout } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("about", "routes/about.tsx"),

  layout("layouts/dashboard.tsx", [
    route("app/projects", "routes/projects.tsx"),
    route("app/projects/:id", "routes/project-details.tsx"),
    route("app/profile", "routes/profile.tsx"),
  ]),
] satisfies RouteConfig;
