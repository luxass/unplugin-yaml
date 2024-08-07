/**
 * This entry file is for Rollup plugin.
 *
 * @module
 */

import { createRollupPlugin } from "unplugin";
import type unplugin from "./";
import { unpluginFactory } from "./";

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
export default createRollupPlugin(unpluginFactory) as typeof unplugin.rollup;
