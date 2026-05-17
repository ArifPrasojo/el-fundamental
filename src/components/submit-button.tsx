"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface SubmitButtonProps extends React.ComponentProps<typeof Button> {
  children: React.ReactNode;
  loadingText?: string;
}

export function SubmitButton({ children, loadingText = "Processing...", className, disabled, ...props }: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button 
      type="submit" 
      disabled={pending || disabled} 
      className={className}
      {...props}
    >
      {pending ? (
        <>
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          {loadingText}
        </>
      ) : (
        children
      )}
    </Button>
  );
}
