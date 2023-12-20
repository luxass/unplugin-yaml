// @ts-check
const path = require("node:path");
const YAMLPlugin = require("../../dist/webpack.cjs");

/** @type {import("webpack").Configuration} */
module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    YAMLPlugin(),
  ],
  mode: "production",
  stats: "errors-only",
};
