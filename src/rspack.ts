/**
 * This entry file is for Rspack plugin.
 *
 * @module
 */

import { createRspackPlugin } from "unplugin";
import type unplugin from "./";
import { unpluginFactory } from "./";
/**
 * Rspack plugin
 *
 * @example
 * ```ts
 * // rspack.config.ts
 * import yaml from "unplugin-yaml/rspack"
 *
 * export default defineConfig({
 *   plugins: [yaml()],
 * })
 * ```
 */
export default createRspackPlugin(unpluginFactory) as typeof unplugin.rspack;
