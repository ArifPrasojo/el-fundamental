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
        <h1 className="text-3xl font-bold tracking-tight mb-2">Available Courses</h1>
        <p className="text-muted-foreground">Pick a course and start learning the fundamentals.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Card key={course.id} className="glass-card flex flex-col h-full hover:border-primary/50 transition-colors">
            <CardHeader>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/80 to-primary/20 flex items-center justify-center text-primary-foreground font-bold shadow-lg mb-4">
                {course.language === "javascript" ? "JS" : course.language === "python" ? "PY" : "</>"}
              </div>
              <CardTitle className="text-xl">{course.title}</CardTitle>
              <CardDescription className="line-clamp-2">{course.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-end mt-4">
              <div className="flex items-center text-sm text-muted-foreground mb-4">
                <BookOpen className="w-4 h-4 mr-2" />
                <span>{course._count.chapters} Chapters</span>
              </div>
              <Link href={`/courses/${course.slug}`} className="w-full">
                <Button className="w-full">
                  View Course
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
