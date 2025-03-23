These are project rules to be used by apps created with me tanstack-start-clerk-supabase-shadcn template

# Project Instructions

Use specification and guidelines as you build the app.

Write the complete code for every step. Do not get lazy.

Your goal is to completely finish whatever I ask for.

You will see <ai_context> tags in the code. These are context tags that you should use to help you understand the codebase.

## Overview

This is a web app template.

## Tech Stack

- Frontend: Tanstack Start, Tanstack Router, Tailwind, Shadcn, Framer Motion
- Backend: Postgres, Supabase, Prisma ORM, Tanstack Start RSC
- Auth: Clerk
- Payments: Stripe
- Analytics: PostHog
- Deployment: Vercel

## Project Structure

- `prisma` - Prisma ORM configuration
  - `migrations` - Database migrations
  - `schema.prisma` - Prisma schema definition
- `public` - Static assets
  - Favicons and site manifest
- `src` - Source code
  - `components` - Shared components
    - `ui` - ShadCN UI components
    - Other application components
  - `_components` - Shared components
    - "one off" application components
  - `routes` - TanStack Router routes
    - `__root.tsx` - Root layout
    - `_authed` - Authenticated routes
      - Protected route components
    - Public routes
  - `store` - Redux store
    - `hooks.ts` - Redux hooks
    - `slices` - Redux slices
  - `styles` - CSS styles
  - `utils` - Utility functions
    - API clients and helper functions
  - `client.tsx` - Client entry point
  - `router.tsx` - Router configuration
  - `ssr.tsx` - Server-side rendering setup
- Configuration files
  - `app.config.ts` - Application configuration
  - `tailwind.config.mjs` - Tailwind CSS configuration
  - `tsconfig.json` - TypeScript configuration
  
## Rules

Follow these rules when building the app.

### General Rules

- Use `@` to import anything from the app unless otherwise specified
- Use kebab case for all files and folders unless otherwise specified
- Don't update shadcn components unless otherwise specified

#### Env Rules

- If you update environment variables, update the `.env.example` file
- All environment variables should go in `.env.local`
- Do not expose environment variables to the frontend
- Use `VITE_` prefix for environment variables that need to be accessed from the frontend
- You may import environment variables in server actions and components by using `process.env.VARIABLE_NAME`

#### Type Rules

Follow these rules when working with types.

- When importing database types, use `@prisma/client` directly (e.g., `import type { Todo } from "@prisma/client"`)
- Create a dedicated `~/types` directory for all custom type definitions
- Name type files using kebab-case like `api-types.ts` or `form-types.ts`
- All types should be exported from their specific files and re-exported in `types/index.ts`
- Prefer interfaces over type aliases for object types
- For utility types or complex unions, use type aliases
- Use PascalCase for type and interface names
- For React event handlers, use the built-in React types (e.g., `React.FormEvent`)
- Use TypeScript path aliases with `~/` for imports from the src directory

An example of a type file:

`types/api-types.ts`

```ts
export interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

export type ApiError = {
  status: number;
  message: string;
  errors?: Record<string, string[]>;
}
```

And exporting it:

`types/index.ts`

```ts
export * from "./api-types";
export * from "./form-types";
```

Then using it in components:

```tsx
import type { ApiResponse, ApiError } from "~/types";
import type { Todo } from "@prisma/client";

// Using with Prisma types
function fetchTodos(): Promise<ApiResponse<Todo[]>> {
  // Implementation
}
```

For Redux-specific types, follow these patterns:

```ts
// In a slice file
interface CounterState {
  value: number;
  status: 'idle' | 'loading' | 'failed';
}

// In component files
import { useAppSelector, useAppDispatch } from "~/store/hooks";
import type { RootState } from "~/store";
```

### Frontend Rules

Follow these rules when working on the frontend.

It uses Tanstack Start, Tanstack Router, Tailwind, Shadcn, and Framer Motion.

#### General Rules

- Use `@tabler/icons-react` for icons
- useSidebar must be used within a SidebarProvider

#### Components

- Use appropriate semantic HTML tags (like <header>, <main>, <section>, <article>, <footer>, etc.) when their meaning matches your content's purpose. Only fall back to <div> elements for non-semantic grouping or layout purposes.
- Separate the main parts of a component's html with an extra blank line for visual spacing
- Mark server-side components with `'use server'` at the top. For client components, include `'use client'` directive. RSC components are rendered using the `renderRsc()` function from `@tanstack/react-start`.

##### Organization			

- All components be named using pascal case case like `ExampleComponent.tsx` unless otherwise specified
- Put components in `/_components` in the route if one-off components
- Put components in `/components` from the root if shared components

##### Component Hook Encapsulation

**Always encapsulate related state, effects, and event handlers in custom hooks rather than directly in components.**

