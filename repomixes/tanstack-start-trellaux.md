This file is a merged representation of the entire codebase, combined into a single document by Repomix.

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
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded

Additional Info:
----------------

================================================================
Directory Structure
================================================================
.gitignore
.prettierignore
app.config.ts
package.json
postcss.config.mjs
public/site.webmanifest
README.md
src/assets/react.svg
src/client.tsx
src/components/Board.tsx
src/components/CancelButton.tsx
src/components/Card.tsx
src/components/Column.tsx
src/components/DefaultCatchBoundary.tsx
src/components/EditableText.tsx
src/components/IconLink.tsx
src/components/Loader.tsx
src/components/NewCard.tsx
src/components/NewColumn.tsx
src/components/NotFound.tsx
src/components/SaveButton.tsx
src/db/board.ts
src/db/schema.ts
src/hooks/useOfflineIndicator.tsx
src/icons/icons.svg
src/icons/icons.tsx
src/queries.ts
src/router.tsx
src/routes/__root.tsx
src/routes/boards.$boardId.tsx
src/routes/index.tsx
src/routeTree.gen.ts
src/ssr.tsx
src/styles/app.css
src/types.ts
src/utils/posts.tsx
src/utils/seo.ts
tailwind.config.mjs
tsconfig.json

================================================================
Files
================================================================

================
File: .gitignore
================
node_modules
package-lock.json
yarn.lock

