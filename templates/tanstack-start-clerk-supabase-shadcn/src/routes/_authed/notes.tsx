"use client";

import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "~/utils/notes";
import toast from "react-hot-toast";
import { useServerFn, renderRsc } from "@tanstack/react-start";
import NoteListRSC from "~/components/NoteList";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Label } from "~/components/ui/label";
import { AccentButton } from "~/components/AccentButton";

export const Route = createFileRoute("/_authed/notes")({
  component: NotesPage,
});

function NotesPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const queryClient = useQueryClient();

  const createNoteMutation = useMutation({
    mutationFn: useServerFn(createNote),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      setTitle("");
      setContent("");
      toast.success("Note created successfully!");
    },
    onError: (error) => {
      toast.error(`Failed to create note: ${error.message}`);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    createNoteMutation.mutate({
      data: {
        title,
        content,
      },
    });
  };

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
        <div className="mx-auto max-w-7xl space-y-8">
          {/* Create Note Form */}
          <Card>
            <CardHeader>
              <CardTitle>Create New Note</CardTitle>
              <CardDescription>
                Add a new note to your collection
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter note title"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Enter note content"
                    rows={5}
                    required
                  />
                </div>
                <AccentButton
                  type="submit"
                  isHighlighted
                  disabled={createNoteMutation.isPending}
                >
                  {createNoteMutation.isPending ? "Creating..." : "Create Note"}
                </AccentButton>
              </form>
            </CardContent>
          </Card>

          {/* Notes List (Rendered on server) */}
          <Card>
            <CardHeader>
              <CardTitle>Your Notes</CardTitle>
            </CardHeader>
            <CardContent>{renderRsc(<NoteListRSC />)}</CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
