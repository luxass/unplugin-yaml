import { rollup } from "rollup";
import { expect, it } from "vitest";

import YAMLPlugin from "../src/rollup";

it("expect yaml import to be a json object", async () => {
  const bundle = await rollup({
    input: "./tests/fixtures/yaml-config.yaml",
    plugins: [
      YAMLPlugin(),
    ],
  });
  const { output } = await bundle.generate({
    format: "esm",
    sourcemap: false,
  });

  expect(output[0].code).toMatchSnapshot();
});

it("expect yaml import to be a string", async () => {
  const bundle = await rollup({
    input: "./tests/fixtures/js-yaml-raw.js",
    plugins: [
      YAMLPlugin(),
    ],
  });
  const { output } = await bundle.generate({
    format: "esm",
    sourcemap: false,
  });

  expect(output[0].code).toMatchSnapshot();
});

it("expect yml import to be a json object", async () => {
  const bundle = await rollup({
    input: "./tests/fixtures/yml-config.yml",
    plugins: [
      YAMLPlugin(),
    ],
  });
  const { output } = await bundle.generate({
    format: "esm",
    sourcemap: false,
  });

  expect(output[0].code).toMatchSnapshot();
});

it("expect yml import to be a string", async () => {
  const bundle = await rollup({
    input: "./tests/fixtures/js-yml-raw.js",
    plugins: [
      YAMLPlugin(),
    ],
  });
  const { output } = await bundle.generate({
    format: "esm",
    sourcemap: false,
  });

  expect(output[0].code).toMatchSnapshot();
});
