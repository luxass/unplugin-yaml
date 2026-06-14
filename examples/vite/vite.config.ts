import yaml from "unplugin-yaml/vite";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [yaml()],
});
