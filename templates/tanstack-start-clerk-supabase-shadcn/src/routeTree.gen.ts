/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as UiShowcaseImport } from './routes/ui-showcase'
import { Route as TestImport } from './routes/test'
import { Route as ShowcaseImport } from './routes/showcase'
import { Route as NewsImport } from './routes/news'
import { Route as GridImport } from './routes/grid'
import { Route as FormImport } from './routes/form'
import { Route as AuthedImport } from './routes/_authed'
import { Route as IndexImport } from './routes/index'
import { Route as NewsIndexImport } from './routes/news.index'
import { Route as NewsSearchImport } from './routes/news.search'
import { Route as AuthedUserInfoImport } from './routes/_authed/user-info'
import { Route as AuthedTodosImport } from './routes/_authed/todos'
import { Route as AuthedSubscriptionImport } from './routes/_authed/subscription'
import { Route as AuthedProfileImport } from './routes/_authed/profile'
import { Route as AuthedPostsImport } from './routes/_authed/posts'
import { Route as AuthedNotesImport } from './routes/_authed/notes'
import { Route as AuthedCounterImport } from './routes/_authed/counter'
import { Route as AuthedPostsIndexImport } from './routes/_authed/posts.index'
import { Route as AuthedSubscriptionSuccessImport } from './routes/_authed/subscription.success'
import { Route as AuthedProfileSplatImport } from './routes/_authed/profile.$'
import { Route as AuthedPostsPostIdImport } from './routes/_authed/posts.$postId'

// Create/Update Routes

const UiShowcaseRoute = UiShowcaseImport.update({
  id: '/ui-showcase',
  path: '/ui-showcase',
  getParentRoute: () => rootRoute,
} as any)

const TestRoute = TestImport.update({
  id: '/test',
  path: '/test',
  getParentRoute: () => rootRoute,
} as any)

const ShowcaseRoute = ShowcaseImport.update({
  id: '/showcase',
  path: '/showcase',
  getParentRoute: () => rootRoute,
} as any)

const NewsRoute = NewsImport.update({
  id: '/news',
  path: '/news',
  getParentRoute: () => rootRoute,
} as any)

const GridRoute = GridImport.update({
  id: '/grid',
  path: '/grid',
  getParentRoute: () => rootRoute,
} as any)

