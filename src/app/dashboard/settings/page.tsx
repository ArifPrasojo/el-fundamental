import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <div className="inline-block px-3 py-1 bg-secondary text-secondary-foreground text-xs font-bold tracking-widest border-2 border-primary shadow-[2px_2px_0px_rgba(28,61,138,1)] mb-4">
          /// SYSTEM_PREFERENCES
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-primary">Pilot Settings</h1>
        <p className="text-foreground font-medium mt-2">
          Configure your personal terminal parameters and account credentials.
        </p>
      </div>

      <div className="mecha-panel p-8 shadow-[6px_6px_0px_rgba(28,61,138,0.3)]">
        <h2 className="text-xl font-bold uppercase mb-6 text-primary border-b-2 border-border pb-2">Profile Configuration</h2>
        
        <form className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="font-bold uppercase text-xs tracking-wider text-muted-foreground">Callsign (Full Name)</Label>
            <Input id="name" defaultValue="Student Pilot" className="border-2 border-border rounded-none focus-visible:ring-primary focus-visible:border-primary" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="font-bold uppercase text-xs tracking-wider text-muted-foreground">Comms Link (Email)</Label>
            <Input id="email" type="email" defaultValue="pilot@elfundamental.io" disabled className="border-2 border-border rounded-none bg-muted/50 cursor-not-allowed" />
            <p className="text-xs font-mono text-muted-foreground mt-1">Comms link cannot be changed directly due to security protocols.</p>
          </div>

          <div className="pt-4 flex justify-end">
            <Button type="button" className="font-bold uppercase rounded-none border-2 border-primary bg-primary text-primary-foreground hover:bg-primary/90 shadow-[4px_4px_0px_rgba(251,191,36,1)] hover:translate-y-1 hover:shadow-[2px_2px_0px_rgba(251,191,36,1)] transition-all">
              <Save className="w-4 h-4 mr-2" /> Commit Changes
            </Button>
          </div>
        </form>
      </div>

      <div className="mecha-panel p-8 shadow-[6px_6px_0px_rgba(224,26,34,0.3)] border-accent">
        <h2 className="text-xl font-bold uppercase mb-6 text-accent border-b-2 border-accent/20 pb-2">Danger Zone</h2>
        <p className="text-sm font-medium mb-4">Permanent deletion of your pilot records and combat progress.</p>
        <Button variant="destructive" className="font-bold uppercase rounded-none border-2 border-accent bg-background text-accent hover:bg-accent hover:text-accent-foreground shadow-[4px_4px_0px_rgba(224,26,34,1)] hover:translate-y-1 hover:shadow-[2px_2px_0px_rgba(224,26,34,1)] transition-all">
          Terminate Account
        </Button>
      </div>
    </div>
  );
}
