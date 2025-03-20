import { ErrorComponent, createFileRoute } from '@tanstack/react-router'
import type { ErrorComponentProps } from '@tanstack/react-router'
import { NotFound } from '~/components/NotFound.js'
import { fetchPost } from '~/utils/posts.js'
import { useQuery } from '@tanstack/react-query'
import { useServerFn } from '@tanstack/react-start'

export const Route = createFileRoute('/_authed/posts/$postId')({
  errorComponent: PostErrorComponent,
  component: PostComponent,
  notFoundComponent: () => {
    return <NotFound>Post not found</NotFound>
  },
})

export function PostErrorComponent({ error }: ErrorComponentProps) {
  return <ErrorComponent error={error} />
}

function PostComponent() {
  const { postId } = Route.useParams()
  
  const { data: post, isLoading, error } = useQuery({
    queryKey: ['post', postId],
    queryFn: () => fetchPost({ data: postId }),
  })

  if (isLoading) {
    return (
      <div className="py-10">
        <div className="animate-pulse space-y-4">
          <div className="h-6 w-3/4 bg-slate-300 dark:bg-slate-700 rounded"></div>
          <div className="space-y-2">
            <div className="h-4 bg-slate-300 dark:bg-slate-700 rounded"></div>
            <div className="h-4 bg-slate-300 dark:bg-slate-700 rounded w-5/6"></div>
            <div className="h-4 bg-slate-300 dark:bg-slate-700 rounded w-4/6"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return <ErrorComponent error={error as Error} />
  }

  if (!post) {
    return <NotFound>Post not found</NotFound>
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{post.title}</h2>
      <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg shadow-inner">
        <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">{post.body}</p>
      </div>
    </div>
  )
}
