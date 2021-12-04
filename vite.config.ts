import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [react()],
  build: {
    terserOptions: {
      compress: {
        pure_funcs: ["console.log", "console.info", "console.debug"],
        drop_debugger: true,
      },
    },
  },
});
