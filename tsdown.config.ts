import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["src/*.ts"],
  format: ["esm"],
  clean: true,
  dts: true,
  treeshake: true,
  publint: true,
  outputOptions: {
    exports: "named",
  },
  exports: true,
});
