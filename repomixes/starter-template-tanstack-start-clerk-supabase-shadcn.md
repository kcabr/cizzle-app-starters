This file is a merged representation of a subset of the codebase, containing files not matching ignore patterns, combined into a single document by Repomix.

================================================================
File Summary
================================================================

Purpose:
--------
This file contains a packed representation of the entire repository's contents.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.

File Format:
------------
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Multiple file entries, each consisting of:
  a. A separator line (================)
  b. The file path (File: path/to/file)
  c. Another separator line
  d. The full contents of the file
  e. A blank line

Usage Guidelines:
-----------------
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.

Notes:
------
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Files matching these patterns are excluded: **/components/ui/**, **/.docs/**, **/.support/**, **/*.md
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded

Additional Info:
----------------

================================================================
Directory Structure
================================================================
.env.local
.gitignore
.prettierignore
app.config.ts
package.json
postcss.config.mjs
prisma/migrations/20250321181016_init/migration.sql
prisma/migrations/migration_lock.toml
prisma/schema.prisma
public/site.webmanifest
src/client.tsx
src/components/AccentButton.tsx
src/components/AppBar.tsx
src/components/ArticleCard.tsx
src/components/CustomButtonLink.tsx
src/components/DefaultCatchBoundary.tsx
src/components/NewsSearchForm.tsx
src/components/NoteList.tsx
src/components/NotFound.tsx
src/components/ThemeProvider.tsx
src/router.tsx
src/routes/__root.tsx
src/routes/_authed.tsx
src/routes/_authed/counter.tsx
src/routes/_authed/notes.tsx
src/routes/_authed/posts.$postId.tsx
src/routes/_authed/posts.index.tsx
src/routes/_authed/posts.tsx
src/routes/_authed/profile.$.tsx
src/routes/_authed/profile.tsx
src/routes/_authed/todos.tsx
src/routes/index.tsx
src/routes/news.index.tsx
src/routes/news.search.tsx
src/routes/news.tsx
src/routes/ui-showcase.tsx
src/routeTree.gen.ts
src/ssr.tsx
src/store/hooks.ts
src/store/index.ts
src/store/slices/counterSlice.ts
src/store/slices/notificationsSlice.ts
src/store/slices/themeSlice.ts
src/styles/app.css
src/utils/cn.ts
src/utils/news.ts
src/utils/notes.ts
src/utils/posts.ts
src/utils/prisma.ts
src/utils/seo.ts
src/utils/supabase.ts
src/utils/todos.ts
tailwind.config.mjs
tsconfig.json

================================================================
Files
================================================================

================
File: .env.local
================
# NewsAPI key
VITE_NEWSAPI_KEY=your_newsapi_key_here

================
File: .gitignore
================
node_modules
package-lock.json
yarn.lock

.DS_Store
.cache
.vercel
.output
.vinxi

/build/
/api/
/server/build
/public/build
.vinxi
# Sentry Config File
.env.sentry-build-plugin
/test-results/
/playwright-report/
/blob-report/
/playwright/.cache/

.env

================
File: .prettierignore
================
**/build
**/public
pnpm-lock.yaml
routeTree.gen.ts

================
File: app.config.ts
================
import { defineConfig } from '@tanstack/react-start/config'
import tsConfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  tsr: {
    appDirectory: 'src',
  },
  vite: {
    plugins: [
      tsConfigPaths({
        projects: ['./tsconfig.json'],
      }),
    ],
  },
})

================
File: package.json
================
{
  "name": "tanstack-start-example-clerk-supabase",
  "private": true,
  "sideEffects": false,
  "type": "module",
  "scripts": {
    "dev": "vinxi dev",
    "build": "vinxi build",
    "start": "vinxi start",
    "prisma:generate": "prisma generate",
    "prisma:migrate": "prisma migrate dev",
    "prisma:migrate:reset": "prisma migrate reset",
    "prisma:studio": "prisma studio"
  },
  "dependencies": {
    "@clerk/tanstack-start": "0.11.0",
    "@prisma/client": "^6.5.0",
    "@radix-ui/react-checkbox": "^1.1.4",
    "@radix-ui/react-dialog": "^1.1.6",
    "@radix-ui/react-dropdown-menu": "^2.1.6",
    "@radix-ui/react-label": "^2.1.2",
    "@radix-ui/react-switch": "^1.1.3",
    "@reduxjs/toolkit": "^2.6.1",
    "@supabase/supabase-js": "^2.49.1",
    "@tanstack/react-query": "^5.69.0",
    "@tanstack/react-query-devtools": "^5.69.0",
    "@tanstack/react-router": "^1.114.23",
    "@tanstack/react-router-devtools": "^1.114.23",
    "@tanstack/react-start": "^1.114.23",
    "class-variance-authority": "^0.7.1",
    "date-fns": "^4.1.0",
    "lucide-react": "^0.483.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-hot-toast": "^2.5.2",
    "react-redux": "^9.2.0",
    "redaxios": "^0.5.1",
    "tailwind-merge": "^2.6.0",
    "tailwindcss-animate": "^1.0.7",
    "vinxi": "0.5.3"
  },
  "devDependencies": {
    "@types/node": "^22.5.4",
    "@types/react": "^19.0.8",
    "@types/react-dom": "^19.0.3",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.5.1",
    "prisma": "^6.5.0",
    "tailwindcss": "^3.4.17",
    "typescript": "^5.7.2",
    "vite-tsconfig-paths": "^5.1.4"
  }
}

================
File: postcss.config.mjs
================
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}

================
File: prisma/migrations/20250321181016_init/migration.sql
================
-- CreateTable
CREATE TABLE "Todo" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Todo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Note" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Note_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Counter" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Counter_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Counter_name_key" ON "Counter"("name");

================
File: prisma/migrations/migration_lock.toml
================
# Please do not edit this file manually
# It should be added in your version-control system (e.g., Git)
provider = "postgresql"

================
File: prisma/schema.prisma
================
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider      = "prisma-client-js"
  binaryTargets = ["native", "windows"]
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Todo {
  id          String   @id @default(uuid())
  title       String
  description String?
  completed   Boolean  @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  userId      String
}

model Note {
  id        String   @id @default(uuid())
  title     String
  content   String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  userId    String
}

model Counter {
  id    String @id @default(uuid())
  name  String @unique
  count Int    @default(0)
}