const FormRoute = FormImport.update({
  id: '/form',
  path: '/form',
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

const AuthedUserInfoRoute = AuthedUserInfoImport.update({
  id: '/user-info',
  path: '/user-info',
  getParentRoute: () => AuthedRoute,
} as any)

const AuthedTodosRoute = AuthedTodosImport.update({
  id: '/todos',
  path: '/todos',
  getParentRoute: () => AuthedRoute,
} as any)

const AuthedSubscriptionRoute = AuthedSubscriptionImport.update({
  id: '/subscription',
  path: '/subscription',
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

const AuthedSubscriptionSuccessRoute = AuthedSubscriptionSuccessImport.update({
  id: '/success',
  path: '/success',
  getParentRoute: () => AuthedSubscriptionRoute,
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
    '/form': {
      id: '/form'
      path: '/form'
      fullPath: '/form'
      preLoaderRoute: typeof FormImport
      parentRoute: typeof rootRoute
    }
    '/grid': {
      id: '/grid'
      path: '/grid'
      fullPath: '/grid'
      preLoaderRoute: typeof GridImport
      parentRoute: typeof rootRoute
    }
    '/news': {
      id: '/news'
      path: '/news'
      fullPath: '/news'
      preLoaderRoute: typeof NewsImport
      parentRoute: typeof rootRoute
    }
    '/showcase': {
      id: '/showcase'
      path: '/showcase'
      fullPath: '/showcase'
      preLoaderRoute: typeof ShowcaseImport
      parentRoute: typeof rootRoute
    }
    '/test': {
      id: '/test'
      path: '/test'
      fullPath: '/test'
      preLoaderRoute: typeof TestImport
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
    '/_authed/subscription': {
      id: '/_authed/subscription'
      path: '/subscription'
      fullPath: '/subscription'
      preLoaderRoute: typeof AuthedSubscriptionImport
      parentRoute: typeof AuthedImport
    }
    '/_authed/todos': {
      id: '/_authed/todos'
      path: '/todos'
      fullPath: '/todos'
      preLoaderRoute: typeof AuthedTodosImport
      parentRoute: typeof AuthedImport
    }
    '/_authed/user-info': {
      id: '/_authed/user-info'
      path: '/user-info'
      fullPath: '/user-info'
      preLoaderRoute: typeof AuthedUserInfoImport
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
    '/_authed/subscription/success': {
      id: '/_authed/subscription/success'
      path: '/success'
      fullPath: '/subscription/success'
      preLoaderRoute: typeof AuthedSubscriptionSuccessImport
      parentRoute: typeof AuthedSubscriptionImport
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

interface AuthedSubscriptionRouteChildren {
  AuthedSubscriptionSuccessRoute: typeof AuthedSubscriptionSuccessRoute
}

const AuthedSubscriptionRouteChildren: AuthedSubscriptionRouteChildren = {
  AuthedSubscriptionSuccessRoute: AuthedSubscriptionSuccessRoute,
}

const AuthedSubscriptionRouteWithChildren =
  AuthedSubscriptionRoute._addFileChildren(AuthedSubscriptionRouteChildren)

interface AuthedRouteChildren {
  AuthedCounterRoute: typeof AuthedCounterRoute
  AuthedNotesRoute: typeof AuthedNotesRoute
  AuthedPostsRoute: typeof AuthedPostsRouteWithChildren
  AuthedProfileRoute: typeof AuthedProfileRouteWithChildren
  AuthedSubscriptionRoute: typeof AuthedSubscriptionRouteWithChildren
  AuthedTodosRoute: typeof AuthedTodosRoute
  AuthedUserInfoRoute: typeof AuthedUserInfoRoute
}

const AuthedRouteChildren: AuthedRouteChildren = {
  AuthedCounterRoute: AuthedCounterRoute,
  AuthedNotesRoute: AuthedNotesRoute,
  AuthedPostsRoute: AuthedPostsRouteWithChildren,
  AuthedProfileRoute: AuthedProfileRouteWithChildren,
  AuthedSubscriptionRoute: AuthedSubscriptionRouteWithChildren,
  AuthedTodosRoute: AuthedTodosRoute,
  AuthedUserInfoRoute: AuthedUserInfoRoute,
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
  '/form': typeof FormRoute
  '/grid': typeof GridRoute
  '/news': typeof NewsRouteWithChildren
  '/showcase': typeof ShowcaseRoute
  '/test': typeof TestRoute
  '/ui-showcase': typeof UiShowcaseRoute
  '/counter': typeof AuthedCounterRoute
  '/notes': typeof AuthedNotesRoute
  '/posts': typeof AuthedPostsRouteWithChildren
  '/profile': typeof AuthedProfileRouteWithChildren
  '/subscription': typeof AuthedSubscriptionRouteWithChildren
  '/todos': typeof AuthedTodosRoute
  '/user-info': typeof AuthedUserInfoRoute
  '/news/search': typeof NewsSearchRoute
  '/news/': typeof NewsIndexRoute
  '/posts/$postId': typeof AuthedPostsPostIdRoute
  '/profile/$': typeof AuthedProfileSplatRoute
  '/subscription/success': typeof AuthedSubscriptionSuccessRoute
  '/posts/': typeof AuthedPostsIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '': typeof AuthedRouteWithChildren
  '/form': typeof FormRoute
  '/grid': typeof GridRoute
  '/showcase': typeof ShowcaseRoute
  '/test': typeof TestRoute
  '/ui-showcase': typeof UiShowcaseRoute
  '/counter': typeof AuthedCounterRoute
  '/notes': typeof AuthedNotesRoute
  '/profile': typeof AuthedProfileRouteWithChildren
  '/subscription': typeof AuthedSubscriptionRouteWithChildren
  '/todos': typeof AuthedTodosRoute
  '/user-info': typeof AuthedUserInfoRoute
  '/news/search': typeof NewsSearchRoute
  '/news': typeof NewsIndexRoute
  '/posts/$postId': typeof AuthedPostsPostIdRoute
  '/profile/$': typeof AuthedProfileSplatRoute
  '/subscription/success': typeof AuthedSubscriptionSuccessRoute
  '/posts': typeof AuthedPostsIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/_authed': typeof AuthedRouteWithChildren
  '/form': typeof FormRoute
  '/grid': typeof GridRoute
  '/news': typeof NewsRouteWithChildren
  '/showcase': typeof ShowcaseRoute
  '/test': typeof TestRoute
  '/ui-showcase': typeof UiShowcaseRoute
  '/_authed/counter': typeof AuthedCounterRoute
  '/_authed/notes': typeof AuthedNotesRoute
  '/_authed/posts': typeof AuthedPostsRouteWithChildren
  '/_authed/profile': typeof AuthedProfileRouteWithChildren
  '/_authed/subscription': typeof AuthedSubscriptionRouteWithChildren
  '/_authed/todos': typeof AuthedTodosRoute
  '/_authed/user-info': typeof AuthedUserInfoRoute
  '/news/search': typeof NewsSearchRoute
  '/news/': typeof NewsIndexRoute
  '/_authed/posts/$postId': typeof AuthedPostsPostIdRoute
  '/_authed/profile/$': typeof AuthedProfileSplatRoute
  '/_authed/subscription/success': typeof AuthedSubscriptionSuccessRoute
  '/_authed/posts/': typeof AuthedPostsIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | ''
    | '/form'
    | '/grid'
    | '/news'
    | '/showcase'
    | '/test'
    | '/ui-showcase'
    | '/counter'
    | '/notes'
    | '/posts'
    | '/profile'
    | '/subscription'
    | '/todos'
    | '/user-info'
    | '/news/search'
    | '/news/'
    | '/posts/$postId'
    | '/profile/$'
    | '/subscription/success'
    | '/posts/'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | ''
    | '/form'
    | '/grid'
    | '/showcase'
    | '/test'
    | '/ui-showcase'
    | '/counter'
    | '/notes'
    | '/profile'
    | '/subscription'
    | '/todos'
    | '/user-info'
    | '/news/search'
    | '/news'
    | '/posts/$postId'
    | '/profile/$'
    | '/subscription/success'
    | '/posts'
  id:
    | '__root__'
    | '/'
    | '/_authed'
    | '/form'
    | '/grid'
    | '/news'
    | '/showcase'
    | '/test'
    | '/ui-showcase'
    | '/_authed/counter'
    | '/_authed/notes'
    | '/_authed/posts'
    | '/_authed/profile'
    | '/_authed/subscription'
    | '/_authed/todos'
    | '/_authed/user-info'
    | '/news/search'
    | '/news/'
    | '/_authed/posts/$postId'
    | '/_authed/profile/$'
    | '/_authed/subscription/success'
    | '/_authed/posts/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  AuthedRoute: typeof AuthedRouteWithChildren
  FormRoute: typeof FormRoute
  GridRoute: typeof GridRoute
  NewsRoute: typeof NewsRouteWithChildren
  ShowcaseRoute: typeof ShowcaseRoute
  TestRoute: typeof TestRoute
  UiShowcaseRoute: typeof UiShowcaseRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AuthedRoute: AuthedRouteWithChildren,
  FormRoute: FormRoute,
  GridRoute: GridRoute,
  NewsRoute: NewsRouteWithChildren,
  ShowcaseRoute: ShowcaseRoute,
  TestRoute: TestRoute,
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
        "/form",
        "/grid",
        "/news",
        "/showcase",
        "/test",
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
        "/_authed/subscription",
        "/_authed/todos",
        "/_authed/user-info"
      ]
    },
    "/form": {
      "filePath": "form.tsx"
    },
    "/grid": {
      "filePath": "grid.tsx"
    },
    "/news": {
      "filePath": "news.tsx",
      "children": [
        "/news/search",
        "/news/"
      ]
    },
    "/showcase": {
      "filePath": "showcase.tsx"
    },
    "/test": {
      "filePath": "test.tsx"
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
    "/_authed/subscription": {
      "filePath": "_authed/subscription.tsx",
      "parent": "/_authed",
      "children": [
        "/_authed/subscription/success"
      ]
    },
    "/_authed/todos": {
      "filePath": "_authed/todos.tsx",
      "parent": "/_authed"
    },
    "/_authed/user-info": {
      "filePath": "_authed/user-info.tsx",
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
    "/_authed/subscription/success": {
      "filePath": "_authed/subscription.success.tsx",
      "parent": "/_authed/subscription"
    },
    "/_authed/posts/": {
      "filePath": "_authed/posts.index.tsx",
      "parent": "/_authed/posts"
    }
  }
}
ROUTE_MANIFEST_END */
