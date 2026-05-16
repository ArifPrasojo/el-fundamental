import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Save } from "lucide-react";
import { db } from "@/lib/db";

export default function NewCoursePage() {
  async function createCourse(formData: FormData) {
    "use server";
    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const description = formData.get("description") as string;
    const language = formData.get("language") as string;

    const course = await db.course.create({
      data: {
        title,
        slug,
        description,
        language
      }
    });

    redirect(`/admin/courses/${course.id}`);
  }

  return (
    <div className="space-y-8 max-w-2xl">
      <div className="flex items-center space-x-4">
        <Link href="/admin/courses">
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">Create New Course</h1>
          <p className="text-muted-foreground text-sm">Define the high-level details of the learning module.</p>
        </div>
      </div>

      <form action={createCourse} className="glass-card p-6 rounded-2xl space-y-6 border border-border/50">
        <div className="space-y-2">
          <Label htmlFor="title">Course Title</Label>
          <Input id="title" name="title" placeholder="e.g. Python Fundamentals" required className="bg-background/50" />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="slug">Slug (URL)</Label>
          <Input id="slug" name="slug" placeholder="e.g. python-fundamentals" required className="bg-background/50" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <textarea 
            id="description" 
            name="description" 
            rows={4}
            className="flex w-full rounded-md border border-border bg-background/50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Brief description of what students will learn..."
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="language">Programming Language</Label>
          <select 
            id="language" 
            name="language"
            className="flex h-10 w-full items-center justify-between rounded-md border border-border bg-background/50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            required
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
          </select>
        </div>

        <div className="pt-4 flex justify-end">
          <Button type="submit" className="shadow-lg shadow-primary/20">
            <Save className="w-4 h-4 mr-2" />
            Save Course
          </Button>
        </div>
      </form>
    </div>
  );
}
