import { QueryClient } from '@tanstack/react-query'
import { useRouter } from '@tanstack/react-router'

// Create a singleton instance for use outside React components
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60, // 1 minute
      gcTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
})

// Hook for using query client within components
export function useQueryClient() {
  const router = useRouter()
  // Use the QueryClient from the router context if available
  // which ensures we use the same instance from the router
  return router.context.queryClient || queryClient
}