================
File: public/site.webmanifest
================
{
  "name": "",
  "short_name": "",
  "icons": [
    {
      "src": "/android-chrome-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/android-chrome-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ],
  "theme_color": "#ffffff",
  "background_color": "#ffffff",
  "display": "standalone"
}

================
File: src/client.tsx
================
/// <reference types="vinxi/types/client" />
import { hydrateRoot } from 'react-dom/client'
import { StartClient } from '@tanstack/react-start'
import { createRouter } from './router'

const router = createRouter()

hydrateRoot(document, <StartClient router={router} />)

================
File: src/components/AccentButton.tsx
================
import React from "react";
import { Button, ButtonProps } from "./ui/button";
import { Link } from "@tanstack/react-router";
import { cn } from "../utils/cn";

export interface AccentButtonProps extends ButtonProps {
  to?: string;
  isHighlighted?: boolean;
}

/**
 * Accent button that matches the header color theme
 * Can be used as a regular button or as a link by providing the "to" prop
 */
export const AccentButton = React.forwardRef<
  HTMLButtonElement,
  AccentButtonProps
>(({ className, to, isHighlighted, children, ...props }, ref) => {
  // Define the button style based on whether it's highlighted
  const buttonStyle = cn(
    className,
    isHighlighted
      ? "bg-blue-600 text-white hover:bg-blue-700"
      : "bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-100 dark:hover:bg-blue-800"
  );

  // If "to" prop is provided, render a Link
  if (to) {
    return (
      <Link to={to} className="w-fit">
        <Button ref={ref} className={buttonStyle} {...props}>
          {children}
        </Button>
      </Link>
    );
  }

  // Otherwise, render a regular button
  return (
    <Button ref={ref} className={buttonStyle} {...props}>
      {children}
    </Button>
  );
});

AccentButton.displayName = "AccentButton";

================
File: src/components/AppBar.tsx
================
import { Link } from "@tanstack/react-router";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/tanstack-start";
import { useAppDispatch, useAppSelector } from "~/store/hooks";
import { setTheme } from "~/store/slices/themeSlice";

export function AppBar() {
  const dispatch = useAppDispatch();
  const { mode } = useAppSelector((state) => state.theme);

  const toggleTheme = () => {
    dispatch(setTheme(mode === "dark" ? "light" : "dark"));
  };

  return (
    <div className="bg-white dark:bg-gray-900 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link
                to="/"
                className="text-2xl font-bold text-indigo-600 dark:text-indigo-400"
              >
                Cizzle's TanStack Starter
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/"
                activeProps={{
                  className: "border-indigo-500 text-gray-900 dark:text-white",
                }}
                activeOptions={{ exact: true }}
                className="border-transparent text-gray-500 dark:text-gray-300 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Home
              </Link>
              <Link
                to="/todos"
                activeProps={{
                  className: "border-indigo-500 text-gray-900 dark:text-white",
                }}
                className="border-transparent text-gray-500 dark:text-gray-300 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Todos
              </Link>
              <Link
                to="/notes"
                activeProps={{
                  className: "border-indigo-500 text-gray-900 dark:text-white",
                }}
                className="border-transparent text-gray-500 dark:text-gray-300 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Notes
              </Link>
              <Link
                to="/counter"
                activeProps={{
                  className: "border-indigo-500 text-gray-900 dark:text-white",
                }}
                className="border-transparent text-gray-500 dark:text-gray-300 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Counter
              </Link>
              <Link
                to="/posts"
                activeProps={{
                  className: "border-indigo-500 text-gray-900 dark:text-white",
                }}
                className="border-transparent text-gray-500 dark:text-gray-300 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Posts
              </Link>
              <Link
                to="/news"
                activeProps={{
                  className: "border-indigo-500 text-gray-900 dark:text-white",
                }}
                className="border-transparent text-gray-500 dark:text-gray-300 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                News
              </Link>
              <Link
                to="/ui-showcase"
                activeProps={{
                  className: "border-indigo-500 text-gray-900 dark:text-white",
                }}
                className="border-transparent text-gray-500 dark:text-gray-300 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                UI Components
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-300"
            >
              {mode === "dark" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>
            <div className="ml-auto">
              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
              <SignedOut>
                <SignInButton mode="modal" />
              </SignedOut>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

================
File: src/components/ArticleCard.tsx
================
import { formatDistanceToNow } from "date-fns";
import { Article } from "~/utils/news";

interface ArticleCardProps {
  article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
  const { title, description, url, urlToImage, publishedAt, source, author } =
    article;

  const formattedDate = formatDistanceToNow(new Date(publishedAt), {
    addSuffix: true,
  });

  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 transition-shadow duration-200 hover:shadow-lg">
      {urlToImage ? (
        <img
          src={urlToImage}
          alt={title}
          className="w-full h-48 object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://via.placeholder.com/300x200?text=No+Image";
          }}
        />
      ) : (
        <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
          <span className="text-gray-500 dark:text-gray-400">
            No image available
          </span>
        </div>
      )}

      <div className="flex-grow p-4 flex flex-col">
        <div className="flex-grow">
          <div className="flex justify-between items-start mb-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
              {source.name}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {formattedDate}
            </span>
          </div>

          <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-2 mb-2">
            {title}
          </h3>

          {description && (
            <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 mb-4">
              {description}
            </p>
          )}

          {author && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-auto">
              By {author}
            </p>
          )}
        </div>

        <div className="mt-4">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-indigo-700 dark:hover:bg-indigo-600 dark:focus:ring-indigo-600 transition-colors duration-150"
          >
            Read Article
          </a>
        </div>
      </div>
    </div>
  );
}

================
File: src/components/CustomButtonLink.tsx
================
import { ReactNode } from "react";
import { Link, LinkProps } from "@tanstack/react-router";

interface CustomButtonLinkProps extends Omit<LinkProps, "className"> {
  children: ReactNode;
  variant?: "contained" | "outlined" | "text";
  color?: "primary" | "secondary" | "default";
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  size?: "small" | "medium" | "large";
  className?: string;
  sx?: Record<string, any>; // For compatibility with the Material UI version
}

export function CustomButtonLink({
  children,
  variant = "contained",
  color = "primary",
  startIcon,
  endIcon,
  size = "medium",
  className = "",
  sx,
  ...props
}: CustomButtonLinkProps) {
  // Map variant and color to Tailwind classes
  const variantClasses = {
    contained: {
      primary:
        "bg-indigo-600 hover:bg-indigo-700 text-white border-transparent",
      secondary: "bg-pink-600 hover:bg-pink-700 text-white border-transparent",
      default: "bg-gray-200 hover:bg-gray-300 text-gray-800 border-transparent",
    },
    outlined: {
      primary:
        "bg-transparent hover:bg-indigo-50 text-indigo-600 border-indigo-600",
      secondary:
        "bg-transparent hover:bg-pink-50 text-pink-600 border-pink-600",
      default: "bg-transparent hover:bg-gray-50 text-gray-800 border-gray-300",
    },
    text: {
      primary:
        "bg-transparent hover:bg-indigo-50 text-indigo-600 border-transparent",
      secondary:
        "bg-transparent hover:bg-pink-50 text-pink-600 border-transparent",
      default:
        "bg-transparent hover:bg-gray-50 text-gray-800 border-transparent",
    },
  };

  const sizeClasses = {
    small: "px-2.5 py-1.5 text-xs",
    medium: "px-4 py-2 text-sm",
    large: "px-6 py-3 text-base",
  };

  const baseClasses =
    "inline-flex items-center justify-center border font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-150";

  const focusRingColor = {
    primary: "focus:ring-indigo-500",
    secondary: "focus:ring-pink-500",
    default: "focus:ring-gray-500",
  };

  const buttonClasses = [
    baseClasses,
    variantClasses[variant][color],
    sizeClasses[size],
    focusRingColor[color],
    className,
  ].join(" ");

  return (
    <Link {...props} className={buttonClasses} style={sx}>
      {startIcon && <span className="mr-2">{startIcon}</span>}
      {children}
      {endIcon && <span className="ml-2">{endIcon}</span>}
    </Link>
  );
}

================
File: src/components/DefaultCatchBoundary.tsx
================
import {
  ErrorComponent,
  Link,
  rootRouteId,
  useMatch,
  useRouter,
} from '@tanstack/react-router'
import type { ErrorComponentProps } from '@tanstack/react-router'

export function DefaultCatchBoundary({ error }: ErrorComponentProps) {
  const router = useRouter()
  const isRoot = useMatch({
    strict: false,
    select: (state) => state.id === rootRouteId,
  })

  console.error(error)

  return (
    <div className="min-w-0 flex-1 p-4 flex flex-col items-center justify-center gap-6">
      <ErrorComponent error={error} />
      <div className="flex gap-2 items-center flex-wrap">
        <button
          onClick={() => {
            router.invalidate()
          }}
          className={`px-2 py-1 bg-gray-600 dark:bg-gray-700 rounded text-white uppercase font-extrabold`}
        >
          Try Again
        </button>
        {isRoot ? (
          <Link
            to="/"
            className={`px-2 py-1 bg-gray-600 dark:bg-gray-700 rounded text-white uppercase font-extrabold`}
          >
            Home
          </Link>
        ) : (
          <Link
            to="/"
            className={`px-2 py-1 bg-gray-600 dark:bg-gray-700 rounded text-white uppercase font-extrabold`}
            onClick={(e) => {
              e.preventDefault()
              window.history.back()
            }}
          >
            Go Back
          </Link>
        )}
      </div>
    </div>
  )
}

================
File: src/components/NewsSearchForm.tsx
================
import { useState, FormEvent } from "react";

interface NewsSearchFormProps {
  onSearch: (query: string) => void;
  initialQuery?: string;
  isLoading?: boolean;
}

export function NewsSearchForm({
  onSearch,
  initialQuery = "",
  isLoading = false,
}: NewsSearchFormProps) {
  const [query, setQuery] = useState(initialQuery);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-grow">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for news articles..."
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:text-white"
            required
          />
        </div>
        <button
          type="submit"
          disabled={isLoading || !query.trim()}
          className="inline-flex items-center justify-center px-5 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          ) : null}
          Search
        </button>
      </div>
    </form>
  );
}

================
File: src/components/NoteList.tsx
================
'use server'

import { Note } from '@prisma/client'
import { getNotes } from '~/utils/notes'

async function NoteListRSC() {
  const notes = await getNotes()
  
  if (!notes || notes.length === 0) {
    return (
      <div className="text-center p-8 text-gray-500 dark:text-gray-400">
        No notes yet. Create your first note!
      </div>
    )
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} />
      ))}
    </div>
  )
}

function NoteCard({ note }: { note: Note }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:shadow-md transition-shadow duration-200">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">{note.title}</h3>
      <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">{note.content}</p>
      <div className="text-xs text-gray-500 dark:text-gray-400">
        {new Date(note.createdAt).toLocaleDateString()}
      </div>
    </div>
  )
}

export default NoteListRSC

================
File: src/components/NotFound.tsx
================
import { Link } from '@tanstack/react-router'

export function NotFound({ children }: { children?: any }) {
  return (
    <div className="space-y-2 p-2">
      <div className="text-gray-600 dark:text-gray-400">
        {children || <p>The page you are looking for does not exist.</p>}
      </div>
      <p className="flex items-center gap-2 flex-wrap">
        <button
          onClick={() => window.history.back()}
          className="bg-emerald-500 text-white px-2 py-1 rounded uppercase font-black text-sm"
        >
          Go back
        </button>
        <Link
          to="/"
          className="bg-cyan-600 text-white px-2 py-1 rounded uppercase font-black text-sm"
        >
          Start Over
        </Link>
      </p>
    </div>
  )
}

================
File: src/components/ThemeProvider.tsx
================
import { ReactNode, useEffect } from 'react'
import { useAppSelector } from '~/store/hooks'

