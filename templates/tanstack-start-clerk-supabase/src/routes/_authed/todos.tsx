import { createFileRoute } from '@tanstack/react-router'
import { useSuspenseQuery } from '@tanstack/react-query'
import { todosQueryOptions, createTodo, toggleTodo, deleteTodo, TodoType } from '~/utils/todos.js'
import { useState } from 'react'
import { useMutation } from '~/hooks/useMutation.js'

export const Route = createFileRoute('/_authed/todos')({
  loader: async ({ context }) => {
    // Prefetch todos query
    await context.queryClient.ensureQueryData(todosQueryOptions())
  },
  component: TodosComponent,
})

function TodosComponent() {
  const [newTodoText, setNewTodoText] = useState('')
  const { data: todos } = useSuspenseQuery(todosQueryOptions())
  
  const addTodoMutation = useMutation({
    mutationFn: (title: string) => createTodo({ data: title }),
    invalidateQueries: [['todos']],
  })
  
  const toggleTodoMutation = useMutation({
    mutationFn: (data: { id: number; completed: boolean }) => toggleTodo({ data }),
    invalidateQueries: [['todos']],
  })
  
  const deleteTodoMutation = useMutation({
    mutationFn: (id: number) => deleteTodo({ data: id }),
    invalidateQueries: [['todos']],
  })
  
  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTodoText.trim()) return
    
    addTodoMutation.mutate(newTodoText, {
      onSuccess: () => {
        setNewTodoText('')
      }
    })
  }
  
  const handleToggleTodo = (todo: TodoType) => {
    toggleTodoMutation.mutate({
      id: todo.id,
      completed: !todo.completed
    })
  }
  
  const handleDeleteTodo = (id: number) => {
    deleteTodoMutation.mutate(id)
  }
  
  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Todo List with Supabase</h1>
      
      <form onSubmit={handleAddTodo} className="mb-6 flex gap-2">
        <input
          type="text"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
          placeholder="Add a new todo..."
          className="flex-grow p-2 border rounded"
          disabled={addTodoMutation.isPending}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
          disabled={addTodoMutation.isPending || !newTodoText.trim()}
        >
          {addTodoMutation.isPending ? 'Adding...' : 'Add Todo'}
        </button>
      </form>
      
      {todos.length === 0 ? (
        <p className="text-gray-500 italic">No todos yet. Add one above!</p>
      ) : (
        <ul className="space-y-2">
          {todos.map((todo) => (
            <li key={todo.id} className="flex items-center justify-between p-3 border rounded">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggleTodo(todo)}
                  className="h-5 w-5"
                />
                <span className={todo.completed ? 'line-through text-gray-500' : ''}>
                  {todo.title}
                </span>
              </div>
              <button
                onClick={() => handleDeleteTodo(todo.id)}
                className="text-red-500 hover:text-red-700"
                aria-label="Delete todo"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
      
      {(addTodoMutation.isError || toggleTodoMutation.isError || deleteTodoMutation.isError) && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded">
          <p>Error: {(addTodoMutation.error || toggleTodoMutation.error || deleteTodoMutation.error)?.message}</p>
        </div>
      )}
    </div>
  )
}