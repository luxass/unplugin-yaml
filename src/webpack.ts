/**
 * This entry file is for webpack plugin.
 *
 * @module
 */

import { createWebpackPlugin } from "unplugin";
import { unpluginFactory } from "./";
import type unplugin from "./";

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