interface ThemeProviderProps {
  children: ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const { mode } = useAppSelector((state) => state.theme)

  useEffect(() => {
    // Apply dark mode class to html element
    const root = document.documentElement
    if (mode === 'dark') {
      root.classList.add('dark')
    } else if (mode === 'light') {
      root.classList.remove('dark')
    } else if (mode === 'system') {
      // Check system preference
      const systemDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
      if (systemDarkMode) {
        root.classList.add('dark')
      } else {
        root.classList.remove('dark')
      }
    }
  }, [mode])

  return <>{children}</>
}

================
File: src/router.tsx
================
import { createRouter as createTanStackRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
import { DefaultCatchBoundary } from './components/DefaultCatchBoundary'
import { NotFound } from './components/NotFound'

export function createRouter() {
  const router = createTanStackRouter({
    routeTree,
    defaultPreload: 'intent',
    defaultErrorComponent: DefaultCatchBoundary,
    defaultNotFoundComponent: () => <NotFound />,
    scrollRestoration: true,
  })

  return router
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof createRouter>
  }
}

================
File: src/routes/__root.tsx
================
/// <reference types="vite/client" />
import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
} from "@tanstack/react-router";
import { ClerkProvider } from "@clerk/tanstack-start";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { ThemeProvider } from "~/components/ThemeProvider";
import { useAppSelector } from "~/store/hooks";
import { createServerFn } from "@tanstack/react-start";
import * as React from "react";
import { getAuth } from "@clerk/tanstack-start/server";
import { getWebRequest } from "@tanstack/react-start/server";
import { AppBar } from "~/components/AppBar";
import { DefaultCatchBoundary } from "~/components/DefaultCatchBoundary.js";
import { NotFound } from "~/components/NotFound.js";
import { store } from "~/store";
import appCss from "~/styles/app.css?url";

const fetchClerkAuth = createServerFn({ method: "GET" }).handler(async () => {
  const { userId } = await getAuth(getWebRequest()!);

  return {
    userId,
  };
});

// Create a client
const queryClient = new QueryClient();

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/apple-touch-icon.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicon-32x32.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/favicon-16x16.png",
      },
      { rel: "manifest", href: "/site.webmanifest", color: "#fffff" },
      { rel: "icon", href: "/favicon.ico" },
    ],
  }),
  beforeLoad: async () => {
    const { userId } = await fetchClerkAuth();

    return {
      userId,
    };
  },
  errorComponent: (props) => {
    return (
      <RootDocument>
        <DefaultCatchBoundary {...props} />
      </RootDocument>
    );
  },
  notFoundComponent: () => <NotFound />,
  component: RootComponent,
});

function RootComponent() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ClerkProvider>
          <RootDocument>
            <Outlet />
            <ReactQueryDevtools initialIsOpen={false} />
          </RootDocument>
        </ClerkProvider>
      </QueryClientProvider>
    </Provider>
  );
}

function RootDocument({ children }: { children: React.ReactNode }) {
  // For the initial render
  const { mode } = useAppSelector((state) => state.theme);

  return (
    <html className={mode === "dark" ? "dark" : ""}>
      <head>
        <HeadContent />
      </head>
      <body className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
        <ThemeProvider>
          <AppBar />
          <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            {children}
          </main>
          <Toaster position="top-right" />
          <TanStackRouterDevtools position="bottom-right" />
        </ThemeProvider>
        <Scripts />
      </body>
    </html>
  );
}

================
File: src/routes/_authed.tsx
================
import { createFileRoute } from '@tanstack/react-router'
import { SignIn } from '@clerk/tanstack-start'

export const Route = createFileRoute('/_authed')({
  beforeLoad: ({ context }) => {
    if (!context.userId) {
      throw new Error('Not authenticated')
    }
  },
  errorComponent: ({ error }) => {
    if (error.message === 'Not authenticated') {
      return (
        <div className="flex items-center justify-center p-12">
          <SignIn routing="hash" forceRedirectUrl={window.location.href} />
        </div>
      )
    }

    throw error
  },
})

================
File: src/routes/_authed/counter.tsx
================
import { createFileRoute } from '@tanstack/react-router'
import { useAppDispatch, useAppSelector } from '~/store/hooks'
import { increment, decrement, incrementByAmount, reset } from '~/store/slices/counterSlice'
import { useState } from 'react'
import toast from 'react-hot-toast'

export const Route = createFileRoute('/_authed/counter')({
  component: CounterDemo,
})

