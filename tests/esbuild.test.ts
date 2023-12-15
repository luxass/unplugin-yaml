import { build } from "esbuild";
import { expect, it } from "vitest";

import YAMLPlugin from "../src/esbuild";

it("expect yaml import to be a json object", async () => {
  const result = await build({
    entryPoints: [
      "./tests/fixtures/yaml-config.yaml",
    ],
    format: "esm",
    write: false,
    bundle: true,
    minifySyntax: false,
    plugins: [
      YAMLPlugin(),
    ],
  });

  expect(result.outputFiles[0]?.text).toMatchSnapshot();
});

it("expect yaml import to be a string", async () => {
  const result = await build({
    entryPoints: [
      "./tests/fixtures/js-yaml-raw.js",
    ],
    format: "esm",
    write: false,
    bundle: true,
    minifySyntax: false,
    plugins: [
      YAMLPlugin(),
    ],
  });

  expect(result.outputFiles[0]?.text).toMatchSnapshot();
});

it("expect yml import to be a json object", async () => {
  const result = await build({
    entryPoints: [
      "./tests/fixtures/yml-config.yml",
    ],
    format: "esm",
    write: false,
    bundle: true,
    minifySyntax: false,
    plugins: [
      YAMLPlugin(),
    ],
  });

  expect(result.outputFiles[0]?.text).toMatchSnapshot();
});

it("expect yml import to be a string", async () => {
  const result = await build({
    entryPoints: [
      "./tests/fixtures/js-yml-raw.js",
    ],
    format: "esm",
    write: false,
    bundle: true,
    minifySyntax: false,
    plugins: [
      YAMLPlugin(),
    ],
  });

  expect(result.outputFiles[0]?.text).toMatchSnapshot();
});
