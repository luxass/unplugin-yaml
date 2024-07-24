/**
 * This entry file is for Farm plugin.
 *
 * @module
 */

import { createFarmPlugin } from "unplugin";
import type unplugin from "./";
import { unpluginFactory } from "./";

/**
 * Farm plugin
 *
 * @example
 * ```ts
 * // farm.config.ts
 * import yaml from "unplugin-yaml/farm"
 *
 * export default defineConfig({
 *   plugins: [yaml()],
 * }
 * ```
 */
export default createFarmPlugin(unpluginFactory) as typeof unplugin.farm;
