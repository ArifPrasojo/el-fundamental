"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function updatePilotProfile(formData: FormData) {
  const session = await auth();
  
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const newName = formData.get("name") as string;
  
  if (newName && newName.trim().length > 0) {
    await db.user.update({
      where: { id: session.user.id },
      data: { name: newName.trim() }
    });
    
    // Revalidate paths so the new name appears everywhere
    revalidatePath("/dashboard/settings");
    revalidatePath("/dashboard");
    revalidatePath("/dashboard/layout");
  }
}
