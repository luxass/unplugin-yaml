import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["src/*.ts"],
  format: ["cjs", "esm"],
  clean: true,
  dts: true,
  treeshake: true,
  publint: true,
  outputOptions: {
    exports: "named",
  },
});
