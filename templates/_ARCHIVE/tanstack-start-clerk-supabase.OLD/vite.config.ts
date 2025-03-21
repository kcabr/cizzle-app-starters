import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ["@mui/icons-material"],
  },
  build: {
    rollupOptions: {
      // Reduce parallel operations to prevent EMFILE errors
      maxParallelFileOps: 3,
      // Use code splitting for large dependencies
      output: {
        manualChunks: (id) => {
          if (id.includes("node_modules/@mui/icons-material")) {
            return "mui-icons";
          }
          if (id.includes("node_modules/@mui/material")) {
            return "mui-material";
          }
          if (id.includes("node_modules/@emotion")) {
            return "emotion";
          }
        },
      },
    },
  },
  ssr: {
    // Limit icon imports during SSR
    noExternal: ["@mui/material", "@emotion/react", "@emotion/styled"],
    // Optimize SSR for MUI icons
    optimizeDeps: {
      disabled: false,
    },
  },
});