.DS_Store
.cache
.env
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
  "name": "tanstack-start-example-trellaux",
  "private": true,
  "sideEffects": false,
  "type": "module",
  "scripts": {
    "dev": "vinxi dev",
    "build": "vinxi build",
    "start": "vinxi start"
  },
  "dependencies": {
    "@tanstack/react-query": "^5.66.0",
    "@tanstack/react-query-devtools": "^5.66.0",
    "@tanstack/react-router": "^1.114.23",
    "@tanstack/react-router-with-query": "^1.114.23",
    "@tanstack/react-router-devtools": "^1.114.23",
    "@tanstack/react-start": "^1.114.23",
    "ky": "^1.7.4",
    "msw": "^2.7.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-hot-toast": "^2.5.1",
    "redaxios": "^0.5.1",
    "tailwind-merge": "^2.6.0",
    "tiny-invariant": "^1.3.3",
    "vinxi": "0.5.3",
    "zod": "^3.24.2"
  },
  "devDependencies": {
    "@types/react": "^19.0.8",
    "@types/react-dom": "^19.0.3",
    "postcss": "^8.5.1",
    "autoprefixer": "^10.4.20",
    "tailwindcss": "^3.4.17",
    "typescript": "^5.6.2",
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
File: README.md
================
# Trello-like example

To run this example:

```sh
pnpm install
pnpm dev
```

================
File: src/assets/react.svg
================
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--logos" width="35.93" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 256 228"><path fill="#00D8FF" d="M210.483 73.824a171.49 171.49 0 0 0-8.24-2.597c.465-1.9.893-3.777 1.273-5.621c6.238-30.281 2.16-54.676-11.769-62.708c-13.355-7.7-35.196.329-57.254 19.526a171.23 171.23 0 0 0-6.375 5.848a155.866 155.866 0 0 0-4.241-3.917C100.759 3.829 77.587-4.822 63.673 3.233C50.33 10.957 46.379 33.89 51.995 62.588a170.974 170.974 0 0 0 1.892 8.48c-3.28.932-6.445 1.924-9.474 2.98C17.309 83.498 0 98.307 0 113.668c0 15.865 18.582 31.778 46.812 41.427a145.52 145.52 0 0 0 6.921 2.165a167.467 167.467 0 0 0-2.01 9.138c-5.354 28.2-1.173 50.591 12.134 58.266c13.744 7.926 36.812-.22 59.273-19.855a145.567 145.567 0 0 0 5.342-4.923a168.064 168.064 0 0 0 6.92 6.314c21.758 18.722 43.246 26.282 56.54 18.586c13.731-7.949 18.194-32.003 12.4-61.268a145.016 145.016 0 0 0-1.535-6.842c1.62-.48 3.21-.974 4.76-1.488c29.348-9.723 48.443-25.443 48.443-41.52c0-15.417-17.868-30.326-45.517-39.844Zm-6.365 70.984c-1.4.463-2.836.91-4.3 1.345c-3.24-10.257-7.612-21.163-12.963-32.432c5.106-11 9.31-21.767 12.459-31.957c2.619.758 5.16 1.557 7.61 2.4c23.69 8.156 38.14 20.213 38.14 29.504c0 9.896-15.606 22.743-40.946 31.14Zm-10.514 20.834c2.562 12.94 2.927 24.64 1.23 33.787c-1.524 8.219-4.59 13.698-8.382 15.893c-8.067 4.67-25.32-1.4-43.927-17.412a156.726 156.726 0 0 1-6.437-5.87c7.214-7.889 14.423-17.06 21.459-27.246c12.376-1.098 24.068-2.894 34.671-5.345a134.17 134.17 0 0 1 1.386 6.193ZM87.276 214.515c-7.882 2.783-14.16 2.863-17.955.675c-8.075-4.657-11.432-22.636-6.853-46.752a156.923 156.923 0 0 1 1.869-8.499c10.486 2.32 22.093 3.988 34.498 4.994c7.084 9.967 14.501 19.128 21.976 27.15a134.668 134.668 0 0 1-4.877 4.492c-9.933 8.682-19.886 14.842-28.658 17.94ZM50.35 144.747c-12.483-4.267-22.792-9.812-29.858-15.863c-6.35-5.437-9.555-10.836-9.555-15.216c0-9.322 13.897-21.212 37.076-29.293c2.813-.98 5.757-1.905 8.812-2.773c3.204 10.42 7.406 21.315 12.477 32.332c-5.137 11.18-9.399 22.249-12.634 32.792a134.718 134.718 0 0 1-6.318-1.979Zm12.378-84.26c-4.811-24.587-1.616-43.134 6.425-47.789c8.564-4.958 27.502 2.111 47.463 19.835a144.318 144.318 0 0 1 3.841 3.545c-7.438 7.987-14.787 17.08-21.808 26.988c-12.04 1.116-23.565 2.908-34.161 5.309a160.342 160.342 0 0 1-1.76-7.887Zm110.427 27.268a347.8 347.8 0 0 0-7.785-12.803c8.168 1.033 15.994 2.404 23.343 4.08c-2.206 7.072-4.956 14.465-8.193 22.045a381.151 381.151 0 0 0-7.365-13.322Zm-45.032-43.861c5.044 5.465 10.096 11.566 15.065 18.186a322.04 322.04 0 0 0-30.257-.006c4.974-6.559 10.069-12.652 15.192-18.18ZM82.802 87.83a323.167 323.167 0 0 0-7.227 13.238c-3.184-7.553-5.909-14.98-8.134-22.152c7.304-1.634 15.093-2.97 23.209-3.984a321.524 321.524 0 0 0-7.848 12.897Zm8.081 65.352c-8.385-.936-16.291-2.203-23.593-3.793c2.26-7.3 5.045-14.885 8.298-22.6a321.187 321.187 0 0 0 7.257 13.246c2.594 4.48 5.28 8.868 8.038 13.147Zm37.542 31.03c-5.184-5.592-10.354-11.779-15.403-18.433c4.902.192 9.899.29 14.978.29c5.218 0 10.376-.117 15.453-.343c-4.985 6.774-10.018 12.97-15.028 18.486Zm52.198-57.817c3.422 7.8 6.306 15.345 8.596 22.52c-7.422 1.694-15.436 3.058-23.88 4.071a382.417 382.417 0 0 0 7.859-13.026a347.403 347.403 0 0 0 7.425-13.565Zm-16.898 8.101a358.557 358.557 0 0 1-12.281 19.815a329.4 329.4 0 0 1-23.444.823c-7.967 0-15.716-.248-23.178-.732a310.202 310.202 0 0 1-12.513-19.846h.001a307.41 307.41 0 0 1-10.923-20.627a310.278 310.278 0 0 1 10.89-20.637l-.001.001a307.318 307.318 0 0 1 12.413-19.761c7.613-.576 15.42-.876 23.31-.876H128c7.926 0 15.743.303 23.354.883a329.357 329.357 0 0 1 12.335 19.695a358.489 358.489 0 0 1 11.036 20.54a329.472 329.472 0 0 1-11 20.722Zm22.56-122.124c8.572 4.944 11.906 24.881 6.52 51.026c-.344 1.668-.73 3.367-1.15 5.09c-10.622-2.452-22.155-4.275-34.23-5.408c-7.034-10.017-14.323-19.124-21.64-27.008a160.789 160.789 0 0 1 5.888-5.4c18.9-16.447 36.564-22.941 44.612-18.3ZM128 90.808c12.625 0 22.86 10.235 22.86 22.86s-10.235 22.86-22.86 22.86s-22.86-10.235-22.86-22.86s10.235-22.86 22.86-22.86Z"></path></svg>

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
File: src/components/Board.tsx
================
import { useCallback, useMemo, useRef } from 'react'
import invariant from 'tiny-invariant'
import { useSuspenseQuery } from '@tanstack/react-query'
import { boardQueries, useUpdateBoardMutation } from '../queries.js'
import { NewColumn } from './NewColumn.js'
import { Column as ColumnComponent } from './Column.js'
import type { Column } from '../db/schema.js'
import { EditableText } from '~/components/EditableText.js'

export function Board({ boardId }: { boardId: string }) {
  const newColumnAddedRef = useRef(false)
  const updateBoardMutation = useUpdateBoardMutation()
  const { data: board } = useSuspenseQuery(boardQueries.detail(boardId))

  // scroll right when new columns are added
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const columnRef = useCallback((_node: HTMLElement | null) => {
    if (scrollContainerRef.current && newColumnAddedRef.current) {
      newColumnAddedRef.current = false
      scrollContainerRef.current.scrollLeft =
        scrollContainerRef.current.scrollWidth
    }
  }, [])

  const itemsById = useMemo(
    () => new Map(board.items.map((item) => [item.id, item])),
    [board.items],
  )

  type ColumnWithItems = Column & { items: typeof board.items }

  const columns = useMemo(() => {
    const columnsMap = new Map<string, ColumnWithItems>()

    for (const column of [...board.columns]) {
      columnsMap.set(column.id, { ...column, items: [] })
    }

    // add items to their columns
    for (const item of itemsById.values()) {
      const columnId = item.columnId
      const column = columnsMap.get(columnId)
      invariant(column, 'missing column')
      column.items.push(item)
    }

    return [...columnsMap.values()].sort((a, b) => a.order - b.order)
  }, [board.columns, itemsById])

  return (
    <div
      className="flex-grow min-h-0 flex flex-col overflow-x-scroll"
      ref={scrollContainerRef}
      style={{ backgroundColor: board.color }}
    >
      <h1>
        <EditableText
          value={
            // optimistic update
            updateBoardMutation.isPending &&
            updateBoardMutation.variables.data.name
              ? updateBoardMutation.variables.data.name
              : board.name
          }
          fieldName="name"
          inputClassName="mx-8 my-4 text-2xl font-medium border border-slate-400 rounded-lg py-1 px-2 text-black"
          buttonClassName="mx-8 my-4 text-2xl font-medium block rounded-lg text-left border border-transparent py-1 px-2 text-slate-800"
          buttonLabel={`Edit board "${board.name}" name`}
          inputLabel="Edit board name"
          onChange={(value) => {
            updateBoardMutation.mutate({
              data: {
                id: board.id,
                name: value,
              },
            })
          }}
        />
      </h1>

      <div className="flex flex-grow min-h-0 h-full items-start px-8 pb-4 w-fit">
        {columns.map((col, index) => {
          return (
            <ColumnComponent
              ref={columnRef}
              key={col.id}
              name={col.name}
              columnId={col.id}
              boardId={board.id}
              items={col.items}
              order={col.order}
              previousOrder={columns[index - 1] ? columns[index - 1].order : 0}
              nextOrder={
                columns[index + 1] ? columns[index + 1].order : col.order + 1
              }
            />
          )
        })}
        <NewColumn
          boardId={board.id}
          editInitially={board.columns.length === 0}
          onNewColumnAdded={() => {
            newColumnAddedRef.current = true
          }}
        />
      </div>

      {/* trolling you to add some extra margin to the right of the container with a whole dang div */}
      <div data-lol className="w-8 h-1 flex-shrink-0" />
    </div>
  )
}

================
File: src/components/CancelButton.tsx
================
import { forwardRef } from 'react'

export const CancelButton = forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>((props, ref) => {
  return (
    <button
      ref={ref}
      type="button"
      tabIndex={0}
      {...props}
      className="text-sm rounded-lg text-left p-2 font-medium hover:bg-slate-200 focus:bg-slate-200"
    />
  )
})

================
File: src/components/Card.tsx
================
import invariant from 'tiny-invariant'
import { forwardRef, useState } from 'react'

import { CONTENT_TYPES } from '../types'
import { Icon } from '../icons/icons'
import { useDeleteCardMutation, useUpdateCardMutation } from '../queries'
import { deleteItemSchema } from '../db/schema'

interface CardProps {
  title: string
  content: string | null
  id: string
  columnId: string
  boardId: string
  order: number
  nextOrder: number
  previousOrder: number
}

export const Card = forwardRef<HTMLLIElement, CardProps>(
  (
    { title, content, id, columnId, boardId, order, nextOrder, previousOrder },
    ref,
  ) => {
    const [acceptDrop, setAcceptDrop] = useState<'none' | 'top' | 'bottom'>(
      'none',
    )

    const deleteCard = useDeleteCardMutation()
    const moveCard = useUpdateCardMutation()

    return (
      <li
        ref={ref}
        onDragOver={(event) => {
          if (event.dataTransfer.types.includes(CONTENT_TYPES.card)) {
            event.preventDefault()
            event.stopPropagation()
            const rect = event.currentTarget.getBoundingClientRect()
            const midpoint = (rect.top + rect.bottom) / 2
            setAcceptDrop(event.clientY <= midpoint ? 'top' : 'bottom')
          }
        }}
        onDragLeave={() => {
          setAcceptDrop('none')
        }}
        onDrop={(event) => {
          event.stopPropagation()

          const transfer = JSON.parse(
            event.dataTransfer.getData(CONTENT_TYPES.card) || 'null',
          )

          if (!transfer) {
            return
          }

          invariant(transfer.id, 'missing cardId')
          invariant(transfer.title, 'missing title')

          const droppedOrder = acceptDrop === 'top' ? previousOrder : nextOrder
          const moveOrder = (droppedOrder + order) / 2

          moveCard.mutate({
            data: {
              order: moveOrder,
              columnId,
              boardId,
              id: transfer.id,
              title: transfer.title,
            },
          })

          setAcceptDrop('none')
        }}
        className={
          'border-t-2 border-b-2 -mb-[2px] last:mb-0 cursor-grab active:cursor-grabbing px-2 py-1 ' +
          (acceptDrop === 'top'
            ? 'border-t-red-500 border-b-transparent'
            : acceptDrop === 'bottom'
              ? 'border-b-red-500 border-t-transparent'
              : 'border-t-transparent border-b-transparent')
        }
      >
        <div
          draggable
          className="bg-white shadow shadow-slate-300 border-slate-300 text-sm rounded-lg w-full py-1 px-2 relative"
          onDragStart={(event) => {
            event.dataTransfer.effectAllowed = 'move'
            event.dataTransfer.setData(
              CONTENT_TYPES.card,
              JSON.stringify({ id, title }),
            )
            event.stopPropagation()
          }}
        >
          <h3>{title}</h3>
          <div className="mt-2">{content || <>&nbsp;</>}</div>
          <form
            onSubmit={(event) => {
              event.preventDefault()

              deleteCard.mutate({
                data: deleteItemSchema.parse({
                  id,
                  boardId,
                }),
              })
            }}
          >
            <button
              aria-label="Delete card"
              className="absolute top-4 right-4 hover:text-red-500 flex gap-2 items-center"
              type="submit"
            >
              <div className="opacity-50 text-xs">{order}</div>
              <Icon name="trash" />
            </button>
          </form>
        </div>
      </li>
    )
  },
)

================
File: src/components/Column.tsx
================
import { forwardRef, useCallback, useMemo, useRef, useState } from 'react'
import invariant from 'tiny-invariant'
import { twMerge } from 'tailwind-merge'

import { flushSync } from 'react-dom'
import { CONTENT_TYPES } from '../types'
import { Icon } from '../icons/icons'
import {
  useDeleteColumnMutation,
  useUpdateCardMutation,
  useUpdateColumnMutation,
} from '../queries'
import { EditableText } from './EditableText'
import { NewCard } from './NewCard'
import { Card } from './Card'
import type { RenderedItem } from '../types'

interface ColumnProps {
  name: string
  boardId: string
  columnId: string
  items: Array<RenderedItem>
  nextOrder: number
  previousOrder: number
  order: number
}

export const Column = forwardRef<HTMLDivElement, ColumnProps>(
  (
    { name, columnId, boardId, items, nextOrder, previousOrder, order },
    ref,
  ) => {
    const [acceptCardDrop, setAcceptCardDrop] = useState(false)
    const editState = useState(false)

    const [acceptColumnDrop, setAcceptColumnDrop] = useState<
      'none' | 'left' | 'right'
    >('none')

    const [edit, setEdit] = useState(false)

    const itemRef = useCallback((node: HTMLElement | null) => {
      node?.scrollIntoView({
        block: 'nearest',
      })
    }, [])

    const listRef = useRef<HTMLUListElement>(null!)

    function scrollList() {
      invariant(listRef.current)
      listRef.current.scrollTop = listRef.current.scrollHeight
    }

    const updateColumnMutation = useUpdateColumnMutation()
    const deleteColumnMutation = useDeleteColumnMutation()
    const updateCardMutation = useUpdateCardMutation()

    const sortedItems = useMemo(
      () => [...items].sort((a, b) => a.order - b.order),
      [items],
    )

    const cardDndProps = {
      onDragOver: (event: React.DragEvent) => {
        if (event.dataTransfer.types.includes(CONTENT_TYPES.card)) {
          event.preventDefault()
          setAcceptCardDrop(true)
        }
      },
      onDragLeave: () => {
        setAcceptCardDrop(false)
      },
      onDrop: (event: React.DragEvent) => {
        const transfer = JSON.parse(
          event.dataTransfer.getData(CONTENT_TYPES.card) || 'null',
        )

        if (!transfer) {
          return
        }

        invariant(transfer.id, 'missing transfer.id')
        invariant(transfer.title, 'missing transfer.title')

        updateCardMutation.mutate({
          data: {
            order: (sortedItems[sortedItems.length - 1]?.order ?? 0) + 1,
            columnId: columnId,
            boardId,
            id: transfer.id,
            title: transfer.title,
          },
        })

        setAcceptCardDrop(false)
      },
    }

    return (
      <div
        ref={ref}
        onDragOver={(event: React.DragEvent) => {
          if (event.dataTransfer.types.includes(CONTENT_TYPES.column)) {
            event.preventDefault()
            event.stopPropagation()
            const rect = event.currentTarget.getBoundingClientRect()
            const midpoint = (rect.left + rect.right) / 2
            setAcceptColumnDrop(event.clientX <= midpoint ? 'left' : 'right')
          }
        }}
        onDragLeave={() => {
          setAcceptColumnDrop('none')
        }}
        onDrop={(event: React.DragEvent) => {
          const transfer = JSON.parse(
            event.dataTransfer.getData(CONTENT_TYPES.column) || 'null',
          )

          if (!transfer) {
            return
          }

          invariant(transfer.id, 'missing transfer.id')

          const droppedOrder =
            acceptColumnDrop === 'left' ? previousOrder : nextOrder
          const moveOrder = (droppedOrder + order) / 2

          updateColumnMutation.mutate({
            data: {
              boardId,
              id: transfer.id,
              order: moveOrder,
            },
          })

          setAcceptColumnDrop('none')
        }}
        className={twMerge(
          'border-l-transparent border-r-transparent border-l-2 border-r-2 -mr-[2px] last:mr-0 cursor-grab active:cursor-grabbing px-2 flex-shrink-0 flex flex-col  max-h-full',
          acceptColumnDrop === 'left'
            ? 'border-l-red-500 border-r-transparent'
            : acceptColumnDrop === 'right'
              ? 'border-r-red-500 border-l-transparent'
              : '',
        )}
      >
        <div
          draggable={!editState[0]}
          onDragStart={(event: React.DragEvent) => {
            event.dataTransfer.effectAllowed = 'move'
            event.dataTransfer.setData(
              CONTENT_TYPES.column,
              JSON.stringify({ id: columnId, name }),
            )
          }}
          {...(!items.length ? cardDndProps : {})}
          className={twMerge(
            'flex-shrink-0 flex flex-col max-h-full w-80 border-slate-400 rounded-xl shadow-sm shadow-slate-400 bg-slate-100 relative',
            acceptCardDrop && `outline outline-2 outline-red-500`,
          )}
        >
          <div className="p-2" {...(items.length ? cardDndProps : {})}>
            <EditableText
              fieldName="name"
              editState={editState}
              value={
                // optimistic update
                updateColumnMutation.isPending &&
                updateColumnMutation.variables.data.name
                  ? updateColumnMutation.variables.data.name
                  : name
              }
              inputLabel="Edit column name"
              buttonLabel={`Edit column "${name}" name`}
              inputClassName="border border-slate-400 w-full rounded-lg py-1 px-2 font-medium text-black"
              buttonClassName="block rounded-lg text-left w-full border border-transparent py-1 px-2 font-medium text-slate-600"
              onChange={(value) => {
                updateColumnMutation.mutate({
                  data: {
                    boardId,
                    id: columnId,
                    name: value,
                  },
                })
              }}
            />
          </div>

          <ul ref={listRef} className="flex-grow overflow-auto">
            {sortedItems.map((item, index, items) => (
              <Card
                ref={itemRef}
                key={item.id}
                title={item.title}
                content={item.content ?? ''}
                id={item.id}
                boardId={boardId}
                order={item.order}
                columnId={columnId}
                previousOrder={items[index - 1] ? items[index - 1].order : 0}
                nextOrder={
                  items[index + 1] ? items[index + 1].order : item.order + 1
                }
              />
            ))}
          </ul>
          {edit ? (
            <NewCard
              columnId={columnId}
              boardId={boardId}
              nextOrder={
                items.length === 0 ? 1 : items[items.length - 1].order + 1
              }
              onComplete={() => setEdit(false)}
            />
          ) : (
            <div className="p-2" {...(items.length ? cardDndProps : {})}>
              <button
                type="button"
                onClick={() => {
                  flushSync(() => {
                    setEdit(true)
                  })
                  scrollList()
                }}
                className="flex items-center gap-2 rounded-lg text-left w-full p-2 font-medium text-slate-500 hover:bg-slate-200 focus:bg-slate-200"
              >
                <Icon name="plus" /> Add a card
              </button>
            </div>
          )}
          <form
            onSubmit={(event) => {
              event.preventDefault()

              deleteColumnMutation.mutate({
                data: {
                  id: columnId,
                  boardId,
                },
              })
            }}
          >
            <button
              aria-label="Delete column"
              className="absolute top-4 right-4 hover:text-red-500 flex gap-2 items-center"
              type="submit"
            >
              <Icon name="trash" />
            </button>
          </form>
        </div>
      </div>
    )
  },
)

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

  console.error('DefaultCatchBoundary Error:', error)

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
File: src/components/EditableText.tsx
================
import { useRef, useState } from 'react'
import { flushSync } from 'react-dom'

export function EditableText({
  fieldName,
  value,
  inputClassName,
  inputLabel,
  buttonClassName,
  buttonLabel,
  onChange,
  editState,
}: {
  fieldName: string
  value: string
  inputClassName: string
  inputLabel: string
  buttonClassName: string
  buttonLabel: string
  onChange: (value: string) => void
  editState?: [boolean, (value: boolean) => void]
}) {
  const localEditState = useState(false)
  const [edit, setEdit] = editState || localEditState
  const inputRef = useRef<HTMLInputElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  return edit ? (
    <form
      onSubmit={(event) => {
        event.preventDefault()

        onChange(inputRef.current!.value)

        flushSync(() => {
          setEdit(false)
        })

        buttonRef.current?.focus()
      }}
    >
      <input
        required
        ref={inputRef}
        type="text"
        aria-label={inputLabel}
        name={fieldName}
        defaultValue={value}
        className={inputClassName}
        onKeyDown={(event) => {
          if (event.key === 'Escape') {
            flushSync(() => {
              setEdit(false)
            })
            buttonRef.current?.focus()
          }
        }}
        onBlur={(event) => {
          if (
            inputRef.current?.value !== value &&
            inputRef.current?.value.trim() !== ''
          ) {
            onChange(inputRef.current!.value)
          }
          setEdit(false)
        }}
      />
    </form>
  ) : (
    <button
      aria-label={buttonLabel}
      type="button"
      ref={buttonRef}
      onClick={() => {
        flushSync(() => {
          setEdit(true)
        })
        inputRef.current?.select()
      }}
      className={buttonClassName}
    >
      {value || <span className="text-slate-400 italic">Edit</span>}
    </button>
  )
}

================
File: src/components/IconLink.tsx
================
export function IconLink({
  icon,
  href,
  label,
}: {
  icon: string
  href: string
  label: string
}) {
  return (
    <a
      href={href}
      className="text-slate-500 text-xs uppercase font-bold text-center"
    >
      <img src={icon} aria-hidden className="inline-block h-8 rounded-full" />
      <span className="block mt-2">{label}</span>
    </a>
  )
}

================
File: src/components/Loader.tsx
================
export function Loader() {
  return (
    <div className="flex h-full">
      <div className="m-auto border-gray-300 h-20 max-h-full aspect-square animate-spin rounded-full border-8 border-t-slate-900" />
    </div>
  )
}

================
File: src/components/NewCard.tsx
================
import { useRef } from 'react'
import invariant from 'tiny-invariant'

import { ItemMutationFields } from '../types'
import { useCreateItemMutation } from '../queries'
import { itemSchema } from '../db/schema'
import { SaveButton } from '~/components/SaveButton'
import { CancelButton } from '~/components/CancelButton'

export function NewCard({
  columnId,
  boardId,
  nextOrder,
  onComplete,
}: {
  columnId: string
  boardId: string
  nextOrder: number
  onComplete: () => void
}) {
  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const { mutate } = useCreateItemMutation()

  return (
    <form
      method="post"
      className="px-2 py-1 border-t-2 border-b-2 border-transparent"
      onSubmit={(event) => {
        event.preventDefault()

        const formData = new FormData(event.currentTarget)
        const id = crypto.randomUUID()
        formData.set(ItemMutationFields.id.name, id)

        invariant(textAreaRef.current)
        textAreaRef.current.value = ''

        mutate({
          data: itemSchema.parse(Object.fromEntries(formData.entries())),
        })
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          onComplete()
        }
      }}
    >
      <input type="hidden" name="boardId" value={boardId} />
      <input
        type="hidden"
        name={ItemMutationFields.columnId.name}
        value={columnId}
      />
      <input
        type="hidden"
        name={ItemMutationFields.order.name}
        value={nextOrder}
      />

      <textarea
        autoFocus
        required
        ref={textAreaRef}
        name={ItemMutationFields.title.name}
        placeholder="Enter a title for this card"
        className="outline-none shadow text-sm rounded-lg w-full py-1 px-2 resize-none placeholder:text-sm placeholder:text-slate-500 h-14"
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            event.preventDefault()
            invariant(buttonRef.current, 'expected button ref')
            buttonRef.current.click()
          }
          if (event.key === 'Escape') {
            onComplete()
          }
        }}
        onChange={(event) => {
          const el = event.currentTarget
          el.style.height = el.scrollHeight + 'px'
        }}
      />
      <div className="flex justify-between">
        <SaveButton ref={buttonRef}>Save Card</SaveButton>
        <CancelButton onClick={onComplete}>Cancel</CancelButton>
      </div>
    </form>
  )
}

