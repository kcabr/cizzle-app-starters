import { Link, Outlet, createFileRoute } from '@tanstack/react-router'
import { useSuspenseQuery } from '@tanstack/react-query'
import { postsQueryOptions, deletePost } from '~/utils/posts.js'
import { useMutation } from '~/hooks/useMutation.js'

export const Route = createFileRoute('/_authed/posts')({
  loader: ({ context }) => {
    // Prefetch posts query
    return context.queryClient.ensureQueryData(postsQueryOptions())
  },
  component: PostsComponent,
})

function PostsComponent() {
  const { data: posts } = useSuspenseQuery(postsQueryOptions())
  
  const deletePostMutation = useMutation({
    mutationFn: (id: number) => deletePost({ data: id }),
    invalidateQueries: [['posts']],
  })
  
  const handleDeletePost = (id: number) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      deletePostMutation.mutate(id)
    }
  }
  
  return (
    <div className="p-2 flex gap-6">
      <div className="min-w-64">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Posts</h2>
          <Link
            to="/posts/new"
            className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
          >
            Create New
          </Link>
        </div>
        
        {posts.length === 0 ? (
          <p className="text-gray-500 italic">No posts yet. Create one using the button above!</p>
        ) : (
          <ul className="list-disc pl-4 space-y-3">
            {posts.map((post) => (
              <li key={post.id} className="whitespace-nowrap">
                <div className="flex items-center justify-between gap-2">
                  <Link
                    to="/posts/$postId"
                    params={{
                      postId: String(post.id),
                    }}
                    className="block py-1 text-blue-800 hover:text-blue-600 truncate max-w-48"
                    activeProps={{ className: 'text-black font-bold' }}
                  >
                    {post.title.substring(0, 30)}{post.title.length > 30 ? '...' : ''}
                  </Link>
                  <button
                    onClick={() => handleDeletePost(post.id)}
                    className="text-red-500 text-sm hover:text-red-700"
                    title="Delete post"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
            <li className="whitespace-nowrap">
              <Link
                to="/posts/$postId"
                params={{
                  postId: 'i-do-not-exist',
                }}
                className="block py-1 text-blue-800 hover:text-blue-600"
                activeProps={{ className: 'text-black font-bold' }}
              >
                <div>Non-existent Post</div>
              </Link>
            </li>
          </ul>
        )}
        
        {deletePostMutation.isError && (
          <div className="mt-4 p-3 bg-red-100 text-red-700 rounded text-sm">
            <p>Error: {deletePostMutation.error.message}</p>
          </div>
        )}
      </div>
      
      <div className="flex-grow">
        <Outlet />
      </div>
    </div>
  )
}