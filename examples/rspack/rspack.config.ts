import type { RspackPluginFunction, SwcLoaderOptions } from "@rspack/core";
import { defineConfig } from "@rspack/cli";
import { rspack } from "@rspack/core";
import { VueLoaderPlugin } from "rspack-vue-loader";
import yaml from "unplugin-yaml/rspack";

// Target browsers, see: https://github.com/browserslist/browserslist
const targets = ["last 2 versions", "> 0.2%", "not dead", "Firefox ESR"];

export default defineConfig({
  entry: {
    main: "./src/main.ts",
  },
  resolve: {
    extensions: ["...", ".ts", ".vue"],
  },
  plugins: [
    yaml(),
    new VueLoaderPlugin() as RspackPluginFunction,
    new rspack.HtmlRspackPlugin({
      template: "./index.html",
    }),
    new rspack.DefinePlugin({
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "rspack-vue-loader",
        options: {
          experimentalInlineMatchResource: true,
        },
      },
      {
        test: /\.(js|ts)$/,
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
            } satisfies SwcLoaderOptions,
          },
        ],
      },
      {
        test: /\.svg/,
        type: "asset/resource",
      },
      {
        test: /\.css$/,
        use: ["postcss-loader"],
        type: "css",
      },
    ],
  },
  experiments: {
    css: true,
  },
});