================
File: src/components/NewColumn.tsx
================
import { useRef, useState } from 'react'
import invariant from 'tiny-invariant'

import { Icon } from '../icons/icons'
import { useCreateColumnMutation } from '../queries'
import { CancelButton } from '~/components/CancelButton'
import { SaveButton } from '~/components/SaveButton'

export function NewColumn({
  boardId,
  editInitially,
  onNewColumnAdded,
}: {
  boardId: string
  editInitially: boolean
  onNewColumnAdded: () => void
}) {
  const [editing, setEditing] = useState(editInitially)
  const inputRef = useRef<HTMLInputElement>(null)

  const newColumnMutation = useCreateColumnMutation()

  return editing ? (
    <form
      className="ml-2 p-2 flex-shrink-0 flex flex-col gap-5 overflow-hidden max-h-full w-80 border rounded-xl shadow bg-slate-100"
      onSubmit={(event) => {
        event.preventDefault()
        invariant(inputRef.current, 'missing input ref')

        newColumnMutation.mutate({
          data: {
            boardId,
            name: inputRef.current.value,
          },
        })

        inputRef.current.value = ''

        onNewColumnAdded()
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setEditing(false)
        }
      }}
    >
      <input
        autoFocus
        required
        ref={inputRef}
        type="text"
        name="columnName"
        autoComplete="off"
        className="border border-slate-400 w-full rounded-lg py-1 px-2 font-medium text-black"
      />
      <div className="flex justify-between">
        <SaveButton>Save Column</SaveButton>
        <CancelButton onClick={() => setEditing(false)}>Cancel</CancelButton>
      </div>
    </form>
  ) : (
    <button
      onClick={() => {
        setEditing(true)
      }}
      aria-label="Add new column"
      className="ml-2 flex-shrink-0 flex justify-center h-16 w-16 bg-black hover:bg-white bg-opacity-10 hover:bg-opacity-5 rounded-xl"
    >
      <Icon name="plus" size="xl" />
    </button>
  )
}

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
File: src/components/SaveButton.tsx
================
import { forwardRef } from 'react'

