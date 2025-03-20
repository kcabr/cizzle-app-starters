# TanStack Start RSC .NET Development Guidelines

## Build Commands
- `npm run dev` - Start development server
- `npm run build` - Build production app
- `npm run start` - Start production server

## Code Style Guidelines
- **Imports**: Group imports by source (React, TanStack, MUI, local). Use path aliases (`~/`) for local imports.
- **Formatting**: Follow TypeScript strict mode, use explicit return types for functions.
- **Components**: Use functional components with explicit type definitions.
- **Naming**: 
  - PascalCase for components, types, and interfaces
  - camelCase for variables, functions, and instances
  - Use descriptive names that reveal intent
- **Error Handling**: Utilize TanStack Router's error boundaries and fallbacks.
- **State Management**: Prefer React Query for server state, useState/useReducer for UI state.
- **File Structure**: Place components in `/components`, API routes in `/routes/api`, pages in `/routes`.
- **Server Functions**: Use `createServerFn()` with proper validation for server-side logic.

Maintain Material UI styling consistency by using theme tokens and avoiding inline styles.