import type { Route } from "./+types/about";
import { Link } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "About - Project Hub" },
    { name: "description", content: "Learn about the architecture and technologies powering Project Hub." },
  ];
}

export default function About() {
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
            <Link to="/about" className="text-slate-400 hover:text-indigo-400 font-medium transition-colors">
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
      <main className="relative z-10 max-w-4xl mx-auto px-6 pt-16 pb-24">
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
              About{" "}
              <span className="bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
                Project Hub
              </span>
            </h1>
            <p className="text-lg text-slate-400 max-w-xl mx-auto">
              A deep-dive educational demo exploration of React Router v7's powerful Framework Mode features.
            </p>
          </div>

          <article className="prose prose-invert max-w-none space-y-8 text-slate-300">
            <div className="p-8 rounded-2xl border border-slate-800 bg-slate-900/40 backdrop-blur-sm space-y-4">
              <h2 className="text-2xl font-bold text-slate-100">Project Mission & Motivation</h2>
              <p className="leading-relaxed">
                Project Hub was crafted to fully explore React Router v7's **Framework Mode** (formerly Remix). Rather than utilizing it purely as a client-side routing library, this application configures the router as a full-stack, cohesive orchestrator managing:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-400">
                <li>Static pre-rendering for top-of-funnel conversion and SEO assets.</li>
                <li>Dynamic Server-Side Rendering (SSR) for real-time dashboard data.</li>
                <li>Comprehensive loaders and mutations (Actions) with instant data validation.</li>
                <li>Hyper-responsive user interfaces with Optimistic UI updates.</li>
              </ul>
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-100">The Technology Architecture</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 rounded-xl border border-slate-800/80 bg-slate-900/20">
                  <h3 className="text-lg font-bold text-indigo-400 mb-2">React Router v7 Framework</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Uses new route config structures inside <code className="text-slate-300">app/routes.ts</code> and local generated type-safety with typegen, removing type overhead.
                  </p>
                </div>
                <div className="p-6 rounded-xl border border-slate-800/80 bg-slate-900/20">
                  <h3 className="text-lg font-bold text-purple-400 mb-2">Tailwind CSS v4 & Vite</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Leverages Vite 8 and Tailwind v4's unified CSS-first compiler for lightning-fast compilation, zero-runtime overhead, and premium utility support.
                  </p>
                </div>
                <div className="p-6 rounded-xl border border-slate-800/80 bg-slate-900/20">
                  <h3 className="text-lg font-bold text-pink-400 mb-2">Client-Side Hydration</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Features local preference loading via Client Loaders paired with skeleton Fallbacks to achieve flicker-free initial document hydrates.
                  </p>
                </div>
                <div className="p-6 rounded-xl border border-slate-800/80 bg-slate-900/20">
                  <h3 className="text-lg font-bold text-emerald-400 mb-2">Vitest & Playwright</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    End-to-end typegen testing using unit specifications, component stubs, and full automated headful visual regression checks.
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center pt-8">
              <Link
                to="/app/projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20 transition-all duration-300 hover:scale-[1.02]"
              >
                Go to Dashboard &rarr;
              </Link>
            </div>
          </article>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 py-8 relative z-10 text-center text-slate-500 text-xs">
        <p>&copy; {new Date().getFullYear()} Project Hub. Powered by React Router Framework Mode.</p>
      </footer>
    </div>
  );
}
