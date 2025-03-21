'use server'

import { Note } from '@prisma/client'
import { getNotes } from '~/utils/notes'

async function NoteListRSC() {
  const notes = await getNotes()
  
  if (!notes || notes.length === 0) {
    return (
      <div className="text-center p-8 text-gray-500 dark:text-gray-400">
        No notes yet. Create your first note!
      </div>
    )
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} />
      ))}
    </div>
  )
}

function NoteCard({ note }: { note: Note }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:shadow-md transition-shadow duration-200">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">{note.title}</h3>
      <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">{note.content}</p>
      <div className="text-xs text-gray-500 dark:text-gray-400">
        {new Date(note.createdAt).toLocaleDateString()}
      </div>
    </div>
  )
}

export default NoteListRSC