"use client";

import { CodeEditor } from "./code-editor";
import { toast } from "sonner";
import { markChapterCompleted } from "@/actions/progress";

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
