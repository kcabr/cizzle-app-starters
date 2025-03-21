import { createServerFn } from '@tanstack/react-start'
import { getSupabaseServerClient } from './supabase.js'
import { getWebRequest } from '@tanstack/react-start/server'
import { getAuth } from '@clerk/tanstack-start/server'
import { queryOptions } from '@tanstack/react-query'

export type NoteType = {
  id: number
  content: string
  user_id: string
  created_at: string
}

// Function to get current user ID from Clerk
async function getCurrentUserId() {
  try {
    const { userId } = await getAuth(getWebRequest()!)
    return userId
  } catch (error) {
    console.error('Error getting auth:', error)
    return null
  }
}

// Fetch all notes for the current user
export const fetchNotes = createServerFn({ method: 'GET' }).handler(
  async () => {
    console.info('Fetching notes...')
    const userId = await getCurrentUserId()
    
    if (!userId) {
      throw new Error('Not authenticated')
    }
    
    try {
      const supabase = await getSupabaseServerClient()
      
      const { data: notes, error } = await supabase
        .from('notes')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
      
      if (error) {
        console.error('Error fetching notes:', error)
        
        if (error.code === 'PGRST116' || error.code === '42P01') {
          throw new Error('Supabase table "notes" does not exist. Please run the DDL script.')
        }
        
        throw error
      }
      
      return notes || []
    } catch (err) {
      console.error('Failed to fetch notes:', err)
      throw err
    }
  }
)

// Create a new note
export const createNote = createServerFn({ method: 'POST' })
  .validator((content: string) => content)
  .handler(async ({ data: content }) => {
    const userId = await getCurrentUserId()
    
    if (!userId) {
      throw new Error('Not authenticated')
    }
    
    try {
      const supabase = await getSupabaseServerClient()
      
      const { data: newNote, error } = await supabase
        .from('notes')
        .insert([
          {
            content,
            user_id: userId
          }
        ])
        .select()
        .single()
      
      if (error) {
        console.error('Error creating note:', error)
        
        if (error.code === 'PGRST116' || error.code === '42P01') {
          throw new Error('Supabase table "notes" does not exist. Please run the DDL script.')
        }
        
        throw error
      }
      
      return newNote
    } catch (err) {
      console.error('Failed to create note:', err)
      throw err
    }
  })

// Update a note
export const updateNote = createServerFn({ method: 'PUT' })
  .validator((data: { id: number; content: string }) => data)
  .handler(async ({ data }) => {
    const userId = await getCurrentUserId()
    
    if (!userId) {
      throw new Error('Not authenticated')
    }
    
    try {
      const supabase = await getSupabaseServerClient()
      
      // Verify note belongs to user
      const { data: existingNote } = await supabase
        .from('notes')
        .select('user_id')
        .eq('id', data.id)
        .single()
      
      if (!existingNote) {
        throw new Error('Note not found')
      }
      
      if (existingNote.user_id !== userId) {
        throw new Error('Not authorized to update this note')
      }
      
      const { data: updatedNote, error } = await supabase
        .from('notes')
        .update({
          content: data.content
        })
        .eq('id', data.id)
        .select()
        .single()
      
      if (error) {
        console.error('Error updating note:', error)
        throw error
      }
      
      return updatedNote
    } catch (err) {
      console.error('Failed to update note:', err)
      throw err
    }
  })

// Delete a note
export const deleteNote = createServerFn({ method: 'DELETE' })
  .validator((noteId: number) => noteId)
  .handler(async ({ data: noteId }) => {
    const userId = await getCurrentUserId()
    
    if (!userId) {
      throw new Error('Not authenticated')
    }
    
    try {
      const supabase = await getSupabaseServerClient()
      
      // Verify note belongs to user
      const { data: existingNote } = await supabase
        .from('notes')
        .select('user_id')
        .eq('id', noteId)
        .single()
      
      if (!existingNote) {
        throw new Error('Note not found')
      }
      
      if (existingNote.user_id !== userId) {
        throw new Error('Not authorized to delete this note')
      }
      
      const { error } = await supabase
        .from('notes')
        .delete()
        .eq('id', noteId)
      
      if (error) {
        console.error('Error deleting note:', error)
        throw error
      }
      
      return { success: true, id: noteId }
    } catch (err) {
      console.error('Failed to delete note:', err)
      throw err
    }
  })

// Query options for React Query
export const notesQueryOptions = () =>
  queryOptions({
    queryKey: ['notes'],
    queryFn: () => fetchNotes(),
  })