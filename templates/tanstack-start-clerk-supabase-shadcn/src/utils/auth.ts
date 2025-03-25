import { prisma } from "./prisma";
import { getAuth } from "@clerk/tanstack-start/server";
import { getWebRequest } from "@tanstack/react-start/server";
import { Prisma } from "@prisma/client";

/**
 * Upserts a user in the database after Clerk authentication
 * Creates a new user if they don't exist or updates their login info if they do
 *
 * @param userId The Clerk user ID
 * @param email The user's email address
 * @param ipAddress The user's IP address
 * @returns The user record
 */
export async function upsertUserAfterLogin(
  userId: string,
  email: string,
  ipAddress: string
) {
  // First check if the user exists
  const existingUser = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (existingUser) {
    // Update existing user
    return await prisma.$executeRaw`
      UPDATE "User"
      SET "email" = ${email}, 
          "lastLoginAt" = ${new Date()}, 
          "lastLoginIP" = ${ipAddress},
          "updatedAt" = ${new Date()}
      WHERE "id" = ${userId}
    `;
  } else {
    // Create new user
    return await prisma.$executeRaw`
      INSERT INTO "User" ("id", "email", "lastLoginAt", "lastLoginIP", "createdAt", "updatedAt")
      VALUES (${userId}, ${email}, ${new Date()}, ${ipAddress}, ${new Date()}, ${new Date()})
    `;
  }
}

/**
 * Handler to use after successful Clerk authentication
 * Gets the user info from Clerk and upserts it in the database
 *
 * @param request The web request object (to get IP address)
 * @returns The user record
 */
export async function handleSuccessfulLogin(request?: Request) {
  try {
    const req = request || getWebRequest();
    if (!req) {
      throw new Error("No request object available");
    }

    // Get auth data from Clerk
    const auth = await getAuth(req);
    if (!auth.userId) {
      throw new Error("No user ID available from Clerk");
    }

    // Get user IP address from request headers
    const ipAddress =
      req.headers.get("x-forwarded-for") ||
      req.headers.get("x-real-ip") ||
      "127.0.0.1";

    // Get the user's email from the auth data
    // In this case we're using the request to get the user's email
    // Ideally, you would use Clerk's API to get the user's complete profile
    const email =
      (auth.sessionClaims?.email as string) ||
      `user-${auth.userId}@example.com`; // Fallback if email not in claims

    // Upsert the user in the database
    await upsertUserAfterLogin(auth.userId, email, ipAddress);

    // Return the updated user
    return await prisma.user.findUnique({
      where: { id: auth.userId },
    });
  } catch (error) {
    console.error("Error in handleSuccessfulLogin:", error);
    throw error;
  }
}
