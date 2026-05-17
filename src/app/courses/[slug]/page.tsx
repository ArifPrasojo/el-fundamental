import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Play, CheckCircle2, Lock } from "lucide-react";
import { db } from "@/lib/db";
import { auth } from "@/auth";

export default async function CourseOverviewPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const course = await db.course.findUnique({
    where: { slug },
    include: {
      chapters: {
        orderBy: { order: "asc" }
      }
    }
  });

  if (!course) notFound();

  // Fetch user progress for this specific course's chapters
  const progress = await db.userProgress.findMany({
    where: {
      userId: session.user.id,
      chapter: {
        courseId: course.id
      }
    }
  });

  // Map progress by chapterId for quick lookup
  const progressMap = new Map(progress.map(p => [p.chapterId, p.isCompleted]));

  const completedCount = progress.filter(p => p.isCompleted).length;
  const totalChapters = course.chapters.length;
  const isMastered = totalChapters > 0 && completedCount >= totalChapters;
  
  return (
    <div className="min-h-screen bg-background">
      {/* Mecha Header */}
      <header className="fixed top-0 w-full z-50 border-b-4 border-border bg-black/20 backdrop-blur-md shadow-[0px_4px_0px_rgba(28,61,138,0.2)]">
        <div className="container mx-auto px-4 h-16 flex items-center">
          <Link href="/dashboard/courses" className="flex items-center text-sm font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
          </Link>
        </div>
      </header>

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mecha-panel border-2 border-border p-8 mb-12 shadow-[8px_8px_0px_rgba(28,61,138,0.3)] relative overflow-hidden">
            {/* Background Accent */}
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
            
            <div className="flex flex-col md:flex-row gap-8 items-center relative z-10">
              <div className={`w-32 h-32 border-4 border-primary shadow-[6px_6px_0px_rgba(28,61,138,1)] flex items-center justify-center font-extrabold text-5xl flex-shrink-0 ${course.language === "javascript" ? "bg-accent/10 text-accent border-accent shadow-[6px_6px_0px_rgba(224,26,34,1)]" : "bg-primary/10 text-primary"}`}>
                {course.language === "javascript" ? "JS" : course.language === "python" ? "PY" : "</>"}
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <div className="inline-block px-3 py-1 bg-secondary text-secondary-foreground text-[10px] font-bold tracking-widest border border-primary mb-4">
                  /// {course.language.toUpperCase()}_CURRICULUM
                </div>
                <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight uppercase mb-2">{course.title}</h1>
                <p className="text-muted-foreground font-medium mb-6">{course.description}</p>
                
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <Link href={course.chapters.length > 0 ? `/learn/${course.slug}/${course.chapters[0].id}` : "#"}>
                    <Button size="lg" className="h-12 px-8 font-bold uppercase tracking-widest rounded-none border-2 border-primary bg-primary text-primary-foreground hover:bg-primary/90 shadow-[4px_4px_0px_rgba(251,191,36,1)] hover:translate-y-1 hover:shadow-[2px_2px_0px_rgba(251,191,36,1)] transition-all" disabled={course.chapters.length === 0}>
                      <Play className="w-4 h-4 mr-2 fill-current" /> {completedCount > 0 ? "Resume Training" : "Start Training"}
                    </Button>
                  </Link>
                  {isMastered && (
                    <div className="flex items-center text-sm font-bold uppercase tracking-widest text-green-500 bg-green-500/10 px-4 py-2 border-2 border-green-500 shadow-[2px_2px_0px_rgba(34,197,94,1)]">
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Module Cleared
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-extrabold uppercase tracking-tight flex items-center border-b-2 border-border pb-2">
              <span className="w-3 h-3 bg-primary mr-3 shadow-[2px_2px_0px_rgba(251,191,36,1)]"></span>
              Mission Syllabus
            </h2>
            
            <div className="space-y-4">
              {course.chapters.length === 0 ? (
                <div className="mecha-panel p-12 border-2 border-dashed border-muted flex items-center justify-center text-center opacity-70">
                  <p className="text-muted-foreground font-bold uppercase tracking-widest">No Missions Available Yet.</p>
                </div>
              ) : (
                course.chapters.map((chapter, index) => {
                  const isCompleted = progressMap.get(chapter.id) === true;

                  return (
                    <div key={chapter.id} className={`mecha-panel flex items-stretch border-2 ${isCompleted ? 'border-green-500/50 bg-green-500/5' : 'border-border bg-background'} transition-all`}>
                      <div className={`w-16 flex flex-col items-center justify-center font-extrabold text-xl border-r-2 ${isCompleted ? 'border-green-500/50 text-green-500 bg-green-500/10' : 'border-border text-muted-foreground bg-muted/20'}`}>
                        {isCompleted ? <CheckCircle2 className="w-6 h-6" /> : index + 1}
                      </div>
                      <div className="flex-1 p-5 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground">Mission 0{index + 1}</span>
                            {isCompleted && <span className="text-[10px] font-bold tracking-widest uppercase text-green-500 bg-green-500/10 px-2 border border-green-500">Cleared</span>}
                          </div>
                          <h3 className="text-lg md:text-xl font-extrabold uppercase tracking-tight mb-2 text-foreground">{chapter.title}</h3>
                          {/* <p className="text-sm font-medium text-muted-foreground line-clamp-2">{chapter.content.replace(/<[^>]*>?/gm, '').substring(0, 100)}...</p> */}
                        </div>
                        <div className="shrink-0">
                          <Link href={`/learn/${course.slug}/${chapter.id}`}>
                            {isCompleted ? (
                              <Button variant="outline" className="w-full md:w-auto font-bold uppercase tracking-widest rounded-none border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-white transition-all shadow-[4px_4px_0px_rgba(34,197,94,0.3)]">
                                Replay
                              </Button>
                            ) : (
                              <Button className="w-full md:w-auto font-bold uppercase tracking-widest rounded-none border-2 border-primary bg-primary text-primary-foreground hover:bg-primary/90 shadow-[4px_4px_0px_rgba(251,191,36,1)] hover:translate-y-1 hover:shadow-[2px_2px_0px_rgba(251,191,36,1)] transition-all">
                                Initiate
                              </Button>
                            )}
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
