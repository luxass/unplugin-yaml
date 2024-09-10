import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";
import YamlPlugin from "unplugin-yaml/astro";
import Inspect from "vite-plugin-inspect";

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
