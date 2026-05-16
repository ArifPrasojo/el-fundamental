import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Save } from "lucide-react";
import { db } from "@/lib/db";

export default async function NewChapterPage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;

  async function createChapter(formData: FormData) {
    "use server";
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;

    // Get current max order
    const course = await db.course.findUnique({
      where: { id: courseId },
      include: { chapters: { orderBy: { order: 'desc' }, take: 1 } }
    });

    const newOrder = course?.chapters[0] ? course.chapters[0].order + 1 : 1;

    await db.chapter.create({
      data: {
        title,
        content,
        order: newOrder,
        courseId
      }
    });

    redirect(`/admin/courses/${courseId}`);
  }

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="flex items-center space-x-4">
        <Link href={`/admin/courses/${courseId}`}>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">Add New Chapter</h1>
          <p className="text-muted-foreground text-sm">Create learning materials and exercises.</p>
        </div>
      </div>

      <form action={createChapter} className="glass-card p-6 rounded-2xl space-y-6 border border-border/50">
        <div className="space-y-2">
          <Label htmlFor="title">Chapter Title</Label>
          <Input id="title" name="title" placeholder="e.g. Variables & Data Types" required className="bg-background/50" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="content">Lesson Content (HTML/Markdown)</Label>
          <div className="rounded-md border border-border bg-background/50 overflow-hidden focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 ring-offset-background">
            <div className="flex items-center space-x-2 border-b border-border/50 bg-muted/50 p-2">
              <span className="text-xs font-medium px-2 py-1 bg-background rounded border border-border/50 shadow-sm">Write HTML</span>
              <span className="text-xs text-muted-foreground">Preview not available in this mockup</span>
            </div>
            <textarea 
              id="content" 
              name="content" 
              rows={15}
              className="w-full bg-transparent px-3 py-3 text-sm focus:outline-none font-mono"
              placeholder={`<h1>Variables</h1>\n<p>Variables are containers for storing data values.</p>\n\n<div class="bg-primary/10 border border-primary/20 rounded-xl p-4 mt-8">\n  <h4 class="font-semibold text-primary mb-2">Challenge</h4>\n  <p>Create a variable...</p>\n</div>`}
              required
            />
          </div>
          <p className="text-xs text-muted-foreground mt-2">You can use Tailwind utility classes directly in the HTML.</p>
        </div>

        <div className="pt-4 flex justify-end">
          <Button type="submit" className="shadow-lg shadow-primary/20">
            <Save className="w-4 h-4 mr-2" />
            Save Chapter
          </Button>
        </div>
      </form>
    </div>
  );
}
