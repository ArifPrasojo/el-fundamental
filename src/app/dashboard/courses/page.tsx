import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Play } from "lucide-react";
import { db } from "@/lib/db";

export default async function StudentCoursesPage() {
  const courses = await db.course.findMany({
    include: {
      _count: {
        select: { chapters: true }
      }
    }
  });

  return (
    <div className="space-y-8">
      <div>
        <div className="inline-block px-3 py-1 bg-secondary text-secondary-foreground text-xs font-bold tracking-widest border-2 border-primary shadow-[2px_2px_0px_rgba(28,61,138,1)] mb-4">
          /// TRAINING_MODULES
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight uppercase text-primary">Available Combat Simulations</h1>
        <p className="text-foreground font-medium mt-2">Pick a technical course and commence your engineering training.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {courses.map((course) => (
          <div key={course.id} className="mecha-panel flex flex-col h-full border-2 border-border shadow-[8px_8px_0px_rgba(28,61,138,0.3)] hover:shadow-[12px_12px_0px_rgba(251,191,36,0.8)] hover:border-primary transition-all duration-300">
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-6">
                <div className={`w-16 h-16 border-2 border-primary shadow-[4px_4px_0px_rgba(28,61,138,1)] flex items-center justify-center text-primary font-bold text-2xl ${course.language === "javascript" ? "bg-accent/10" : "bg-primary/10"}`}>
                  {course.language === "javascript" ? "JS" : course.language === "python" ? "PY" : "</>"}
                </div>
                <div className="bg-background px-3 py-1 border-2 border-muted text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center">
                  <BookOpen className="w-3 h-3 mr-2" />
                  {course._count.chapters} Chapters
                </div>
              </div>
              
              <h2 className="text-2xl font-extrabold uppercase tracking-tight mb-3 text-foreground">{course.title}</h2>
              <p className="text-sm font-medium text-muted-foreground line-clamp-3 mb-8 flex-1 border-l-4 border-accent pl-3">
                {course.description}
              </p>

              <Link href={`/courses/${course.slug}`} className="w-full mt-auto">
                <Button className="w-full h-12 font-bold uppercase tracking-widest rounded-none border-2 border-primary bg-primary text-primary-foreground hover:bg-primary/90 shadow-[4px_4px_0px_rgba(251,191,36,1)] hover:translate-y-1 hover:shadow-[2px_2px_0px_rgba(251,191,36,1)] transition-all">
                  <Play className="w-4 h-4 mr-2 fill-current" /> Initialize Module
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
