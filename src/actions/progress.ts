"use server";

import { db } from "@/lib/db";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function markChapterCompleted(chapterId: string) {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return { success: false, error: "Unauthorized" };
    }

    const userId = session.user.id;

    // Check if progress already exists
    const existingProgress = await db.userProgress.findUnique({
      where: {
        userId_chapterId: {
          userId,
          chapterId,
        }
      }
    });

    if (existingProgress) {
      return { success: true, message: "Already completed" };
    }

    // Create progress
    await db.userProgress.create({
      data: {
        userId,
        chapterId,
        isCompleted: true,
      }
    });

    revalidatePath("/dashboard");
    revalidatePath(`/learn`);
    
    return { success: true };
  } catch (error: any) {
    console.error("Error marking chapter as completed:", error);
    return { success: false, error: error.message };
  }
}
