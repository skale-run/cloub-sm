import { resolve } from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "lucide-react": resolve(__dirname, "src/lucide-react.tsx"),
    },
  },
  server: {
    proxy: {
      "/v1": {
        target: "http://localhost:4000",
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: "run",
    emptyOutDir: false,
  },
});
