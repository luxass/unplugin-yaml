/**
 * This entry file is for Rollup plugin.
 *
 * @module
 */

import { createRollupPlugin } from "unplugin";
import { unpluginFactory } from "./";
import type unplugin from "./";

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