function CounterDemo() {
  const count = useAppSelector((state) => state.counter.value)
  const dispatch = useAppDispatch()
  const [incrementAmount, setIncrementAmount] = useState(2)

  const handleIncrement = () => {
    dispatch(increment())
    toast.success('Counter incremented!')
  }

  const handleDecrement = () => {
    dispatch(decrement())
    toast.success('Counter decremented!')
  }

  const handleIncrementByAmount = () => {
    dispatch(incrementByAmount(incrementAmount))
    toast.success(`Counter incremented by ${incrementAmount}!`)
  }

  const handleReset = () => {
    dispatch(reset())
    toast.success('Counter reset!')
  }

  return (
    <div className="py-10">
      <header>
        <div className="mx-auto max-w-7xl">
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
            Redux Counter Demo
          </h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
            This page demonstrates Redux Toolkit integration with global state management.
          </p>
        </div>
      </header>
      <main className="mt-10">
        <div className="mx-auto max-w-7xl">
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <div className="flex flex-col items-center justify-center space-y-6">
              <div className="flex items-center justify-center w-32 h-32 rounded-full bg-indigo-100 dark:bg-indigo-900">
                <span className="text-5xl font-bold text-indigo-800 dark:text-indigo-200">{count}</span>
              </div>
              
              <div className="flex flex-wrap gap-3 justify-center">
                <button
                  onClick={handleIncrement}
                  className="px-4 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Increment
                </button>
                <button
                  onClick={handleDecrement}
                  className="px-4 py-2 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Decrement
                </button>
                <button
                  onClick={handleReset}
                  className="px-4 py-2 bg-gray-600 text-white font-medium rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  Reset
                </button>
              </div>
              
              <div className="flex items-center space-x-3">
                <input
                  className="block w-24 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  type="number"
                  value={incrementAmount}
                  onChange={(e) => setIncrementAmount(Number(e.target.value) || 0)}
                />
                <button
                  onClick={handleIncrementByAmount}
                  className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Add Amount
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

================
File: src/routes/_authed/notes.tsx
================
"use client";

import { createFileRoute } from "@tanstack/react-router";
import React, { useState, Suspense, useEffect } from "react";
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

// Loading component for notes
function NotesLoading() {
  return (
    <div className="text-center p-8">
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-4"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3].map((index) => (
          <div
            key={index}
            className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 shadow"
          >
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse mb-4"></div>
            <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2"></div>
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/4 animate-pulse"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Error fallback component
function NotesErrorFallback({ error }: { error: Error }) {
  return (
    <div className="text-center p-8 text-red-500">
      <p>Error loading notes: {error.message}</p>
      <p className="mt-2 text-sm">Please try again later or contact support.</p>
    </div>
  );
}

// RSC wrapper component with memo to prevent unnecessary re-renders
const NotesRscWrapper = React.memo(function NotesRscWrapper() {
  return renderRsc(<NoteListRSC />);
});

function NotesPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const queryClient = useQueryClient();
  const [notesError, setNotesError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);

  // Set a timeout to hide the loading state and prevent rapid re-renders
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Show loading state for 2 seconds
    
    // Clean up function to prevent memory leaks
    return () => clearTimeout(timer);
  }, []);

  const createNoteMutation = useMutation({
    mutationFn: useServerFn(createNote),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      setTitle("");
      setContent("");
      toast.success("Note created successfully!");
      setNotesError(null); // Clear any previous errors
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

  // Memoized notes list to prevent re-rendering issues
  const renderNotesList = React.useCallback(() => {
    try {
      if (loading) {
        return <NotesLoading />;
      }
      
      // Once loading is complete, render the notes once and keep them stable
      return <NotesRscWrapper />;
    } catch (error) {
      console.error("Error rendering notes:", error);
      const errorObj = error instanceof Error ? error : new Error("Unknown error occurred");
      setNotesError(errorObj);
      return <NotesErrorFallback error={errorObj} />;
    }
  }, [loading]); // Only re-run when loading state changes

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
            <CardContent>
              {notesError ? (
                <NotesErrorFallback error={notesError} />
              ) : (
                renderNotesList()
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

================
File: src/routes/_authed/posts.$postId.tsx
================
import { ErrorComponent, createFileRoute } from '@tanstack/react-router'
import type { ErrorComponentProps } from '@tanstack/react-router'
import { NotFound } from '~/components/NotFound.js'
import { fetchPost } from '~/utils/posts.js'
import { useQuery } from '@tanstack/react-query'
import { useServerFn } from '@tanstack/react-start'

export const Route = createFileRoute('/_authed/posts/$postId')({
  errorComponent: PostErrorComponent,
  component: PostComponent,
  notFoundComponent: () => {
    return <NotFound>Post not found</NotFound>
  },
})

export function PostErrorComponent({ error }: ErrorComponentProps) {
  return <ErrorComponent error={error} />
}

function PostComponent() {
  const { postId } = Route.useParams()
  
  const { data: post, isLoading, error } = useQuery({
    queryKey: ['post', postId],
    queryFn: () => fetchPost({ data: postId }),
  })

  if (isLoading) {
    return (
      <div className="py-10">
        <div className="animate-pulse space-y-4">
          <div className="h-6 w-3/4 bg-slate-300 dark:bg-slate-700 rounded"></div>
          <div className="space-y-2">
            <div className="h-4 bg-slate-300 dark:bg-slate-700 rounded"></div>
            <div className="h-4 bg-slate-300 dark:bg-slate-700 rounded w-5/6"></div>
            <div className="h-4 bg-slate-300 dark:bg-slate-700 rounded w-4/6"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return <ErrorComponent error={error as Error} />
  }

  if (!post) {
    return <NotFound>Post not found</NotFound>
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{post.title}</h2>
      <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg shadow-inner">
        <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">{post.body}</p>
      </div>
    </div>
  )
}

================
File: src/routes/_authed/posts.index.tsx
================
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authed/posts/')({
  component: PostsIndexComponent,
})

function PostsIndexComponent() {
  return <div>Select a post.</div>
}

================
File: src/routes/_authed/posts.tsx
================
import { Link, Outlet, createFileRoute } from '@tanstack/react-router'
import { fetchPosts } from '~/utils/posts.js'
import { useQuery } from '@tanstack/react-query'
import { useServerFn } from '@tanstack/react-start'

export const Route = createFileRoute('/_authed/posts')({
  component: PostsComponent,
})

function PostsComponent() {
  const { data: posts, isLoading, error } = useQuery({
    queryKey: ['posts'],
    queryFn: () => fetchPosts(),
  })

  if (isLoading) {
    return (
      <div className="py-10 flex justify-center">
        <div className="animate-pulse flex space-x-4 items-center">
          <div className="rounded-full bg-slate-300 dark:bg-slate-700 h-10 w-10"></div>
          <div className="h-4 w-36 bg-slate-300 dark:bg-slate-700 rounded"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="py-10 text-red-500">
        Error loading posts: {error instanceof Error ? error.message : 'Unknown error'}
      </div>
    )
  }

  return (
    <div className="py-10">
      <header>
        <div className="mx-auto max-w-7xl">
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
            Posts
          </h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
            Posts fetched using React Query for data management
          </p>
        </div>
      </header>
      <main className="mt-10">
        <div className="mx-auto max-w-7xl">
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 flex gap-6">
            <div className="w-1/3 border-r border-gray-200 dark:border-gray-700 pr-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Post List</h2>
              <ul className="space-y-2">
                {posts && [...posts, { id: 'i-do-not-exist', title: 'Non-existent Post' }].map(
                  (post) => {
                    return (
                      <li key={post.id} className="border-b border-gray-100 dark:border-gray-700 last:border-b-0 pb-2 last:pb-0">
                        <Link
                          to="/posts/$postId"
                          params={{
                            postId: post.id,
                          }}
                          className="block py-2 px-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200"
                          activeProps={{ className: 'block py-2 px-3 rounded-md bg-indigo-50 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-200 font-medium' }}
                        >
                          {post.title.substring(0, 30)}{post.title.length > 30 ? '...' : ''}
                        </Link>
                      </li>
                    )
                  },
                )}
              </ul>
            </div>
            <div className="flex-1">
              <Outlet />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

================
File: src/routes/_authed/profile.$.tsx
================
import { Link, Outlet, createFileRoute } from '@tanstack/react-router'
import { fetchPosts } from '~/utils/posts.js'

export const Route = createFileRoute('/_authed/profile/$')({
  loader: () => fetchPosts(),
  component: PostsComponent,
})

function PostsComponent() {
  const posts = Route.useLoaderData()

  return (
    <div className="p-2 flex gap-2">
      <ul className="list-disc pl-4">
        {[...posts, { id: 'i-do-not-exist', title: 'Non-existent Post' }].map(
          (post) => {
            return (
              <li key={post.id} className="whitespace-nowrap">
                <Link
                  to="/posts/$postId"
                  params={{
                    postId: post.id,
                  }}
                  className="block py-1 text-blue-800 hover:text-blue-600"
                  activeProps={{ className: 'text-black font-bold' }}
                >
                  <div>{post.title.substring(0, 20)}</div>
                </Link>
              </li>
            )
          },
        )}
      </ul>
      <hr />
      <Outlet />
    </div>
  )
}

================
File: src/routes/_authed/profile.tsx
================
import { createFileRoute } from '@tanstack/react-router'
import { useClerk, useUser } from '@clerk/tanstack-start'
import { useCallback, useState } from 'react'
import toast from 'react-hot-toast'

export const Route = createFileRoute('/_authed/profile')({
  component: ProfilePage,
})

function ProfilePage() {
  const { user } = useUser()
  const { signOut } = useClerk()
  const [isLoading, setIsLoading] = useState(false)

  const handleSignOut = useCallback(async () => {
    try {
      setIsLoading(true)
      await signOut()
      toast.success('Signed out successfully')
    } catch (error) {
      console.error('Error signing out:', error)
      toast.error('Failed to sign out')
    } finally {
      setIsLoading(false)
    }
  }, [signOut])

  if (!user) {
    return (
      <div className="py-10 flex justify-center">
        <div className="animate-pulse space-y-4 w-full max-w-md">
          <div className="h-12 bg-slate-300 dark:bg-slate-700 rounded-full w-1/4 mx-auto"></div>
          <div className="h-4 bg-slate-300 dark:bg-slate-700 rounded w-3/4 mx-auto"></div>
          <div className="h-4 bg-slate-300 dark:bg-slate-700 rounded w-1/2 mx-auto"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="py-10">
      <header>
        <div className="mx-auto max-w-7xl">
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
            User Profile
          </h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
            Manage your account information
          </p>
        </div>
      </header>
      <main className="mt-10">
        <div className="mx-auto max-w-3xl">
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
            <div className="p-8 sm:p-10 text-center">
              <div className="relative mx-auto h-24 w-24 overflow-hidden rounded-full">
                {user.imageUrl ? (
                  <img 
                    src={user.imageUrl} 
                    alt={user.fullName || "User profile"} 
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gray-200 dark:bg-gray-700">
                    <span className="text-xl font-medium text-gray-600 dark:text-gray-300">
                      {user.firstName?.charAt(0) || user.emailAddresses[0]?.emailAddress?.charAt(0)?.toUpperCase()}
                    </span>
                  </div>
                )}
              </div>
              <h2 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">
                {user.fullName || 'User'}
              </h2>
              <p className="text-gray-500 dark:text-gray-400">
                {user.primaryEmailAddress?.emailAddress}
              </p>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700 px-8 py-6">
              <dl className="divide-y divide-gray-200 dark:divide-gray-700">
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Full name</dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:col-span-2 sm:mt-0">
                    {user.fullName || 'Not provided'}
                  </dd>
                </div>
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Email address</dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:col-span-2 sm:mt-0">
                    {user.primaryEmailAddress?.emailAddress}
                  </dd>
                </div>
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Phone number</dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:col-span-2 sm:mt-0">
                    {user.primaryPhoneNumber?.phoneNumber || 'Not provided'}
                  </dd>
                </div>
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Account ID</dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:col-span-2 sm:mt-0">
                    {user.id}
                  </dd>
                </div>
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Created at</dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:col-span-2 sm:mt-0">
                    {new Date(user.createdAt).toLocaleString()}
                  </dd>
                </div>
              </dl>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700 px-8 py-6 flex justify-end">
              <button
                type="button"
                onClick={handleSignOut}
                disabled={isLoading}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                {isLoading ? 'Signing out...' : 'Sign out'}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

================
File: src/routes/_authed/todos.tsx
================
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

================
File: src/routes/index.tsx
================
import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { AccentButton } from "../components/AccentButton";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <div className="container py-10 mx-auto">
      <header>
        <div className="mx-auto max-w-7xl">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Welcome to Cizzle's TanStack Starter App Template
          </h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl mt-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              title="Todos"
              description="Manage your todos with a simple CRUD interface. Uses Prisma ORM with Supabase."
              link="/todos"
            />
            <FeatureCard
              title="Notes"
              description="Create and manage your notes. Demonstrates RSC (React Server Components)."
              link="/notes"
            />
            <FeatureCard
              title="Counter"
              description="Simple counter example. Shows Redux Toolkit for state management."
              link="/counter"
            />
            <FeatureCard
              title="Posts"
              description="Post list from API. Uses React Query for data fetching."
              link="/posts"
            />
            <FeatureCard
              title="Profile"
              description="Authenticated user profile. Shows integration with Clerk authentication."
              link="/profile"
            />
            <FeatureCard
              title="News"
              description="Browse and search news articles. Shows React Query and external API integration."
              link="/news"
            />
            <FeatureCard
              title="UI Components"
              description="Explore the shadcn UI components available in this template."
              link="/ui-showcase"
              isHighlighted={true}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

function FeatureCard({
  title,
  description,
  link,
  onClick,
  isHighlighted = false,
}: {
  title: string;
  description: string;
  link: string;
  onClick?: () => void;
  isHighlighted?: boolean;
}) {
  const content = (
    <Card
      className={`h-full transition-all hover:shadow-md ${isHighlighted ? "border-primary" : ""}`}
    >
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardFooter>
        <AccentButton to={link} isHighlighted={isHighlighted}>
          Explore
        </AccentButton>
      </CardFooter>
    </Card>
  );

  if (onClick) {
    return (
      <button onClick={onClick} className="text-left block w-full">
        {content}
      </button>
    );
  }

  return <div className="block w-full">{content}</div>;
}

================
File: src/routes/news.index.tsx
================
import React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArticleCard } from "~/components/ArticleCard";
import { getTopHeadlines } from "~/utils/news";
import { CustomButtonLink } from "~/components/CustomButtonLink";

const CATEGORIES = [
  "general",
  "business",
  "entertainment",
  "health",
  "science",
  "sports",
  "technology",
];

export const Route = createFileRoute("/news/")({
  component: NewsHomePage,
  loader: async () => {
    // Preload top headlines for initial page load
    return getTopHeadlines({ data: { category: "general", pageSize: 12 } });
  },
});

function NewsHomePage() {
  const initialData = Route.useLoaderData();
  const [category, setCategory] = React.useState("general");

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["topHeadlines", category],
    queryFn: () => getTopHeadlines({ data: { category, pageSize: 12 } }),
    initialData: category === "general" ? initialData : undefined,
  });

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-0">
          Top Headlines
        </h2>
        <CustomButtonLink to="/news/search" variant="contained" color="primary">
          Search Articles
        </CustomButtonLink>
      </div>

      <div className="mb-6">
        <label
          htmlFor="category-select"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Category
        </label>
        <select
          id="category-select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white text-sm rounded-md focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:w-52 p-2.5"
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat} className="capitalize">
              {cat}
            </option>
          ))}
        </select>
      </div>

      {isLoading && !data ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">
            Loading headlines...
          </p>
        </div>
      ) : isError ? (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-4 text-red-800 dark:text-red-200">
          <p>Error loading headlines: {error?.message || "Unknown error"}</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data?.articles?.map((article, index) => (
              <div key={`${article.url}-${index}`}>
                <ArticleCard article={article} />
              </div>
            ))}
          </div>

          {data?.articles?.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                No articles found for this category
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Try selecting a different category
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

================
File: src/routes/news.search.tsx
================
import React, { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { NewsSearchForm } from "~/components/NewsSearchForm";
import { ArticleCard } from "~/components/ArticleCard";
import { searchNews } from "~/utils/news";
import { CustomButtonLink } from "~/components/CustomButtonLink";
import { seo } from "~/utils/seo";
import type { NewsResponse } from "~/utils/news";

export const Route = createFileRoute("/news/search")({
  component: NewsSearchPage,
  head: () => ({
    title: "Search News Articles",
    meta: [
      ...seo({
        title: "Search News Articles | TanStack Start Demo",
        description: "Search for news articles from around the world",
      }),
    ],
  }),
});

function NewsSearchPage() {
  const [searchParams, setSearchParams] = useState({
    query: "",
    page: 1,
    pageSize: 9,
  });

  const { data, isLoading, isError, error, isFetching } = useQuery({
    queryKey: ["newsSearch", searchParams],
    queryFn: () => searchNews({ data: searchParams }),
    enabled: !!searchParams.query,
    gcTime: 1000 * 60 * 5, // Keep cache for 5 minutes
  });

  const handleSearch = (query: string) => {
    setSearchParams((prev) => ({ ...prev, query, page: 1 }));
  };

  const handlePageChange = (page: number) => {
    setSearchParams((prev) => ({ ...prev, page }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Safely access data properties with optional chaining
  const totalResults = data?.totalResults || 0;
  const articles = data?.articles || [];

  return (
    <div className="mb-8">
      <div className="mb-4">
        <CustomButtonLink
          to="/news"
          variant="text"
          color="primary"
          className="mb-2"
          startIcon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
          }
        >
          Back to headlines
        </CustomButtonLink>

        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Search News Articles
        </h2>

        <NewsSearchForm
          onSearch={handleSearch}
          initialQuery={searchParams.query}
          isLoading={isFetching}
        />

        {isLoading && searchParams.query ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
          </div>
        ) : isError ? (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-4 text-red-800 dark:text-red-200 mb-4">
            <p>Error: {error?.message || "Failed to load articles"}</p>
          </div>
        ) : data && searchParams.query ? (
          <>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Found {totalResults} results for "{searchParams.query}"
              </h3>
              {isFetching && (
                <div className="animate-spin h-5 w-5 border-2 border-indigo-500 border-t-transparent rounded-full"></div>
              )}
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 mb-6 pt-4"></div>

            {articles.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {articles.map((article, index) => (
                    <div key={`${article.url}-${index}`}>
                      <ArticleCard article={article} />
                    </div>
                  ))}
                </div>

                {totalResults > searchParams.pageSize && (
                  <div className="flex justify-center mt-6">
                    <nav className="flex items-center">
                      <button
                        onClick={() =>
                          handlePageChange(Math.max(1, searchParams.page - 1))
                        }
                        disabled={searchParams.page === 1}
                        className="mr-2 px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Previous
                      </button>
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        Page {searchParams.page} of{" "}
                        {Math.ceil(totalResults / searchParams.pageSize)}
                      </span>
                      <button
                        onClick={() =>
                          handlePageChange(
                            Math.min(
                              Math.ceil(totalResults / searchParams.pageSize),
                              searchParams.page + 1
                            )
                          )
                        }
                        disabled={
                          searchParams.page >=
                          Math.ceil(totalResults / searchParams.pageSize)
                        }
                        className="ml-2 px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Next
                      </button>
                    </nav>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                  No articles found
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  Try a different search term
                </p>
              </div>
            )}
          </>
        ) : (
          <div className="bg-gray-50 dark:bg-gray-800 p-8 text-center rounded-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Search for news articles
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Enter a search term above to find articles from around the world
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

================
File: src/routes/news.tsx
================
import { Outlet, createFileRoute } from "@tanstack/react-router";
import { seo } from "~/utils/seo";

export const Route = createFileRoute("/news")({
  component: NewsLayout,
  head: () => ({
    title: "News Explorer",
    meta: [
      ...seo({
        title: "News Explorer | TanStack Start Demo",
        description: "Search and explore news articles from around the world",
      }),
    ],
  }),
});

function NewsLayout() {
  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
          News Explorer
        </h1>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
          Search for news articles or browse the latest headlines.
        </p>

        {/* Render nested routes (news/index.tsx, news/search.tsx, etc.) */}
        <div className="mt-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

================
File: src/routes/ui-showcase.tsx
================
import { createFileRoute } from "@tanstack/react-router";
import { Button } from "../components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Switch } from "../components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";

export const Route = createFileRoute("/ui-showcase")({
  component: UIShowcase,
});

function UIShowcase() {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">ShadCN UI Components</h1>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Buttons</h2>
        <div className="flex flex-wrap gap-4">
          <Button>Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>

        <div className="flex flex-wrap gap-4 mt-4">
          <Button size="sm">Small</Button>
          <Button>Default</Button>
          <Button size="lg">Large</Button>
          <Button size="icon">
            <span>+</span>
          </Button>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Inputs</h2>
        <div className="grid gap-4 max-w-md">
          <Input placeholder="Default input" />
          <Input placeholder="Disabled input" disabled />
          <Input placeholder="With label" id="with-label" />
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" placeholder="Email" />
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Textarea</h2>
        <div className="grid w-full gap-1.5 max-w-md">
          <Label htmlFor="message">Your message</Label>
          <Textarea placeholder="Type your message here." id="message" />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Switch</h2>
        <div className="flex items-center space-x-2">
          <Switch id="airplane-mode" />
          <Label htmlFor="airplane-mode">Airplane Mode</Label>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Cards</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Card Content</p>
            </CardContent>
            <CardFooter>
              <Button>Action</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notification</CardTitle>
              <CardDescription>You have 3 unread messages</CardDescription>
            </CardHeader>
            <CardContent>
              <p>View your messages below or visit your inbox.</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="ghost">Cancel</Button>
              <Button>View</Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Dropdown Menu</h2>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Open Menu</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Dialog</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Open Dialog</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  placeholder="Your name"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Username
                </Label>
                <Input
                  id="username"
                  placeholder="@username"
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </section>
    </div>
  );
}

================
File: src/routeTree.gen.ts
================
/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as UiShowcaseImport } from './routes/ui-showcase'
import { Route as NewsImport } from './routes/news'
import { Route as AuthedImport } from './routes/_authed'
import { Route as IndexImport } from './routes/index'
import { Route as NewsIndexImport } from './routes/news.index'
import { Route as NewsSearchImport } from './routes/news.search'
import { Route as AuthedTodosImport } from './routes/_authed/todos'
import { Route as AuthedProfileImport } from './routes/_authed/profile'
import { Route as AuthedPostsImport } from './routes/_authed/posts'
import { Route as AuthedNotesImport } from './routes/_authed/notes'
import { Route as AuthedCounterImport } from './routes/_authed/counter'
import { Route as AuthedPostsIndexImport } from './routes/_authed/posts.index'
import { Route as AuthedProfileSplatImport } from './routes/_authed/profile.$'
import { Route as AuthedPostsPostIdImport } from './routes/_authed/posts.$postId'

// Create/Update Routes

const UiShowcaseRoute = UiShowcaseImport.update({
  id: '/ui-showcase',
  path: '/ui-showcase',
  getParentRoute: () => rootRoute,
} as any)

const NewsRoute = NewsImport.update({
  id: '/news',
  path: '/news',
  getParentRoute: () => rootRoute,
} as any)

const AuthedRoute = AuthedImport.update({
  id: '/_authed',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const NewsIndexRoute = NewsIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => NewsRoute,
} as any)

const NewsSearchRoute = NewsSearchImport.update({
  id: '/search',
  path: '/search',
  getParentRoute: () => NewsRoute,
} as any)

const AuthedTodosRoute = AuthedTodosImport.update({
  id: '/todos',
  path: '/todos',
  getParentRoute: () => AuthedRoute,
} as any)

const AuthedProfileRoute = AuthedProfileImport.update({
  id: '/profile',
  path: '/profile',
  getParentRoute: () => AuthedRoute,
} as any)

const AuthedPostsRoute = AuthedPostsImport.update({
  id: '/posts',
  path: '/posts',
  getParentRoute: () => AuthedRoute,
} as any)

const AuthedNotesRoute = AuthedNotesImport.update({
  id: '/notes',
  path: '/notes',
  getParentRoute: () => AuthedRoute,
} as any)

const AuthedCounterRoute = AuthedCounterImport.update({
  id: '/counter',
  path: '/counter',
  getParentRoute: () => AuthedRoute,
} as any)

const AuthedPostsIndexRoute = AuthedPostsIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => AuthedPostsRoute,
} as any)

const AuthedProfileSplatRoute = AuthedProfileSplatImport.update({
  id: '/$',
  path: '/$',
  getParentRoute: () => AuthedProfileRoute,
} as any)

const AuthedPostsPostIdRoute = AuthedPostsPostIdImport.update({
  id: '/$postId',
  path: '/$postId',
  getParentRoute: () => AuthedPostsRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/_authed': {
      id: '/_authed'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthedImport
      parentRoute: typeof rootRoute
    }
    '/news': {
      id: '/news'
      path: '/news'
      fullPath: '/news'
      preLoaderRoute: typeof NewsImport
      parentRoute: typeof rootRoute
    }
    '/ui-showcase': {
      id: '/ui-showcase'
      path: '/ui-showcase'
      fullPath: '/ui-showcase'
      preLoaderRoute: typeof UiShowcaseImport
      parentRoute: typeof rootRoute
    }
    '/_authed/counter': {
      id: '/_authed/counter'
      path: '/counter'
      fullPath: '/counter'
      preLoaderRoute: typeof AuthedCounterImport
      parentRoute: typeof AuthedImport
    }
    '/_authed/notes': {
      id: '/_authed/notes'
      path: '/notes'
      fullPath: '/notes'
      preLoaderRoute: typeof AuthedNotesImport
      parentRoute: typeof AuthedImport
    }
    '/_authed/posts': {
      id: '/_authed/posts'
      path: '/posts'
      fullPath: '/posts'
      preLoaderRoute: typeof AuthedPostsImport
      parentRoute: typeof AuthedImport
    }
    '/_authed/profile': {
      id: '/_authed/profile'
      path: '/profile'
      fullPath: '/profile'
      preLoaderRoute: typeof AuthedProfileImport
      parentRoute: typeof AuthedImport
    }
    '/_authed/todos': {
      id: '/_authed/todos'
      path: '/todos'
      fullPath: '/todos'
      preLoaderRoute: typeof AuthedTodosImport
      parentRoute: typeof AuthedImport
    }
    '/news/search': {
      id: '/news/search'
      path: '/search'
      fullPath: '/news/search'
      preLoaderRoute: typeof NewsSearchImport
      parentRoute: typeof NewsImport
    }
    '/news/': {
      id: '/news/'
      path: '/'
      fullPath: '/news/'
      preLoaderRoute: typeof NewsIndexImport
      parentRoute: typeof NewsImport
    }
    '/_authed/posts/$postId': {
      id: '/_authed/posts/$postId'
      path: '/$postId'
      fullPath: '/posts/$postId'
      preLoaderRoute: typeof AuthedPostsPostIdImport
      parentRoute: typeof AuthedPostsImport
    }
    '/_authed/profile/$': {
      id: '/_authed/profile/$'
      path: '/$'
      fullPath: '/profile/$'
      preLoaderRoute: typeof AuthedProfileSplatImport
      parentRoute: typeof AuthedProfileImport
    }
    '/_authed/posts/': {
      id: '/_authed/posts/'
      path: '/'
      fullPath: '/posts/'
      preLoaderRoute: typeof AuthedPostsIndexImport
      parentRoute: typeof AuthedPostsImport
    }
  }
}

// Create and export the route tree

interface AuthedPostsRouteChildren {
  AuthedPostsPostIdRoute: typeof AuthedPostsPostIdRoute
  AuthedPostsIndexRoute: typeof AuthedPostsIndexRoute
}

const AuthedPostsRouteChildren: AuthedPostsRouteChildren = {
  AuthedPostsPostIdRoute: AuthedPostsPostIdRoute,
  AuthedPostsIndexRoute: AuthedPostsIndexRoute,
}

const AuthedPostsRouteWithChildren = AuthedPostsRoute._addFileChildren(
  AuthedPostsRouteChildren,
)

interface AuthedProfileRouteChildren {
  AuthedProfileSplatRoute: typeof AuthedProfileSplatRoute
}

const AuthedProfileRouteChildren: AuthedProfileRouteChildren = {
  AuthedProfileSplatRoute: AuthedProfileSplatRoute,
}

const AuthedProfileRouteWithChildren = AuthedProfileRoute._addFileChildren(
  AuthedProfileRouteChildren,
)

interface AuthedRouteChildren {
  AuthedCounterRoute: typeof AuthedCounterRoute
  AuthedNotesRoute: typeof AuthedNotesRoute
  AuthedPostsRoute: typeof AuthedPostsRouteWithChildren
  AuthedProfileRoute: typeof AuthedProfileRouteWithChildren
  AuthedTodosRoute: typeof AuthedTodosRoute
}

const AuthedRouteChildren: AuthedRouteChildren = {
  AuthedCounterRoute: AuthedCounterRoute,
  AuthedNotesRoute: AuthedNotesRoute,
  AuthedPostsRoute: AuthedPostsRouteWithChildren,
  AuthedProfileRoute: AuthedProfileRouteWithChildren,
  AuthedTodosRoute: AuthedTodosRoute,
}

const AuthedRouteWithChildren =
  AuthedRoute._addFileChildren(AuthedRouteChildren)

interface NewsRouteChildren {
  NewsSearchRoute: typeof NewsSearchRoute
  NewsIndexRoute: typeof NewsIndexRoute
}

const NewsRouteChildren: NewsRouteChildren = {
  NewsSearchRoute: NewsSearchRoute,
  NewsIndexRoute: NewsIndexRoute,
}

const NewsRouteWithChildren = NewsRoute._addFileChildren(NewsRouteChildren)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '': typeof AuthedRouteWithChildren
  '/news': typeof NewsRouteWithChildren
  '/ui-showcase': typeof UiShowcaseRoute
  '/counter': typeof AuthedCounterRoute
  '/notes': typeof AuthedNotesRoute
  '/posts': typeof AuthedPostsRouteWithChildren
  '/profile': typeof AuthedProfileRouteWithChildren
  '/todos': typeof AuthedTodosRoute
  '/news/search': typeof NewsSearchRoute
  '/news/': typeof NewsIndexRoute
  '/posts/$postId': typeof AuthedPostsPostIdRoute
  '/profile/$': typeof AuthedProfileSplatRoute
  '/posts/': typeof AuthedPostsIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '': typeof AuthedRouteWithChildren
  '/ui-showcase': typeof UiShowcaseRoute
  '/counter': typeof AuthedCounterRoute
  '/notes': typeof AuthedNotesRoute
  '/profile': typeof AuthedProfileRouteWithChildren
  '/todos': typeof AuthedTodosRoute
  '/news/search': typeof NewsSearchRoute
  '/news': typeof NewsIndexRoute
  '/posts/$postId': typeof AuthedPostsPostIdRoute
  '/profile/$': typeof AuthedProfileSplatRoute
  '/posts': typeof AuthedPostsIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/_authed': typeof AuthedRouteWithChildren
  '/news': typeof NewsRouteWithChildren
  '/ui-showcase': typeof UiShowcaseRoute
  '/_authed/counter': typeof AuthedCounterRoute
  '/_authed/notes': typeof AuthedNotesRoute
  '/_authed/posts': typeof AuthedPostsRouteWithChildren
  '/_authed/profile': typeof AuthedProfileRouteWithChildren
  '/_authed/todos': typeof AuthedTodosRoute
  '/news/search': typeof NewsSearchRoute
  '/news/': typeof NewsIndexRoute
  '/_authed/posts/$postId': typeof AuthedPostsPostIdRoute
  '/_authed/profile/$': typeof AuthedProfileSplatRoute
  '/_authed/posts/': typeof AuthedPostsIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | ''
    | '/news'
    | '/ui-showcase'
    | '/counter'
    | '/notes'
    | '/posts'
    | '/profile'
    | '/todos'
    | '/news/search'
    | '/news/'
    | '/posts/$postId'
    | '/profile/$'
    | '/posts/'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | ''
    | '/ui-showcase'
    | '/counter'
    | '/notes'
    | '/profile'
    | '/todos'
    | '/news/search'
    | '/news'
    | '/posts/$postId'
    | '/profile/$'
    | '/posts'
  id:
    | '__root__'
    | '/'
    | '/_authed'
    | '/news'
    | '/ui-showcase'
    | '/_authed/counter'
    | '/_authed/notes'
    | '/_authed/posts'
    | '/_authed/profile'
    | '/_authed/todos'
    | '/news/search'
    | '/news/'
    | '/_authed/posts/$postId'
    | '/_authed/profile/$'
    | '/_authed/posts/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  AuthedRoute: typeof AuthedRouteWithChildren
  NewsRoute: typeof NewsRouteWithChildren
  UiShowcaseRoute: typeof UiShowcaseRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AuthedRoute: AuthedRouteWithChildren,
  NewsRoute: NewsRouteWithChildren,
  UiShowcaseRoute: UiShowcaseRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/_authed",
        "/news",
        "/ui-showcase"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/_authed": {
      "filePath": "_authed.tsx",
      "children": [
        "/_authed/counter",
        "/_authed/notes",
        "/_authed/posts",
        "/_authed/profile",
        "/_authed/todos"
      ]
    },
    "/news": {
      "filePath": "news.tsx",
      "children": [
        "/news/search",
        "/news/"
      ]
    },
    "/ui-showcase": {
      "filePath": "ui-showcase.tsx"
    },
    "/_authed/counter": {
      "filePath": "_authed/counter.tsx",
      "parent": "/_authed"
    },
    "/_authed/notes": {
      "filePath": "_authed/notes.tsx",
      "parent": "/_authed"
    },
    "/_authed/posts": {
      "filePath": "_authed/posts.tsx",
      "parent": "/_authed",
      "children": [
        "/_authed/posts/$postId",
        "/_authed/posts/"
      ]
    },
    "/_authed/profile": {
      "filePath": "_authed/profile.tsx",
      "parent": "/_authed",
      "children": [
        "/_authed/profile/$"
      ]
    },
    "/_authed/todos": {
      "filePath": "_authed/todos.tsx",
      "parent": "/_authed"
    },
    "/news/search": {
      "filePath": "news.search.tsx",
      "parent": "/news"
    },
    "/news/": {
      "filePath": "news.index.tsx",
      "parent": "/news"
    },
    "/_authed/posts/$postId": {
      "filePath": "_authed/posts.$postId.tsx",
      "parent": "/_authed/posts"
    },
    "/_authed/profile/$": {
      "filePath": "_authed/profile.$.tsx",
      "parent": "/_authed/profile"
    },
    "/_authed/posts/": {
      "filePath": "_authed/posts.index.tsx",
      "parent": "/_authed/posts"
    }
  }
}
ROUTE_MANIFEST_END */

================
File: src/ssr.tsx
================
/// <reference types="vinxi/types/server" />
import {
  createStartHandler,
  defaultStreamHandler,
} from '@tanstack/react-start/server'
import { getRouterManifest } from '@tanstack/react-start/router-manifest'
import { createClerkHandler } from '@clerk/tanstack-start/server'
import { createRouter } from './router'

const handler = createStartHandler({
  createRouter,
  getRouterManifest,
})

const clerkHandler = createClerkHandler(handler)

export default clerkHandler(defaultStreamHandler)

================
File: src/store/hooks.ts
================
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './index'

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

================
File: src/store/index.ts
================
import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './slices/counterSlice'
import themeReducer from './slices/themeSlice'
import notificationsReducer from './slices/notificationsSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    theme: themeReducer,
    notifications: notificationsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

================
File: src/store/slices/counterSlice.ts
================
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface CounterState {
  value: number
}

const initialState: CounterState = {
  value: 0,
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    },
    reset: (state) => {
      state.value = 0
    },
  },
})

export const { increment, decrement, incrementByAmount, reset } = counterSlice.actions
export default counterSlice.reducer

================
File: src/store/slices/notificationsSlice.ts
================
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type NotificationType = 'info' | 'success' | 'error' | 'warning'

export interface Notification {
  id: string
  message: string
  type: NotificationType
  duration?: number
}

interface NotificationsState {
  notifications: Notification[]
}

const initialState: NotificationsState = {
  notifications: [],
}

export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<Omit<Notification, 'id'>>) => {
      const id = Date.now().toString()
      state.notifications.push({
        ...action.payload,
        id,
      })
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== action.payload
      )
    },
    clearNotifications: (state) => {
      state.notifications = []
    },
  },
})

