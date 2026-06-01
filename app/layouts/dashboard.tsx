import { Link, NavLink, Outlet, useNavigation } from "react-router";
import { useEffect, useState } from "react";

export default function DashboardLayout() {
  const navigation = useNavigation();
  const [theme, setTheme] = useState("dark");

  // Synchronize client-side local theme preference
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col md:flex-row relative">
      {/* Absolute Glow Background */}
      <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] rounded-full bg-indigo-900/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[10%] w-[500px] h-[500px] rounded-full bg-purple-900/10 blur-[130px] pointer-events-none" />

      {/* Sidebar */}
      <aside className="w-full md:w-68 border-b md:border-b-0 md:border-r border-slate-800/80 bg-slate-950/80 backdrop-blur-md flex flex-col justify-between shrink-0 z-20">
        <div>
          {/* Logo */}
          <div className="px-6 h-18 flex items-center border-b border-slate-800/60">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-white text-sm shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-300">
                P
              </div>
              <span className="font-extrabold text-lg bg-gradient-to-r from-slate-200 via-slate-100 to-white bg-clip-text text-transparent">
                ProjectHub
              </span>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-2">
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-4 mb-2">
              Management
            </div>

            <NavLink
              to="/app/projects"
              end
              className={({ isActive, isPending }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-indigo-500 to-indigo-600 text-white shadow-lg shadow-indigo-600/25"
                    : isPending
                    ? "bg-indigo-900/20 border border-indigo-500/20 text-indigo-400 animate-pulse"
                    : "text-slate-400 hover:bg-slate-900/50 hover:text-slate-200"
                }`
              }
            >
              <span>📂</span>
              <span>Projects</span>
            </NavLink>

            <NavLink
              to="/app/profile"
              className={({ isActive, isPending }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-indigo-500 to-indigo-600 text-white shadow-lg shadow-indigo-600/25"
                    : isPending
                    ? "bg-indigo-900/20 border border-indigo-500/20 text-indigo-400 animate-pulse"
                    : "text-slate-400 hover:bg-slate-900/50 hover:text-slate-200"
                }`
              }
            >
              <span>👤</span>
              <span>User Profile</span>
            </NavLink>
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-800/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center font-bold text-indigo-400 border border-indigo-500/20">
              U
            </div>
            <div className="text-xs">
              <p className="font-bold text-slate-300">Shreyash</p>
              <p className="text-[10px] text-slate-500">Developer Mode</p>
            </div>
          </div>

          <Link
            to="/"
            title="Exit Dashboard"
            className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-slate-800 flex items-center justify-center border border-slate-800 hover:border-slate-700 transition-colors"
          >
            🚪
          </Link>
        </div>
      </aside>

      {/* Main Dashboard Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-18 border-b border-slate-800/80 bg-slate-950/40 backdrop-blur-md px-6 flex items-center justify-between z-10 shrink-0">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-extrabold text-slate-200">Workspace</h2>
            {navigation.state !== "idle" && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 animate-pulse">
                Syncing...
              </span>
            )}
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xs text-slate-500">Theme: {theme.toUpperCase()}</span>
          </div>
        </header>

        {/* Content Outlet */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
