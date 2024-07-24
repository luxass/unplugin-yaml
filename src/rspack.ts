/**
 * This entry file is for Rspack plugin.
 *
 * @module
 */

import { createRspackPlugin } from "unplugin";
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
export default createRspackPlugin(unpluginFactory);
