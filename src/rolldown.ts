/**
 * This entry file is for Rolldown plugin.
 *
 * @module
 */

import { createRolldownPlugin } from "unplugin";
import { unpluginFactory } from "./";
import type unplugin from "./";

/**
 * Rolldown plugin
 *
 * @example
 * ```ts
 * // rolldown.config.js
 * import yaml from "unplugin-yaml/rolldown"
 *
 * export default {
 *   plugins: [yaml()],
 * }
 * ```
 */
export default createRolldownPlugin(unpluginFactory) as typeof unplugin.rolldown;