✅ **Good Practice:**
```jsx
// Custom hook encapsulates all related state and logic
function useUserProfile(userId) {
 const [user, setUser] = useState(null);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState(null);

 useEffect(() => {
   let isMounted = true;
   setLoading(true);
   
   fetchUserData(userId)
     .then(data => {
       if (isMounted) {
         setUser(data);
         setLoading(false);
       }
     })
     .catch(err => {
       if (isMounted) {
         setError(err);
         setLoading(false);
       }
     });
     
   return () => { isMounted = false; };
 }, [userId]);
 
 const updateUserName = useCallback((newName) => {
   return updateUser(userId, { name: newName })
     .then(updatedUser => {
       setUser(updatedUser);
       return updatedUser;
     });
 }, [userId]);
 
 return { user, loading, error, updateUserName };
}

// Clean component with logic abstracted away
function UserProfile({ userId }) {
 const { user, loading, error, updateUserName } = useUserProfile(userId);
 
 if (loading) return <Spinner />;
 if (error) return <ErrorMessage error={error} />;
 
 return (
   <div>
     <h2>{user.name}</h2>
     <button onClick={() => updateUserName('New Name')}>Update Name</button>
   </div>
 );
}
```

#### Data Fetching & Server Functions

- Create server functions using `createServerFn()` from `@tanstack/react-start`
- Use `.validator()` to define and validate input data
- Use `.handler()` to implement the function logic
- Execute server functions on the client using `useServerFn()` with React Query's `useMutation`
- For RSC data fetching, use async functions and fetch data directly inside server components

Example of creating a server function:

```ts
// in utils/todos.ts
export const createTodo = createServerFn({ method: "POST" })
  .validator((data: { title: string; description?: string }) => data)
  .handler(async ({ data }) => {
    try {
      const { userId } = await getAuth(getWebRequest()!);
      if (!userId) throw new Error("Unauthorized");
      
      return await prisma.todo.create({
        data: {
          title: data.title,
          description: data.description,
          userId,
        },
      });
    } catch (error) {
      console.error("Error creating todo:", error);
      throw error;
    }
  });
```

Example of using server functions on the client:

```tsx
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { createTodo } from "~/utils/todos";

function MyComponent() {
  const queryClient = useQueryClient();
  
  const createTodoMutation = useMutation({
    mutationFn: useServerFn(createTodo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      // Handle success...
    },
  });
  
  const handleSubmit = (e) => {
    e.preventDefault();
    createTodoMutation.mutate({
      data: {
        title: "New Todo",
        description: "Description",
      },
    });
  };
  
  // ...
}
```

#### Server Components (RSC)

- Mark with `'use server'` at the top of the file
- Create as async functions that fetch data directly
- Import into client components and render using `renderRsc()` from `@tanstack/react-start`
- Use React.memo to optimize performance when rendering RSC components

Example of an RSC component:

```tsx
// components/NoteList.tsx
'use server'

import { Note } from '@prisma/client'
import { getNotes } from '~/utils/notes'

async function NoteListRSC() {
  const notes = await getNotes()
  // Render notes...
}

export default NoteListRSC
```

Example of using RSC in a client component:

```tsx
// routes/notes.tsx
'use client'

import { renderRsc } from "@tanstack/react-start";
import NoteListRSC from '~/components/NoteList';

// Wrap in a memo to prevent unnecessary re-renders
const NotesRscWrapper = React.memo(function NotesRscWrapper() {
  return renderRsc(<NoteListRSC />);
});

function NotesPage() {
  // Then in your component:
  return (
    <div>
      <h1>Notes</h1>
      <NotesRscWrapper />
    </div>
  );
}
```

#### Routes

- Create routes using `createFileRoute` from `@tanstack/react-router`
- Secure routes using the `beforeLoad` hook with context checks
- Use `errorComponent` for handling authentication or other errors
- Follow Tanstack Router file-based routing conventions

Example of a route:

```tsx
// routes/_authed/profile.tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authed/profile')({
  component: ProfilePage,
  beforeLoad: ({ context }) => {
    // Authentication check
    if (!context.userId) {
      throw new Error('Not authenticated')
    }
    // Return data needed by the route
    return {
      userId: context.userId
    }
  }
})

function ProfilePage() {
  // Component implementation
}
```

##### Client Components and Server Components

- Tanstack Start provides a hybrid approach combining client components and server components
- Server components use `'use server'` at the top of the file
- Client components use "use client" at the top of the file (optional but recommended for clarity)

###### Client Component Example:

```tsx
"use client"

import { useState } from 'react'

interface ExampleClientComponentProps {
  initialData: any[]
}

export default function ExampleClientComponent({
  initialData
}: ExampleClientComponentProps) {
  const [data, setData] = useState(initialData)
  
  // Client-side state and interactions
  return <div>{data.length} items</div>
}
```

