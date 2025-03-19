import { defineConfig } from "@tanstack/react-start/config";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  tsr: {
    appDirectory: "src",
  },
  server: {
    routeRules: {
      "/dotnetapi/**": {
        proxy: {
          to: "http://localhost:5155/**",
        },
      },
    },
  },
  vite: {
    ssr: {
      noExternal: ["@mui/*"],
    },
    plugins: [
      tsConfigPaths({
        projects: ["./tsconfig.json"],
      }),
    ],
  },
});