export const SaveButton = forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>((props, ref) => {
  return (
    <button
      ref={ref}
      // this makes it so the button takes focus on clicks in safari I can't
      // remember if this is the proper workaround or not, it's been a while!
      // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#clicking_and_focus
      // https://bugs.webkit.org/show_bug.cgi?id=22261
      tabIndex={0}
      {...props}
      className="text-sm rounded-lg text-left p-2 font-medium text-white bg-blue-500"
    />
  )
})

================
File: src/db/board.ts
================
import crypto from 'node:crypto'
import { createServerFn } from '@tanstack/react-start'
import invariant from 'tiny-invariant'
import * as z from 'zod'
import {
  deleteColumnSchema,
  deleteItemSchema,
  itemSchema,
  newColumnSchema,
  updateBoardSchema,
  updateColumnSchema,
} from './schema'
import type { Board } from './schema'

const DELAY = 1000

const boards: Array<Board> = [
  {
    id: '1',
    name: 'First board',
    color: '#e0e0e0',
    columns: [],
    items: [],
  },
]

const delay = (ms: number = 1000) =>
  new Promise((resolve) => setTimeout(resolve, ms))

export const getBoards = createServerFn({ method: 'GET' }).handler(async () => {
  await delay(DELAY)
  return boards
})

export const getBoard = createServerFn({ method: 'GET' })
  .validator(z.string())
  .handler(async ({ data }) => {
    await delay(DELAY)
    const board = boards.find((b) => b.id === data)
    invariant(board, 'missing board')
    return board
  })

