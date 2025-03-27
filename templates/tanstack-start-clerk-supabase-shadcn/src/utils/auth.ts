import { prisma } from "./prisma";
import { getAuth } from "@clerk/tanstack-start/server";
import { getWebRequest } from "@tanstack/react-start/server";
import { Prisma } from "@prisma/client";
import { clerkClient } from "@clerk/tanstack-start/server";
import { createServerFn } from "@tanstack/react-start";

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

    // Get the user's email using Clerk's API
    // For TanStack Start with Clerk, we can get the user's email from the session claims

    // console.error("auth.sessionClaims", auth.sessionClaims);

    // const email = auth.sessionClaims?.email as string;

    // if (!email) {
    //   throw new Error("No email address available in session claims");
    // }

    // Upsert the user in the database
    await prisma.user.upsert({
      where: { id: auth.userId },
      update: { lastLoginAt: new Date(), lastLoginIP: ipAddress },
      create: {
        id: auth.userId,
        email: auth.userId,
        lastLoginAt: new Date(),
        lastLoginIP: ipAddress,
      },
    });

    // Return the updated user
    return await prisma.user.findUnique({
      where: { id: auth.userId },
    });
  } catch (error) {
    console.error("Error in handleSuccessfulLogin:", error);
    throw error;
  }
}

/**
 * Updates a user's profile information in the database
 * Used to keep the Prisma database in sync with Clerk user data
 */
export const updateUserProfile = createServerFn({ method: "POST" })
  .validator(
    (data: {
      id: string;
      firstName: string | null;
      lastName: string | null;
      email: string | null;
      profileImageUrl: string | null;
    }) => data
  )
  .handler(async ({ data }) => {
    try {
      // Update the user in the database
      return await prisma.user.upsert({
        where: { id: data.id },
        update: {
          // Only update email if provided and valid
          ...(data.email ? { email: data.email } : {}),
          // We could store other data in custom fields if needed in the future
        },
        create: {
          id: data.id,
          email: data.email || data.id, // Fallback to id if email is null
          lastLoginAt: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });
    } catch (error) {
      console.error("Error updating user profile:", error);
      throw error;
    }
  });
