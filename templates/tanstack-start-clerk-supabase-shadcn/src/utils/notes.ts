import { createServerFn } from '@tanstack/react-start'
import { prisma } from './prisma'
import { Note } from '@prisma/client'
import { getAuth } from '@clerk/tanstack-start/server'
import { getWebRequest } from '@tanstack/react-start/server'

// Get all notes for the authenticated user
export const getNotes = createServerFn({ method: 'GET' }).handler(
  async () => {
    try {
      const { userId } = await getAuth(getWebRequest()!)
      if (!userId) throw new Error('Unauthorized')

      return await prisma.note.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
      })
    } catch (error) {
      console.error('Error fetching notes:', error)
      throw error
    }
  }
)

// Get a single note by ID
export const getNoteById = createServerFn({ method: 'GET' })
  .validator((id: string) => id)
  .handler(async ({ data: id }) => {
    try {
      const { userId } = await getAuth(getWebRequest()!)
      if (!userId) throw new Error('Unauthorized')

      const note = await prisma.note.findUnique({
        where: { id },
      })

      if (!note) throw new Error('Note not found')
      if (note.userId !== userId) throw new Error('Unauthorized')

      return note
    } catch (error) {
      console.error('Error fetching note:', error)
      throw error
    }
  })

// Create a new note
export const createNote = createServerFn({ method: 'POST' })
  .validator((data: { title: string; content: string }) => data)
  .handler(async ({ data }) => {
    try {
      const { userId } = await getAuth(getWebRequest()!)
      if (!userId) throw new Error('Unauthorized')

      return await prisma.note.create({
        data: {
          title: data.title,
          content: data.content,
          userId,
        },
      })
    } catch (error) {
      console.error('Error creating note:', error)
      throw error
    }
  })

// Update a note
export const updateNote = createServerFn({ method: 'PUT' })
  .validator((data: { id: string; title?: string; content?: string }) => data)
  .handler(async ({ data }) => {
    try {
      const { userId } = await getAuth(getWebRequest()!)
      if (!userId) throw new Error('Unauthorized')

      const note = await prisma.note.findUnique({
        where: { id: data.id },
      })

      if (!note) throw new Error('Note not found')
      if (note.userId !== userId) throw new Error('Unauthorized')

      return await prisma.note.update({
        where: { id: data.id },
        data: {
          title: data.title,
          content: data.content,
        },
      })
    } catch (error) {
      console.error('Error updating note:', error)
      throw error
    }
  })

// Delete a note
export const deleteNote = createServerFn({ method: 'DELETE' })
  .validator((id: string) => id)
  .handler(async ({ data: id }) => {
    try {
      const { userId } = await getAuth(getWebRequest()!)
      if (!userId) throw new Error('Unauthorized')

      const note = await prisma.note.findUnique({
        where: { id },
      })

      if (!note) throw new Error('Note not found')
      if (note.userId !== userId) throw new Error('Unauthorized')

      return await prisma.note.delete({
        where: { id },
      })
    } catch (error) {
      console.error('Error deleting note:', error)
      throw error
    }
  })