export const createColumn = createServerFn()
  .validator(newColumnSchema)
  .handler(async ({ data }) => {
    await delay(DELAY)
    const newColumn = newColumnSchema.parse(data)

    const board = boards.find((b) => b.id === newColumn.boardId)

    invariant(board, 'missing board')

    board.columns = [
      ...board.columns,
      {
        ...newColumn,
        order: board.columns.length + 1,
        id: crypto.randomUUID(),
      },
    ]
  })

export const createItem = createServerFn()
  .validator(itemSchema)
  .handler(async ({ data }) => {
    await delay(DELAY)
    const item = itemSchema.parse(data)

    const board = boards.find((b) => b.id === item.boardId)

    invariant(board, 'missing board')

    board.items.push(item)
  })

export const deleteItem = createServerFn({ method: 'GET' })
  .validator(deleteItemSchema)
  .handler(async ({ data }) => {
    await delay(DELAY)
    const { id } = deleteItemSchema.parse(data)
    const board = boards.find((b) => b.items.some((i) => i.id === id))
    invariant(board, 'missing board')
    board.items = board.items.filter((item) => item.id !== id)
  })

export const updateItem = createServerFn()
  .validator(itemSchema)
  .handler(async ({ data }) => {
    await delay(DELAY)
    const item = itemSchema.parse(data)
    const board = boards.find((b) => b.id === item.boardId)
    invariant(board, 'missing board')
    const existingItem = board.items.find((i) => i.id === item.id)
    invariant(existingItem, 'missing item')
    Object.assign(existingItem, item)
  })

