import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle2, ChevronRight, ChevronLeft } from "lucide-react";
import { CodeEditor } from "@/components/editor/code-editor";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function LearnPage() {
  return (
    <div className="flex flex-col h-screen bg-background overflow-hidden">
      {/* Header */}
      <header className="h-14 border-b border-border/50 bg-card/50 flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center space-x-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div className="flex items-center space-x-2 text-sm">
            <span className="font-medium text-muted-foreground">JavaScript Fundamentals</span>
            <ChevronRight className="w-4 h-4 text-muted-foreground/50" />
            <span className="font-semibold text-primary">Functions & Scope</span>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground mr-4 hidden md:flex">
            <CheckCircle2 className="w-4 h-4 text-green-500" />
            <span>Saved to cloud</span>
          </div>
          <div className="flex items-center space-x-1">
            <Button variant="outline" size="sm" className="h-8 hidden md:flex">
              <ChevronLeft className="w-4 h-4 mr-1" /> Prev
            </Button>
            <Button size="sm" className="h-8">
              Next <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Lesson Content Pane */}
        <div className="w-full md:w-1/2 lg:w-2/5 border-b md:border-b-0 md:border-r border-border/50 bg-card/20 flex flex-col h-[50vh] md:h-full">
          <ScrollArea className="flex-1 p-6">
            <div className="prose prose-invert max-w-none">
              <h1 className="text-3xl font-bold tracking-tight mb-2">Introduction to Functions</h1>
              <p className="text-lg text-muted-foreground mb-8">Learn how to group code into reusable blocks.</p>

              <div className="space-y-6 text-sm md:text-base text-foreground/90 leading-relaxed">
                <p>
                  A <strong>function</strong> is a reusable block of code designed to perform a particular task. 
                  Functions are the building blocks of JavaScript applications. They allow you to write code once and use it many times.
                </p>
                
                <h3 className="text-xl font-semibold mt-8 mb-4">Declaring a Function</h3>
                <p>
                  To create a function in JavaScript, you use the <code>function</code> keyword, followed by a name, 
                  parentheses <code>()</code>, and curly brackets <code>{}</code>.
                </p>

                <div className="bg-black/50 p-4 rounded-lg border border-border/50 font-mono text-sm text-blue-300">
                  <span className="text-purple-400">function</span> <span className="text-blue-400">sayHello</span>() {"{"}<br/>
                  &nbsp;&nbsp;<span className="text-orange-300">console</span>.<span className="text-blue-400">log</span>(<span className="text-green-400">"Hello, World!"</span>);<br/>
                  {"}"}
                </div>

                <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 mt-8">
                  <h4 className="font-semibold text-primary mb-2 flex items-center">
                    <span className="bg-primary/20 p-1 rounded-md mr-2">🎯</span> Challenge
                  </h4>
                  <p className="text-sm">
                    In the editor on the right, create a function called <code>greet</code> that takes a <code>name</code> parameter 
                    and logs <code>"Hello, [name]!"</code> to the console.
                  </p>
                </div>
              </div>
            </div>
          </ScrollArea>
        </div>

        {/* Code Sandbox Pane */}
        <div className="flex-1 flex flex-col h-[50vh] md:h-full bg-background relative">
          <div className="absolute inset-0">
            <CodeEditor 
              language="javascript"
              initialCode={`// Write your code below:

function greet(name) {
  // your code here
}

greet("Alice");
`}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
