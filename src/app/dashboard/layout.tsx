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
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-primary/10 p-1.5 rounded-lg">
              <Code2 className="w-5 h-5 text-primary" />
            </div>
            <span className="font-bold text-lg tracking-tight">Elfundamental</span>
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
