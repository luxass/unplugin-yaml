import { defineConfig } from "@farmfe/core";
import vue from "@vitejs/plugin-vue";
import YamlPlugin from "unplugin-yaml/farm";

export default defineConfig({
  vitePlugins: [vue()],
  plugins: [YamlPlugin()],
});
