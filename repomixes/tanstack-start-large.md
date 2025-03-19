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
app.config.ts
package.json
postcss.config.mjs
src/client.tsx
src/createRoutes.mjs
src/router.tsx
src/routes/__root.tsx
src/routes/absolute.tsx
src/routes/index.tsx
src/routes/linkProps.tsx
src/routes/params/$paramsPlaceholder.tsx
src/routes/params/route.tsx
src/routes/relative.tsx
src/routes/search/route.tsx
src/routes/search/searchPlaceholder.tsx
src/routeTree.gen.ts
src/ssr.tsx
src/styles.css
src/typePrimitives.tsx
tailwind.config.mjs
tsconfig.json

================================================================
Files
================================================================

================
File: .gitignore
================
node_modules
.DS_Store
dist
dist-ssr
*.local
(gen)
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
  "name": "tanstack-start-example-large",
  "private": true,
  "sideEffects": false,
  "type": "module",
  "scripts": {
    "dev": "vinxi dev",
    "build": "vinxi build",
    "start": "vinxi start",
    "gen": "node ./src/createRoutes.mjs",
    "test:types": "tsc --extendedDiagnostics"
  },
  "dependencies": {
    "@tanstack/react-query": "^5.66.0",
    "@tanstack/react-router": "^1.114.23",
    "@tanstack/react-router-devtools": "^1.114.23",
    "@tanstack/react-start": "^1.114.23",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "redaxios": "^0.5.1",
    "tailwind-merge": "^2.6.0",
    "valibot": "^1.0.0-beta.15",
    "vinxi": "0.5.3"
  },
  "devDependencies": {
    "@types/node": "^22.5.4",
    "@types/react": "^19.0.8",
    "@types/react-dom": "^19.0.3",
    "postcss": "^8.5.1",
    "autoprefixer": "^10.4.20",
    "tailwindcss": "^3.4.17",
    "typescript": "^5.7.2",
    "vite": "6.1.0",
    "vite-tsconfig-paths": "^5.1.4"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
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
File: src/client.tsx
================
// src/client.tsx
/// <reference types="vinxi/types/client" />
import { hydrateRoot } from 'react-dom/client'
import { StartClient } from '@tanstack/react-start'
import { createRouter } from './router'

const router = createRouter()

hydrateRoot(document, <StartClient router={router} />)

================
File: src/createRoutes.mjs
================
import { readFile, writeFile, mkdir } from 'fs/promises'
import { existsSync } from 'fs'

const length = 100

const main = async () => {
  const absolute = (await readFile('./src/routes/absolute.tsx')).toString()
  const relative = (await readFile('./src/routes/relative.tsx')).toString()
  const searchRoute = (
    await readFile('./src/routes/search/route.tsx')
  ).toString()
  const search = (
    await readFile('./src/routes/search/searchPlaceholder.tsx')
  ).toString()
  const paramsRoute = (
    await readFile('./src/routes/params/route.tsx')
  ).toString()
  const params = await (
    await readFile('./src/routes/params/$paramsPlaceholder.tsx')
  ).toString()

  if (!existsSync('./src/routes/(gen)')) {
    await mkdir('./src/routes/(gen)')
  }

  if (!existsSync('./src/routes/(gen)/search')) {
    await mkdir('./src/routes/(gen)/search')
  }

  if (!existsSync('./src/routes/(gen)/params')) {
    await mkdir('./src/routes/(gen)/params')
  }

  await writeFile('./src/routes/(gen)/search/route.tsx', searchRoute)
  await writeFile('./src/routes/(gen)/params/route.tsx', paramsRoute)

  for (let y = 0; y < length; y = y + 1) {
    const replacedAbsolute = absolute.replaceAll('/absolute', `/absolute${y}`)
    const replacedRelative = relative.replaceAll('/relative', `/relative${y}`)
    const replacedSearch = search.replaceAll('searchPlaceholder', `search${y}`)
    const replacedParams = params.replaceAll('paramsPlaceholder', `param${y}`)
    await writeFile(`./src/routes/(gen)/absolute${y}.tsx`, replacedAbsolute)
    await writeFile(`./src/routes/(gen)/relative${y}.tsx`, replacedRelative)
    await writeFile(`./src/routes/(gen)/search/search${y}.tsx`, replacedSearch)
    await writeFile(`./src/routes/(gen)/params/$param${y}.tsx`, replacedParams)
  }
}

main()

================
File: src/router.tsx
================
// src/router.tsx
import { createRouter as createTanStackRouter } from '@tanstack/react-router'
import { QueryClient } from '@tanstack/react-query'
import { routeTree } from './routeTree.gen'

export function createRouter() {
  const queryClient = new QueryClient()
  const router = createTanStackRouter({
    routeTree,
    context: {
      queryClient: queryClient,
    },
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
// src/routes/__root.tsx
import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRouteWithContext,
} from '@tanstack/react-router'
import type { QueryClient } from '@tanstack/react-query'
import type { ReactNode } from 'react'
import appCss from '~/styles.css?url'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
export interface Context {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<Context>()({
  head: () => ({
    links: [{ rel: 'stylesheet', href: appCss }],
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'TanStack Start Starter',
      },
    ],
  }),
  component: RootComponent,
})

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  )
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <TanStackRouterDevtools position="bottom-right" />
        <Scripts />
      </body>
    </html>
  )
}

