const path = require("node:path");
const YAMLPlugin = require("../../dist/webpack.cjs");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    YAMLPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.yaml$/,
        exclude: /node_modules/,
        use: {
          loader: path.resolve("./yaml-loader"),
        },
      },
    ],
  },
  stats: "errors-only",
};
