# Guidelines for Working in This Repository

## Commands
- `npm run dev` - Start development server
- `npm run build` - Build production assets
- `npm run start` - Start production server
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:studio` - Open Prisma database UI

## Code Style
- Use TypeScript with strict types for all new code
- Import path alias: use `~/` for src directory imports
- Component naming: PascalCase for components, camelCase for utilities
- React server functions: use `.validator()` and `.handler()` pattern
- Error handling: use try/catch with specific error messages
- State management: Redux for global state, useState for local component state
- Data fetching: React Query for server state management
- Components: prefer functional components with hooks
- File structure: routes in src/routes, components in src/components, utilities in src/utils
- Paths: use absolute paths with the ~ alias (e.g., `import { X } from '~/utils/y'`)