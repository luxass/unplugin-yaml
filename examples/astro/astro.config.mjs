import { defineConfig } from "astro/config";
import Inspect from "vite-plugin-inspect";
import tailwind from "@astrojs/tailwind";
import YamlPlugin from "unplugin-yaml/astro";

// https://astro.build/config
export default defineConfig({
  integrations: [
    YamlPlugin(),
    tailwind(),
  ],
  vite: {
    plugins: [Inspect()],
  },
});
