/**
 * This entry file is for webpack plugin.
 *
 * @module
 */

import { unplugin } from "./";

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
export default unplugin.webpack;
