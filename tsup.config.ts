import { defineConfig } from "tsup";

export default defineConfig({
  entry: [
    "src/*.ts",
  ],
  format: [
    "esm",
    "cjs",
  ],
  clean: true,
  dts: true,
  splitting: true,
  target: "node18",
  bundle: true,
  outExtension(ctx) {
    return {
      js: ctx.format === "cjs" ? ".cjs" : ".mjs",
    };
  },
});
