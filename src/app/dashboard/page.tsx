import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Play, Trophy, Flame } from "lucide-react";
import { db } from "@/lib/db";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await auth();
  
  if (!session?.user?.id) {
    redirect("/login");
  }

  const userId = session.user.id;

  // Fetch all completed chapters
  const progressList = await db.userProgress.findMany({
    where: { userId, isCompleted: true },
    include: {
      chapter: {
        include: {
          course: true
        }
      }
    }
  });

  const totalCompleted = progressList.length;
  const xpPerChapter = 50;
  const totalXp = totalCompleted * xpPerChapter;

  // Find total chapters available
  const totalChapters = await db.chapter.count();

  // Simple overall progress calculation
  const overallProgressPercentage = totalChapters > 0 ? Math.round((totalCompleted / totalChapters) * 100) : 0;

  // Group progress by course to find the latest active course
  const courseProgressMap = new Map();
  
  progressList.forEach(p => {
    const courseId = p.chapter.course.id;
    if (!courseProgressMap.has(courseId)) {
      courseProgressMap.set(courseId, {
        course: p.chapter.course,
        completedCount: 0
      });
    }
    courseProgressMap.get(courseId).completedCount += 1;
  });

  const activeCourseData = Array.from(courseProgressMap.values()).sort((a, b) => b.completedCount - a.completedCount)[0];

  return (
    <div className="space-y-8">
      <div>
        <div className="inline-block px-3 py-1 bg-secondary text-secondary-foreground text-xs font-bold tracking-widest border-2 border-primary shadow-[2px_2px_0px_rgba(28,61,138,1)] mb-4">
          /// PILOT_OVERVIEW
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight uppercase text-primary">Command Center</h1>
        <p className="text-foreground font-medium mt-2">Welcome back, {session.user.name?.split(' ')[0] || 'Pilot'}. Here is your current combat training status.</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="mecha-panel p-6 border-2 border-border shadow-[6px_6px_0px_rgba(28,61,138,0.3)] flex items-center space-x-4">
          <div className="p-3 bg-primary/10 border-2 border-primary text-primary shadow-[2px_2px_0px_rgba(28,61,138,1)]">
            <Flame className="w-6 h-6 text-orange-500" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Daily Streak</p>
            <h3 className="text-2xl font-extrabold">1 Day</h3>
          </div>
        </div>
        
        <div className="mecha-panel p-6 border-2 border-border shadow-[6px_6px_0px_rgba(251,191,36,0.3)] flex items-center space-x-4">
          <div className="p-3 bg-accent/10 border-2 border-accent text-accent shadow-[2px_2px_0px_rgba(224,26,34,1)]">
            <Trophy className="w-6 h-6 text-yellow-500" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Total XP Earned</p>
            <h3 className="text-2xl font-extrabold">{totalXp} XP</h3>
          </div>
        </div>

        <div className="mecha-panel p-6 border-2 border-border shadow-[6px_6px_0px_rgba(34,197,94,0.3)] flex items-center space-x-4">
          <div className="p-3 bg-green-500/10 border-2 border-green-500 text-green-500 shadow-[2px_2px_0px_rgba(34,197,94,1)]">
            <div className="w-6 h-6 flex items-center justify-center font-bold">✓</div>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Modules Cleared</p>
            <h3 className="text-2xl font-extrabold">{totalCompleted} / {totalChapters || '-'}</h3>
          </div>
        </div>
      </div>

      {/* Continue Learning */}
      <div className="mt-12">
        <h2 className="text-2xl font-extrabold uppercase tracking-tight mb-6 flex items-center border-b-2 border-border pb-2 text-foreground">
          <span className="w-3 h-3 bg-primary mr-3 shadow-[2px_2px_0px_rgba(251,191,36,1)]"></span> Active Simulations
        </h2>
        
        {activeCourseData ? (
          <div className="mecha-panel p-6 md:p-8 border-2 border-border shadow-[8px_8px_0px_rgba(28,61,138,0.2)]">
            <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
              <div className={`w-20 h-20 border-2 border-primary shadow-[4px_4px_0px_rgba(28,61,138,1)] flex items-center justify-center font-bold text-3xl flex-shrink-0 ${activeCourseData.course.language === "javascript" ? "bg-accent/10 text-accent" : "bg-primary/10 text-primary"}`}>
                {activeCourseData.course.language === "javascript" ? "JS" : activeCourseData.course.language === "python" ? "PY" : "</>"}
              </div>
              <div className="flex-1 w-full">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-xs font-bold text-primary uppercase tracking-widest bg-primary/10 px-2 py-0.5 border border-primary">{activeCourseData.course.language}</span>
                </div>
                <h3 className="text-2xl font-extrabold uppercase tracking-tight mb-4">{activeCourseData.course.title}</h3>
                
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Training Progress</span>
                  <span className="text-sm font-bold text-primary">{activeCourseData.completedCount} Missions Done</span>
                </div>
                
                {/* Custom Mecha Progress Bar */}
                <div className="w-full h-4 bg-muted border-2 border-border overflow-hidden">
                  <div 
                    className="h-full bg-primary relative" 
                    style={{ width: `${Math.min(100, (activeCourseData.completedCount / 7) * 100)}%` }}
                  >
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMSIvPgo8L3N2Zz4=')]"></div>
                  </div>
                </div>
              </div>
              <Link href={`/courses/${activeCourseData.course.slug}`} className="w-full md:w-auto mt-4 md:mt-0">
                <Button className="w-full md:w-auto h-14 px-8 font-bold uppercase tracking-widest rounded-none border-2 border-primary bg-primary text-primary-foreground hover:bg-primary/90 shadow-[6px_6px_0px_rgba(251,191,36,1)] hover:translate-y-1 hover:shadow-[2px_2px_0px_rgba(251,191,36,1)] transition-all">
                  <Play className="mr-2 w-5 h-5 fill-current" /> Resume
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="mecha-panel p-12 border-2 border-dashed border-muted flex flex-col items-center justify-center text-center opacity-70">
            <div className="w-16 h-16 bg-muted border-2 border-border mb-4 flex items-center justify-center">
              <span className="text-2xl font-bold text-muted-foreground">?</span>
            </div>
            <h3 className="text-xl font-bold uppercase mb-2">No Active Data</h3>
            <p className="text-sm font-medium text-muted-foreground mb-6 max-w-sm">You haven't initiated any training simulations yet. Select a module to begin.</p>
            <Link href="/dashboard/courses">
              <Button variant="outline" className="font-bold uppercase tracking-widest rounded-none border-2 border-primary text-primary bg-background hover:bg-primary/10 shadow-[4px_4px_0px_rgba(28,61,138,1)] hover:translate-y-1 hover:shadow-[2px_2px_0px_rgba(28,61,138,1)] transition-all">
                Browse Modules
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
