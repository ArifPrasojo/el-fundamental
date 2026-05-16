import { Button } from "@/components/ui/button";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { SettingsForm } from "./settings-form";

export default async function SettingsPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  // Fetch fresh data from DB to ensure it's up to date
  const user = await db.user.findUnique({
    where: { id: session.user.id },
    select: { name: true, email: true }
  });

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
        
        <SettingsForm initialName={user?.name || ""} email={user?.email || ""} />
      </div>

      <div className="mecha-panel p-8 shadow-[6px_6px_0px_rgba(224,26,34,0.3)] border-accent">
        <h2 className="text-xl font-bold uppercase mb-6 text-accent border-b-2 border-accent/20 pb-2">Danger Zone</h2>
        <p className="text-sm font-medium mb-4">Permanent deletion of your pilot records and combat progress.</p>
        <Button variant="destructive" className="font-bold uppercase tracking-widest rounded-none border-2 border-accent bg-background text-accent hover:bg-accent hover:text-accent-foreground shadow-[4px_4px_0px_rgba(224,26,34,1)] hover:translate-y-1 hover:shadow-[2px_2px_0px_rgba(224,26,34,1)] transition-all">
          Terminate Account
        </Button>
      </div>
    </div>
  );
}