export const { addNotification, removeNotification, clearNotifications } = notificationsSlice.actions
export default notificationsSlice.reducer

================
File: src/store/slices/themeSlice.ts
================
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type ThemeMode = 'light' | 'dark' | 'system'

interface ThemeState {
  mode: ThemeMode
}

const initialState: ThemeState = {
  mode: 'system',
}

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<ThemeMode>) => {
      state.mode = action.payload
    },
  },
})

export const { setTheme } = themeSlice.actions
export default themeSlice.reducer

================
File: src/styles/app.css
================
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 224 71.4% 4.1%;
    --card: 0 0% 100%;
    --card-foreground: 224 71.4% 4.1%;
    --popover: 0 0% 100%;
    --popover-foreground: 224 71.4% 4.1%;
    --primary: 220.9 39.3% 11%;
    --primary-foreground: 210 20% 98%;
    --secondary: 220 14.3% 95.9%;
    --secondary-foreground: 220.9 39.3% 11%;
    --muted: 220 14.3% 95.9%;
    --muted-foreground: 220 8.9% 46.1%;
    --accent: 220 14.3% 95.9%;
    --accent-foreground: 220.9 39.3% 11%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 20% 98%;
    --border: 220 13% 91%;
    --input: 220 13% 91%;
    --ring: 224 71.4% 4.1%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 224 71.4% 4.1%;
    --foreground: 210 20% 98%;
    --card: 224 71.4% 4.1%;
    --card-foreground: 210 20% 98%;
    --popover: 224 71.4% 4.1%;
    --popover-foreground: 210 20% 98%;
    --primary: 210 20% 98%;
    --primary-foreground: 220.9 39.3% 11%;
    --secondary: 215 27.9% 16.9%;
    --secondary-foreground: 210 20% 98%;
    --muted: 215 27.9% 16.9%;
    --muted-foreground: 217.9 10.6% 64.9%;
    --accent: 215 27.9% 16.9%;
    --accent-foreground: 210 20% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 20% 98%;
    --border: 215 27.9% 16.9%;
    --input: 215 27.9% 16.9%;
    --ring: 216 12.2% 83.9%;
  }

  html {
    color-scheme: light dark;
  }

  * {
    @apply border-border;
  }

  html,
  body {
    @apply bg-background text-foreground;
  }

  .using-mouse * {
    outline: none !important;
  }
}

