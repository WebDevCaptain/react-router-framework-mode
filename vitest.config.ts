import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./test/setup.ts",
  },
  resolve: {
    alias: {
      // Allow resolving absolute tsconfig imports if needed in tests
      "~": "/Users/shreyash/Projects/React-Router/Framework-Mode/app",
    },
  },
});
