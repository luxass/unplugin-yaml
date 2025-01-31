import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import YamlPlugin from "unplugin-yaml/astro";
import Inspect from "vite-plugin-inspect";

// https://astro.build/config
export default defineConfig({
  integrations: [
    YamlPlugin(),
  ],
  vite: {
    plugins: [tailwindcss(), Inspect()],
  },
});
