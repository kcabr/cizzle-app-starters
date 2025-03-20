import { ErrorComponent, createFileRoute } from '@tanstack/react-router'
import { useSuspenseQuery } from '@tanstack/react-query'
import { postQueryOptions, updatePost } from '~/utils/posts.js'
import type { ErrorComponentProps } from '@tanstack/react-router'
import { NotFound } from '~/components/NotFound.js'
import { useState } from 'react'
import { useMutation } from '~/hooks/useMutation.js'

export const Route = createFileRoute('/_authed/posts/$postId')({
  loader: ({ params: { postId }, context }) => {
    // Prefetch post query
    return context.queryClient.ensureQueryData(postQueryOptions(postId))
  },
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
  const { data: post } = useSuspenseQuery(postQueryOptions(postId))
  
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({
    id: 0,
    title: '',
    body: ''
  })
  
  const updatePostMutation = useMutation({
    mutationFn: (data: { id: number; title: string; body: string }) => updatePost({ data }),
    invalidateQueries: [['posts'], ['post', postId]],
    onSuccess: () => {
      setIsEditing(false)
    }
  })
  
  const handleEdit = () => {
    setEditData({
      id: post.id,
      title: post.title,
      body: post.body
    })
    setIsEditing(true)
  }
  
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    if (!editData.title.trim() || !editData.body.trim()) return
    
    updatePostMutation.mutate(editData)
  }
  
  if (isEditing) {
    return (
      <div className="space-y-4">
        <h3 className="text-xl font-bold">Edit Post</h3>
        
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label htmlFor="edit-title" className="block mb-1 font-medium">
              Title
            </label>
            <input
              id="edit-title"
              type="text"
              value={editData.title}
              onChange={(e) => setEditData({...editData, title: e.target.value})}
              className="w-full p-2 border rounded"
              disabled={updatePostMutation.isPending}
            />
          </div>
          
          <div>
            <label htmlFor="edit-body" className="block mb-1 font-medium">
              Content
            </label>
            <textarea
              id="edit-body"
              value={editData.body}
              onChange={(e) => setEditData({...editData, body: e.target.value})}
              className="w-full p-2 border rounded h-64"
              disabled={updatePostMutation.isPending}
            />
          </div>
          
          <div className="flex gap-2 justify-end">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 border rounded hover:bg-gray-100"
              disabled={updatePostMutation.isPending}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
              disabled={updatePostMutation.isPending || !editData.title.trim() || !editData.body.trim()}
            >
              {updatePostMutation.isPending ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
        
        {updatePostMutation.isError && (
          <div className="mt-4 p-3 bg-red-100 text-red-700 rounded">
            <p>Error: {updatePostMutation.error.message}</p>
          </div>
        )}
      </div>
    )
  }
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-start">
        <h4 className="text-xl font-bold">{post.title}</h4>
        <button
          onClick={handleEdit}
          className="text-blue-500 hover:text-blue-700"
        >
          Edit
        </button>
      </div>
      <div className="text-sm whitespace-pre-wrap">{post.body}</div>
      {post.created_at && (
        <div className="text-xs text-gray-500">
          Posted on {new Date(post.created_at).toLocaleDateString()}
        </div>
      )}
    </div>
  )
}