================
File: src/utils/cn.ts
================
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

================
File: src/utils/news.ts
================
import { log } from "console";
import { z } from "zod";

// Define types for NewsAPI responses
export const ArticleSchema = z.object({
  source: z.object({
    id: z.string().nullable(),
    name: z.string(),
  }),
  author: z.string().nullable(),
  title: z.string(),
  description: z.string().nullable(),
  url: z.string().url(),
  urlToImage: z.string().url().nullable(),
  publishedAt: z.string(),
  content: z.string().nullable(),
});

export const NewsResponseSchema = z.object({
  status: z.string(),
  totalResults: z.number(),
  articles: z.array(ArticleSchema),
});

export type Article = z.infer<typeof ArticleSchema>;
export type NewsResponse = z.infer<typeof NewsResponseSchema>;

// Get your API key from https://newsapi.org
//const API_KEY = process.env.NEWSAPI_KEY || "";
const BASE_URL = "https://newsapi.org/v2";

interface TopHeadlinesParams {
  data: {
    category?: string;
    country?: string;
    pageSize?: number;
    page?: number;
  };
}

interface SearchParams {
  data: {
    query: string;
    pageSize?: number;
    page?: number;
    sortBy?: "relevancy" | "popularity" | "publishedAt";
  };
}

export async function getTopHeadlines({
  data,
}: TopHeadlinesParams): Promise<NewsResponse> {
  const params = new URLSearchParams({
    apiKey: "2601710ac62f4a5c800a804de80b17cb", // TODO: Hide this better but .env is not working.
    category: data.category || "general",
    country: data.country || "us",
    pageSize: (data.pageSize || 10).toString(),
    page: (data.page || 1).toString(),
  });

  try {
    const response = await fetch(
      `${BASE_URL}/top-headlines?${params.toString()}`
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to fetch top headlines");
    }

    const data = await response.json();
    return NewsResponseSchema.parse(data);
  } catch (error) {
    console.error("Error fetching top headlines:", error);
    throw error;
  }
}

