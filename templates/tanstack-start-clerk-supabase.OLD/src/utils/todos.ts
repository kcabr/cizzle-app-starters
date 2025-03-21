import { createServerFn } from '@tanstack/react-start'
import { getSupabaseServerClient } from './supabase.js'
import { getWebRequest } from '@tanstack/react-start/server'
import { getAuth } from '@clerk/tanstack-start/server'
import { queryOptions } from '@tanstack/react-query'

export type TodoType = {
  id: number
  title: string
  completed: boolean
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

// Fetch all todos for the current user
export const fetchTodos = createServerFn({ method: 'GET' }).handler(
  async () => {
    console.info('Fetching todos...')
    const userId = await getCurrentUserId()
    
    if (!userId) {
      throw new Error('Not authenticated')
    }
    
    try {
      const supabase = await getSupabaseServerClient()
      
      const { data: todos, error } = await supabase
        .from('todos')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
      
      if (error) {
        console.error('Error fetching todos:', error)
        
        if (error.code === 'PGRST116' || error.code === '42P01') {
          throw new Error('Supabase table "todos" does not exist. Please run the DDL script.')
        }
        
        throw error
      }
      
      return todos || []
    } catch (err) {
      console.error('Failed to fetch todos:', err)
      throw err
    }
  }
)

// Create a new todo
export const createTodo = createServerFn({ method: 'POST' })
  .validator((title: string) => title)
  .handler(async ({ data: title }) => {
    const userId = await getCurrentUserId()
    
    if (!userId) {
      throw new Error('Not authenticated')
    }
    
    try {
      const supabase = await getSupabaseServerClient()
      
      const { data: newTodo, error } = await supabase
        .from('todos')
        .insert([
          {
            title,
            completed: false,
            user_id: userId
          }
        ])
        .select()
        .single()
      
      if (error) {
        console.error('Error creating todo:', error)
        
        if (error.code === 'PGRST116' || error.code === '42P01') {
          throw new Error('Supabase table "todos" does not exist. Please run the DDL script.')
        }
        
        throw error
      }
      
      return newTodo
    } catch (err) {
      console.error('Failed to create todo:', err)
      throw err
    }
  })

// Toggle a todo's completed status
export const toggleTodo = createServerFn({ method: 'PUT' })
  .validator((data: { id: number; completed: boolean }) => data)
  .handler(async ({ data }) => {
    const userId = await getCurrentUserId()
    
    if (!userId) {
      throw new Error('Not authenticated')
    }
    
    try {
      const supabase = await getSupabaseServerClient()
      
      // Verify todo belongs to user
      const { data: existingTodo } = await supabase
        .from('todos')
        .select('user_id, completed')
        .eq('id', data.id)
        .single()
      
      if (!existingTodo) {
        throw new Error('Todo not found')
      }
      
      if (existingTodo.user_id !== userId) {
        throw new Error('Not authorized to update this todo')
      }
      
      const { data: updatedTodo, error } = await supabase
        .from('todos')
        .update({
          completed: data.completed
        })
        .eq('id', data.id)
        .select()
        .single()
      
      if (error) {
        console.error('Error updating todo:', error)
        throw error
      }
      
      return updatedTodo
    } catch (err) {
      console.error('Failed to update todo:', err)
      throw err
    }
  })

// Delete a todo
export const deleteTodo = createServerFn({ method: 'DELETE' })
  .validator((todoId: number) => todoId)
  .handler(async ({ data: todoId }) => {
    const userId = await getCurrentUserId()
    
    if (!userId) {
      throw new Error('Not authenticated')
    }
    
    try {
      const supabase = await getSupabaseServerClient()
      
      // Verify todo belongs to user
      const { data: existingTodo } = await supabase
        .from('todos')
        .select('user_id')
        .eq('id', todoId)
        .single()
      
      if (!existingTodo) {
        throw new Error('Todo not found')
      }
      
      if (existingTodo.user_id !== userId) {
        throw new Error('Not authorized to delete this todo')
      }
      
      const { error } = await supabase
        .from('todos')
        .delete()
        .eq('id', todoId)
      
      if (error) {
        console.error('Error deleting todo:', error)
        throw error
      }
      
      return { success: true, id: todoId }
    } catch (err) {
      console.error('Failed to delete todo:', err)
      throw err
    }
  })

// Query options for React Query
export const todosQueryOptions = () =>
  queryOptions({
    queryKey: ['todos'],
    queryFn: () => fetchTodos(),
  })