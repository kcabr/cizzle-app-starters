import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { createPost } from '~/utils/posts.js'
import { useState } from 'react'
import { useMutation } from '~/hooks/useMutation.js'

export const Route = createFileRoute('/_authed/posts/new')({
  component: NewPostComponent,
})

function NewPostComponent() {
  const navigate = useNavigate()
  const [postData, setPostData] = useState({
    title: '',
    body: ''
  })
  
  const createPostMutation = useMutation({
    mutationFn: (data: { title: string; body: string }) => createPost({ data }),
    invalidateQueries: [['posts']],
    onSuccess: () => {
      navigate({ to: '/posts' })
    }
  })
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!postData.title.trim() || !postData.body.trim()) return
    
    createPostMutation.mutate(postData)
  }
  
  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Create New Post</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block mb-1 font-medium">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={postData.title}
            onChange={(e) => setPostData({...postData, title: e.target.value})}
            className="w-full p-2 border rounded"
            placeholder="Enter post title"
            disabled={createPostMutation.isPending}
          />
        </div>
        
        <div>
          <label htmlFor="body" className="block mb-1 font-medium">
            Content
          </label>
          <textarea
            id="body"
            value={postData.body}
            onChange={(e) => setPostData({...postData, body: e.target.value})}
            className="w-full p-2 border rounded h-64"
            placeholder="Write your post content here..."
            disabled={createPostMutation.isPending}
          />
        </div>
        
        <div className="flex gap-2 justify-end">
          <button
            type="button"
            onClick={() => navigate({ to: '/posts' })}
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
            disabled={createPostMutation.isPending || !postData.title.trim() || !postData.body.trim()}
          >
            {createPostMutation.isPending ? 'Creating...' : 'Create Post'}
          </button>
        </div>
      </form>
      
      {createPostMutation.isError && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded">
          <p>Error: {createPostMutation.error.message}</p>
        </div>
      )}
    </div>
  )
}