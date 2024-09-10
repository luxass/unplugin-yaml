/**
 * This entry file is for Vite plugin.
 *
 * @module
 */

import { createVitePlugin } from "unplugin";
import { unpluginFactory } from "./";
import type unplugin from "./";

/**
 * Vite plugin
 *
 * @example
 * ```ts
 * // vite.config.ts
 * import yaml from "unplugin-yaml/vite"
 *
 * export default defineConfig({
 *   plugins: [yaml()],
 * })
 * ```
 */
export default createVitePlugin(unpluginFactory) as typeof unplugin.vite;
