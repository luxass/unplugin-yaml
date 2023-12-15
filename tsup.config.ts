import { defineConfig } from "tsup";

export default defineConfig({
  entry: [
    "./src/index.ts",
    "./src/vite.ts",
    "./src/rollup.ts",
    "./src/webpack.ts",
    "./src/esbuild.ts",
    "./src/nuxt.ts",
  ],
  format: ["cjs", "esm"],
  clean: true,
  dts: true,
  treeshake: true,
  bundle: true,
  outExtension(ctx) {
    return {
      js: ctx.format === "cjs" ? ".cjs" : ".mjs",
    };
  },
});
