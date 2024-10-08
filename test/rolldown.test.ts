import { rolldown } from "rolldown";
import { expect, it } from "vitest";
import YAMLPlugin from "../src/rolldown";
import { removeComments } from "./utils";

it("expect yaml import to be a json object", async () => {
  const bundle = await rolldown({
    input: "./test/fixtures/js-yaml.js",
    plugins: [
      YAMLPlugin(),
    ],
  });
  const { output } = await bundle.generate({
    format: "esm",
    sourcemap: false,
  });

  expect(removeComments(output[0].code)).toMatchSnapshot();
});

it("expect yaml import to be a string", async () => {
  const bundle = await rolldown({
    input: "./test/fixtures/js-yaml-raw.js",
    plugins: [
      YAMLPlugin(),
    ],
  });
  const { output } = await bundle.generate({
    format: "esm",
    sourcemap: false,
  });

  expect(removeComments(output[0].code)).toMatchSnapshot();
});

it("expect yml import to be a json object", async () => {
  const bundle = await rolldown({
    input: "./test/fixtures/js-yml.js",
    plugins: [
      YAMLPlugin(),
    ],
  });
  const { output } = await bundle.generate({
    format: "esm",
    sourcemap: false,
  });

  expect(removeComments(output[0].code)).toMatchSnapshot();
});

it("expect yml import to be a string", async () => {
  const bundle = await rolldown({
    input: "./test/fixtures/js-yml-raw.js",
    plugins: [
      YAMLPlugin(),
    ],
  });
  const { output } = await bundle.generate({
    format: "esm",
    sourcemap: false,
  });

  expect(removeComments(output[0].code)).toMatchSnapshot();
});
