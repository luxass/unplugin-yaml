import { defineConfig } from "oxlint";

export default defineConfig({
  options: {
    typeAware: true,
    typeCheck: true,
  },
  plugins: ["unicorn", "typescript", "oxc"],
  categories: {
    correctness: "error",
    perf: "error",
    suspicious: "error",
  },
  rules: {
    "eslint/no-await-in-loop": "off",
    "no-console": ["error", { allow: ["error"] }],
    "no-shadow": "off",
    "typescript/no-unnecessary-boolean-literal-compare": "off",
    "typescript/no-unsafe-type-assertion": "off",
    curly: "off",
  },
  overrides: [
    {
      files: [".github/**/*", "playground/**/*", "**/scripts/**/*"],
      rules: {
        "no-console": "off",
      },
    },
  ],
});
