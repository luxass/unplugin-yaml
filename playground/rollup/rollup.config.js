// @ts-check

// @ts-expect-error - types is there, but this is not picking them up.
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
