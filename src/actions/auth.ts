"use server";

import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function registerUser(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!name || !email || !password) {
      return { success: false, error: "Missing fields" };
    }

    // Check if user already exists
    const existingUser = await db.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return { success: false, error: "Email is already registered" };
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      }
    });

    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
