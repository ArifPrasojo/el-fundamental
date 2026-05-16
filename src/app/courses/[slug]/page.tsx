import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, PlayCircle, Lock } from "lucide-react";
import { db } from "@/lib/db";
import { auth } from "@/auth";

export default async function CourseOverviewPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const session = await auth();

  const course = await db.course.findUnique({
    where: { slug },
    include: {
      chapters: {
        orderBy: { order: "asc" }
      }
    }
  });

  if (!course) notFound();

  // Here you would check UserProgress to see which chapters are completed
  // For the mockup, we will just assume none are completed yet.
  
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 glass border-b border-border/50">
        <div className="container mx-auto px-4 h-16 flex items-center">
          <Link href="/dashboard/courses" className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Courses
          </Link>
        </div>
      </header>

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex flex-col items-center text-center mb-12">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/80 to-primary/20 flex items-center justify-center text-primary-foreground text-2xl font-bold shadow-lg mb-6">
              {course.language === "javascript" ? "JS" : course.language === "python" ? "PY" : "</>"}
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight mb-4">{course.title}</h1>
            <p className="text-xl text-muted-foreground max-w-2xl">{course.description}</p>
            
            <div className="mt-8">
              <Link href={course.chapters.length > 0 ? `/learn/${course.slug}/${course.chapters[0].id}` : "#"}>
                <Button size="lg" className="h-14 px-8 text-lg shadow-[0_0_40px_-10px_rgba(var(--primary),0.5)]" disabled={course.chapters.length === 0}>
                  <PlayCircle className="w-5 h-5 mr-2" /> Start Course
                </Button>
              </Link>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Curriculum</h2>
            
            <div className="space-y-4">
              {course.chapters.length === 0 ? (
                <div className="p-8 text-center glass-card rounded-xl">
                  <p className="text-muted-foreground">Coming soon! Chapters are being prepared.</p>
                </div>
              ) : (
                course.chapters.map((chapter, index) => (
                  <Card key={chapter.id} className="glass-card overflow-hidden hover:border-primary/30 transition-colors">
                    <div className="flex items-center p-0">
                      <div className="w-16 h-full flex items-center justify-center bg-muted/50 border-r border-border/50 text-xl font-bold text-muted-foreground self-stretch">
                        {index + 1}
                      </div>
                      <div className="flex-1 p-6">
                        <h3 className="text-lg font-semibold mb-1">{chapter.title}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">{chapter.content.replace(/<[^>]*>?/gm, '').substring(0, 100)}...</p>
                      </div>
                      <div className="pr-6">
                        <Link href={`/learn/${course.slug}/${chapter.id}`}>
                          <Button variant="secondary">Start</Button>
                        </Link>
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
