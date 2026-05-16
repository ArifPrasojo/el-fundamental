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
      <header className="h-14 border-b border-border/50 bg-card/50 flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center space-x-4">
          <Link href={`/courses/${course.slug}`}>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div className="flex items-center space-x-2 text-sm">
            <span className="font-medium text-muted-foreground hidden sm:inline-block">{course.title}</span>
            <ChevronRight className="w-4 h-4 text-muted-foreground/50 hidden sm:inline-block" />
            <span className="font-semibold text-primary">{chapter.title}</span>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          {isCompleted && (
            <div className="flex items-center space-x-2 text-sm text-green-500 mr-2 hidden md:flex">
              <CheckCircle2 className="w-4 h-4" />
              <span>Completed</span>
            </div>
          )}
          <div className="flex items-center space-x-1">
            {prevChapter ? (
              <Link href={`/learn/${course.slug}/${prevChapter.id}`}>
                <Button variant="outline" size="sm" className="h-8 hidden md:flex">
                  <ChevronLeft className="w-4 h-4 mr-1" /> Prev
                </Button>
              </Link>
            ) : (
              <Button variant="outline" size="sm" className="h-8 hidden md:flex" disabled>
                <ChevronLeft className="w-4 h-4 mr-1" /> Prev
              </Button>
            )}

            {nextChapter ? (
              <Link href={`/learn/${course.slug}/${nextChapter.id}`}>
                <Button size="sm" className="h-8">
                  Next <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            ) : (
              <Button size="sm" className="h-8">
                Finish Course <CheckCircle2 className="w-4 h-4 ml-1" />
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Lesson Content Pane */}
        <div className="w-full md:w-1/2 lg:w-2/5 border-b md:border-b-0 md:border-r border-border/50 bg-card/20 flex flex-col h-[50vh] md:h-full">
          <ScrollArea className="flex-1 p-6">
            <div className="prose prose-invert max-w-none">
              {/* For production, this should parse markdown, using a simple div dangerouslySetInnerHTML for now */}
              <div dangerouslySetInnerHTML={{ __html: chapter.content }} />
            </div>
          </ScrollArea>
        </div>

        {/* Code Sandbox Pane */}
        <div className="flex-1 flex flex-col h-[50vh] md:h-full bg-background relative">
          <div className="absolute inset-0 border-none m-0 p-0">
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
