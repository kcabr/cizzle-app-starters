import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import { getTodos, createTodo, updateTodo, deleteTodo } from "~/utils/todos";
import { useServerFn } from "@tanstack/react-start";
import type { Todo } from "@prisma/client";

// Import shadcn components
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Label } from "~/components/ui/label";
import { Checkbox } from "~/components/ui/checkbox";
import { AccentButton } from "~/components/AccentButton";

export const Route = createFileRoute("/_authed/todos")({
  component: TodoList,
});

function TodoList() {
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [newTodoDescription, setNewTodoDescription] = useState("");
  const queryClient = useQueryClient();

  // Load todos
  const {
    data: todos,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: () => getTodos(),
  });

  // Create todo mutation
  const createTodoMutation = useMutation({
    mutationFn: useServerFn(createTodo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      setNewTodoTitle("");
      setNewTodoDescription("");
      toast.success("Todo created successfully!");
    },
    onError: (error) => {
      toast.error(`Failed to create todo: ${error.message}`);
    },
  });

  // Update todo mutation
  const updateTodoMutation = useMutation({
    mutationFn: useServerFn(updateTodo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      toast.success("Todo updated successfully!");
    },
    onError: (error) => {
      toast.error(`Failed to update todo: ${error.message}`);
    },
  });

  // Delete todo mutation
  const deleteTodoMutation = useMutation({
    mutationFn: useServerFn(deleteTodo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      toast.success("Todo deleted successfully!");
    },
    onError: (error) => {
      toast.error(`Failed to delete todo: ${error.message}`);
    },
  });

  const handleCreateTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodoTitle.trim()) return;

    createTodoMutation.mutate({
      data: {
        title: newTodoTitle,
        description: newTodoDescription,
      },
    });
  };

  const toggleTodoStatus = (todo: Todo) => {
    updateTodoMutation.mutate({
      data: {
        id: todo.id,
        title: todo.title,
        description: todo.description || undefined,
        completed: !todo.completed,
      },
    });
  };

  const handleDeleteTodo = (id: string) => {
    deleteTodoMutation.mutate({
      data: id,
    });
  };

  if (isLoading) {
    return (
      <div className="container py-10 flex justify-center">
        Loading todos...
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-10 text-red-500">
        Error loading todos: {error.message}
      </div>
    );
  }

  return (
    <div className="container py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-bold leading-tight tracking-tight text-foreground">
          Todo List
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Manage your todos with Prisma ORM and Supabase
        </p>
      </header>
      <main>
        {/* Create Todo Form */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Create New Todo</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreateTodo} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={newTodoTitle}
                  onChange={(e) => setNewTodoTitle(e.target.value)}
                  placeholder="Enter todo title"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newTodoDescription}
                  onChange={(e) => setNewTodoDescription(e.target.value)}
                  placeholder="Enter todo description (optional)"
                  rows={3}
                />
              </div>
              <AccentButton
                type="submit"
                disabled={createTodoMutation.isPending}
                isHighlighted={true}
              >
                {createTodoMutation.isPending ? "Creating..." : "Create Todo"}
              </AccentButton>
            </form>
          </CardContent>
        </Card>

        {/* Todo List */}
        <Card>
          <CardHeader>
            <CardTitle>Your Todos</CardTitle>
          </CardHeader>
          <CardContent>
            {todos && todos.length > 0 ? (
              <ul className="space-y-4">
                {todos.map((todo) => (
                  <li
                    key={todo.id}
                    className="flex items-start justify-between space-x-2 pb-4 border-b"
                  >
                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id={`todo-${todo.id}`}
                        checked={todo.completed}
                        onCheckedChange={() => toggleTodoStatus(todo)}
                      />
                      <div>
                        <label
                          htmlFor={`todo-${todo.id}`}
                          className={`font-medium cursor-pointer ${
                            todo.completed
                              ? "line-through text-muted-foreground"
                              : "text-foreground"
                          }`}
                        >
                          {todo.title}
                        </label>
                        {todo.description && (
                          <p className="text-sm text-muted-foreground mt-1">
                            {todo.description}
                          </p>
                        )}
                      </div>
                    </div>
                    <AccentButton
                      size="sm"
                      onClick={() => handleDeleteTodo(todo.id)}
                      className="bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900 dark:text-red-100 dark:hover:bg-red-800"
                    >
                      Delete
                    </AccentButton>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground">
                No todos yet. Create one above!
              </p>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
