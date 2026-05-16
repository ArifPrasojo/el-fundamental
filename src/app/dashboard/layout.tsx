import Link from "next/link";
import { Code2, LayoutDashboard, BookOpen, Trophy, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { MobileHeader } from "./mobile-header";
import { SidebarNav } from "./sidebar-nav";
import { ThemeToggle } from "@/components/theme-toggle";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  
  // Enforce authentication
  if (!session) redirect("/login");

  const handleSignOut = async () => {
    "use server";
    const { signOut } = await import("@/auth");
    await signOut({ redirectTo: "/" });
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-background overflow-hidden">
      {/* Mobile Header */}
      <MobileHeader 
        userInitial={session?.user?.name?.[0] || "U"}
        userName={session?.user?.name || "Student User"}
        userEmail={session?.user?.email || "student@example.com"}
        onSignOut={handleSignOut}
      />

      {/* Desktop Sidebar */}
      <aside className="w-64 border-r-2 border-border bg-background hidden md:flex flex-col relative z-10 shadow-[4px_0px_0px_rgba(28,61,138,0.2)]">
        <div className="p-6 border-b-2 border-border/20">
          <Link href="/" className="flex items-center justify-center mb-4 group cursor-pointer hover:opacity-90 transition-opacity">
            <svg width="48" height="48" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-[3px_3px_0px_rgba(28,61,138,0.5)]">
              {/* Outer Hexagon */}
              <path d="M50 5 L93 30 L93 70 L50 95 L7 70 L7 30 Z" stroke="currentColor" strokeWidth="8" strokeLinejoin="bevel" className="text-primary" />
              {/* Inner details */}
              <path d="M30 35 L70 35 L70 45 L30 45 Z" fill="currentColor" className="text-secondary" />
              <path d="M30 55 L55 55 L55 65 L30 65 Z" fill="currentColor" className="text-accent" />
              <rect x="70" y="55" width="10" height="10" fill="currentColor" className="text-primary" />
            </svg>
          </Link>
        </div>

        <SidebarNav />

        <div className="p-4 border-t-2 border-border bg-black/20">
          <div className="flex justify-between items-center mb-3">
            <div className="inline-block px-2 py-0.5 bg-secondary text-secondary-foreground text-[10px] font-bold tracking-widest border border-primary">
              /// ACTIVE_PILOT
            </div>
            <ThemeToggle />
          </div>
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 border-2 border-primary bg-primary/20 flex items-center justify-center text-primary font-bold shadow-[2px_2px_0px_rgba(28,61,138,1)]">
              {session?.user?.name?.[0] || "U"}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-bold uppercase tracking-wider truncate text-primary">{session?.user?.name || "Student User"}</p>
              <p className="text-xs font-mono text-muted-foreground truncate">{session?.user?.email || "student@example.com"}</p>
            </div>
          </div>
          <form action={handleSignOut}>
            <Button variant="ghost" className="w-full justify-start rounded-none border-2 border-transparent text-accent font-bold uppercase tracking-widest text-xs hover:border-accent hover:bg-accent hover:text-accent-foreground shadow-[2px_2px_0px_transparent] hover:shadow-[4px_4px_0px_rgba(224,26,34,0.5)] transition-all h-10" type="submit">
              <LogOut className="mr-2 w-4 h-4" /> Terminate Session
            </Button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="p-4 md:p-8 max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
