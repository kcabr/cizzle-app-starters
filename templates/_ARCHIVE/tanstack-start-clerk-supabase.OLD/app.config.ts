import { defineConfig } from "@tanstack/react-start/config";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  tsr: {
    appDirectory: "src",
  },
  vite: {
    plugins: [
      tsConfigPaths({
        projects: ["./tsconfig.json"],
      }),
    ],
    build: {
      // Reduce concurrent file operations to prevent "too many open files" error
      rollupOptions: {
        maxParallelFileOps: 2, // Further reduce to prevent file handle issues
      },
    },
    optimizeDeps: {
      // Exclude MUI icons from dependency optimization
      exclude: ["@mui/icons-material"],
    },
    ssr: {
      // Optimize SSR for MUI icons
      external: ["@mui/icons-material"],
    },
  },
});
