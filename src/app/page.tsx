import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Code2, Terminal, Play, CheckCircle2, Sparkles } from "lucide-react";
import { CodeEditor } from "@/components/editor/code-editor";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <header className="fixed top-0 w-full z-50 glass">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-primary/10 p-2 rounded-xl">
              <Code2 className="w-6 h-6 text-primary" />
            </div>
            <span className="font-bold text-xl tracking-tight">Elfundamental</span>
          </div>
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
            <Link href="#features" className="text-muted-foreground hover:text-foreground transition">Features</Link>
            <Link href="#curriculum" className="text-muted-foreground hover:text-foreground transition">Curriculum</Link>
            <Link href="#playground" className="text-muted-foreground hover:text-foreground transition">Playground</Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Link href="/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/register">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 pt-24">
        <section className="relative overflow-hidden pt-20 pb-32">
          {/* Background Elements */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] -z-10" />
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] -z-10" />

          <div className="container mx-auto px-4 text-center">
            <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-8 border border-primary/20">
              <Sparkles className="w-4 h-4" />
              <span>Master the fundamentals interactively</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8">
              Learn to code by <br className="hidden md:block" />
              <span className="text-gradient">actually coding.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
              Bite-sized lessons, interactive challenges, and real-time feedback. 
              Master Python and JavaScript without leaving your browser.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/courses">
                <Button size="lg" className="h-14 px-8 text-lg w-full sm:w-auto shadow-[0_0_40px_-10px_rgba(var(--primary),0.5)]">
                  Start Learning Now
                  <Play className="ml-2 w-5 h-5 fill-current" />
                </Button>
              </Link>
              <Link href="#playground">
                <Button size="lg" variant="outline" className="h-14 px-8 text-lg w-full sm:w-auto bg-background/50 backdrop-blur-sm">
                  Try the Playground
                  <Terminal className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 bg-muted/50 border-y border-border/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything you need to succeed</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We've removed the friction of setting up environments so you can focus on what matters: writing code and solving problems.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Interactive Sandbox",
                  description: "Write and execute Python and JavaScript directly in your browser. No installation required.",
                  icon: Terminal,
                },
                {
                  title: "Bite-Sized Modules",
                  description: "Complex concepts broken down into easy-to-understand, linear learning paths.",
                  icon: Code2,
                },
                {
                  title: "Real-Time Validation",
                  description: "Get instant feedback on your code with automated tests and quizzes at the end of each lesson.",
                  icon: CheckCircle2,
                },
              ].map((feature, i) => (
                <div key={i} className="glass-card p-8 rounded-2xl hover:border-primary/50 transition-colors duration-300">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Playground Section */}
        <section id="playground" className="py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Try it right now</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
                Experience our interactive sandbox. Write code, click run, and see the output instantly.
                No setup, no waiting.
              </p>
            </div>
            
            <div className="max-w-5xl mx-auto">
              <CodeEditor 
                language="javascript" 
                initialCode={`// Welcome to Elfundamental!
// Try running this basic JavaScript code:

function greet(name) {
  return \`Hello, \${name}! Welcome to the future of learning.\`;
}

console.log(greet('Student'));`} 
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border/50 py-12">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2026 Elfundamental. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
