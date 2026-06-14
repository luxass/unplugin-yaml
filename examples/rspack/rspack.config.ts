import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

import { defineConfig } from "@rspack/cli";
import { rspack } from "@rspack/core";
import yaml from "unplugin-yaml/rspack";

const projectDir = dirname(fileURLToPath(import.meta.url));

// Target browsers, see: https://github.com/browserslist/browserslist
const targets = ["chrome >= 87", "edge >= 88", "firefox >= 78", "safari >= 14"];

export default defineConfig({
  context: projectDir,
  entry: {
    main: "./src/main.ts",
  },
  resolve: {
    extensions: ["...", ".ts"],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        type: "css/auto",
      },
      {
        test: /\.ts$/,
        use: [
          {
            loader: "builtin:swc-loader",
            options: {
              jsc: {
                parser: {
                  syntax: "typescript",
                },
              },
              env: { targets },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    yaml(),
    new rspack.HtmlRspackPlugin({
      template: "./index.html",
    }),
  ],
  optimization: {
    minimizer: [
      new rspack.SwcJsMinimizerRspackPlugin(),
      new rspack.LightningCssMinimizerRspackPlugin({
        minimizerOptions: { targets },
      }),
    ],
  },
  experiments: {
    css: true,
  },
});
