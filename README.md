# Project Hub - React Router v7 Framework Mode Deep Dive

Project Hub is a high-fidelity educational demonstration application designed to learn and showcase all major features of **React Router v7's new Framework Mode** (formerly Remix). 

The application is built using **pnpm**, **Tailwind CSS v4**, **Vitest**, and **Playwright**. It showcases the ultimate combination of Static Site Generation (SSG), Server-Side Rendering (SSR), server/client loaders, server/client actions, and zero-latency Optimistic UI.

---

## 🎨 Premium Aesthetics & UI
The dashboard features state-of-the-art modern SaaS aesthetics:
* **Glassmorphism Theme**: Fully customized slate-950 backdrop with glowing indigo and purple HSL ambient gradients.
* **Interactive Navigation Indicators**: Side navigation sidebar options with active and background pending states utilizing React Router NavLink tracking.
* **Global Transition Bar**: Top viewport progress bar that shimmers dynamically whenever page navigation or background mutations are in-flight.

---

## 🏗️ Architecture & Features Mapping

### 1. Hybrid Rendering (SSG + SSR)
Configured centrally inside [react-router.config.ts](react-router.config.ts):
* **SSG (Static Site Generation)**: Pre-renders `/` and `/about` into physical HTML templates at build time for instant TTFB loading speeds and SEO optimization.
* **SSR (Server-Side Rendering)**: Compiles the `/app/*` dynamic route segments into server-side executable code to securely retrieve dynamic real-time data at runtime.

### 2. Centralized Config-Based Routing
Managed under [app/routes.ts](app/routes.ts) using structural config helpers (`index`, `route`, `layout`) from `@react-router/dev/routes`:
* Decouples the file directory structure from the public URL routing path.
* Renders the `layouts/dashboard.tsx` sidebar frame as a parent layout container using React `<Outlet />` to seamlessly mount sub-pages without visual re-renders.

### 3. Server & Client Loaders
* **Server Loader (`loader`)**: Fetch data securely directly from our mock database [app/db.server.ts](app/db.server.ts) on the server using automatically typed parameters via generated `Route.LoaderArgs` (e.g., in `/app/projects/:id`).
* **Client Loader (`clientLoader`)**: Safely fetch browser-only properties (like reading light/dark appearance preference values from `localStorage` in `/app/profile`).
* **`HydrateFallback`**: Renders a custom pulse loading skeleton during page load hydration to prevent any flickering or Flash of Unstyled Content (FOUC).

### 4. Actions & Form Mutations
* Employs React Router `<Form method="post">` to intercept form submissions and process background actions.
* Performs full server-side validation and returns clean, inline input errors without any fetch boilerplate.
* Triggers **Automatic Revalidation**—upon successful database inserts, all loaders on the page automatically re-run to refresh the UI list.

### 5. Optimistic UI Checkboxes
* In [app/routes/project-details.tsx](app/routes/project-details.tsx), uses `useFetcher()` to build task toggles.
* The UI instantly toggles checklist tick status and font strikes by reading `fetcher.formData` in-flight, resulting in a **0ms visual lag** experience.
* Gracefully rolls back automatically if a database write error is thrown, maintaining absolute database synchronization.

### 6. Client Actions (`clientAction`)
* In [app/routes/profile.tsx](app/routes/profile.tsx), exports a `clientAction` that writes settings directly to browser memory (`localStorage`), bypassing the network server entirely while successfully triggering typegen revalidations.

---

## 📂 Project Directory Structure

```
├── app/
│   ├── layouts/
│   │   └── dashboard.tsx       # Glassmorphic layout shell with Sidebar Navigation
│   ├── routes/
│   │   ├── about.tsx           # SSG Marketing About Page
│   │   ├── home.tsx            # SSG Marketing Landing Hero
│   │   ├── profile.tsx         # Client Loader/Action (localStorage theme preference)
│   │   ├── project-details.tsx # Server loader/action with useFetcher Optimistic UI
│   │   └── projects.tsx        # Server loader/action with Project Creation Form
│   ├── db.server.ts            # Simulated Server Database with artificial latency
│   ├── app.css                 # Tailwind CSS v4 & Keyframe animations
│   ├── root.tsx                # HTML Shell, useNavigation() Global Progress Bar
│   └── routes.ts               # Centralized type-safe route trees configuration
├── test/
│   ├── setup.ts                # Vitest Jest-DOM matchers import
│   ├── projects.test.tsx       # Unit tests (loaders/actions) & Component Stub tests
│   └── e2e.spec.ts             # Playwright E2E full user-flow test spec
├── react-router.config.ts      # SSG/SSR global rendering config
├── vitest.config.ts            # Test suite runner configuration (JSDOM environment)
└── package.json                # Standard scripts, Tailwind and dev packages
```

---

## 🚀 Getting Started

### 1. Installation
Install project dependencies using `pnpm`:
```bash
pnpm install
```

### 2. Development
Boot up the local Vite-powered development server (runs by default on port `3000`):
```bash
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Type Checking & Route Typegen
React Router's typegen runs in the background. To manually compile type declarations and execute TypeScript verification, run:
```bash
pnpm typecheck
```

### 4. Running the Test Suite
Execute the Vitest suite (runs both unit loader/action tests and `createRoutesStub` component renders):
```bash
pnpm test
```

---

## 📦 Building & Deploying to Production

Compile production bundles:
```bash
pnpm build
```

This compiles client-side chunks (and static pre-rendered SSG folders) in `build/client/` and server-side SSR Node code in `build/server/`.

Start the built-in production Node.js adapter server:
```bash
pnpm start
```
Your application will be served at `http://localhost:3000`.
