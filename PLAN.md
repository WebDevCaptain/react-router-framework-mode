# Project Hub Implementation Plan

## Background & Motivation
The goal is to build a comprehensive demo project, "Project Hub", to learn and showcase all major features of React Router's new Framework Mode. This single unified app will serve as a practical learning tool, stepping through routing, rendering, data loading, actions, and UI states.

## Scope & Impact
The project will be built from scratch, gradually introducing features. It will consist of a public marketing site (demonstrating SSG) and a protected dashboard (demonstrating SSR, Client Loaders, Actions, and Optimistic UI). We will use a simulated in-memory database to keep the setup simple and focused on React Router.

## Features & Documentation Mapping

1. **Setup & Installation**: Scaffold the app using the standard React Router CLI.
   - *Docs*: [Installation](https://reactrouter.com/start/framework/installation)
2. **Config-Based Routing**: Centralized routing in `app/routes.ts` using `index`, `route`, and `layout`.
   - *Docs*: [Routing](https://reactrouter.com/start/framework/routing)
3. **Route Modules**: Structuring components alongside their data fetching and mutation logic.
   - *Docs*: [Route Module](https://reactrouter.com/start/framework/route-module)
4. **Rendering Strategies**: Configuring SSG for the marketing site and SSR for the dashboard via `react-router.config.ts`.
   - *Docs*: [Rendering](https://reactrouter.com/start/framework/rendering)
5. **Data Loading**: Server-side `loader` for projects, `clientLoader` + `HydrateFallback` for user preferences.
   - *Docs*: [Data Loading](https://reactrouter.com/start/framework/data-loading)
6. **Data Mutations (Actions)**: Using `<Form>` and server `action` for creating projects, benefiting from automatic revalidation.
   - *Docs*: [Actions](https://reactrouter.com/start/framework/actions)
7. **Navigating & Pending UI**: Adding global `useNavigation` loading bars and local `<NavLink isPending>` indicators.
   - *Docs*: [Navigating](https://reactrouter.com/start/framework/navigating), [Pending UI](https://reactrouter.com/start/framework/pending-ui)
8. **Optimistic UI**: Using `useFetcher` to instantly toggle task status before server confirmation.
   - *Docs*: [Pending UI (Optimistic)](https://reactrouter.com/start/framework/pending-ui)
9. **Testing**: Unit testing loaders/actions, component testing with `createRoutesStub`, and E2E testing.
   - *Docs*: [Testing](https://reactrouter.com/start/framework/testing)
10. **Deployment**: Building for production, choosing an adapter (Node.js/Cloudflare/etc.), and environment variables.
    - *Docs*: [Deploying](https://reactrouter.com/start/framework/deploying)

## Phased Implementation Plan

### Phase 1: Initialization & Rendering Configuration
- Scaffold the project using `npx create-react-router@latest`.
- Update `react-router.config.ts` to enable SSR and configure `prerender` for static paths (`/` and `/about`).

### Phase 2: Route Configuration & Layouts
- Define the core routing structure in `app/routes.ts`.
  - Public routes: `/` (Home), `/about`.
  - Protected Layout: `/app` (with a shared sidebar).
  - Dashboard routes: `/app/projects` (list), `/app/projects/:id` (details), `/app/profile`.

### Phase 3: Loaders (Server & Client)
- Implement a simulated database utility (`app/db.server.ts`).
- **Server Loader**: Fetch the list of projects in `app/routes/projects.tsx`.
- **Client Loader**: Fetch theme preferences from `localStorage` in `app/routes/profile.tsx` and implement `HydrateFallback` for initial client rendering.

### Phase 4: Actions & Forms
- Add a "Create Project" form in `app/routes/projects.tsx` using `<Form method="post">`.
- Implement an `action` function to handle form submission and create a new project in the simulated DB.
- Observe how React Router automatically re-fetches the `loader` data after the action completes.

### Phase 5: Pending UI & Optimistic Updates
- Add a global loading indicator in `app/root.tsx` using `useNavigation()`.
- Add active/pending states to the sidebar links using `<NavLink className={({ isPending }) => ... }>`.
- In `app/routes/project-details.tsx`, render a list of tasks.
- Use `useFetcher()` to build a "Mark Complete" toggle that updates the UI optimistically before the server responds.

### Phase 6: Automated Testing
- Set up Vitest for unit and component testing.
- **Testing Loaders/Actions**: Write unit tests for the `projects` loader and action in `app/routes/projects.tsx`.
- **Component Testing**: Use `createRoutesStub` to test the `ProjectDetails` component in isolation, mocking the loader data.
- **E2E Testing**: Set up a basic Playwright test for the project creation flow.

### Phase 7: Build & Deployment Configuration
- **Adapter Setup**: Configure the app for a specific deployment target (e.g., the default Node.js adapter or Cloudflare).
- **Production Build**: Run `npm run build` and analyze the output (server-side chunks vs client-side assets).
- **Environment Variables**: Set up a `.env.production` example to demonstrate how to handle secrets in Framework Mode.
- **Verification**: Run the production build locally using `npm run start` to ensure SSR and SSG routes work as expected.
