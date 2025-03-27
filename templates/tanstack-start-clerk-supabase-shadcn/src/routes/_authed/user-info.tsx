import { createFileRoute } from "@tanstack/react-router";
import { useAppSelector } from "~/store/hooks";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";

export const Route = createFileRoute("/_authed/user-info")({
  component: UserInfoPage,
});

function UserInfoPage() {
  const user = useAppSelector((state) => state.user);

  const initials =
    user.firstName && user.lastName
      ? `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`
      : user.email?.charAt(0) || "U";

  return (
    <div className="py-10">
      <header>
        <div className="mx-auto max-w-7xl">
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
            User Information
          </h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
            User data from Redux global state
          </p>
        </div>
      </header>
      <main className="mt-10">
        <div className="mx-auto max-w-7xl">
          <Card className="max-w-md mx-auto">
            <CardHeader className="flex flex-row items-center gap-4">
              <Avatar className="h-16 w-16">
                {user.profileImageUrl ? (
                  <AvatarImage src={user.profileImageUrl} alt="Profile" />
                ) : (
                  <AvatarFallback className="text-lg">
                    {initials}
                  </AvatarFallback>
                )}
              </Avatar>
              <div>
                <CardTitle>
                  {user.firstName} {user.lastName}
                </CardTitle>
                <CardDescription>{user.email}</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    User ID
                  </h3>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white truncate">
                    {user.id}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    First Name
                  </h3>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    {user.firstName}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Last Name
                  </h3>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    {user.lastName}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Email
                  </h3>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    {user.email}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
