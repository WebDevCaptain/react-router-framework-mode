import type { Route } from "./+types/profile";
import { Form, useNavigation } from "react-router";
import { useEffect, useState } from "react";

// Client-only loader to read from localStorage
export async function clientLoader() {
  // Add a minor artificial delay to make the HydrateFallback visible and satisfying to watch!
  await new Promise((resolve) => setTimeout(resolve, 500));
  const theme = typeof window !== "undefined" ? localStorage.getItem("theme") || "dark" : "dark";
  return { theme };
}

// Client-only action to write to localStorage
export async function clientAction({ request }: Route.ClientActionArgs) {
  const formData = await request.formData();
  const theme = formData.get("theme") as string;
  if (typeof window !== "undefined") {
    localStorage.setItem("theme", theme);
    // Apply class to HTML root element
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }
  return { success: true };
}

// Hydrate Fallback shown during client loading on page hydrate
export function HydrateFallback() {
  return (
    <div className="space-y-8 max-w-2xl mx-auto animate-pulse">
      <div className="space-y-2">
        <div className="h-8 bg-slate-800 rounded-lg w-1/3" />
        <div className="h-4 bg-slate-800 rounded-lg w-1/2" />
      </div>

      <div className="border border-slate-800 rounded-2xl p-8 bg-slate-900/10 space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-slate-800" />
          <div className="space-y-2 flex-1">
            <div className="h-5 bg-slate-800 rounded-lg w-1/4" />
            <div className="h-3 bg-slate-800 rounded-lg w-1/3" />
          </div>
        </div>

        <div className="border-t border-slate-800/80 pt-6 space-y-4">
          <div className="h-4 bg-slate-800 rounded-lg w-1/4" />
          <div className="flex gap-4">
            <div className="h-10 bg-slate-800 rounded-lg flex-1" />
            <div className="h-10 bg-slate-800 rounded-lg flex-1" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Profile({ loaderData }: Route.ComponentProps) {
  const { theme } = loaderData;
  const navigation = useNavigation();
  const [activeTheme, setActiveTheme] = useState(theme);

  // Synchronize internal state on navigation changes
  useEffect(() => {
    setActiveTheme(theme);
  }, [theme]);

  const isSaving = navigation.state === "submitting";

  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      {/* Heading */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-slate-100 to-indigo-300 bg-clip-text text-transparent">
          User Settings
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Customize your profile and application behavior preferences.
        </p>
      </div>

      {/* Main Settings Card */}
      <div className="border border-slate-800 rounded-3xl p-8 bg-slate-900/20 backdrop-blur-md relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-36 h-36 rounded-full bg-purple-500/5 blur-3xl pointer-events-none" />

        <div className="space-y-6">
          {/* User Profile Info */}
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-indigo-500 via-indigo-600 to-purple-600 flex items-center justify-center font-black text-white text-2xl shadow-lg shadow-indigo-500/20">
              S
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-200">Shreyash</h3>
              <p className="text-xs text-slate-500 font-medium">shreyash@example.com</p>
            </div>
          </div>

          {/* Settings Section Divider */}
          <div className="border-t border-slate-800/80 pt-6">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
              Appearance Theme
            </h4>

            {/* Client Action Form */}
            <Form method="post" className="grid grid-cols-2 gap-4">
              <label
                className={`flex flex-col items-center justify-center gap-3 p-5 rounded-2xl border cursor-pointer select-none transition-all duration-300 hover:bg-slate-900/40 ${
                  activeTheme === "dark"
                    ? "border-indigo-500 bg-indigo-500/5 shadow-indigo-950/20"
                    : "border-slate-800 bg-slate-950/20 hover:border-slate-700"
                }`}
              >
                <input
                  type="radio"
                  name="theme"
                  value="dark"
                  checked={activeTheme === "dark"}
                  onChange={() => setActiveTheme("dark")}
                  className="sr-only"
                />
                <span className="text-2xl">🌙</span>
                <span className="text-sm font-bold text-slate-300">Dark Mode</span>
                <span className="text-[10px] text-slate-500 text-center leading-normal mt-1">
                  Gentle on the eyes, rich dashboard contrasts.
                </span>
              </label>

              <label
                className={`flex flex-col items-center justify-center gap-3 p-5 rounded-2xl border cursor-pointer select-none transition-all duration-300 hover:bg-slate-900/40 ${
                  activeTheme === "light"
                    ? "border-indigo-500 bg-indigo-500/5 shadow-indigo-950/20"
                    : "border-slate-800 bg-slate-950/20 hover:border-slate-700"
                }`}
              >
                <input
                  type="radio"
                  name="theme"
                  value="light"
                  checked={activeTheme === "light"}
                  onChange={() => setActiveTheme("light")}
                  className="sr-only"
                />
                <span className="text-2xl">☀️</span>
                <span className="text-sm font-bold text-slate-300">Light Mode</span>
                <span className="text-[10px] text-slate-500 text-center leading-normal mt-1">
                  Clean contrast for bright environment viewing.
                </span>
              </label>

              {/* Save settings action button */}
              <div className="col-span-2 pt-4">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-600/50 text-white shadow-lg shadow-indigo-600/25 transition-all duration-300"
                >
                  {isSaving ? (
                    <span className="inline-block w-4 h-4 border-2 border-slate-300 border-t-white rounded-full animate-spin" />
                  ) : (
                    "Save Preference"
                  )}
                </button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
