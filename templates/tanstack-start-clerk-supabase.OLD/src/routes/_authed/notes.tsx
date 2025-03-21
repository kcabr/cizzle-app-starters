import { createFileRoute } from '@tanstack/react-router'
import { useSuspenseQuery } from '@tanstack/react-query'
import { notesQueryOptions, createNote, updateNote, deleteNote, NoteType } from '~/utils/notes.js'
import { useState } from 'react'
import { useMutation } from '~/hooks/useMutation.js'

export const Route = createFileRoute('/_authed/notes')({
  loader: async ({ context }) => {
    // Prefetch notes query
    await context.queryClient.ensureQueryData(notesQueryOptions())
  },
  component: NotesComponent,
})

function NotesComponent() {
  const [newNoteContent, setNewNoteContent] = useState('')
  const [editingNote, setEditingNote] = useState<NoteType | null>(null)
  const { data: notes } = useSuspenseQuery(notesQueryOptions())
  
  const addNoteMutation = useMutation({
    mutationFn: (content: string) => createNote({ data: content }),
    invalidateQueries: [['notes']],
  })
  
  const updateNoteMutation = useMutation({
    mutationFn: (data: { id: number; content: string }) => updateNote({ data }),
    invalidateQueries: [['notes']],
  })
  
  const deleteNoteMutation = useMutation({
    mutationFn: (id: number) => deleteNote({ data: id }),
    invalidateQueries: [['notes']],
  })
  
  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newNoteContent.trim()) return
    
    addNoteMutation.mutate(newNoteContent, {
      onSuccess: () => {
        setNewNoteContent('')
      }
    })
  }
  
  const handleUpdateNote = (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingNote || !editingNote.content.trim()) return
    
    updateNoteMutation.mutate({
      id: editingNote.id,
      content: editingNote.content
    }, {
      onSuccess: () => {
        setEditingNote(null)
      }
    })
  }
  
  const handleDeleteNote = (id: number) => {
    deleteNoteMutation.mutate(id)
  }
  
  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Notes with Supabase</h1>
      
      <form onSubmit={handleAddNote} className="mb-6">
        <div className="mb-2">
          <textarea
            value={newNoteContent}
            onChange={(e) => setNewNoteContent(e.target.value)}
            placeholder="Write your note here..."
            className="w-full p-2 border rounded h-32"
            disabled={addNoteMutation.isPending}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
          disabled={addNoteMutation.isPending || !newNoteContent.trim()}
        >
          {addNoteMutation.isPending ? 'Adding...' : 'Add Note'}
        </button>
      </form>
      
      {editingNote && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-xl w-full">
            <h2 className="text-xl font-bold mb-4">Edit Note</h2>
            <form onSubmit={handleUpdateNote}>
              <div className="mb-4">
                <textarea
                  value={editingNote.content}
                  onChange={(e) => setEditingNote({...editingNote, content: e.target.value})}
                  className="w-full p-2 border rounded h-48"
                  disabled={updateNoteMutation.isPending}
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingNote(null)}
                  className="px-4 py-2 border rounded hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
                  disabled={updateNoteMutation.isPending || !editingNote.content.trim()}
                >
                  {updateNoteMutation.isPending ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {notes.length === 0 ? (
        <p className="text-gray-500 italic">No notes yet. Add one above!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {notes.map((note) => (
            <div key={note.id} className="p-4 border rounded shadow-sm">
              <p className="whitespace-pre-wrap mb-4">{note.content}</p>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>{new Date(note.created_at).toLocaleDateString()}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditingNote(note)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteNote(note.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {(addNoteMutation.isError || updateNoteMutation.isError || deleteNoteMutation.isError) && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded">
          <p>Error: {(addNoteMutation.error || updateNoteMutation.error || deleteNoteMutation.error)?.message}</p>
        </div>
      )}
    </div>
  )
}