export const updateColumn = createServerFn()
  .validator(updateColumnSchema)
  .handler(async ({ data }) => {
    await delay(DELAY)
    const column = updateColumnSchema.parse(data)
    const board = boards.find((b) => b.id === column.boardId)
    invariant(board, 'missing board')
    const existingColumn = board.columns.find((c) => c.id === column.id)
    invariant(existingColumn, 'missing column')
    Object.assign(existingColumn, column)
  })

export const updateBoard = createServerFn()
  .validator(updateBoardSchema)
  .handler(async ({ data }) => {
    await delay(DELAY)
    const update = updateBoardSchema.parse(data)
    const board = boards.find((b) => b.id === update.id)
    invariant(board, 'missing board')
    Object.assign(board, update)
  })

export const deleteColumn = createServerFn({ method: 'GET' })
  .validator(deleteColumnSchema)
  .handler(async ({ data }) => {
    await delay(DELAY)
    const { id } = deleteColumnSchema.parse(data)
    const board = boards.find((b) => b.columns.some((c) => c.id === id))
    invariant(board, 'missing board')
    board.columns = board.columns.filter((column) => column.id !== id)
    board.items = board.items.filter((item) => item.columnId !== id)
  })

================
File: src/db/schema.ts
================
import { z } from 'zod'

export const itemSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string().optional(),
  order: z.coerce.number(),
  columnId: z.string().uuid(),
  boardId: z.coerce.string(),
})

export const columnSchema = z.object({
  id: z.string().uuid(),
  boardId: z.coerce.string(),
  name: z.string(),
  order: z.number(),
})

export const boardSchema = z.object({
  id: z.coerce.string(),
  name: z.string(),
  color: z.string(),
  columns: z.array(columnSchema),
  items: z.array(itemSchema),
})

export const updateBoardSchema = boardSchema.partial().required({ id: true })

export const updateColumnSchema = columnSchema.partial().required({
  id: true,
  boardId: true,
})

export const deleteItemSchema = itemSchema.pick({ id: true, boardId: true })
export const newColumnSchema = columnSchema.omit({ order: true, id: true })
export const deleteColumnSchema = columnSchema.pick({ boardId: true, id: true })

export type Board = z.infer<typeof boardSchema>
export type Column = z.infer<typeof columnSchema>
export type Item = z.infer<typeof itemSchema>

================
File: src/hooks/useOfflineIndicator.tsx
================
import { onlineManager } from '@tanstack/react-query'
import { useEffect } from 'react'
import toast from 'react-hot-toast'

export function useOfflineIndicator() {
  useEffect(() => {
    return onlineManager.subscribe(() => {
      if (onlineManager.isOnline()) {
        toast.success('online', {
          id: 'ReactQuery',
          duration: 2000,
        })
      } else {
        toast.error('offline', {
          id: 'ReactQuery',
          duration: Infinity,
        })
      }
    })
  }, [])
}

================
File: src/icons/icons.svg
================
<?xml version="1.0" encoding="UTF-8"?>
<!-- This file is generated by npm run build:icons -->
<svg
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink"
  width="0"
  height="0"
>
  <defs>
    <symbol
      id="trash"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
      />
    </symbol>
    <symbol
      id="login"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
      />
    </symbol>

    <symbol
      id="logout"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
      />
    </symbol>

    <symbol id="github">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"
        fill="#fff"
      />
    </symbol>
    <symbol
      id="spin"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
      />
    </symbol>

    <symbol
      id="plus"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="3.5"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M12 4.5v15m7.5-7.5h-15"
      />
    </symbol>

    <symbol
      id="pin"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
      />
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
      />
    </symbol>
    <symbol
      id="mail"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="w-6 h-6"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
      />
    </symbol>

    <symbol
      id="bars"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="w-6 h-6"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M3.75 9h16.5m-16.5 6.75h16.5"
      />
    </symbol>
  </defs>
