# Claude Guidelines for refine-dotnet-antd-enterprise

## Commands
- Development server: `npm run dev`
- Build for production: `npm run build`
- Start production server: `npm run start`
- Refine CLI access: `npm run refine`
- No test commands defined yet

## Code Style
- **TypeScript**: Strict mode with React JSX, target ESNext
- **Components**: Functional components with TypeScript typing
- **Naming**:
  - PascalCase: Components, interfaces
  - camelCase: Variables, functions, files
  - UPPER_CASE: Constants
- **Imports**: React/Refine imports first, then group by functionality
- **Error Handling**: Use try/catch blocks; return objects with name and message properties
- **File Structure**:
  - `/components/`: Reusable UI components
  - `/pages/`: Resource-based views (list, show, create, edit)
  - `/contexts/`: React contexts

## Framework
- Refine with Ant Design components
- React Router for navigation
- Simple REST data provider
- Custom authentication provider

## Notes
- Follow Ant Design patterns for UI components
- Ensure all components are properly typed
- Maintain consistent file organization by feature/domain