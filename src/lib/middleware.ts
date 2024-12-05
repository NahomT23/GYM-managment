// lib/middleware.js
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function ensureAdmin() {
  // Get session using dynamic headers
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    throw new Error("User not authenticated.");
  }

  const user = session.user;

  if (!user?.email) {
    throw new Error("User email not found.");
  }

  // Check if the user is an admin
  const admin = await prisma.admin.findUnique({
    where: {
      email: user.email,
    },
  });

  if (!admin) {
    throw new Error("User is not an admin.");
  }

  return admin; // Return the admin details for further use
}
