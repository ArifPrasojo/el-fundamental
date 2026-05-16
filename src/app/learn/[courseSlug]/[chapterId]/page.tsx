import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle2, ChevronRight, ChevronLeft } from "lucide-react";
import { InteractiveWorkspace } from "@/components/editor/interactive-workspace";
import { ScrollArea } from "@/components/ui/scroll-area";
import { db } from "@/lib/db";
import { auth } from "@/auth";

export default async function ChapterLearnPage({
  params,
}: {
  params: Promise<{ courseSlug: string, chapterId: string }>;
}) {
  const { courseSlug, chapterId } = await params;
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const course = await db.course.findUnique({
    where: { slug: courseSlug },
    include: {
      chapters: {
        orderBy: { order: "asc" }
      }
    }
  });

  if (!course) notFound();

  const chapterIndex = course.chapters.findIndex(c => c.id === chapterId);
  const chapter = course.chapters[chapterIndex];

  if (!chapter) notFound();

  const prevChapter = chapterIndex > 0 ? course.chapters[chapterIndex - 1] : null;
  const nextChapter = chapterIndex < course.chapters.length - 1 ? course.chapters[chapterIndex + 1] : null;

  // Check user progress
  const progress = await db.userProgress.findUnique({
    where: {
      userId_chapterId: {
        userId: session.user.id,
        chapterId: chapter.id
      }
    }
  });

  const isCompleted = !!progress?.isCompleted; 

  return (
    <div className="flex flex-col h-screen bg-background overflow-hidden">
      {/* Header */}
      <header className="h-16 border-b-4 border-border bg-black/20 flex items-center justify-between px-4 shrink-0 shadow-[0px_4px_0px_rgba(28,61,138,0.2)] z-10">
        <div className="flex items-center space-x-4">
          <Link href={`/courses/${course.slug}`}>
            <Button variant="ghost" size="icon" className="h-10 w-10 rounded-none border-2 border-transparent hover:border-primary hover:bg-primary/10 text-primary transition-all">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div className="flex items-center space-x-3 text-sm">
            <div className="inline-block px-2 py-0.5 bg-secondary text-secondary-foreground text-[10px] font-bold tracking-widest border border-primary hidden sm:block">
              /// {course.language.toUpperCase()}_MODULE
            </div>
            <span className="font-bold text-muted-foreground uppercase tracking-wider hidden sm:inline-block">{course.title}</span>
            <ChevronRight className="w-4 h-4 text-muted-foreground/50 hidden sm:inline-block" />
            <span className="font-extrabold text-primary uppercase tracking-tight text-lg">{chapter.title}</span>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          {isCompleted && (
            <div className="flex items-center space-x-2 text-sm text-green-500 font-bold uppercase tracking-widest border-2 border-green-500 bg-green-500/10 px-3 py-1 hidden md:flex shadow-[2px_2px_0px_rgba(34,197,94,1)]">
              <CheckCircle2 className="w-4 h-4" />
              <span>Cleared</span>
            </div>
          )}
          <div className="flex items-center space-x-2">
            {prevChapter ? (
              <Link href={`/learn/${course.slug}/${prevChapter.id}`}>
                <Button variant="outline" size="sm" className="h-10 rounded-none border-2 border-border font-bold uppercase tracking-widest text-xs hidden md:flex hover:border-primary hover:text-primary transition-all">
                  <ChevronLeft className="w-4 h-4 mr-1" /> Prev
                </Button>
              </Link>
            ) : (
              <Button variant="outline" size="sm" className="h-10 rounded-none border-2 border-border/50 text-muted-foreground font-bold uppercase tracking-widest text-xs hidden md:flex cursor-not-allowed">
                <ChevronLeft className="w-4 h-4 mr-1" /> Prev
              </Button>
            )}

            {nextChapter ? (
              <Link href={`/learn/${course.slug}/${nextChapter.id}`}>
                <Button size="sm" className="h-10 rounded-none border-2 border-primary bg-primary text-primary-foreground font-bold uppercase tracking-widest text-xs hover:bg-primary/90 shadow-[4px_4px_0px_rgba(251,191,36,1)] hover:translate-y-0.5 hover:shadow-[2px_2px_0px_rgba(251,191,36,1)] transition-all">
                  Next <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            ) : (
              <Button size="sm" className="h-10 rounded-none border-2 border-accent bg-accent text-accent-foreground font-bold uppercase tracking-widest text-xs hover:bg-accent/90 shadow-[4px_4px_0px_rgba(224,26,34,1)] hover:translate-y-0.5 hover:shadow-[2px_2px_0px_rgba(224,26,34,1)] transition-all">
                Finish <CheckCircle2 className="w-4 h-4 ml-1" />
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Lesson Content Pane */}
        <div className="w-full md:w-1/2 lg:w-2/5 border-b-4 md:border-b-0 md:border-r-4 border-border bg-background flex flex-col h-[50vh] md:h-full relative shadow-[4px_0px_0px_rgba(28,61,138,0.2)] z-10">
          <div className="bg-primary/10 border-b-2 border-primary px-4 py-2 flex items-center justify-between shrink-0">
            <span className="font-bold uppercase tracking-widest text-xs text-primary">/// MISSION_BRIEFING</span>
          </div>
          
          {/* Replaced ScrollArea with native overflow-y-auto to fix scrolling bug */}
          <div className="flex-1 p-6 md:p-8 overflow-y-auto custom-scrollbar">
            <div className="prose prose-invert max-w-none prose-headings:font-extrabold prose-headings:uppercase prose-headings:tracking-tight prose-a:text-primary prose-a:font-bold prose-code:text-accent prose-code:bg-accent/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:border prose-code:border-accent/30 prose-pre:bg-black/50 prose-pre:border-2 prose-pre:border-border prose-pre:rounded-none">
              <div dangerouslySetInnerHTML={{ __html: chapter.content }} />
            </div>
          </div>
        </div>

        {/* Code Sandbox Pane */}
        <div className="flex-1 flex flex-col h-[50vh] md:h-full bg-background relative p-4">
          <div className="absolute inset-4 border-none m-0 p-0 shadow-[8px_8px_0px_rgba(28,61,138,0.2)]">
            <InteractiveWorkspace 
              language={course.language as "javascript" | "python"} 
              initialCode={`// Write your code here...`} 
              chapterId={chapter.id}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
