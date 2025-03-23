import { defineConfig } from '@tanstack/react-start/config'
import tsConfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  tsr: {
    appDirectory: 'src',
    env: {
      // Stripe environment variables
      VITE_STRIPE_PUBLISHABLE_KEY: 'pk_test_51XYZabcdefghijklmnopqrstuvwxyz',
      VITE_STRIPE_SECRET_KEY: 'sk_test_51XYZabcdefghijklmnopqrstuvwxyz',
      VITE_STRIPE_WEBHOOK_SECRET: 'whsec_51XYZabcdefghijklmnopqrstuvwxyz',
      VITE_STRIPE_CLIENT_SECRET: 'cs_live_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z',
    }
  },
  vite: {
    plugins: [
      tsConfigPaths({
        projects: ['./tsconfig.json'],
      }),
    ],
  },
})