</svg>

================
File: src/icons/icons.tsx
================
import iconsHref from './icons.svg?url'

export function Icon({
  name,
  size = 'md',
  spin = false,
}: {
  name: string
  size?: 'md' | 'xl'
  spin?: boolean
}) {
  const classNames = {
    md: 'w-4 h-4',
    xl: 'w-8 h-8',
  }
  return (
    <svg
      className={`${classNames[size]} inline self-center ${
        spin ? 'animate-spin' : ''
      }`}
    >
      <use href={`${iconsHref}#${name}`} />
    </svg>
  )
}

export function LoginIcon() {
  return (
    <svg className="inline self-center w-8 h-8 text-white transform scale-x-[-1]">
      <use href={`${iconsHref}#login`} />
    </svg>
  )
}

export function LogoutIcon() {
  return (
    <svg className="inline self-center w-8 h-8 text-white">
      <use href={`${iconsHref}#logout`} />
    </svg>
  )
}

================
File: src/queries.ts
================
import {
  queryOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import {
  createColumn,
  createItem,
  deleteColumn,
  deleteItem,
  getBoard,
  getBoards,
  updateBoard,
  updateColumn,
  updateItem,
} from './db/board.js'

export const boardQueries = {
  list: () =>
    queryOptions({ queryKey: ['boards', 'list'], queryFn: () => getBoards() }),
  detail: (id: string) =>
    queryOptions({
      queryKey: ['boards', 'detail', id],
      queryFn: () => getBoard({ data: id }),
    }),
}

export function useCreateColumnMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createColumn,
    onMutate: async (variables) => {
      await queryClient.cancelQueries()
      queryClient.setQueryData(
        boardQueries.detail(variables.data.boardId).queryKey,
        (board) =>
          board
            ? {
                ...board,
                columns: [
                  ...board.columns,
                  {
                    ...variables.data,
                    order: board.columns.length + 1,
                    id: Math.random() + '',
                  },
                ],
              }
            : undefined,
      )
    },
  })
}

export function useCreateItemMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createItem,
    onMutate: async (variables) => {
      await queryClient.cancelQueries()
      queryClient.setQueryData(
        boardQueries.detail(variables.data.boardId).queryKey,
        (board) =>
          board
            ? {
                ...board,
                items: [...board.items, variables.data],
              }
            : undefined,
      )
    },
  })
}

export function useUpdateCardMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateItem,
    onMutate: async (variables) => {
      await queryClient.cancelQueries()
      queryClient.setQueryData(
        boardQueries.detail(variables.data.boardId).queryKey,
        (board) =>
          board
            ? {
                ...board,
                items: board.items.map((i) =>
                  i.id === variables.data.id ? variables.data : i,
                ),
              }
            : undefined,
      )
    },
  })
}

export function useDeleteCardMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteItem,
    onMutate: async (variables) => {
      await queryClient.cancelQueries()

      queryClient.setQueryData(
        boardQueries.detail(variables.data.boardId).queryKey,
        (board) =>
          board
            ? {
                ...board,
                items: board.items.filter(
                  (item) => item.id !== variables.data.id,
                ),
              }
            : undefined,
      )
    },
  })
}

export function useDeleteColumnMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteColumn,
    onMutate: async (variables) => {
      await queryClient.cancelQueries()

      queryClient.setQueryData(
        boardQueries.detail(variables.data.boardId).queryKey,
        (board) =>
          board
            ? {
                ...board,
                columns: board.columns.filter(
                  (column) => column.id !== variables.data.id,
                ),
                items: board.items.filter(
                  (item) => item.columnId !== variables.data.id,
                ),
              }
            : undefined,
      )
    },
  })
}

export function useUpdateBoardMutation() {
  return useMutation({
    mutationFn: updateBoard,
  })
}

export function useUpdateColumnMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateColumn,
    onMutate: async (variables) => {
      await queryClient.cancelQueries()

      queryClient.setQueryData(
        boardQueries.detail(variables.data.boardId).queryKey,
        (board) =>
          board
            ? {
                ...board,
                columns: board.columns.map((c) =>
                  c.id === variables.data.id
                    ? {
                        ...c,
                        ...variables,
                      }
                    : c,
                ),
              }
            : undefined,
      )
    },
  })
}

================
File: src/router.tsx
================
import { createRouter as createTanStackRouter } from '@tanstack/react-router'
import {
  MutationCache,
  QueryClient,
  notifyManager,
} from '@tanstack/react-query'
import { routerWithQueryClient } from '@tanstack/react-router-with-query'
import toast from 'react-hot-toast'
import { routeTree } from './routeTree.gen'
import { DefaultCatchBoundary } from './components/DefaultCatchBoundary'
import { NotFound } from './components/NotFound'

