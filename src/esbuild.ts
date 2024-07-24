/**
 * This entry file is for esbuild plugin. Requires esbuild >= 0.15
 *
 * @module
 */

import { createEsbuildPlugin } from "unplugin";
import type unplugin from "./";
import { unpluginFactory } from "./";

/**
 * Esbuild plugin
 *
 * @example
 * ```ts
 * // esbuild.config.js
 * import { build } from "esbuild";
 *
 * build({
 *   plugins: [require("unplugin-yaml/esbuild")()],
 * })
 * ```
 */
export default createEsbuildPlugin(unpluginFactory) as typeof unplugin.esbuild;
