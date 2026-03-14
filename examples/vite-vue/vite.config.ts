import tailwindcss from "@tailwindcss/vite";
import Vue from "@vitejs/plugin-vue";
import YamlPlugin from "unplugin-yaml/vite";
import { defineConfig } from "vite";
import Inspect from "vite-plugin-inspect";
import VueDevTools from "vite-plugin-vue-devtools";
import VueRouter from "vue-router/unplugin";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    VueRouter.vite(),
    Vue(),
    VueDevTools(),
    YamlPlugin(),
    tailwindcss(),
    Inspect(),
  ],
});
