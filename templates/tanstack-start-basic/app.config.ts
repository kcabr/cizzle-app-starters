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
          target: "https://localhost:7169", // The backend server URL
          // Optionally, rewrite the path if needed
          rewrite: (path) => path.replace(/^\/api/, ""),
          changeOrigin: true, // Adjusts the origin of the host header to the target URL
        },
      },
    },
    // routeRules: {
    //   "/dotnetapi/**": {
    //     proxy: {
    //       to: "http://localhost:5290/**",
    //     },
    //     //    cors: false,
    //   },
    // },
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