================
File: src/routes/absolute.tsx
================
import * as React from 'react'
import { Link, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/absolute')({
  component: AbsoluteComponent,
})

function AbsoluteComponent() {
  return (
    <div className="p-2 space-y-2">
      <Link
        to="/absolute"
        className="block py-1 text-blue-800 hover:text-blue-600"
      >
        Absolute
      </Link>
    </div>
  )
}

================
File: src/routes/index.tsx
================
import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
    </div>
  )
}

================
File: src/routes/linkProps.tsx
================
import * as React from 'react'
import { Link, createFileRoute, linkOptions } from '@tanstack/react-router'
import {
  customRedirect,
  ListItems,
  MyLink,
  useCustomNavigate,
} from '~/typePrimitives'

export const Route = createFileRoute('/linkProps')({
  component: LinkPropsPage,
  loader: () => {
    throw customRedirect({
      to: '/search/searchPlaceholder',
      search: {
        searchPlaceholder: 'searchPlaceholder',
        rootSearch: 0,
        page: 0,
        offset: 0,
        search: 'hi',
      },
    })
  },
})

function LinkPropsPage() {
  useCustomNavigate({
    to: '/search/searchPlaceholder',
    search: {
      searchPlaceholder: 'searchPlaceholder',
      rootSearch: 0,
      page: 0,
      offset: 0,
      search: 'hi',
    },
  })

  const linkProps = linkOptions({
    to: '/absolute',
  })

  return (
    <>
      <MyLink
        from="/search/searchPlaceholder"
        to="../searchPlaceholder"
        search={{
          searchPlaceholder: 'searchPlaceholder',
          rootSearch: 0,
          page: 0,
          offset: 0,
          search: 'hi',
        }}
      />
      <ListItems
        from="/search/searchPlaceholder"
        items={[
          {
            to: '../searchPlaceholder',
            search: {
              searchPlaceholder: 'searchPlaceholder',
              rootSearch: 0,
              page: 0,
              offset: 0,
              search: 'hi',
            },
          },
        ]}
      />
      <Link {...linkProps} />
    </>
  )
}

================
File: src/routes/params/$paramsPlaceholder.tsx
================
import * as React from 'react'
import { Link, createFileRoute } from '@tanstack/react-router'
import * as v from 'valibot'
import { queryOptions } from '@tanstack/react-query'
import { createMiddleware, createServerFn } from '@tanstack/react-start'

const params = v.object({
  oneParamsPlaceholder: v.literal('oneParamsPlaceholder'),
  twoParamsPlaceholder: v.literal('twoParamsPlaceholder'),
  threeParamsPlaceholder: v.literal('threeParamsPlaceholder'),
})

const loaderResult = v.object({
  params,
})

const middleware = createMiddleware()
  .validator(params)
  .client(({ next }) => {
    const context = { client: { paramsPlaceholder: 'paramsPlaceholder' } }
    return next({
      context,
      sendContext: context,
    })
  })
  .server(({ next }) => {
    const context = { server: { paramsPlaceholder: 'paramsPlaceholder' } }
    return next({
      context,
      sendContext: context,
    })
  })

const fn = createServerFn()
  .middleware([middleware])
  .handler(() => {
    return v.parse(loaderResult, {})
  })

const paramsQueryOptions = queryOptions({
  queryKey: ['paramsPlaceholder'],
  queryFn: () => {
    return v.parse(loaderResult, {})
  },
})

