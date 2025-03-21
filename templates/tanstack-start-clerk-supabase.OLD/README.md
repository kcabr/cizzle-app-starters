# TanStack Start + Clerk + Supabase Starter

This is a full-stack starter template using:

- [TanStack Start](https://tanstack.com/start): A type-safe, client-first, full-stack React framework
- [TanStack Router](https://tanstack.com/router): Type-safe routing
- [TanStack Query](https://tanstack.com/query): Data fetching and caching
- [Clerk](https://clerk.com): User authentication and management
- [Supabase](https://supabase.com): Database with Postgres and auth (for data storage)
- [Tailwind CSS](https://tailwindcss.com): Utility-first CSS framework
- [Material UI](https://mui.com): Component library

## Features

- 🔐 Authentication with Clerk
- 📊 Database integration with Supabase
- 🔄 Data fetching with React Query
- 🚦 Type-safe routing
- 📱 Responsive UI with Tailwind CSS and Material UI components
- ⚡ Server functions for API calls
- 🎭 Row-level security policies
- 🎨 Dark/light mode support
- 🚀 Fast development workflow

## Getting Started

### Prerequisites

- Node.js 18+
- A Clerk account for authentication
- A Supabase account for database

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```
# Clerk Authentication
CLERK_PUBLISHABLE_KEY=pk_live_XXXXXXXXXXXXXXXXXX
CLERK_SECRET_KEY=sk_live_XXXXXXXXXXXXXXXXXX

# Supabase
SUPABASE_URL=https://XXXXXXXXXXXXXXXXXX.supabase.co
SUPABASE_ANON_KEY=eyJXXXXXXXXXXXXXXXXXX
```

### Installation

1. Clone the repository
2. Install dependencies
   ```bash
   npm install
   ```
3. Set up Supabase
   - Create a new Supabase project
   - Run the SQL from `supabase-setup.sql` in the Supabase SQL editor to create tables
   - Enable Row Level Security
4. Set up Clerk
   - Create a new Clerk application
   - Configure sign-in/sign-up methods
   - Add your Clerk keys to the `.env` file

### Development

Start the development server:

```bash
npm run dev
```

Your app will be running at http://localhost:3000

## Database Schema

The template includes three main database tables:

1. `posts`: Blog-style posts with title and content
   - id (serial, primary key)
   - title (text)
   - body (text)
   - user_id (text, references Clerk user)
   - created_at (timestamp)

2. `todos`: Simple todo items
   - id (serial, primary key)
   - title (text)
   - completed (boolean)
   - user_id (text, references Clerk user)
   - created_at (timestamp)

3. `notes`: Text notes
   - id (serial, primary key)
   - content (text)
   - user_id (text, references Clerk user)
   - created_at (timestamp)

## Demo Pages

- **Posts**: Full CRUD operations for posts
- **Todos**: Simple todo management
- **Notes**: Create and manage notes
- **Deferred**: Demo of streaming/deferred content with Suspense
- **UI Samples**: Material UI component examples

## Folder Structure

- `/src`: Source code
  - `/components`: Reusable components
  - `/hooks`: Custom React hooks
  - `/routes`: All routes (based on file system)
  - `/setup`: Configuration files
  - `/styles`: Global CSS styles
  - `/utils`: Utility functions
    - `posts.ts`: Posts-related server functions
    - `todos.ts`: Todos-related server functions
    - `notes.ts`: Notes-related server functions
    - `supabase.ts`: Supabase client setup