export async function searchNews({
  data,
}: SearchParams): Promise<NewsResponse> {
  const params = new URLSearchParams({
    apiKey: "2601710ac62f4a5c800a804de80b17cb", // TODO: Hide this better but .env is not working.
    q: data.query,
    pageSize: (data.pageSize || 10).toString(),
    page: (data.page || 1).toString(),
    sortBy: data.sortBy || "publishedAt",
  });

  try {
    const response = await fetch(`${BASE_URL}/everything?${params.toString()}`);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to search news");
    }

    const data = await response.json();
    return NewsResponseSchema.parse(data);
  } catch (error) {
    console.error("Error searching news:", error);
    throw error;
  }
}

================
File: src/utils/notes.ts
================
import { createServerFn } from "@tanstack/react-start";
import { prisma } from "./prisma";
import { Note } from "@prisma/client";
import { getAuth } from "@clerk/tanstack-start/server";
import { getWebRequest } from "@tanstack/react-start/server";
import { log } from "console";

// Get all notes for the authenticated user
export const getNotes = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const { userId } = await getAuth(getWebRequest()!);
    if (!userId) throw new Error("Unauthorized");

    const notes = await prisma.note.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    return notes;
  } catch (error) {
    console.error("Error fetching notes:", error);
    throw error;
  }
});

