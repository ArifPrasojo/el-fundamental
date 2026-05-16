"use client";

import { CodeEditor } from "./code-editor";
import { toast } from "sonner";
import { markChapterCompleted } from "@/actions/progress";

export function InteractiveWorkspace({ 
  language, 
  initialCode,
  chapterId
}: { 
  language: "javascript" | "python", 
  initialCode: string,
  chapterId: string
}) {
  return (
    <CodeEditor 
      language={language}
      initialCode={initialCode}
      expectedOutput="Hello" // Simplification for validation
      onSuccess={async () => {
        const result = await markChapterCompleted(chapterId);
        
        if (result.success) {
          toast.success("Challenge Completed! 🎉", {
            description: "Great job! You've successfully passed the tests and earned +50 XP.",
            duration: 5000,
          });
        }
      }}
    />
  );
}
