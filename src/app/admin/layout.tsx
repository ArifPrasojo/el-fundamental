import Link from "next/link";
import { Code2, BookOpen, Users, Settings, LogOut, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  
  // Minimal admin check mock - in reality, check session.user.role === 'ADMIN'
  if (!session) redirect("/login");

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border/50 bg-card/50 flex flex-col">
        <div className="p-6">
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-destructive/10 p-1.5 rounded-lg">
              <ShieldAlert className="w-5 h-5 text-destructive" />
            </div>
            <span className="font-bold text-lg tracking-tight">Admin Panel</span>
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          <Link href="/admin">
            <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-foreground">
              <BookOpen className="mr-2 w-4 h-4" /> Dashboard
            </Button>
          </Link>
          <Link href="/admin/courses">
            <Button variant="secondary" className="w-full justify-start text-primary">
              <BookOpen className="mr-2 w-4 h-4" /> Manage Courses
            </Button>
          </Link>
          <Link href="/admin/users">
            <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-foreground">
              <Users className="mr-2 w-4 h-4" /> Users
            </Button>
          </Link>
        </nav>

        <div className="p-4 border-t border-border/50">
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
      <main className="flex-1 overflow-auto bg-muted/20">
        <div className="p-8 max-w-5xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