export const Route = createFileRoute('/params/$paramsPlaceholder')({
  component: ParamsComponent,
  context: () => ({
    paramsQueryOptions: queryOptions({
      queryKey: ['paramsPlaceholder'],
      queryFn: async () =>
        await fn({
          data: {
            oneParamsPlaceholder: 'oneParamsPlaceholder',
            twoParamsPlaceholder: 'twoParamsPlaceholder',
            threeParamsPlaceholder: 'threeParamsPlaceholder',
          },
        }),
    }),
  }),
  loader: (opts) =>
    opts.context.queryClient.ensureQueryData(paramsQueryOptions),
})

function ParamsComponent() {
  return (
    <div className="p-2 space-y-2">
      <Link
        to="/params/$paramsPlaceholder"
        params={{
          paramsPlaceholder: 'params',
        }}
      />
    </div>
  )
}

================
File: src/routes/params/route.tsx
================
import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/params')({
  component: () => <div>Hello /params!</div>,
})

================
File: src/routes/relative.tsx
================
import * as React from 'react'
import { Link, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/relative')({
  component: RelativeComponent,
})

function RelativeComponent() {
  return (
    <div className="p-2 space-y-2">
      <Link
        from={Route.fullPath}
        to="../relative"
        className="block py-1 text-blue-800 hover:text-blue-600"
      >
        Relative
      </Link>
    </div>
  )
}

================
File: src/routes/search/route.tsx
================
import { createFileRoute } from '@tanstack/react-router'
import * as v from 'valibot'

const search = v.object({
  rootSearch: v.number(),
})

export const Route = createFileRoute('/search')({
  component: () => <div>Hello /search!</div>,
  validateSearch: search,
})

================
File: src/routes/search/searchPlaceholder.tsx
================
import { Link, createFileRoute } from '@tanstack/react-router'

import * as v from 'valibot'
import { queryOptions } from '@tanstack/react-query'
import { createMiddleware, createServerFn } from '@tanstack/react-start'

const search = v.object({
  searchPlaceholder: v.literal('searchPlaceholder'),
  page: v.number(),
  offset: v.number(),
  search: v.string(),
})

const loaderResult = v.object({
  searchPlaceholder: v.number(),
})

const middleware = createMiddleware()
  .validator(search)
  .client(({ next }) => {
    const context = { client: { searchPlaceholder: 'searchPlaceholder' } }
    return next({
      context,
      sendContext: context,
    })
  })
  .server(({ next }) => {
    const context = { server: { searchPlaceholder: 'searchPlaceholder' } }
    return next({
      context,
      sendContext: context,
    })
  })

const fn = createServerFn()
  .middleware([middleware])
  .handler(() => {
    const result = v.parse(loaderResult, {
      searchPlaceholder: 0,
    })

    return result
  })

export const Route = createFileRoute('/search/searchPlaceholder')({
  component: SearchComponent,
  validateSearch: search,
  loaderDeps: ({ search }) => ({ search }),
  context: (ctx) => ({
    searchQueryOptions: queryOptions({
      queryKey: ['searchPlaceholder'],
      queryFn: () => fn({ data: ctx.deps.search }),
    }),
  }),
  loader: (opts) =>
    opts.context.queryClient.ensureQueryData(opts.context.searchQueryOptions),
})

