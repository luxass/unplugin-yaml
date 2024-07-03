import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import yaml from "unplugin-yaml/vite";
import inspect from "vite-plugin-inspect";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    yaml(),
    inspect(),
  ],
});
