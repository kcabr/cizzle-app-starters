import { useMutation as useRQMutation } from '@tanstack/react-query'
import { queryClient } from './useQueryClient'

// Extended mutation hook that includes invalidation and other common patterns
export function useMutation<TVariables, TData, TContext = unknown, TError = Error>({
  mutationFn,
  onMutate,
  onSuccess,
  onError,
  onSettled,
  invalidateQueries = [],
}: {
  mutationFn: (variables: TVariables) => Promise<TData>
  onMutate?: (variables: TVariables) => Promise<TContext> | TContext
  onSuccess?: (data: TData, variables: TVariables, context: TContext | undefined) => Promise<unknown> | unknown
  onError?: (error: TError, variables: TVariables, context: TContext | undefined) => Promise<unknown> | unknown
  onSettled?: (data: TData | undefined, error: TError | null, variables: TVariables, context: TContext | undefined) => Promise<unknown> | unknown
  invalidateQueries?: string[][]
}) {
  const mutation = useRQMutation({
    mutationFn,
    onMutate,
    onSuccess: async (data, variables, context) => {
      // Run the user-provided onSuccess callback
      if (onSuccess) {
        await onSuccess(data, variables, context)
      }
      
      // Invalidate all specified queries
      if (invalidateQueries.length > 0) {
        await Promise.all(
          invalidateQueries.map(queryKey => 
            queryClient.invalidateQueries({ queryKey })
          )
        )
      }
    },
    onError,
    onSettled,
  })
  
  return mutation
}