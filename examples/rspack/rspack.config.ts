import { defineConfig } from "@rspack/cli";
import { rspack, type RspackPluginFunction } from "@rspack/core";
import YamlPlugin from "unplugin-yaml/rspack";
import { VueLoaderPlugin } from "vue-loader";

export default defineConfig({
  context: __dirname,
  entry: {
    main: "./src/main.ts",
  },
  resolve: {
    extensions: ["...", ".ts", ".vue"],
  },
  plugins: [
    // @ts-expect-error asd
    YamlPlugin(),
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
        loader: "vue-loader",
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
              sourceMap: true,
              jsc: {
                parser: {
                  syntax: "typescript",
                },
              },
              env: {
                targets: [
                  "chrome >= 87",
                  "edge >= 88",
                  "firefox >= 78",
                  "safari >= 14",
                ],
              },
            },
          },
        ],
      },
      {
        test: /\.svg/,
        type: "asset/resource",
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: {
                  tailwindcss: {},
                  autoprefixer: {},
                },
              },
            },
          },
        ],
        type: "css",
      },
    ],
  },
  experiments: {
    css: true,
  },
});
