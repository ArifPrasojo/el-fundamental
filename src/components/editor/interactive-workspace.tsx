"use client";

import dynamic from "next/dynamic";
import { toast } from "sonner";
import { markChapterCompleted } from "@/actions/progress";

const CodeEditor = dynamic(() => import("./code-editor").then(mod => mod.CodeEditor), { 
  ssr: false,
  loading: () => <div className="h-[600px] w-full flex items-center justify-center border-2 border-border mecha-panel"><div className="animate-pulse text-primary font-mono tracking-widest text-sm">INITIALIZING TERMINAL...</div></div>
});

export function InteractiveWorkspace({ 
  language, 
  initialCode,
  chapterId,
  expectedOutput,
  answerCode
}: { 
  language: "javascript" | "python", 
  initialCode: string,
  chapterId: string,
  expectedOutput?: string,
  answerCode?: string
}) {
  return (
    <CodeEditor 
      language={language}
      initialCode={initialCode}
      expectedOutput={expectedOutput || "Hello World"} 
      answerCode={answerCode}
      onSuccess={async () => {
        const result = await markChapterCompleted(chapterId);
        
        if (result.success) {
          toast.success("Mission Accomplished! 🎉", {
            description: "Target output matched! You earned +50 XP.",
            duration: 5000,
          });
        }
      }}
    />
  );
}
