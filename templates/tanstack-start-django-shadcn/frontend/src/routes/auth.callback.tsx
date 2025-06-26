import { createFileRoute, redirect } from '@tanstack/react-router';
import { authApi } from '~/utils/auth';

export const Route = createFileRoute('/auth/callback')({
  component: AuthCallback,
  beforeLoad: async () => {
    // After OAuth login, Django redirects here with session cookie set
    try {
      // Check if we can get user info (session cookie should be set)
      const user = await authApi.getCurrentUser();
      
      // Get redirect URL from sessionStorage (set before OAuth redirect)
      const redirectTo = sessionStorage.getItem('auth_redirect') || '/profile';
      sessionStorage.removeItem('auth_redirect');
      
      // Redirect to intended destination
      throw redirect({
        to: redirectTo,
      });
    } catch (error) {
      console.error('Auth callback error:', error);
      // If auth check fails, redirect to home
      throw redirect({
        to: '/',
        search: {
          error: 'Authentication failed',
        },
      });
    }
  },
});

function AuthCallback() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Authenticating...</h2>
        <p className="text-gray-600">Please wait while we complete your sign in.</p>
      </div>
    </div>
  );
}