// Get a single note by ID
export const getNoteById = createServerFn({ method: "GET" })
  .validator((id: string) => id)
  .handler(async ({ data: id }) => {
    try {
      const { userId } = await getAuth(getWebRequest()!);
      if (!userId) throw new Error("Unauthorized");

      const note = await prisma.note.findUnique({
        where: { id },
      });

      if (!note) throw new Error("Note not found");
      if (note.userId !== userId) throw new Error("Unauthorized");

      return note;
    } catch (error) {
      console.error("Error fetching note:", error);
      throw error;
    }
  });

// Create a new note
export const createNote = createServerFn({ method: "POST" })
  .validator((data: { title: string; content: string }) => data)
  .handler(async ({ data }) => {
    try {
      const { userId } = await getAuth(getWebRequest()!);
      if (!userId) throw new Error("Unauthorized");

      return await prisma.note.create({
        data: {
          title: data.title,
          content: data.content,
          userId,
        },
      });
    } catch (error) {
      console.error("Error creating note:", error);
      throw error;
    }
  });

// Update a note
export const updateNote = createServerFn({ method: "POST" })
  .validator((data: { id: string; title?: string; content?: string }) => data)
  .handler(async ({ data }) => {
    try {
      const { userId } = await getAuth(getWebRequest()!);
      if (!userId) throw new Error("Unauthorized");

      const note = await prisma.note.findUnique({
        where: { id: data.id },
      });

      if (!note) throw new Error("Note not found");
      if (note.userId !== userId) throw new Error("Unauthorized");

      return await prisma.note.update({
        where: { id: data.id },
        data: {
          title: data.title,
          content: data.content,
        },
      });
    } catch (error) {
      console.error("Error updating note:", error);
      throw error;
    }
  });

// Delete a note
export const deleteNote = createServerFn({ method: "POST" })
  .validator((id: string) => id)
  .handler(async ({ data: id }) => {
    try {
      const { userId } = await getAuth(getWebRequest()!);
      if (!userId) throw new Error("Unauthorized");

      const note = await prisma.note.findUnique({
        where: { id },
      });

      if (!note) throw new Error("Note not found");
      if (note.userId !== userId) throw new Error("Unauthorized");

      return await prisma.note.delete({
        where: { id },
      });
    } catch (error) {
      console.error("Error deleting note:", error);
      throw error;
    }
  });

================
File: src/utils/posts.ts
================
import { notFound } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import axios from 'redaxios'

export type PostType = {
  id: string
  title: string
  body: string
}

export const fetchPost = createServerFn({ method: 'GET' })
  .validator((postId: string) => postId)
  .handler(async ({ data }) => {
    console.info(`Fetching post with id ${data}...`)
    const post = await axios
      .get<PostType>(`https://jsonplaceholder.typicode.com/posts/${data}`)
      .then((r) => r.data)
      .catch((err) => {
        console.error(err)
        if (err.status === 404) {
          throw notFound()
        }
        throw err
      })

    return post
  })

export const fetchPosts = createServerFn({ method: 'GET' }).handler(
  async () => {
    console.info('Fetching posts...')
    await new Promise((r) => setTimeout(r, 1000))
    return axios
      .get<Array<PostType>>('https://jsonplaceholder.typicode.com/posts')
      .then((r) => r.data.slice(0, 10))
  },
)

================
File: src/utils/prisma.ts
================
import { PrismaClient } from '@prisma/client'

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma

================
File: src/utils/seo.ts
================
export const seo = ({
  title,
  description,
  keywords,
  image,
}: {
  title: string
  description?: string
  image?: string
  keywords?: string
}) => {
  const tags = [
    { title },
    { name: 'description', content: description },
    { name: 'keywords', content: keywords },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    { name: 'twitter:creator', content: '@tannerlinsley' },
    { name: 'twitter:site', content: '@tannerlinsley' },
    { name: 'og:type', content: 'website' },
    { name: 'og:title', content: title },
    { name: 'og:description', content: description },
    ...(image
      ? [
          { name: 'twitter:image', content: image },
          { name: 'twitter:card', content: 'summary_large_image' },
          { name: 'og:image', content: image },
        ]
      : []),
  ]

  return tags
}

================
File: src/utils/supabase.ts
================
import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
export const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
)

export default supabase

================
File: src/utils/todos.ts
================
import { createServerFn } from "@tanstack/react-start";
import { prisma } from "./prisma";
import { Todo } from "@prisma/client";
import { getAuth } from "@clerk/tanstack-start/server";
import { getWebRequest } from "@tanstack/react-start/server";

// Get all todos for the authenticated user
export const getTodos = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const { userId } = await getAuth(getWebRequest()!);
    if (!userId) throw new Error("Unauthorized");

    return await prisma.todo.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Error fetching todos:", error);
    throw error;
  }
});

// Get a single todo by ID
export const getTodoById = createServerFn({ method: "GET" })
  .validator((id: string) => id)
  .handler(async ({ data: id }) => {
    try {
      const { userId } = await getAuth(getWebRequest()!);
      if (!userId) throw new Error("Unauthorized");

      const todo = await prisma.todo.findUnique({
        where: { id },
      });

      if (!todo) throw new Error("Todo not found");
      if (todo.userId !== userId) throw new Error("Unauthorized");

      return todo;
    } catch (error) {
      console.error("Error fetching todo:", error);
      throw error;
    }
  });

// Create a new todo
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

// Update a todo
export const updateTodo = createServerFn({ method: "POST" })
  .validator(
    (data: {
      id: string;
      title?: string;
      description?: string;
      completed?: boolean;
    }) => data
  )
  .handler(async ({ data }) => {
    try {
      const { userId } = await getAuth(getWebRequest()!);
      if (!userId) throw new Error("Unauthorized");

      const todo = await prisma.todo.findUnique({
        where: { id: data.id },
      });

      if (!todo) throw new Error("Todo not found");
      if (todo.userId !== userId) throw new Error("Unauthorized");

      return await prisma.todo.update({
        where: { id: data.id },
        data: {
          title: data.title,
          description: data.description,
          completed: data.completed,
        },
      });
    } catch (error) {
      console.error("Error updating todo:", error);
      throw error;
    }
  });

// Delete a todo
export const deleteTodo = createServerFn({ method: "POST" })
  .validator((id: string) => id)
  .handler(async ({ data: id }) => {
    try {
      const { userId } = await getAuth(getWebRequest()!);
      if (!userId) throw new Error("Unauthorized");

      const todo = await prisma.todo.findUnique({
        where: { id },
      });

      if (!todo) throw new Error("Todo not found");
      if (todo.userId !== userId) throw new Error("Unauthorized");

      return await prisma.todo.delete({
        where: { id },
      });
    } catch (error) {
      console.error("Error deleting todo:", error);
      throw error;
    }
  });

================
File: tailwind.config.mjs
================
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

================
File: tsconfig.json
================
{
  "include": ["**/*.ts", "**/*.tsx"],
  "compilerOptions": {
    "strict": true,
    "esModuleInterop": true,
    "jsx": "react-jsx",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "lib": ["DOM", "DOM.Iterable", "ES2022"],
    "isolatedModules": true,
    "resolveJsonModule": true,
    "skipLibCheck": true,
    "target": "ES2022",
    "allowJs": true,
    "forceConsistentCasingInFileNames": true,
    "baseUrl": ".",
    "paths": {
      "~/*": ["./src/*"]
    },
    "noEmit": true
  }
}



================================================================
End of Codebase
================================================================
