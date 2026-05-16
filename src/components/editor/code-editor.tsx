"use client";

import { useState } from "react";
import Editor from "@monaco-editor/react";
import { Button } from "@/components/ui/button";
import { Play, RotateCcw, Loader2 } from "lucide-react";
import { useTheme } from "next-themes";

interface CodeEditorProps {
  initialCode: string;
  language?: "python" | "javascript";
}

export function CodeEditor({ initialCode, language = "javascript" }: CodeEditorProps) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const { theme } = useTheme();

  const handleRun = async () => {
    setIsRunning(true);
    setOutput("Running...\n");
    
    try {
      // Simulate execution for now
      await new Promise(resolve => setTimeout(resolve, 1000));
      setOutput(prev => prev + "> Execution completed successfully.\n> Hello World!");
    } catch (error) {
      setOutput(prev => prev + "> Error executing code.");
    } finally {
      setIsRunning(false);
    }
  };

  const handleReset = () => {
    setCode(initialCode);
    setOutput("");
  };

  return (
    <div className="flex flex-col h-[500px] border border-border/50 rounded-xl overflow-hidden glass-card">
      {/* Editor Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-border/50 bg-background/50">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <span className="text-xs font-medium text-muted-foreground ml-2 uppercase">
            {language}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" onClick={handleReset} className="h-8 text-xs">
            <RotateCcw className="w-3 h-3 mr-1" /> Reset
          </Button>
          <Button size="sm" onClick={handleRun} disabled={isRunning} className="h-8 text-xs bg-green-600 hover:bg-green-700 text-white">
            {isRunning ? <Loader2 className="w-3 h-3 mr-1 animate-spin" /> : <Play className="w-3 h-3 mr-1 fill-current" />} 
            Run
          </Button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border/50">
        {/* Editor Area */}
        <div className="relative h-full">
          <Editor
            height="100%"
            language={language}
            theme={theme === "dark" ? "vs-dark" : "light"}
            value={code}
            onChange={(val) => setCode(val || "")}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              fontFamily: "var(--font-geist-mono)",
              padding: { top: 16 },
              scrollBeyondLastLine: false,
              smoothScrolling: true,
            }}
          />
        </div>

        {/* Console Output */}
        <div className="flex flex-col h-full bg-black/50 dark:bg-black/80">
          <div className="px-4 py-2 border-b border-border/20 bg-black/20">
            <span className="text-xs font-mono text-muted-foreground">Terminal</span>
          </div>
          <div className="flex-1 p-4 overflow-auto font-mono text-sm text-gray-300 whitespace-pre-wrap">
            {output || <span className="text-gray-600 italic">No output yet. Click 'Run' to execute.</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
