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
  exports: {
    packageJson: false,
    customExports(exports) {
      exports["./types"] = { types: "./yaml.d.ts" };
      exports["./package.json"] = "./package.json";

      return exports;
    },
  },
});
