"use server";

import { prisma } from "./prisma";

/**
 * Server component function to sync user profile to the database
 * This is explicitly marked as a server component with 'use server'
 */
export async function syncUserProfile(userData: {
  id: string;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  profileImageUrl: string | null;
}) {
  try {
    // Update the user in the database
    return await prisma.user.upsert({
      where: { id: userData.id },
      update: {
        // Only update email if provided and valid
        ...(userData.email ? { email: userData.email } : {}),
        ...(userData.firstName ? { firstName: userData.firstName } : {}),
        ...(userData.lastName ? { lastName: userData.lastName } : {}),
        //...(userData.profileImageUrl ? { profileImageUrl: userData.profileImageUrl } : {}),
        // We could store other data in custom fields if needed in the future
      },
      create: {
        id: userData.id,
        email: userData.email || userData.id, // Fallback to id if email is null
        firstName: userData.firstName || null,
        lastName: userData.lastName || null,
        lastLoginAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    return await prisma.user.findUnique({
      where: { id: userData.id },
    });
  } catch (error) {
    console.error("Error syncing user profile:", error);
    throw error;
  }
}
