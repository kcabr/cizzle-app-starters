import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createNote } from '~/utils/notes'
import toast from 'react-hot-toast'
import { useServerFn, renderRsc } from '@tanstack/react-start'
import NoteListRSC from '~/components/NoteList'

export const Route = createFileRoute('/_authed/notes')({
  component: NotesPage,
})

function NotesPage() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const queryClient = useQueryClient()

  const createNoteMutation = useMutation({
    mutationFn: useServerFn(createNote),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] })
      setTitle('')
      setContent('')
      toast.success('Note created successfully!')
    },
    onError: (error) => {
      toast.error(`Failed to create note: ${error.message}`)
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !content.trim()) return

    createNoteMutation.mutate({
      data: {
        title,
        content,
      },
    })
  }

  return (
    <div className="py-10">
      <header>
        <div className="mx-auto max-w-7xl">
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
            Notes
          </h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
            Create and manage your notes with React Server Components (RSC)
          </p>
        </div>
      </header>
      <main className="mt-10">
        <div className="mx-auto max-w-7xl">
          {/* Create Note Form */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Create New Note</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Enter note title"
                  required
                />
              </div>
              <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Content
                </label>
                <textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Enter note content"
                  rows={5}
                  required
                />
              </div>
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                disabled={createNoteMutation.isPending}
              >
                {createNoteMutation.isPending ? 'Creating...' : 'Create Note'}
              </button>
            </form>
          </div>

          {/* Notes List (Rendered on server) */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Your Notes</h2>
            {renderRsc(<NoteListRSC />)}
          </div>
        </div>
      </main>
    </div>
  )
}