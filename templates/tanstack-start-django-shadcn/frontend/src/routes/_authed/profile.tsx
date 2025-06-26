import { createFileRoute } from "@tanstack/react-router";
import { useAuth } from "~/components/AuthComponents";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";

export const Route = createFileRoute("/_authed/profile")({
  component: ProfilePage,
});

function ProfilePage() {
  const { user, logout } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = useCallback(async () => {
    try {
      setIsLoading(true);
      await logout();
      toast.success("Signed out successfully");
    } catch (error) {
      console.error("Error signing out:", error);
      toast.error("Failed to sign out");
    } finally {
      setIsLoading(false);
    }
  }, [logout]);

  if (!user) {
    return (
      <div className="py-10 flex justify-center">
        <div className="animate-pulse space-y-4 w-full max-w-md">
          <div className="h-12 bg-slate-300 dark:bg-slate-700 rounded-full w-1/4 mx-auto"></div>
          <div className="h-4 bg-slate-300 dark:bg-slate-700 rounded w-3/4 mx-auto"></div>
          <div className="h-4 bg-slate-300 dark:bg-slate-700 rounded w-1/2 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-10">
      <header>
        <div className="mx-auto max-w-7xl">
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
            User Profile
          </h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
            Manage your account information
          </p>
        </div>
      </header>
      <main className="mt-10">
        <div className="mx-auto max-w-3xl">
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
            <div className="p-8 sm:p-10 text-center">
              <div className="relative mx-auto h-24 w-24 overflow-hidden rounded-full">
                <div className="flex h-full w-full items-center justify-center bg-gray-200 dark:bg-gray-700">
                  <span className="text-xl font-medium text-gray-600 dark:text-gray-300">
                    {user.first_name?.charAt(0) ||
                      user.username?.charAt(0)?.toUpperCase() ||
                      "U"}
                  </span>
                </div>
              </div>
              <h2 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">
                {user.first_name && user.last_name
                  ? `${user.first_name} ${user.last_name}`
                  : user.username}
              </h2>
              <p className="text-gray-500 dark:text-gray-400">{user.email}</p>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700 px-8 py-6">
              <dl className="divide-y divide-gray-200 dark:divide-gray-700">
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Full name
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:col-span-2 sm:mt-0">
                    {user.first_name && user.last_name
                      ? `${user.first_name} ${user.last_name}`
                      : "Not provided"}
                  </dd>
                </div>
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Email address
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:col-span-2 sm:mt-0">
                    {user.email}
                  </dd>
                </div>
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Username
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:col-span-2 sm:mt-0">
                    {user.username}
                  </dd>
                </div>
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Account ID
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:col-span-2 sm:mt-0">
                    {user.id}
                  </dd>
                </div>
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Member since
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:col-span-2 sm:mt-0">
                    {new Date(user.date_joined).toLocaleString()}
                  </dd>
                </div>
              </dl>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700 px-8 py-6 flex justify-end">
              <button
                type="button"
                onClick={handleSignOut}
                disabled={isLoading}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                {isLoading ? "Signing out..." : "Sign out"}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
