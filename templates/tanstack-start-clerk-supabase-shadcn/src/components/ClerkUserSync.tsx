/**
<ai_context>
This component synchronizes the Clerk authentication state with Redux and the Prisma database.

It monitors Clerk's authentication state and does the following:
- When a user signs in: Updates Redux with the user's details (only if not already in Redux)
- When a user signs out: Clears the user from Redux
- Syncs the user profile information to the Prisma database for server-side use

The component is optimized to avoid unnecessary Redux dispatches by:
- Only setting user data when Redux doesn't already have it (checked via reduxUser.isLoaded)
- Only clearing user data when Redux actually has a user to clear

This component doesn't render anything visible - it's a utility component that 
handles state synchronization between Clerk, Redux, and the database.
</ai_context>
*/

import { useEffect } from "react";
import { useUser } from "@clerk/tanstack-start";
import { useAppDispatch, useAppSelector } from "~/store/hooks";
import { setUser, clearUser } from "~/store/slices/userSlice";
import { updateUserProfile } from "~/utils/auth";

export function ClerkUserSync() {
  const { isLoaded, isSignedIn, user } = useUser();
  const dispatch = useAppDispatch();
  const reduxUser = useAppSelector((state) => state.user);

  useEffect(() => {
    if (!isLoaded) return;

    if (isSignedIn && user) {
      // Only set user if not already in Redux
      if (!reduxUser.isLoaded) {
        const userData = {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.primaryEmailAddress?.emailAddress || null,
          profileImageUrl: user.imageUrl,
        };

        //console.log("KC-DEBUG: userData", userData);

        // Update user in Redux
        dispatch(
          setUser({
            ...userData,
            isLoaded: true,
          })
        );

        // Also sync with Prisma database
        updateUserProfile({ data: userData });
      }
    } else if (reduxUser.isLoaded) {
      // Only clear if there's a user to clear
      dispatch(clearUser());
    }
  }, [isLoaded, isSignedIn, user, dispatch, reduxUser.isLoaded]);

  // This is a utility component that doesn't render anything
  return null;
}
