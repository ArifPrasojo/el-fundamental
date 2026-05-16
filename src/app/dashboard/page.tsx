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
        <h1 className="text-3xl font-bold tracking-tight mb-2">Welcome back, {session.user.name?.split(' ')[0] || 'Learner'}!</h1>
        <p className="text-muted-foreground">Ready to continue your coding journey?</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Daily Streak</CardTitle>
            <Flame className="w-4 h-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1 Day</div>
            <p className="text-xs text-muted-foreground mt-1">Keep it up to earn the 7-day badge!</p>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total XP</CardTitle>
            <Trophy className="w-4 h-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalXp} XP</div>
            <p className="text-xs text-muted-foreground mt-1">Earn 50 XP per completed chapter</p>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Modules Completed</CardTitle>
            <div className="w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center text-[10px] font-bold text-primary">✓</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCompleted} / {totalChapters || '-'}</div>
            <p className="text-xs text-muted-foreground mt-1">{overallProgressPercentage}% overall completion</p>
          </CardContent>
        </Card>
      </div>

      {/* Continue Learning */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Continue Learning</h2>
        
        {activeCourseData ? (
          <Card className="glass-card border-primary/20 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -z-10" />
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/80 to-primary/20 flex items-center justify-center flex-shrink-0 shadow-lg font-bold text-xl text-primary-foreground">
                  {activeCourseData.course.language === "javascript" ? "JS" : activeCourseData.course.language === "python" ? "PY" : "</>"}
                </div>
                <div className="flex-1 w-full">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-xs font-semibold text-primary uppercase tracking-wider">{activeCourseData.course.language}</span>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs text-muted-foreground">{activeCourseData.course.title}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Resume Course</h3>
                  <div className="flex items-center space-x-4 w-full">
                    <div className="flex-1 max-w-md">
                      <Progress value={50} className="h-2" /> {/* Mock calculation for specific course progress */}
                    </div>
                    <span className="text-sm font-medium">{activeCourseData.completedCount} chapters done</span>
                  </div>
                </div>
                <Link href={`/courses/${activeCourseData.course.slug}`}>
                  <Button size="lg" className="w-full md:w-auto shadow-[0_0_20px_-5px_rgba(var(--primary),0.5)]">
                    <Play className="mr-2 w-4 h-4 fill-current" /> Continue
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="glass-card p-8 text-center border-dashed">
            <p className="text-muted-foreground mb-4">You haven't started any courses yet.</p>
            <Link href="/dashboard/courses">
              <Button>Browse Courses</Button>
            </Link>
          </Card>
        )}
      </div>
    </div>
  );
}
