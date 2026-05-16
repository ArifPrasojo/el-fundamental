import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Code2, Terminal, Play, CheckCircle2, ChevronRight, BookOpen, Trophy } from "lucide-react";
import { CodeEditor } from "@/components/editor/code-editor";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <header className="fixed top-0 w-full z-50 glass">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2 group cursor-pointer hover:opacity-90 transition-opacity">
            <svg width="44" height="44" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-[3px_3px_0px_rgba(28,61,138,0.5)]">
              {/* Outer Hexagon */}
              <path d="M50 5 L93 30 L93 70 L50 95 L7 70 L7 30 Z" stroke="currentColor" strokeWidth="8" strokeLinejoin="bevel" className="text-primary" />
              {/* Inner details */}
              <path d="M30 35 L70 35 L70 45 L30 45 Z" fill="currentColor" className="text-secondary" />
              <path d="M30 55 L55 55 L55 65 L30 65 Z" fill="currentColor" className="text-accent" />
              <rect x="70" y="55" width="10" height="10" fill="currentColor" className="text-primary" />
            </svg>
          </div>
          <nav className="hidden md:flex items-center space-x-8 text-sm font-bold uppercase tracking-wider text-primary">
            <Link href="#features" className="hover:text-accent transition">Specs</Link>
            <Link href="#curriculum" className="hover:text-accent transition">Modules</Link>
            <Link href="#playground" className="hover:text-accent transition">Terminal</Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Link href="/login">
              <Button variant="ghost" className="font-bold uppercase text-primary hover:text-accent hover:bg-transparent">Log In</Button>
            </Link>
            <Link href="/register">
              <Button className="font-bold uppercase rounded-none border-2 border-primary bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-[4px_4px_0px_rgba(28,61,138,1)] hover:translate-y-1 hover:shadow-[2px_2px_0px_rgba(28,61,138,1)] transition-all">Engage</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center gap-16 max-w-6xl mx-auto">
            {/* Top Content */}
            <div className="w-full text-center space-y-8 flex flex-col items-center">
              <div className="inline-block px-4 py-1.5 bg-secondary text-secondary-foreground text-sm font-bold tracking-widest border-2 border-primary shadow-[2px_2px_0px_rgba(28,61,138,1)]">
                /// SYSTEM_INITIALIZED v2.0
              </div>
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter leading-[1.1] uppercase">
                Master Code <br className="hidden md:block" />
                <span className="text-primary border-b-4 border-accent pb-2">Like A Pilot</span>
              </h1>
              <p className="text-lg md:text-xl text-foreground font-medium max-w-3xl bg-card p-4 border-2 border-primary shadow-[4px_4px_0px_rgba(251,191,36,1)]">
                Engage in interactive learning modules for Python and JavaScript. Train your logic, complete tactical coding missions, and level up your engineering skills.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Link href="/register">
                  <Button size="lg" className="h-14 px-8 text-lg bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-[6px_6px_0px_rgba(224,26,34,1)] border-2 border-primary hover:translate-y-1 hover:shadow-[2px_2px_0px_rgba(224,26,34,1)] transition-all uppercase rounded-none">
                    Start Mission <ChevronRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link href="#features">
                  <Button variant="outline" size="lg" className="h-14 px-8 text-lg font-bold border-2 border-primary text-primary bg-background hover:bg-primary/10 shadow-[6px_6px_0px_rgba(28,61,138,1)] hover:translate-y-1 hover:shadow-[2px_2px_0px_rgba(28,61,138,1)] transition-all uppercase rounded-none">
                    View Specs
                  </Button>
                </Link>
              </div>
            </div>

            {/* Bottom Content - Mockup Code Editor */}
            <div className="w-full max-w-4xl">
              <div className="mecha-panel p-1 shadow-[12px_12px_0px_rgba(28,61,138,0.5)]">
                <div className="h-10 bg-primary border-b-2 border-primary flex items-center px-4">
                  <div className="flex space-x-2">
                    <div className="w-4 h-4 bg-accent border border-black/20"></div>
                    <div className="w-4 h-4 bg-secondary border border-black/20"></div>
                    <div className="w-4 h-4 bg-green-500 border border-black/20"></div>
                  </div>
                  <div className="mx-auto text-sm font-bold font-mono text-primary-foreground uppercase tracking-widest">terminal_interface.exe</div>
                </div>
                <div className="h-[450px] relative bg-background border-t-2 border-primary">
                  <CodeEditor 
                    initialCode={`// INITIALIZING COMBAT SEQUENCE...\nfunction lockOnTarget(target) {\n  console.log("Target locked: " + target);\n  return true;\n}\n\nconst status = lockOnTarget("Enemy Unit");\nif(status) {\n  console.log("Weapons ready. Awaiting command.");\n}`} 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section id="features" className="py-24 bg-card/80 border-y-4 border-primary relative overflow-hidden">
        {/* Decorative grid */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyOCwgNjEsIDEzOCwgMC4xKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50 pointer-events-none" />
        
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4 inline-block bg-primary text-primary-foreground px-6 py-2 border-b-4 border-accent shadow-[4px_4px_0px_rgba(251,191,36,1)]">Core Systems</h2>
            <p className="text-primary max-w-2xl mx-auto font-bold mt-4 uppercase tracking-widest text-sm">Equipped with state-of-the-art learning mechanisms.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="mecha-panel p-8 shadow-[6px_6px_0px_rgba(28,61,138,0.3)] hover:-translate-y-2 transition-transform duration-300">
              <div className="w-14 h-14 bg-primary text-primary-foreground flex items-center justify-center mb-6 border-2 border-primary shadow-[4px_4px_0px_rgba(251,191,36,1)]">
                <Terminal className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold uppercase mb-3 text-primary">Live Execution</h3>
              <p className="text-foreground text-sm font-medium">
                Test your code instantly in the browser. Powered by Pyodide and secure sandboxing mechanisms.
              </p>
            </div>

            <div className="mecha-panel p-8 shadow-[6px_6px_0px_rgba(28,61,138,0.3)] hover:-translate-y-2 transition-transform duration-300">
              <div className="w-14 h-14 bg-secondary text-secondary-foreground flex items-center justify-center mb-6 border-2 border-primary shadow-[4px_4px_0px_rgba(28,61,138,1)]">
                <BookOpen className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold uppercase mb-3 text-primary">Tactical Modules</h3>
              <p className="text-foreground text-sm font-medium">
                Structured learning paths from basic variables to advanced logic circuits. Zero filler.
              </p>
            </div>

            <div className="mecha-panel p-8 shadow-[6px_6px_0px_rgba(28,61,138,0.3)] hover:-translate-y-2 transition-transform duration-300">
              <div className="w-14 h-14 bg-accent text-accent-foreground flex items-center justify-center mb-6 border-2 border-primary shadow-[4px_4px_0px_rgba(28,61,138,1)]">
                <Trophy className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold uppercase mb-3 text-primary">Rank Progression</h3>
              <p className="text-foreground text-sm font-medium">
                Earn XP, maintain your daily streak, and unlock pilot badges as you complete missions.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-primary text-primary-foreground py-8 border-t-8 border-accent">
        <div className="container mx-auto px-4 text-center">
          <p className="font-mono text-sm tracking-widest opacity-80 uppercase">© 2026 Elfundamental Core. All systems nominal.</p>
        </div>
      </footer>
    </div>
  );
}