##### Route Components

- Use `createFileRoute` from Tanstack Router to define routes
- Export a `Route` object with component configuration

```tsx
import { createFileRoute } from '@tanstack/react-router'
import MyPageComponent from '~/components/MyPageComponent'

export const Route = createFileRoute('/path/to/route')({
  component: MyPageComponent,
})
```

##### Server Functions

- Use `createServerFn` from `@tanstack/react-start` for server-side operations
- Follow the `.validator()` and `.handler()` pattern
- Server functions can be used within client components via `useServerFn` hook

```tsx
// In utils/myServerFunctions.ts
import { createServerFn } from '@tanstack/react-start'
import { prisma } from './prisma'
import { getAuth } from '@clerk/tanstack-start/server'
import { getWebRequest } from '@tanstack/react-start/server'

export const createItem = createServerFn({ method: 'POST' })
  .validator((data: { name: string; description: string }) => data)
  .handler(async ({ data }) => {
    const { userId } = await getAuth(getWebRequest()!)
    if (!userId) throw new Error('Unauthorized')

    return await prisma.item.create({
      data: {
        name: data.name,
        description: data.description,
        userId,
      },
    })
  })

// In client component
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useServerFn } from '@tanstack/react-start'
import { createItem } from '~/utils/myServerFunctions'

function MyForm() {
  const queryClient = useQueryClient()
  
  const createItemMutation = useMutation({
    mutationFn: useServerFn(createItem),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items'] })
    },
  })
  
  return (
    <form onSubmit={(e) => {
      e.preventDefault()
      createItemMutation.mutate({
        data: {
          name: 'Item name',
          description: 'Item description',
        },
      })
    }}>
      {/* Form fields */}
    </form>
  )
}
```

##### Server Component Integration

- Use `renderRsc` to integrate server components within client components
- Wrap server component with React.memo to prevent unnecessary re-renders

```tsx
import { renderRsc } from '@tanstack/react-start'
import MyServerComponent from '~/components/MyServerComponent'
import React from 'react'

// RSC wrapper component with memo to prevent unnecessary re-renders
const ServerComponentWrapper = React.memo(function ServerComponentWrapper() {
  return renderRsc(<MyServerComponent />)
})

function ClientPage() {
  return (
    <div>
      <h1>Client Page</h1>
      <ServerComponentWrapper />
    </div>
  )
}
```

## Backend Rules for Tanstack Start with Prisma ORM

Follow these rules when working on the backend.

The project uses PostgreSQL, Supabase, Prisma ORM, and Tanstack Start's server functions.

### General Rules

- Use `npm run prisma:generate` after schema changes to update the Prisma client
- Use `npm run prisma:migrate` to create database migrations
- Use `npm run prisma:studio` to visually explore and edit your database

### Organization

#### Schemas

- Define models in the `prisma/schema.prisma` file
- All models should follow proper naming conventions (PascalCase for model names)
- If using a userId, always use `userId String` to connect to Clerk authentication
- Always include createdAt and updatedAt fields in all models

```prisma
model Example {
  id          String   @id @default(uuid())
  title       String
  description String?
  userId      String
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

- Use enums for columns that have a limited set of possible values:

```prisma
enum MembershipType {
  FREE
  PRO
}

model User {
  id          String         @id @default(uuid())
  membership  MembershipType @default(FREE)
  // other fields
}
```

- Make sure to define appropriate relations between models:

```prisma
model Chat {
  id        String    @id @default(uuid())
  userId    String
  name      String
  messages  Message[]
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
}

