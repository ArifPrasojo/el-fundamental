import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, PlusCircle, Edit2, Trash2, GripVertical } from "lucide-react";
import { db } from "@/lib/db";

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;
  
  const course = await db.course.findUnique({
    where: { id: courseId },
    include: {
      chapters: {
        orderBy: { order: "asc" }
      }
    }
  });

  if (!course) redirect("/admin/courses");

  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-4">
        <Link href="/admin/courses">
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">{course.title}</h1>
          <p className="text-muted-foreground text-sm uppercase font-medium">{course.language}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Chapters</h2>
            <Link href={`/admin/courses/${course.id}/chapters/new`}>
              <Button size="sm">
                <PlusCircle className="w-4 h-4 mr-2" /> Add Chapter
              </Button>
            </Link>
          </div>

          <div className="space-y-3">
            {course.chapters.length === 0 ? (
              <div className="p-8 text-center glass-card rounded-xl border-dashed">
                <p className="text-muted-foreground text-sm">No chapters added yet.</p>
              </div>
            ) : (
              course.chapters.map((chapter) => (
                <Card key={chapter.id} className="glass-card flex items-center p-4">
                  <div className="mr-4 cursor-grab text-muted-foreground">
                    <GripVertical className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{chapter.title}</h3>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:bg-destructive/10">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </Card>
              ))
            )}
          </div>
        </div>

        <div>
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-lg">Course Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-xs text-muted-foreground uppercase mb-1">Slug</p>
                <p className="text-sm font-medium">{course.slug}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase mb-1">Description</p>
                <p className="text-sm text-muted-foreground line-clamp-4">{course.description}</p>
              </div>
              <Button variant="outline" className="w-full mt-2">Edit Details</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
