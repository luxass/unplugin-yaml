/**
 * This entry file is for Nuxt plugin.
 *
 * @module
 */

import type { NuxtModule } from "@nuxt/schema";
import type { YamlOptions } from "./";
import { addVitePlugin, addWebpackPlugin, defineNuxtModule } from "@nuxt/kit";
import { NUXT_CONFIG_KEY, PLUGIN_NAME } from "./constants";
import vite from "./vite";
import webpack from "./webpack";

/**
 * Nuxt plugin
 *
 * @example
 * ```ts
 * // nuxt.config.ts
 * import yaml from "unplugin-yaml/nuxt"
 *
 * export default defineNuxtConfig({
 *   plugins: [yaml()],
 * })
 * ```
 */
export default defineNuxtModule<YamlOptions>({
  meta: {
    name: PLUGIN_NAME,
    configKey: NUXT_CONFIG_KEY,
  },
  setup(options, nuxt) {
    nuxt.options.typescript.tsConfig ||= {};
    nuxt.options.typescript.tsConfig.compilerOptions ||= {};
    nuxt.options.typescript.tsConfig.compilerOptions.types ||= [];
    nuxt.options.typescript.tsConfig.compilerOptions.types.push("unplugin-yaml/types");

    addWebpackPlugin(() => webpack(options));
    addVitePlugin(() => vite(options));
  },
}) as NuxtModule<YamlOptions>;
