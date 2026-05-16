import Link from "next/link";
import { Code2, LayoutDashboard, BookOpen, Trophy, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  
  // Enforce authentication
  if (!session) redirect("/login");

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border/50 bg-card/50 flex flex-col">
        <div className="p-6">
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

        <nav className="flex-1 px-4 space-y-2">
          <Link href="/dashboard">
            <Button variant="secondary" className="w-full justify-start">
              <LayoutDashboard className="mr-2 w-4 h-4" /> Overview
            </Button>
          </Link>
          <Link href="/dashboard/courses">
            <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-foreground">
              <BookOpen className="mr-2 w-4 h-4" /> My Courses
            </Button>
          </Link>
          <Link href="/dashboard/achievements">
            <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-foreground">
              <Trophy className="mr-2 w-4 h-4" /> Achievements
            </Button>
          </Link>
          <Link href="/dashboard/settings">
            <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-foreground">
              <Settings className="mr-2 w-4 h-4" /> Settings
            </Button>
          </Link>
        </nav>

        <div className="p-4 border-t border-border/50">
          <div className="flex items-center space-x-3 mb-4 px-2">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
              {session?.user?.name?.[0] || "U"}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-medium truncate">{session?.user?.name || "Student User"}</p>
              <p className="text-xs text-muted-foreground truncate">{session?.user?.email || "student@example.com"}</p>
            </div>
          </div>
          <form action={async () => {
            "use server";
            const { signOut } = await import("@/auth");
            await signOut({ redirectTo: "/" });
          }}>
            <Button variant="ghost" className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10" type="submit">
              <LogOut className="mr-2 w-4 h-4" /> Sign Out
            </Button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8 max-w-5xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