function SearchComponent() {
  return (
    <div className="p-2 space-y-2">
      <Link
        to="/search/searchPlaceholder"
        className="block py-1 text-blue-800 hover:text-blue-600"
        search={{
          searchPlaceholder: 'searchPlaceholder',
          page: 0,
          offset: 10,
          search: 'search',
          rootSearch: 0,
        }}
      >
        Search
      </Link>
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
import { Route as RelativeImport } from './routes/relative'
import { Route as LinkPropsImport } from './routes/linkProps'
import { Route as AbsoluteImport } from './routes/absolute'
import { Route as SearchRouteImport } from './routes/search/route'
import { Route as ParamsRouteImport } from './routes/params/route'
import { Route as IndexImport } from './routes/index'
import { Route as SearchSearchPlaceholderImport } from './routes/search/searchPlaceholder'
import { Route as ParamsParamsPlaceholderImport } from './routes/params/$paramsPlaceholder'

// Create/Update Routes

const RelativeRoute = RelativeImport.update({
  id: '/relative',
  path: '/relative',
  getParentRoute: () => rootRoute,
} as any)

const LinkPropsRoute = LinkPropsImport.update({
  id: '/linkProps',
  path: '/linkProps',
  getParentRoute: () => rootRoute,
} as any)

const AbsoluteRoute = AbsoluteImport.update({
  id: '/absolute',
  path: '/absolute',
  getParentRoute: () => rootRoute,
} as any)

const SearchRouteRoute = SearchRouteImport.update({
  id: '/search',
  path: '/search',
  getParentRoute: () => rootRoute,
} as any)

const ParamsRouteRoute = ParamsRouteImport.update({
  id: '/params',
  path: '/params',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const SearchSearchPlaceholderRoute = SearchSearchPlaceholderImport.update({
  id: '/searchPlaceholder',
  path: '/searchPlaceholder',
  getParentRoute: () => SearchRouteRoute,
} as any)

const ParamsParamsPlaceholderRoute = ParamsParamsPlaceholderImport.update({
  id: '/$paramsPlaceholder',
  path: '/$paramsPlaceholder',
  getParentRoute: () => ParamsRouteRoute,
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
    '/params': {
      id: '/params'
      path: '/params'
      fullPath: '/params'
      preLoaderRoute: typeof ParamsRouteImport
      parentRoute: typeof rootRoute
    }
    '/search': {
      id: '/search'
      path: '/search'
      fullPath: '/search'
      preLoaderRoute: typeof SearchRouteImport
      parentRoute: typeof rootRoute
    }
    '/absolute': {
      id: '/absolute'
      path: '/absolute'
      fullPath: '/absolute'
      preLoaderRoute: typeof AbsoluteImport
      parentRoute: typeof rootRoute
    }
    '/linkProps': {
      id: '/linkProps'
      path: '/linkProps'
      fullPath: '/linkProps'
      preLoaderRoute: typeof LinkPropsImport
      parentRoute: typeof rootRoute
    }
    '/relative': {
      id: '/relative'
      path: '/relative'
      fullPath: '/relative'
      preLoaderRoute: typeof RelativeImport
      parentRoute: typeof rootRoute
    }
    '/params/$paramsPlaceholder': {
      id: '/params/$paramsPlaceholder'
      path: '/$paramsPlaceholder'
      fullPath: '/params/$paramsPlaceholder'
      preLoaderRoute: typeof ParamsParamsPlaceholderImport
      parentRoute: typeof ParamsRouteImport
    }
    '/search/searchPlaceholder': {
      id: '/search/searchPlaceholder'
      path: '/searchPlaceholder'
      fullPath: '/search/searchPlaceholder'
      preLoaderRoute: typeof SearchSearchPlaceholderImport
      parentRoute: typeof SearchRouteImport
    }
  }
}

// Create and export the route tree

interface ParamsRouteRouteChildren {
  ParamsParamsPlaceholderRoute: typeof ParamsParamsPlaceholderRoute
}

const ParamsRouteRouteChildren: ParamsRouteRouteChildren = {
  ParamsParamsPlaceholderRoute: ParamsParamsPlaceholderRoute,
}

const ParamsRouteRouteWithChildren = ParamsRouteRoute._addFileChildren(
  ParamsRouteRouteChildren,
)

interface SearchRouteRouteChildren {
  SearchSearchPlaceholderRoute: typeof SearchSearchPlaceholderRoute
}

const SearchRouteRouteChildren: SearchRouteRouteChildren = {
  SearchSearchPlaceholderRoute: SearchSearchPlaceholderRoute,
}

const SearchRouteRouteWithChildren = SearchRouteRoute._addFileChildren(
  SearchRouteRouteChildren,
)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/params': typeof ParamsRouteRouteWithChildren
  '/search': typeof SearchRouteRouteWithChildren
  '/absolute': typeof AbsoluteRoute
  '/linkProps': typeof LinkPropsRoute
  '/relative': typeof RelativeRoute
  '/params/$paramsPlaceholder': typeof ParamsParamsPlaceholderRoute
  '/search/searchPlaceholder': typeof SearchSearchPlaceholderRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/params': typeof ParamsRouteRouteWithChildren
  '/search': typeof SearchRouteRouteWithChildren
  '/absolute': typeof AbsoluteRoute
  '/linkProps': typeof LinkPropsRoute
  '/relative': typeof RelativeRoute
  '/params/$paramsPlaceholder': typeof ParamsParamsPlaceholderRoute
  '/search/searchPlaceholder': typeof SearchSearchPlaceholderRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/params': typeof ParamsRouteRouteWithChildren
  '/search': typeof SearchRouteRouteWithChildren
  '/absolute': typeof AbsoluteRoute
  '/linkProps': typeof LinkPropsRoute
  '/relative': typeof RelativeRoute
  '/params/$paramsPlaceholder': typeof ParamsParamsPlaceholderRoute
  '/search/searchPlaceholder': typeof SearchSearchPlaceholderRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/params'
    | '/search'
    | '/absolute'
    | '/linkProps'
    | '/relative'
    | '/params/$paramsPlaceholder'
    | '/search/searchPlaceholder'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/params'
    | '/search'
    | '/absolute'
    | '/linkProps'
    | '/relative'
    | '/params/$paramsPlaceholder'
    | '/search/searchPlaceholder'
  id:
    | '__root__'
    | '/'
    | '/params'
    | '/search'
    | '/absolute'
    | '/linkProps'
    | '/relative'
    | '/params/$paramsPlaceholder'
    | '/search/searchPlaceholder'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  ParamsRouteRoute: typeof ParamsRouteRouteWithChildren
  SearchRouteRoute: typeof SearchRouteRouteWithChildren
  AbsoluteRoute: typeof AbsoluteRoute
  LinkPropsRoute: typeof LinkPropsRoute
  RelativeRoute: typeof RelativeRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  ParamsRouteRoute: ParamsRouteRouteWithChildren,
  SearchRouteRoute: SearchRouteRouteWithChildren,
  AbsoluteRoute: AbsoluteRoute,
  LinkPropsRoute: LinkPropsRoute,
  RelativeRoute: RelativeRoute,
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
        "/params",
        "/search",
        "/absolute",
        "/linkProps",
        "/relative"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/params": {
      "filePath": "params/route.tsx",
      "children": [
        "/params/$paramsPlaceholder"
      ]
    },
    "/search": {
      "filePath": "search/route.tsx",
      "children": [
        "/search/searchPlaceholder"
      ]
    },
    "/absolute": {
      "filePath": "absolute.tsx"
    },
    "/linkProps": {
      "filePath": "linkProps.tsx"
    },
    "/relative": {
      "filePath": "relative.tsx"
    },
    "/params/$paramsPlaceholder": {
      "filePath": "params/$paramsPlaceholder.tsx",
      "parent": "/params"
    },
    "/search/searchPlaceholder": {
      "filePath": "search/searchPlaceholder.tsx",
      "parent": "/search"
    }
  }
}
ROUTE_MANIFEST_END */

================
File: src/ssr.tsx
================
// src/ssr.tsx
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
File: src/styles.css
================
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    color-scheme: light dark;
  }

  * {
    @apply border-gray-200 dark:border-gray-800;
  }

  html,
  body {
    @apply text-gray-900 bg-gray-50 dark:bg-gray-950 dark:text-gray-200;
  }

  .using-mouse * {
    outline: none !important;
  }
}

