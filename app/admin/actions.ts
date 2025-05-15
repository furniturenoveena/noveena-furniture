"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { createSession, deleteSession } from "@/lib/sessions";
import { redirect } from "next/navigation";

// Login Schema
const loginSchema = z.object({
  username: z.string().trim(),
  password: z.string().trim(),
});

/**
 * Handles admin login.
 * Validates the provided form data, checks credentials against environment variables.
 * Redirects to the dashboard upon successful login.
 *
 * @param prevState - The previous state (not used in this implementation).
 * @param formData - The form data containing username and password.
 * @returns An object containing errors if validation or authentication fails.
 */
export async function login(prevState: any, formData: FormData) {
  const result = loginSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }

  const { username, password } = result.data;

  const adminUsername = process.env.ADMIN_USERNAME;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminUsername || !adminPassword) {
    console.error(
      "Admin credentials not properly configured in environment variables"
    );
    return {
      errors: {
        username: ["System configuration error. Please contact support."],
      },
    };
  }

  // Check if credentials match environment variables
  if (username !== adminUsername || password !== adminPassword) {
    return { errors: { username: ["Invalid username or password"] } };
  }

  // Use a fixed ID for admin since we're not using the database
  await createSession("admin");

  redirect("/admin/dashboard");
}

/**
 * Handles customer logout.
 * Deletes the current session and redirects to the login page.
 */
export async function logout() {
  await deleteSession();
  redirect("/admin/login");
}
