import type { Route } from "./+types/project-details";
import { Form, Link, useFetcher, useNavigation } from "react-router";
import { db } from "../db.server";
import { useRef, useEffect } from "react";

export async function loader({ params }: Route.LoaderArgs) {
  const project = await db.getProject(params.id);
  if (!project) {
    throw new Response("Project Not Found", { status: 404 });
  }
  const tasks = await db.getTasks(params.id);
  return { project, tasks };
}

export async function action({ request, params }: Route.ActionArgs) {
  const formData = await request.formData();
  const actionType = formData.get("_action") as string;

  if (actionType === "add-task") {
    const title = formData.get("title") as string;
    if (!title || title.trim().length === 0) {
      return { error: "Task title cannot be empty." };
    }
    await db.addTask(params.id, title);
    return { success: true };
  }

  if (actionType === "toggle-task") {
    const taskId = formData.get("taskId") as string;
    const completed = formData.get("completed") === "true";
    await db.toggleTask(taskId, completed);
    return { success: true };
  }

  return null;
}

export default function ProjectDetails({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  const { project, tasks } = loaderData;
  const navigation = useNavigation();
  const addTaskFormRef = useRef<HTMLFormElement>(null);

  const isAddingTask =
    navigation.state === "submitting" &&
    navigation.formData?.get("_action") === "add-task";

  // Automatically reset the add task form upon successful addition
  useEffect(() => {
    if (!isAddingTask && addTaskFormRef.current) {
      addTaskFormRef.current.reset();
    }
  }, [isAddingTask]);

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Back button */}
      <div>
        <Link
          to="/app/projects"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-indigo-400 transition-colors"
        >
          &larr; Back to Projects
        </Link>
      </div>

      {/* Project Heading Card */}
      <div className="relative p-8 rounded-3xl border border-slate-800 bg-slate-900/10 backdrop-blur-md overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-indigo-500/5 blur-3xl pointer-events-none" />

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">📂</span>
            <h1 className="text-3xl font-extrabold text-slate-100">
              {project.name}
            </h1>
          </div>
          <p className="text-slate-400 leading-relaxed text-sm max-w-2xl">
            {project.description}
          </p>
          <div className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">
            Created: {new Date(project.createdAt).toLocaleDateString()}
          </div>
        </div>
      </div>

      {/* Tasks Section */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-slate-200 flex items-center gap-2">
          <span>📋</span> Project Checklist
        </h2>

        <div className="border border-slate-800 rounded-2xl bg-slate-900/20 backdrop-blur-sm divide-y divide-slate-800/60 overflow-hidden shadow-lg">
          {tasks.length === 0 ? (
            <div className="p-8 text-center text-slate-500 text-sm">
              No tasks created yet. Use the input below to add your first task!
            </div>
          ) : (
            tasks.map((task) => <TaskRow key={task.id} task={task} />)
          )}
        </div>

        {/* Add Task Form */}
        <Form
          method="post"
          ref={addTaskFormRef}
          className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 bg-slate-900/30 p-4 border border-slate-800/80 rounded-2xl"
        >
          <input type="hidden" name="_action" value="add-task" />
          <input
            type="text"
            name="title"
            placeholder="Add a new deliverable item..."
            className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
            required
            disabled={isAddingTask}
          />
          <button
            type="submit"
            disabled={isAddingTask}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold bg-slate-800 border border-slate-700 hover:bg-slate-700 hover:border-slate-600 disabled:bg-slate-800 text-slate-200 transition-all duration-300 shrink-0"
          >
            {isAddingTask ? (
              <span className="inline-block w-4 h-4 border-2 border-slate-400 border-t-white rounded-full animate-spin" />
            ) : (
              "Add Task"
            )}
          </button>
        </Form>
      </div>
    </div>
  );
}

// Separate component for task row to handle isolated fetching / Optimistic UI
function TaskRow({
  task,
}: {
  task: { id: string; title: string; completed: boolean };
}) {
  const fetcher = useFetcher();

  // Optimistic UI state determination!
  // If fetcher.formData is populated, we are in an in-flight mutation request.
  // We read the 'completed' value optimistically.
  const isCompletedOptimistic = fetcher.formData
    ? fetcher.formData.get("completed") === "true"
    : task.completed;

  // Let's also check if the toggle action is in-flight to dim the text
  const isPending = fetcher.state !== "idle";

  return (
    <div
      className={`p-4 flex items-center justify-between gap-4 transition-all duration-300 ${
        isCompletedOptimistic ? "bg-slate-900/10" : ""
      }`}
    >
      <div className="flex items-center gap-3.5 flex-1 min-w-0">
        {/* Optimistic Checkbox */}
        <fetcher.Form method="post">
          <input type="hidden" name="_action" value="toggle-task" />
          <input type="hidden" name="taskId" value={task.id} />
          {/* Submit automatically on change */}
          <input
            type="checkbox"
            name="completed"
            value={isCompletedOptimistic ? "false" : "true"}
            checked={isCompletedOptimistic}
            onChange={(e) => {
              fetcher.submit(e.currentTarget.form);
            }}
            className="w-5 h-5 rounded border-slate-700 text-indigo-600 bg-slate-950 focus:ring-offset-slate-950 focus:ring-indigo-500 cursor-pointer accent-indigo-500"
          />
        </fetcher.Form>

        {/* Task Title */}
        <span
          className={`text-sm select-none font-medium truncate transition-all duration-300 ${
            isCompletedOptimistic
              ? "text-slate-500 line-through decoration-slate-600"
              : "text-slate-200"
          } ${isPending ? "opacity-60" : "opacity-100"}`}
        >
          {task.title}
        </span>
      </div>

      {/* Optimistic Pending Tag */}
      {isPending && (
        <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider animate-pulse select-none shrink-0">
          Updating...
        </span>
      )}
    </div>
  );
}