================
File: src/typePrimitives.tsx
================
import { Link, redirect, useNavigate } from '@tanstack/react-router'
import type {
  RegisteredRouter,
  ValidateFromPath,
  ValidateLinkOptions,
  ValidateLinkOptionsArray,
  ValidateNavigateOptions,
  ValidateRedirectOptions,
} from '@tanstack/react-router'

export function customRedirect<TRouter extends RegisteredRouter, TOptions>(
  options: ValidateRedirectOptions<TRouter, TOptions>,
): void
export function customRedirect(options: ValidateRedirectOptions): void {
  throw redirect(options)
}

export function useCustomNavigate<TRouter extends RegisteredRouter, TOptions>(
  options: ValidateNavigateOptions<TRouter, TOptions>,
): void
export function useCustomNavigate(options: ValidateNavigateOptions): void {
  const navigate = useNavigate()
  navigate(options)
}

export function MyLink<TRouter extends RegisteredRouter, TOptions>(
  options: ValidateLinkOptions<TRouter, TOptions>,
): React.ReactNode
export function MyLink(options: ValidateLinkOptions) {
  return <Link {...options} />
}

export interface ListItemsProps<
  TRouter extends RegisteredRouter = RegisteredRouter,
  TOptions extends ReadonlyArray<unknown> = ReadonlyArray<unknown>,
  TFrom extends string = string,
> {
  from: ValidateFromPath<TRouter, TFrom>
  items: ValidateLinkOptionsArray<TRouter, TOptions, TFrom>
}

export function ListItems<
  TRouter extends RegisteredRouter,
  TOptions extends ReadonlyArray<unknown>,
  TFrom extends string,
>(options: ListItemsProps<TRouter, TOptions, TFrom>): React.ReactNode
export function ListItems(options: ListItemsProps) {
  return options.items.map((item) => <Link {...item} from={options.from} />)
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
