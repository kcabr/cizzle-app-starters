import { Link, Outlet, createFileRoute } from '@tanstack/react-router'
import { fetchPosts } from '~/utils/posts.js'
import { useQuery } from '@tanstack/react-query'
import { useServerFn } from '@tanstack/react-start'

export const Route = createFileRoute('/_authed/posts')({
  component: PostsComponent,
})

function PostsComponent() {
  const { data: posts, isLoading, error } = useQuery({
    queryKey: ['posts'],
    queryFn: () => fetchPosts(),
  })

  if (isLoading) {
    return (
      <div className="py-10 flex justify-center">
        <div className="animate-pulse flex space-x-4 items-center">
          <div className="rounded-full bg-slate-300 dark:bg-slate-700 h-10 w-10"></div>
          <div className="h-4 w-36 bg-slate-300 dark:bg-slate-700 rounded"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="py-10 text-red-500">
        Error loading posts: {error instanceof Error ? error.message : 'Unknown error'}
      </div>
    )
  }

  return (
    <div className="py-10">
      <header>
        <div className="mx-auto max-w-7xl">
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
            Posts
          </h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
            Posts fetched using React Query for data management
          </p>
        </div>
      </header>
      <main className="mt-10">
        <div className="mx-auto max-w-7xl">
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 flex gap-6">
            <div className="w-1/3 border-r border-gray-200 dark:border-gray-700 pr-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Post List</h2>
              <ul className="space-y-2">
                {posts && [...posts, { id: 'i-do-not-exist', title: 'Non-existent Post' }].map(
                  (post) => {
                    return (
                      <li key={post.id} className="border-b border-gray-100 dark:border-gray-700 last:border-b-0 pb-2 last:pb-0">
                        <Link
                          to="/posts/$postId"
                          params={{
                            postId: post.id,
                          }}
                          className="block py-2 px-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200"
                          activeProps={{ className: 'block py-2 px-3 rounded-md bg-indigo-50 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-200 font-medium' }}
                        >
                          {post.title.substring(0, 30)}{post.title.length > 30 ? '...' : ''}
                        </Link>
                      </li>
                    )
                  },
                )}
              </ul>
            </div>
            <div className="flex-1">
              <Outlet />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
