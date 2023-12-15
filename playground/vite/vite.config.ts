import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import Inspect from "vite-plugin-inspect";
import YamlPlugin from "unplugin-yaml/vite";

export default defineConfig({
  plugins: [
    solid(),
    Inspect({
      build: true,
    }),
    YamlPlugin(),
  ],
});
