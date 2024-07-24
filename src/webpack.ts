/**
 * This entry file is for webpack plugin.
 *
 * @module
 */

import { createWebpackPlugin } from "unplugin";
import type unplugin from "./";
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
