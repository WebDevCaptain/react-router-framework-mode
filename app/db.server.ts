export interface Project {
  id: string;
  name: string;
  description: string;
  createdAt: string;
}

export interface Task {
  id: string;
  projectId: string;
  title: string;
  completed: boolean;
}

// Simulated in-memory database
class Database {
  private projects: Project[] = [
    {
      id: "rr-upgrade",
      name: "React Router v7 Framework Mode",
      description: "Learn and implement the new Unified Framework Mode features.",
      createdAt: new Date("2026-05-15").toISOString(),
    },
    {
      id: "marketing-redesign",
      name: "Acme Landing Redesign",
      description: "Develop a premium, modern dark-themed landing page featuring rich glassmorphism cards.",
      createdAt: new Date("2026-05-28").toISOString(),
    },
  ];

  private tasks: Task[] = [
    { id: "t1", projectId: "rr-upgrade", title: "Scaffold boilerplate using pnpm CLI", completed: true },
    { id: "t2", projectId: "rr-upgrade", title: "Configure SSG prerendering routes", completed: true },
    { id: "t3", projectId: "rr-upgrade", title: "Build centralized routes mapping", completed: true },
    { id: "t4", projectId: "rr-upgrade", title: "Implement in-memory db.server utility", completed: true },
    { id: "t5", projectId: "rr-upgrade", title: "Integrate loaders for projects page", completed: false },
    { id: "t6", projectId: "rr-upgrade", title: "Add actions for new project creation", completed: false },
    { id: "t7", projectId: "rr-upgrade", title: "Optimize with pending loading states", completed: false },
    { id: "t8", projectId: "rr-upgrade", title: "Build optimistic UI task toggle using useFetcher()", completed: false },
    { id: "t9", projectId: "marketing-redesign", title: "Design core layout with dark slate background", completed: true },
    { id: "t10", projectId: "marketing-redesign", title: "Create feature grids with glowing hover borders", completed: true },
    { id: "t11", projectId: "marketing-redesign", title: "Integrate Outfit font and typography styling", completed: false },
  ];

  async getProjects(): Promise<Project[]> {
    // Artificial latency to demonstrate pending UI states
    await new Promise((resolve) => setTimeout(resolve, 600));
    return [...this.projects].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }

  async getProject(id: string): Promise<Project | undefined> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return this.projects.find((p) => p.id === id);
  }

  async createProject(name: string, description: string): Promise<Project> {
    await new Promise((resolve) => setTimeout(resolve, 800)); // Actions can have latency too!
    const newProject: Project = {
      id: Math.random().toString(36).substring(2, 9),
      name: name || "Untitled Project",
      description: description || "No description provided.",
      createdAt: new Date().toISOString(),
    };
    this.projects.push(newProject);
    return newProject;
  }

  async getTasks(projectId: string): Promise<Task[]> {
    await new Promise((resolve) => setTimeout(resolve, 400));
    return this.tasks.filter((t) => t.projectId === projectId);
  }

  async addTask(projectId: string, title: string): Promise<Task> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const newTask: Task = {
      id: Math.random().toString(36).substring(2, 9),
      projectId,
      title,
      completed: false,
    };
    this.tasks.push(newTask);
    return newTask;
  }

  async toggleTask(taskId: string, completed: boolean): Promise<Task | undefined> {
    await new Promise((resolve) => setTimeout(resolve, 400));
    const task = this.tasks.find((t) => t.id === taskId);
    if (task) {
      task.completed = completed;
    }
    return task;
  }
}

// Global instance to persist in-memory across HMR (Hot Module Replacement) restarts
const globalForDb = global as unknown as { db: Database };
export const db = globalForDb.db || new Database();
if (process.env.NODE_ENV !== "production") globalForDb.db = db;
