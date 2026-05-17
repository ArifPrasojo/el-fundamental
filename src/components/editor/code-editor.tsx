"use client";

import { useState, useRef, useEffect } from "react";
import Editor, { loader } from "@monaco-editor/react";
import { Button } from "@/components/ui/button";
import { Play, RotateCcw, Loader2 } from "lucide-react";
import { useTheme } from "next-themes";

// We will load monaco-editor dynamically in useEffect to prevent SSR crashes.

interface CodeEditorProps {
  initialCode: string;
  language?: "python" | "javascript";
  expectedOutput?: string;
  answerCode?: string;
  onSuccess?: () => void;
}

export function CodeEditor({ initialCode, language = "javascript", expectedOutput, answerCode, onSuccess }: CodeEditorProps) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [pyodide, setPyodide] = useState<any>(null);
  const [failCount, setFailCount] = useState(0);
  const { theme } = useTheme();

  const [isLoadingPyodide, setIsLoadingPyodide] = useState(language === "python");
  const [isMonacoReady, setIsMonacoReady] = useState(false);

  // Initialize Monaco Editor to use the local bundled version instead of CDN dynamically.
  // This completely disables the Monaco AMD loader, preventing it from hijacking global `define`.
  useEffect(() => {
    let isMounted = true;
    import("monaco-editor").then(monaco => {
      if (isMounted) {
        loader.config({ monaco });
        setIsMonacoReady(true);
      }
    }).catch(err => {
      console.error("Failed to load local monaco-editor:", err);
      // Fallback: let it use CDN if local fails
      if (isMounted) setIsMonacoReady(true);
    });
    return () => { isMounted = false; };
  }, []);

  // Load Pyodide asynchronously if the language is python
  useEffect(() => {
    let isMounted = true;

    const loadPythonEngine = async () => {
      if (language !== "python" || pyodide) return;

      // Use a global promise to prevent concurrent loading in Strict Mode
      if (!(window as any).pyodideLoadingPromise) {
        (window as any).pyodideLoadingPromise = new Promise((resolve, reject) => {
          if ((window as any).loadPyodide) {
            (window as any).loadPyodide({ indexURL: "https://cdn.jsdelivr.net/pyodide/v0.26.1/full/" })
              .then(resolve)
              .catch(reject);
            return;
          }

          const script = document.createElement("script");
          script.src = "https://cdn.jsdelivr.net/pyodide/v0.26.1/full/pyodide.js";
          script.onload = () => {
            (window as any).loadPyodide({ indexURL: "https://cdn.jsdelivr.net/pyodide/v0.26.1/full/" })
              .then(resolve)
              .catch(reject);
          };
          script.onerror = (e) => reject(new Error("Failed to load Pyodide script"));
          document.body.appendChild(script);
        });
      }

      try {
        const instance = await (window as any).pyodideLoadingPromise;
        if (isMounted) {
          (window as any).pyodideInstance = instance;
          setPyodide(instance);
          setIsLoadingPyodide(false);
        }
      } catch (err) {
        console.error("Pyodide Init Error:", err);
        if (isMounted) {
          setOutput("Error: Failed to initialize Python engine. Please refresh.");
        }
      }
    };

    loadPythonEngine();

    return () => {
      isMounted = false;
    };
  }, [language, pyodide]);

  const handleRun = async () => {
    setIsRunning(true);
    setOutput("");
    
    const validateOutput = (finalOutput: string) => {
      if (expectedOutput) {
        if (finalOutput.includes(expectedOutput)) {
          setOutput(finalOutput + "\n\n[SYSTEM] MISSION ACCOMPLISHED! 🎉");
          setFailCount(0);
          if (onSuccess) onSuccess();
        } else {
          const newFailCount = failCount + 1;
          setFailCount(newFailCount);
          let failMessage = `\n\n[SYSTEM] MISSION FAILED. Target output not met.`;
          if (newFailCount >= 3 && answerCode) {
            failMessage += `\n[SYSTEM] HINT UNLOCKED:\n========================\n${answerCode}\n========================`;
          }
          setOutput(finalOutput + failMessage);
        }
      } else {
        setOutput(finalOutput);
      }
    };

    try {
      if (language === "javascript") {
        let logs: string[] = [];
        // Capture console.log
        const originalLog = console.log;
        console.log = (...args) => {
          logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' '));
        };

        try {
          // eslint-disable-next-line no-new-func
          const executeCode = new Function(code);
          executeCode();
          const finalOutput = logs.length > 0 ? logs.join('\n') : "> Execution completed. (No output)";
          validateOutput(finalOutput);
        } catch (err: any) {
          setOutput(`Error: ${err.message}`);
        } finally {
          console.log = originalLog;
        }
      } else if (language === "python") {
        if (!pyodide) {
          setOutput("Pyodide is still loading... Please try again in a moment.");
          setIsRunning(false);
          return;
        }

        // Redirect Python sys.stdout
        pyodide.runPython(`
          import sys
          import io
          sys.stdout = io.StringIO()
        `);
        
        try {
          await pyodide.runPythonAsync(code);
          const stdout = pyodide.runPython("sys.stdout.getvalue()");
          const finalOutput = stdout || "> Execution completed. (No output)";
          validateOutput(finalOutput);
        } catch (err: any) {
          setOutput(err.message);
        }
      }
    } catch (error: any) {
      setOutput(`> Unexpected Error: ${error.message}`);
    } finally {
      setIsRunning(false);
    }
  };

  const handleReset = () => {
    setCode(initialCode);
    setOutput("");
  };

  return (
    <div className="flex flex-col h-full min-h-[400px] w-full mecha-panel border-2 border-border shadow-[6px_6px_0px_rgba(28,61,138,0.3)]">
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
          <Button size="sm" onClick={handleRun} disabled={isRunning || isLoadingPyodide} className="h-8 text-xs bg-green-600 hover:bg-green-700 text-white">
            {isRunning || isLoadingPyodide ? <Loader2 className="w-3 h-3 mr-1 animate-spin" /> : <Play className="w-3 h-3 mr-1 fill-current" />} 
            {isLoadingPyodide ? "Loading Engine..." : "Run"}
          </Button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 grid-rows-2 md:grid-rows-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border/50 overflow-hidden">
        {/* Editor Area */}
        <div className="relative h-full overflow-hidden flex flex-col">
          {!isMonacoReady ? (
            <div className="flex-1 flex items-center justify-center bg-black/50">
              <Loader2 className="w-6 h-6 text-primary animate-spin" />
              <span className="ml-3 text-sm font-mono tracking-widest text-primary animate-pulse">BOOTING ENGINE...</span>
            </div>
          ) : (
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
          )}
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
