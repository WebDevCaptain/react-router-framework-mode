import type { Route } from "./+types/home";
import { Link } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Project Hub - Simplify Your Work" },
    { name: "description", content: "The modern unified workspace to manage projects, tasks, and team productivity." },
  ];
}

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white overflow-hidden relative">
      {/* Background Gradients */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-indigo-900/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-purple-900/20 blur-[120px] pointer-events-none" />

      {/* Navigation Header */}
      <header className="relative z-10 border-b border-slate-800/80 bg-slate-950/70 backdrop-blur-md sticky top-0">
        <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/30 group-hover:scale-105 transition-all duration-300">
              P
            </div>
            <span className="font-extrabold text-xl bg-gradient-to-r from-indigo-200 via-indigo-100 to-white bg-clip-text text-transparent">
              ProjectHub
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-slate-300 hover:text-indigo-400 font-medium transition-colors">
              Home
            </Link>
            <Link to="/about" className="text-slate-300 hover:text-indigo-400 font-medium transition-colors">
              About
            </Link>
          </nav>

          <div>
            <Link
              to="/app/projects"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl font-semibold bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/45 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
            >
              Enter Dashboard
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-32">
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          {/* Tag */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-xs font-semibold uppercase tracking-wider animate-pulse">
            ✨ Framework Mode Demo
          </div>

          {/* Heading */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-tight sm:leading-none">
            Simplify how you manage{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-500 bg-clip-text text-transparent">
              Projects & Tasks
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Experience the next generation of React Router. Built with hybrid rendering (SSG + SSR), loaders, actions, and optimistic UI transitions.
          </p>

          {/* Call-to-actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              to="/app/projects"
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-xl shadow-indigo-500/20 hover:shadow-indigo-500/40 hover:scale-[1.03] transition-all duration-300 text-center"
            >
              Get Started for Free
            </Link>
            <Link
              to="/about"
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold border border-slate-800 bg-slate-900/60 hover:bg-slate-800/80 text-slate-300 hover:text-white transition-all duration-300 text-center"
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* Feature Grid */}
        <section className="mt-32 grid md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="p-8 rounded-2xl border border-slate-800/80 bg-slate-900/40 backdrop-blur-sm hover:border-indigo-500/50 hover:bg-slate-900/60 group transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center font-bold text-xl mb-6 group-hover:scale-110 transition-transform">
              ⚡
            </div>
            <h3 className="text-xl font-bold text-slate-200 mb-3 group-hover:text-indigo-400 transition-colors">
              Hybrid Rendering
            </h3>
            <p className="text-slate-400 leading-relaxed text-sm">
              Static Site Generation (SSG) for high-performance marketing pages, combined with Server-Side Rendering (SSR) for dynamic, custom user dashboards.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-8 rounded-2xl border border-slate-800/80 bg-slate-900/40 backdrop-blur-sm hover:border-purple-500/50 hover:bg-slate-900/60 group transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center justify-center font-bold text-xl mb-6 group-hover:scale-110 transition-transform">
              🔄
            </div>
            <h3 className="text-xl font-bold text-slate-200 mb-3 group-hover:text-purple-400 transition-colors">
              Automatic Revalidation
            </h3>
            <p className="text-slate-400 leading-relaxed text-sm">
              React Router actions process form submissions on the server and trigger an automatic re-fetch of relevant data, keeping the UI instantly synchronized.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-8 rounded-2xl border border-slate-800/80 bg-slate-900/40 backdrop-blur-sm hover:border-pink-500/50 hover:bg-slate-900/60 group transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-pink-500/10 text-pink-400 border border-pink-500/20 flex items-center justify-center font-bold text-xl mb-6 group-hover:scale-110 transition-transform">
              ✨
            </div>
            <h3 className="text-xl font-bold text-slate-200 mb-3 group-hover:text-pink-400 transition-colors">
              Optimistic Updates
            </h3>
            <p className="text-slate-400 leading-relaxed text-sm">
              Toggle complex workflows and checklist tasks with zero latency using fetchers, allowing users to interact with high-speed confidence.
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 py-8 relative z-10 text-center text-slate-500 text-xs">
        <p>&copy; {new Date().getFullYear()} Project Hub. Powered by React Router Framework Mode.</p>
      </footer>
    </div>
  );
}
