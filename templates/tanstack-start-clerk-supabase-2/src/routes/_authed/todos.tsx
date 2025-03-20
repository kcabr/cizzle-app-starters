import { createFileRoute } from '@tanstack/react-router'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { getTodos, createTodo, updateTodo, deleteTodo } from '~/utils/todos'
import { useServerFn } from '@tanstack/react-start'
import type { Todo } from '@prisma/client'

export const Route = createFileRoute('/_authed/todos')({
  component: TodoList,
})

function TodoList() {
  const [newTodoTitle, setNewTodoTitle] = useState('')
  const [newTodoDescription, setNewTodoDescription] = useState('')
  const queryClient = useQueryClient()

  // Load todos
  const { data: todos, isLoading, error } = useQuery({
    queryKey: ['todos'],
    queryFn: () => getTodos(),
  })

  // Create todo mutation
  const createTodoMutation = useMutation({
    mutationFn: useServerFn(createTodo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
      setNewTodoTitle('')
      setNewTodoDescription('')
      toast.success('Todo created successfully!')
    },
    onError: (error) => {
      toast.error(`Failed to create todo: ${error.message}`)
    },
  })

  // Update todo mutation
  const updateTodoMutation = useMutation({
    mutationFn: useServerFn(updateTodo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
      toast.success('Todo updated successfully!')
    },
    onError: (error) => {
      toast.error(`Failed to update todo: ${error.message}`)
    },
  })

  // Delete todo mutation
  const deleteTodoMutation = useMutation({
    mutationFn: useServerFn(deleteTodo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
      toast.success('Todo deleted successfully!')
    },
    onError: (error) => {
      toast.error(`Failed to delete todo: ${error.message}`)
    },
  })

  const handleCreateTodo = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTodoTitle.trim()) return

    createTodoMutation.mutate({
      data: {
        title: newTodoTitle,
        description: newTodoDescription,
      },
    })
  }

  const toggleTodoStatus = (todo: Todo) => {
    updateTodoMutation.mutate({
      data: {
        id: todo.id,
        completed: !todo.completed,
      },
    })
  }

  const handleDeleteTodo = (id: string) => {
    deleteTodoMutation.mutate({
      data: id,
    })
  }

  if (isLoading) {
    return <div className="py-10 flex justify-center">Loading todos...</div>
  }

  if (error) {
    return <div className="py-10 text-red-500">Error loading todos: {error.message}</div>
  }

  return (
    <div className="py-10">
      <header>
        <div className="mx-auto max-w-7xl">
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
            Todo List
          </h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
            Manage your todos with Prisma ORM and Supabase
          </p>
        </div>
      </header>
      <main className="mt-10">
        <div className="mx-auto max-w-7xl">
          {/* Create Todo Form */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Create New Todo</h2>
            <form onSubmit={handleCreateTodo} className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={newTodoTitle}
                  onChange={(e) => setNewTodoTitle(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Enter todo title"
                  required
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Description
                </label>
                <textarea
                  id="description"
                  value={newTodoDescription}
                  onChange={(e) => setNewTodoDescription(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Enter todo description (optional)"
                  rows={3}
                />
              </div>
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                disabled={createTodoMutation.isPending}
              >
                {createTodoMutation.isPending ? 'Creating...' : 'Create Todo'}
              </button>
            </form>
          </div>

          {/* Todo List */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Your Todos</h2>
            {todos && todos.length > 0 ? (
              <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                {todos.map((todo) => (
                  <li key={todo.id} className="py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={todo.completed}
                          onChange={() => toggleTodoStatus(todo)}
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <div className="ml-3">
                          <p
                            className={`text-sm font-medium ${
                              todo.completed
                                ? 'text-gray-400 dark:text-gray-500 line-through'
                                : 'text-gray-900 dark:text-white'
                            }`}
                          >
                            {todo.title}
                          </p>
                          {todo.description && (
                            <p className="text-sm text-gray-500 dark:text-gray-400">{todo.description}</p>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => handleDeleteTodo(todo.id)}
                        className="ml-2 p-1 text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                      >
                        <svg
                          className="h-5 w-5"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0
                            012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 dark:text-gray-400">No todos yet. Create one above!</p>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}