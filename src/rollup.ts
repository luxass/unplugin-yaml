/**
 * This entry file is for Rollup plugin.
 *
 * @module
 */

import { unplugin } from "./";

/**
 * Rollup plugin
 *
 * @example
 * ```ts
 * // rollup.config.js
 * import yaml from "unplugin-yaml/rollup"
 *
 * export default {
 *   plugins: [yaml()],
 * }
 * ```
 */
export default unplugin.rollup;
