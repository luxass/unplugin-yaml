/**
 * This entry file is for webpack plugin.
 *
 * @module
 */

import type unplugin from "./";
import { createWebpackPlugin } from "unplugin";
import { unpluginFactory } from "./";

/**
 * Webpack plugin
 *
 * @example
 * ```ts
 * // webpack.config.js
 * module.exports = {
 *  plugins: [require("unplugin-yaml/webpack")()],
 * }
 * ```
 */
export default createWebpackPlugin(unpluginFactory) as typeof unplugin.webpack;
