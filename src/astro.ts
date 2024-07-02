/**
 * This entry file is for Astro integration.
 *
 * @module
 */

import type { AstroIntegration } from "astro";
import type { YamlOptions } from "./types";
import { PLUGIN_NAME } from "./constants";
import { unplugin } from "./";

/**
 * Astro integration
 *
 * @example
 * ```ts
 * // astro.config.mjs
 * import yaml from "unplugin-yaml/astro"
 *
 * export default defineConfig({
 *   integrations: [yaml()],
 * })
 * ```
 */
export default function YamlIntegration(options: YamlOptions): AstroIntegration {
  return {
    name: PLUGIN_NAME,
    hooks: {
      "astro:config:setup": async (astro: any) => {
        astro.config.vite.plugins ||= [];
        astro.config.vite.plugins.push(unplugin.vite(options));
      },
    },
  };
}
