import { describe, it, expect, vi, beforeEach } from "vitest";
import { loader, action } from "../app/routes/projects";
import { db } from "../app/db.server";
import { createRoutesStub } from "react-router";
import { render, screen } from "@testing-library/react";
import ProjectDetails from "../app/routes/project-details";

// Mock the db.server.ts module if we want isolated unit tests,
// or just use it directly. We'll mock it to show professional test practices!
vi.mock("../app/db.server", () => {
  const mockProjects = [
    {
      id: "mock-1",
      name: "Mock Project Alpha",
      description: "This is a detailed mock description for alpha.",
      createdAt: "2026-05-01T00:00:00.000Z",
    },
  ];

  const mockTasks = [
    { id: "mt1", projectId: "mock-1", title: "Verify testing configurations", completed: false },
  ];

  return {
    db: {
      getProjects: vi.fn().mockResolvedValue(mockProjects),
      getProject: vi.fn().mockImplementation((id: string) => {
        if (id === "mock-1") return Promise.resolve(mockProjects[0]);
        return Promise.resolve(undefined);
      }),
      createProject: vi.fn().mockImplementation((name: string, description: string) => {
        return Promise.resolve({
          id: "mock-new",
          name,
          description,
          createdAt: new Date().toISOString(),
        });
      }),
      getTasks: vi.fn().mockResolvedValue(mockTasks),
    },
  };
});

describe("Projects Route Loader & Actions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("loader correctly fetches project list", async () => {
    const data = await loader();
    expect(db.getProjects).toHaveBeenCalledTimes(1);
    expect(data.projects).toBeDefined();
    expect(data.projects[0].name).toBe("Mock Project Alpha");
  });

  it("action validates invalid input name", async () => {
    const request = new Request("http://localhost/app/projects", {
      method: "POST",
      body: new URLSearchParams({
        name: "Ab", // too short
        description: "Standard mock description for testing",
      }),
    });

    const response = await action({ request, params: {} });
    expect(response?.errors?.name).toContain("at least 3 characters");
    expect(db.createProject).not.toHaveBeenCalled();
  });

  it("action validates invalid input description", async () => {
    const request = new Request("http://localhost/app/projects", {
      method: "POST",
      body: new URLSearchParams({
        name: "A Valid Name",
        description: "Short", // too short
      }),
    });

    const response = await action({ request, params: {} });
    expect(response?.errors?.description).toContain("at least 10 characters");
    expect(db.createProject).not.toHaveBeenCalled();
  });

  it("action successfully creates project on valid inputs", async () => {
    const request = new Request("http://localhost/app/projects", {
      method: "POST",
      body: new URLSearchParams({
        name: "Super SaaS Platform",
        description: "A very robust SaaS platform product description.",
      }),
    });

    const response = await action({ request, params: {} });
    expect(response?.success).toBe(true);
    expect(db.createProject).toHaveBeenCalledWith(
      "Super SaaS Platform",
      "A very robust SaaS platform product description."
    );
  });
});

describe("Project Details Component Testing", () => {
  it("renders project details using createRoutesStub", async () => {
    // 1. Define the routing stub environment mocking the loader
    const Stub = createRoutesStub([
      {
        path: "/app/projects/:id",
        Component: ProjectDetails,
        HydrateFallback: () => <div>Loading...</div>,
        loader() {
          return {
            project: {
              id: "mock-1",
              name: "Mock Project Alpha",
              description: "This is a detailed mock description for alpha.",
              createdAt: "2026-05-01T00:00:00.000Z",
            },
            tasks: [
              { id: "mt1", projectId: "mock-1", title: "Verify testing configurations", completed: false },
            ],
          };
        },
      },
    ]);

    // 2. Render the stub component with matching initial route parameters
    render(<Stub initialEntries={["/app/projects/mock-1"]} />);

    // 3. Assert on expected elements in the document
    expect(await screen.findByText("Mock Project Alpha")).toBeInTheDocument();
    expect(await screen.findByText("This is a detailed mock description for alpha.")).toBeInTheDocument();
    expect(await screen.findByText("Verify testing configurations")).toBeInTheDocument();
  });
});
