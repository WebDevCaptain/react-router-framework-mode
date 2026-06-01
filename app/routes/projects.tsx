import type { Route } from "./+types/projects";
import { Form, Link, useNavigation } from "react-router";
import { db } from "../db.server";
import { useState, useEffect } from "react";

export async function loader() {
  const projects = await db.getProjects();
  return { projects };
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;

  const errors: Record<string, string> = {};
  if (!name || name.trim().length < 3) {
    errors.name = "Project name must be at least 3 characters.";
  }
  if (!description || description.trim().length < 10) {
    errors.description = "Description must be at least 10 characters.";
  }

  if (Object.keys(errors).length > 0) {
    return { errors, values: { name, description } };
  }

  await db.createProject(name, description);
  return { success: true, errors: null };
}

export default function Projects({ loaderData, actionData }: Route.ComponentProps) {
  const { projects } = loaderData;
  const navigation = useNavigation();
  const [showDrawer, setShowDrawer] = useState(false);

  const isSubmitting =
    navigation.state === "submitting" &&
    navigation.formAction === "/app/projects" &&
    navigation.formMethod === "POST";

  // Automatically close drawer when creation is successful
  useEffect(() => {
    if (actionData?.success && !isSubmitting) {
      setShowDrawer(false);
    }
  }, [actionData, isSubmitting]);

  return (
    <div className="space-y-8 relative">
      {/* Header Area */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-slate-100 to-indigo-300 bg-clip-text text-transparent">
            Your Projects
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Create, view, and organize your active workspace items.
          </p>
        </div>

        <button
          onClick={() => setShowDrawer(true)}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/25 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
        >
          <span>➕</span> New Project
        </button>
      </div>

      {/* Projects Grid */}
      {projects.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-slate-800 rounded-2xl bg-slate-900/10">
          <p className="text-slate-500 font-medium">No projects found. Create one to get started!</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Link
              key={project.id}
              to={`/app/projects/${project.id}`}
              className="group relative block p-6 rounded-2xl border border-slate-800/80 bg-slate-900/20 hover:bg-slate-900/40 hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-950/10 transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Card Glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/5 to-purple-500/0 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300" />

              <div className="relative z-10 space-y-4">
                <div className="flex justify-between items-start gap-4">
                  <h3 className="text-lg font-bold text-slate-100 group-hover:text-indigo-400 transition-colors line-clamp-1">
                    {project.name}
                  </h3>
                  <span className="text-[10px] bg-slate-800 text-slate-400 font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0">
                    Active
                  </span>
                </div>

                <p className="text-slate-400 text-sm leading-relaxed line-clamp-2 min-h-10">
                  {project.description}
                </p>

                <div className="border-t border-slate-800/60 pt-4 flex items-center justify-between text-xs text-slate-500">
                  <span>📅 {new Date(project.createdAt).toLocaleDateString()}</span>
                  <span className="text-indigo-400 font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    Manage Tasks &rarr;
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Slide-out Drawer for Project Creation */}
      {showDrawer && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex justify-end">
          {/* Overlay click to close */}
          <div className="absolute inset-0" onClick={() => setShowDrawer(false)} />

          {/* Form container */}
          <div className="relative w-full max-w-md bg-slate-900 border-l border-slate-800/80 h-full p-8 flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-300">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-100">Create New Project</h3>
                <button
                  onClick={() => setShowDrawer(false)}
                  className="w-8 h-8 rounded-lg hover:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-slate-200 transition-colors"
                >
                  ✕
                </button>
              </div>

              <Form method="post" className="space-y-5" replace>
                {/* Project Name */}
                <div className="space-y-1.5">
                  <label htmlFor="name" className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Project Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="e.g. Acme API Development"
                    defaultValue={actionData?.values?.name || ""}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                  />
                  {actionData?.errors?.name && (
                    <p className="text-xs text-rose-500 font-semibold">{actionData.errors.name}</p>
                  )}
                </div>

                {/* Project Description */}
                <div className="space-y-1.5">
                  <label htmlFor="description" className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={4}
                    placeholder="Provide a summary of the scope and deliverables..."
                    defaultValue={actionData?.values?.description || ""}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors resize-none"
                  />
                  {actionData?.errors?.description && (
                    <p className="text-xs text-rose-500 font-semibold">{actionData.errors.description}</p>
                  )}
                </div>

                {/* Submit button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-600/50 text-white shadow-lg shadow-indigo-600/25 transition-all duration-300"
                  >
                    {isSubmitting ? (
                      <span className="inline-block w-4 h-4 border-2 border-slate-300 border-t-white rounded-full animate-spin" />
                    ) : (
                      "Create Project"
                    )}
                  </button>
                </div>
              </Form>
            </div>

            <div className="text-center text-[10px] text-slate-500">
              Submitting triggers server-side validation and DB insertion.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