model Message {
  id        String   @id @default(uuid())
  chat      Chat     @relation(fields: [chatId], references: [id], onDelete: Cascade)
  chatId    String
  content   String
  role      Role     @default(USER)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

enum Role {
  ASSISTANT
  USER
}
```

### Server Functions

- Server functions should be organized in the `src/utils` directory
- Name files based on related functionality (e.g., `todos.ts` for todo-related functions)
- Use Tanstack Start's `createServerFn` to define server functions
- Always include proper validation with the `.validator()` function
- Return appropriate data and handle errors gracefully
- Always authenticate users when accessing user data
- Use proper types from `@prisma/client`

Example of a server function:

```ts
import { createServerFn } from "@tanstack/react-start";
import { prisma } from "./prisma";
import { getAuth } from "@clerk/tanstack-start/server";
import { getWebRequest } from "@tanstack/react-start/server";

export const createTodo = createServerFn({ method: "POST" })
  .validator((data: { title: string; description?: string }) => {
    // Validate input data
    if (!data.title) throw new Error("Title is required");
    return data;
  })
  .handler(async ({ data }) => {
    try {
      // Authenticate user
      const { userId } = await getAuth(getWebRequest()!);
      if (!userId) throw new Error("Unauthorized");

      // Create record in database
      return await prisma.todo.create({
        data: {
          title: data.title,
          description: data.description,
          userId,
        },
      });
    } catch (error) {
      console.error("Error creating todo:", error);
      throw error;
    }
  });
```

### Using Server Functions in Components

To use server functions in your components:

```tsx
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { createTodo } from "~/utils/todos";

function MyComponent() {
  const queryClient = useQueryClient();
  
  const createTodoMutation = useMutation({
    mutationFn: useServerFn(createTodo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      // Additional success handling
    },
    onError: (error) => {
      // Error handling
    },
  });
  
  const handleSubmit = (e) => {
    e.preventDefault();
    createTodoMutation.mutate({
      data: {
        title: "New Todo",
        description: "Todo description",
      },
    });
  };
  
  // Component JSX
}
```

### Date Handling

- For date fields, use the DateTime type in Prisma
- When comparing dates in queries, use the appropriate date methods
- Always handle date formatting on the client side, send raw Date objects to the server

### Error Handling

- Always wrap database operations in try/catch blocks
- Log errors with appropriate context
- Return user-friendly error messages
- Check for user authorization before database operations

### Auth Rules

Follow these rules when working on auth.

It uses Clerk for authentication.

#### General Rules

 - Import the auth helpers with `import { getAuth } from "@clerk/tanstack-start/server"` and `import { getWebRequest } from "@tanstack/react-start/server"`
 - Access the userId with `const { userId } = await getAuth(getWebRequest()!)`

### Payments Rules

Follow these rules when working on payments.

It uses Stripe for payments.

### Analytics Rules

Follow these rules when working on analytics.

It uses PostHog for analytics.

# Storage Rules

Follow these rules when working with Supabase Storage.

It uses Supabase Storage for file uploads, downloads, and management.

## General Rules

- Always use environment variables for bucket names to maintain consistency across environments
- Never hardcode bucket names in the application code
- Always handle file size limits and allowed file types at the application level
- Use the `upsert` method instead of `upload` when you want to replace existing files
- Always implement proper error handling for storage operations
- Use content-type headers when uploading files to ensure proper file handling

## Organization

### Buckets

- Name buckets in kebab-case: `user-uploads`, `profile-images`
- Create separate buckets for different types of files (e.g., `profile-images`, `documents`, `attachments`)
- Document bucket purposes in a central location
- Set appropriate bucket policies (public/private) based on access requirements
- Implement RLS (Row Level Security) policies for buckets that need user-specific access
- Make sure to let me know instructions for setting up RLS policies on Supabase since you can't do this yourself, including the SQL scripts I need to run in the editor

### File Structure

- Organize files in folders based on their purpose and ownership
- Use predictable, collision-resistant naming patterns
- Structure: `{bucket}/{userId}/{purpose}/{filename}`
- Example: `profile-images/123e4567-e89b/avatar/profile.jpg`
- Include timestamps in filenames when version history is important
- Example: `documents/123e4567-e89b/contracts/2024-02-13-contract.pdf`

## File Handling

### Upload Rules

- Always validate file size before upload
- Implement file type validation using both extension and MIME type
- Generate unique filenames to prevent collisions
- Set appropriate content-type headers
- Handle existing files appropriately (error or upsert)

Example validation:

```ts
const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"]

function validateFile(file: File): boolean {
  if (file.size > MAX_FILE_SIZE) {
    throw new Error("File size exceeds limit")
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error("File type not allowed")
  }

  return true
}
```

### Download Rules

- Always handle missing files gracefully
- Implement proper error handling for failed downloads
- Use signed URLs for private files

### Delete Rules

- Implement soft deletes when appropriate
- Clean up related database records when deleting files
- Handle bulk deletions carefully
- Verify ownership before deletion
- Always delete all versions/transforms of a file

## Security

### Bucket Policies

- Make buckets private by default
- Only make buckets public when absolutely necessary
- Use RLS policies to restrict access to authorized users
- Example RLS policy:

```sql
CREATE POLICY "Users can only access their own files"
ON storage.objects
FOR ALL
USING (auth.uid()::text = (storage.foldername(name))[1]);
```

### Access Control

- Generate short-lived signed URLs for private files
- Implement proper CORS policies
- Use separate buckets for public and private files
- Never expose internal file paths
- Validate user permissions before any operation

## Error Handling

- Implement specific error types for common storage issues
- Always provide meaningful error messages
- Implement retry logic for transient failures
- Log storage errors separately for monitoring

## Optimization

- Implement progressive upload for large files
- Clean up temporary files and failed uploads
- Use batch operations when handling multiple files