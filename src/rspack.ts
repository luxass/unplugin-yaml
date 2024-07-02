/**
 * This entry file is for Rspack plugin.
 *
 * @module
 */

import { unplugin } from "./";

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
export default unplugin.rspack;
