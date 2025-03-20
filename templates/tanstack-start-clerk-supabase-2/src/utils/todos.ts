import { createServerFn } from '@tanstack/react-start'
import { prisma } from './prisma'
import { Todo } from '@prisma/client'
import { getAuth } from '@clerk/tanstack-start/server'
import { getWebRequest } from '@tanstack/react-start/server'

// Get all todos for the authenticated user
export const getTodos = createServerFn({ method: 'GET' }).handler(
  async () => {
    try {
      const { userId } = await getAuth(getWebRequest()!)
      if (!userId) throw new Error('Unauthorized')

      return await prisma.todo.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
      })
    } catch (error) {
      console.error('Error fetching todos:', error)
      throw error
    }
  }
)

// Get a single todo by ID
export const getTodoById = createServerFn({ method: 'GET' })
  .validator((id: string) => id)
  .handler(async ({ data: id }) => {
    try {
      const { userId } = await getAuth(getWebRequest()!)
      if (!userId) throw new Error('Unauthorized')

      const todo = await prisma.todo.findUnique({
        where: { id },
      })

      if (!todo) throw new Error('Todo not found')
      if (todo.userId !== userId) throw new Error('Unauthorized')

      return todo
    } catch (error) {
      console.error('Error fetching todo:', error)
      throw error
    }
  })

// Create a new todo
export const createTodo = createServerFn({ method: 'POST' })
  .validator((data: { title: string; description?: string }) => data)
  .handler(async ({ data }) => {
    try {
      const { userId } = await getAuth(getWebRequest()!)
      if (!userId) throw new Error('Unauthorized')

      return await prisma.todo.create({
        data: {
          title: data.title,
          description: data.description,
          userId,
        },
      })
    } catch (error) {
      console.error('Error creating todo:', error)
      throw error
    }
  })

// Update a todo
export const updateTodo = createServerFn({ method: 'PUT' })
  .validator((data: { id: string; title?: string; description?: string; completed?: boolean }) => data)
  .handler(async ({ data }) => {
    try {
      const { userId } = await getAuth(getWebRequest()!)
      if (!userId) throw new Error('Unauthorized')

      const todo = await prisma.todo.findUnique({
        where: { id: data.id },
      })

      if (!todo) throw new Error('Todo not found')
      if (todo.userId !== userId) throw new Error('Unauthorized')

      return await prisma.todo.update({
        where: { id: data.id },
        data: {
          title: data.title,
          description: data.description,
          completed: data.completed,
        },
      })
    } catch (error) {
      console.error('Error updating todo:', error)
      throw error
    }
  })

// Delete a todo
export const deleteTodo = createServerFn({ method: 'DELETE' })
  .validator((id: string) => id)
  .handler(async ({ data: id }) => {
    try {
      const { userId } = await getAuth(getWebRequest()!)
      if (!userId) throw new Error('Unauthorized')

      const todo = await prisma.todo.findUnique({
        where: { id },
      })

      if (!todo) throw new Error('Todo not found')
      if (todo.userId !== userId) throw new Error('Unauthorized')

      return await prisma.todo.delete({
        where: { id },
      })
    } catch (error) {
      console.error('Error deleting todo:', error)
      throw error
    }
  })