export function createRouter() {
  if (typeof document !== 'undefined') {
    notifyManager.setScheduler(window.requestAnimationFrame)
  }

  const queryClient: QueryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnReconnect: () => !queryClient.isMutating(),
      },
    },
    mutationCache: new MutationCache({
      onError: (error) => {
        toast(error.message, { className: 'bg-red-500 text-white' })
      },
      onSettled: () => {
        if (queryClient.isMutating() === 1) {
          return queryClient.invalidateQueries()
        }
      },
    }),
  })

  const router = routerWithQueryClient(
    createTanStackRouter({
      routeTree,
      defaultPreload: 'intent',
      defaultErrorComponent: DefaultCatchBoundary,
      defaultNotFoundComponent: () => <NotFound />,
      scrollRestoration: true,
      context: {
        queryClient,
      },
    }),
    queryClient,
  )

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
import { ReactQueryDevtools } from '@tanstack/react-query-devtools/production'
import {
  HeadContent,
  Link,
  Outlet,
  Scripts,
  createRootRouteWithContext,
  useRouterState,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import * as React from 'react'
import { Toaster } from 'react-hot-toast'
import type { QueryClient } from '@tanstack/react-query'
import { DefaultCatchBoundary } from '~/components/DefaultCatchBoundary'
import { IconLink } from '~/components/IconLink'
import { NotFound } from '~/components/NotFound'
import appCss from '~/styles/app.css?url'
import { seo } from '~/utils/seo'
import { Loader } from '~/components/Loader'

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
}>()({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      ...seo({
        title:
          'TanStack Start | Type-Safe, Client-First, Full-Stack React Framework',
        description: `TanStack Start is a type-safe, client-first, full-stack React framework. `,
      }),
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png',
      },
      { rel: 'manifest', href: '/site.webmanifest', color: '#fffff' },
      { rel: 'icon', href: '/favicon.ico' },
    ],
  }),
  errorComponent: (props) => {
    return (
      <RootDocument>
        <DefaultCatchBoundary {...props} />
      </RootDocument>
    )
  },
  notFoundComponent: () => <NotFound />,
  component: RootComponent,
})

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  )
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
        <div className="h-screen flex flex-col min-h-0">
          <div className="bg-slate-900 border-b border-slate-800 flex items-center justify-between py-4 px-8 box-border">
            <div className="flex items-center gap-4">
              <div>
                <Link to="/" className="block leading-tight">
                  <div className="font-black text-2xl text-white">Trellaux</div>
                  <div className="text-slate-500">a TanStack Demo</div>
                </Link>
              </div>
              <LoadingIndicator />
            </div>
            <div className="flex items-center gap-6">
              {/* <label
                htmlFor="countries"
                className="block text-sm font-medium text-gray-900 dark:text-white"
              >
                Delay
              </label>
              <select
                className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(event) => {
                  // setExtraDelay(Number(event.currentTarget.value))
                }}
                defaultValue="0"
              >
                <option value="0">None</option>
                <option value="100">100</option>
                <option value="500">500</option>
                <option value="2000">2000</option>
              </select> */}
              <IconLink
                href="https://github.com/TanStack/router/tree/main/examples/react/start-trellaux"
                label="Source"
                icon="/github-mark-white.png"
              />
              <IconLink
                href="https://tanstack.com"
                icon="/tanstack.png"
                label="TanStack"
              />
            </div>
          </div>

          <div className="flex-grow min-h-0 h-full flex flex-col">
            {children}
            <Toaster />
          </div>
        </div>
        <ReactQueryDevtools />
        <TanStackRouterDevtools position="bottom-right" />
        <Scripts />
      </body>
    </html>
  )
}

function LoadingIndicator() {
  const isLoading = useRouterState({ select: (s) => s.isLoading })
  return (
    <div
      className={`h-12 transition-all duration-300 ${
        isLoading ? `opacity-100 delay-300` : `opacity-0 delay-0`
      }`}
    >
      <Loader />
    </div>
  )
}

================
File: src/routes/boards.$boardId.tsx
================
import { createFileRoute } from '@tanstack/react-router'
import { Board } from '~/components/Board'
import { Loader } from '~/components/Loader'
import { boardQueries } from '~/queries'

export const Route = createFileRoute('/boards/$boardId')({
  component: Home,
  pendingComponent: () => <Loader />,
  loader: async ({ params, context: { queryClient } }) => {
    await queryClient.ensureQueryData(boardQueries.detail(params.boardId))
  },
})

function Home() {
  const { boardId } = Route.useParams()

  return <Board boardId={boardId} />
}

================
File: src/routes/index.tsx
================
import { useSuspenseQuery } from '@tanstack/react-query'
import { Link, createFileRoute } from '@tanstack/react-router'
import { Loader } from '~/components/Loader'
import { boardQueries } from '~/queries'

export const Route = createFileRoute('/')({
  component: Home,
  pendingComponent: () => <Loader />,
})

function Home() {
  const boardsQuery = useSuspenseQuery(boardQueries.list())

  return (
    <div className="p-8 space-y-2">
      <h1 className="text-2xl font-black">Boards</h1>
      <ul className="flex flex-wrap list-disc">
        {boardsQuery.data.map((board) => (
          <li key={board.id} className="ml-4">
            <Link
              to="/boards/$boardId"
              params={{
                boardId: board.id,
              }}
              className="font-bold text-blue-500"
            >
              {board.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
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
import { Route as IndexImport } from './routes/index'
import { Route as BoardsBoardIdImport } from './routes/boards.$boardId'

// Create/Update Routes

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const BoardsBoardIdRoute = BoardsBoardIdImport.update({
  id: '/boards/$boardId',
  path: '/boards/$boardId',
  getParentRoute: () => rootRoute,
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
    '/boards/$boardId': {
      id: '/boards/$boardId'
      path: '/boards/$boardId'
      fullPath: '/boards/$boardId'
      preLoaderRoute: typeof BoardsBoardIdImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/boards/$boardId': typeof BoardsBoardIdRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/boards/$boardId': typeof BoardsBoardIdRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/boards/$boardId': typeof BoardsBoardIdRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/boards/$boardId'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/boards/$boardId'
  id: '__root__' | '/' | '/boards/$boardId'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  BoardsBoardIdRoute: typeof BoardsBoardIdRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  BoardsBoardIdRoute: BoardsBoardIdRoute,
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
        "/boards/$boardId"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/boards/$boardId": {
      "filePath": "boards.$boardId.tsx"
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

import { createRouter } from './router'

export default createStartHandler({
  createRouter,
  getRouterManifest,
})(defaultStreamHandler)

================
File: src/styles/app.css
================
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html,
  body {
    @apply text-gray-900 bg-gray-50 dark:bg-gray-950 dark:text-gray-200;
  }

  .using-mouse * {
    outline: none !important;
  }

  #root {
    @apply min-h-screen;
  }
}

================
File: src/types.ts
================
export interface RenderedItem {
  id: string
  title: string
  order: number
  content?: string
  columnId: string
}

export const CONTENT_TYPES = {
  card: 'application/app-card',
  column: 'application/app-column',
}

export const INTENTS = {
  updateColumnName: 'updateColumnName' as const,
  updateBoardName: 'updateBoardName' as const,
}

export const ItemMutationFields = {
  id: { type: String, name: 'id' },
  columnId: { type: String, name: 'columnId' },
  order: { type: Number, name: 'order' },
  title: { type: String, name: 'title' },
} as const

================
File: src/utils/posts.tsx
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
    return axios
      .get<Array<PostType>>('https://jsonplaceholder.typicode.com/posts')
      .then((r) => r.data.slice(0, 10))
  },
)

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
File: tailwind.config.mjs
================
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
}

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
