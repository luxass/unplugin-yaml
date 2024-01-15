// @ts-check

// eslint-disable-next-line antfu/no-import-dist
import YAMLPlugin from "../../dist/rollup.mjs";

/** @type {import("rollup").RollupOptions} */
export default {
  input: "src/index.js",
  output: {
    format: "esm",
    sourcemap: "hidden",
    dir: "dist",
  },
  plugins: [
    YAMLPlugin(),
  ],
};
