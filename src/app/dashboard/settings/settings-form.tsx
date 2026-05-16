"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save, Loader2, CheckCircle } from "lucide-react";
import { useState } from "react";
import { updatePilotProfile } from "@/actions/user"; // we will create this

export function SettingsForm({ initialName, email }: { initialName: string, email: string }) {
  const [isPending, setIsPending] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  async function handleAction(formData: FormData) {
    setIsPending(true);
    setSuccessMsg(false);
    
    await updatePilotProfile(formData);
    
    setIsPending(false);
    setSuccessMsg(true);
    
    setTimeout(() => {
      setSuccessMsg(false);
    }, 3000);
  }

  return (
    <form action={handleAction} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name" className="font-bold uppercase text-xs tracking-wider text-muted-foreground">Callsign (Full Name)</Label>
        {/* Use standard input or add key to prevent Base UI defaultValue error */}
        <Input 
          key={initialName} 
          id="name" 
          name="name" 
          defaultValue={initialName} 
          className="border-2 border-border rounded-none focus-visible:ring-primary focus-visible:border-primary font-mono text-sm" 
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="font-bold uppercase text-xs tracking-wider text-muted-foreground">Comms Link (Email)</Label>
        <Input 
          id="email" 
          type="email" 
          defaultValue={email} 
          disabled 
          className="border-2 border-border rounded-none bg-muted/50 cursor-not-allowed font-mono text-sm" 
        />
        <p className="text-xs font-mono text-muted-foreground mt-1">Comms link cannot be changed directly due to security protocols.</p>
      </div>

      <div className="pt-4 flex items-center justify-between">
        <div className="h-6">
          {successMsg && (
            <span className="flex items-center text-sm font-bold text-green-500 uppercase tracking-widest">
              <CheckCircle className="w-4 h-4 mr-2" /> Data Synced
            </span>
          )}
        </div>
        <Button 
          type="submit" 
          disabled={isPending}
          className="font-bold uppercase tracking-widest rounded-none border-2 border-primary bg-primary text-primary-foreground hover:bg-primary/90 shadow-[4px_4px_0px_rgba(251,191,36,1)] hover:translate-y-1 hover:shadow-[2px_2px_0px_rgba(251,191,36,1)] transition-all"
        >
          {isPending ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Save className="w-4 h-4 mr-2" />
          )}
          {isPending ? "Syncing..." : "Commit Changes"}
        </Button>
      </div>
    </form>
  );
}
