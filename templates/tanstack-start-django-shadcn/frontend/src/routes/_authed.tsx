import { createFileRoute, redirect } from '@tanstack/react-router'
import { authApi } from '~/utils/auth'
import { SignInButton } from '~/components/AuthComponents'

export const Route = createFileRoute('/_authed')({
  beforeLoad: async () => {
    // Check if user is authenticated
    if (!authApi.isAuthenticated()) {
      throw redirect({
        to: '/',
        search: {
          redirect: window.location.pathname,
        },
      })
    }

    // Try to get user info to validate token
    try {
      const user = await authApi.getCurrentUser()
      return { user }
    } catch (error) {
      // Token is invalid, redirect to login
      authApi.logout()
      throw redirect({
        to: '/',
        search: {
          redirect: window.location.pathname,
        },
      })
    }
  },
  errorComponent: ({ error }) => {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] p-12">
        <h2 className="text-2xl font-bold mb-4">Authentication Required</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          You need to sign in to access this page.
        </p>
        <SignInButton />
      </div>
    )
  },
})