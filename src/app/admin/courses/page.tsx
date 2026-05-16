import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, Edit, Trash2, BookOpen } from "lucide-react";
import { db } from "@/lib/db";

export default async function AdminCoursesPage() {
  // Fetch courses from DB
  const courses = await db.course.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      _count: {
        select: { chapters: true }
      }
    }
  });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Manage Courses</h1>
          <p className="text-muted-foreground">Create and organize learning modules.</p>
        </div>
        <Link href="/admin/courses/new">
          <Button>
            <PlusCircle className="mr-2 w-4 h-4" /> New Course
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center p-12 glass-card rounded-2xl text-center">
            <BookOpen className="w-12 h-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold">No courses found</h3>
            <p className="text-sm text-muted-foreground mt-2 mb-4">You haven't created any courses yet.</p>
            <Link href="/admin/courses/new">
              <Button variant="outline">Create your first course</Button>
            </Link>
          </div>
        ) : (
          courses.map((course) => (
            <Card key={course.id} className="glass-card hover:border-primary/50 transition-colors">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold shadow-inner">
                    {course.language === "javascript" ? "JS" : course.language === "python" ? "PY" : "</>"}
                  </div>
                  <div className="flex space-x-1">
                    <Link href={`/admin/courses/${course.id}`}>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </Link>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:bg-destructive/10 hover:text-destructive">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <CardTitle className="text-xl mt-4">{course.title}</CardTitle>
                <CardDescription className="line-clamp-2">{course.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm text-muted-foreground">
                  <span className="bg-muted px-2 py-1 rounded-md text-xs font-medium mr-3 uppercase">
                    {course.language}
                  </span>
                  <span>{course._count.chapters} Chapters</span>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
