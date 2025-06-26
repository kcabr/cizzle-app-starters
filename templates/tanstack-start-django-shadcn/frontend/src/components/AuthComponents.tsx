import React from "react";
import { getGoogleLoginUrl, getGithubLoginUrl } from "~/utils/auth";
import { Button } from "~/components/ui/button";
import { useAuth } from "~/contexts/AuthContext";
import { useRouter } from "@tanstack/react-router";

interface AuthWrapperProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

// Re-export useAuth from context
export { useAuth } from "~/contexts/AuthContext";

// Component that renders children only when signed in
export function SignedIn({ children }: AuthWrapperProps) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return null;
  if (!isAuthenticated) return null;

  return <>{children}</>;
}

// Component that renders children only when signed out
export function SignedOut({ children }: AuthWrapperProps) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return null;
  if (isAuthenticated) return null;

  return <>{children}</>;
}

// Simple login button that redirects to Django OAuth
export function SignInButton({ mode, redirectTo }: { mode?: string; redirectTo?: string }) {
  const router = useRouter();
  const currentPath = router.state.location.pathname;
  const redirect = redirectTo || currentPath;

  return (
    <div className="space-x-2">
      <Button
        asChild
        variant="outline"
        className="bg-white/10 text-white hover:bg-white/20 border-white/20"
      >
        <a href={getGoogleLoginUrl(redirect)}>Sign in with Google</a>
      </Button>
      <Button
        asChild
        variant="outline"
        className="bg-white/10 text-white hover:bg-white/20 border-white/20"
      >
        <a href={getGithubLoginUrl(redirect)}>Sign in with GitHub</a>
      </Button>
    </div>
  );
}
