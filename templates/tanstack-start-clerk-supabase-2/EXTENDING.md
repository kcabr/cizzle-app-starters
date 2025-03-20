# Extending This Template

This document provides guidance on how to extend this template with additional features or customize it for your specific needs.

## Adding New Routes

The project uses TanStack Router, which is file-based. To add new routes:

1. Create a new file in the `src/routes` directory:
   - For public routes: `src/routes/your-route.tsx`
   - For authenticated routes: `src/routes/_authed/your-route.tsx`

2. Use the `createFileRoute` function to define your route:

```tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/your-route')({
  component: YourComponent,
})

function YourComponent() {
  return <div>Your content here</div>
}
```

## Adding New Database Models

To add new database models:

1. Edit the `prisma/schema.prisma` file to add your model:

```prisma
model YourModel {
  id        String   @id @default(uuid())
  name      String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  userId    String
}
```

2. Generate a migration:

```bash
npm run prisma:migrate
```

3. Create utility functions to interact with your model in `src/utils/your-model.ts`:

```tsx
import { createServerFn } from '@tanstack/react-start'
import { prisma } from './prisma'
import { getAuth } from '@clerk/tanstack-start/server'
import { getWebRequest } from '@tanstack/react-start/server'

export const getYourModels = createServerFn({ method: 'GET' }).handler(
  async () => {
    const { userId } = await getAuth(getWebRequest()!)
    if (!userId) throw new Error('Unauthorized')

    return await prisma.yourModel.findMany({
      where: { userId },
    })
  }
)
```

## Adding New Global State

To add new global state with Redux:

1. Create a new slice in `src/store/slices/your-slice.ts`:

```tsx
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface YourState {
  value: string
}

const initialState: YourState = {
  value: '',
}

export const yourSlice = createSlice({
  name: 'your',
  initialState,
  reducers: {
    setValue: (state, action: PayloadAction<string>) => {
      state.value = action.payload
    },
  },
})

export const { setValue } = yourSlice.actions
export default yourSlice.reducer
```

2. Add your slice to the store in `src/store/index.ts`:

```tsx
import yourReducer from './slices/yourSlice'

export const store = configureStore({
  reducer: {
    // existing reducers
    your: yourReducer,
  },
})
```

## Creating New Components

For new reusable components:

1. Create a file in `src/components/YourComponent.tsx`
2. Use Tailwind for styling
3. Import and use in your routes or other components

## Customizing Theme

To customize the Tailwind theme:

1. Edit `tailwind.config.mjs` to add your custom colors, fonts, etc.:

```js
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          // ... other shades
          900: '#0c4a6e',
        },
      },
      fontFamily: {
        sans: ['Your Font', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
```

## Adding API Integrations

To add third-party API integrations:

1. Create utility functions in `src/utils/your-api.ts`
2. Use React Query for data fetching
3. Keep sensitive API keys in your `.env` file

## Deployment

This template is ready to deploy to:

1. **Netlify**: Connect your repository and deploy
2. **Vercel**: Connect your repository and deploy
3. **Any Node.js hosting**: Build with `npm run build` and serve the output

## Testing

To add testing:

1. Install testing libraries:
   ```bash
   npm install -D vitest @testing-library/react @testing-library/user-event
   ```

2. Create test files alongside your components or in a dedicated tests directory

## Continuous Integration

To set up CI/CD:

1. For GitHub Actions, create `.github/workflows/main.yml`
2. For other CI systems, configure to run:
   - Install dependencies
   - Run tests
   - Generate Prisma client
   - Build the application