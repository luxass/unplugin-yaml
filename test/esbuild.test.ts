import { build } from "esbuild";
import { expect, it } from "vitest";
import YAMLPlugin from "../src/esbuild";
import { removeComments } from "./utils";

it("expect yaml import to be a json object", async () => {
  const result = await build({
    entryPoints: [
      "./test/fixtures/js-yaml.js",
    ],
    format: "esm",
    write: false,
    bundle: true,
    minifySyntax: false,
    plugins: [
      YAMLPlugin(),
    ],
  });

  expect(removeComments(result.outputFiles[0]?.text)).toMatchSnapshot();
});

it("expect yaml import to be a string", async () => {
  const result = await build({
    entryPoints: [
      "./test/fixtures/js-yaml-raw.js",
    ],
    format: "esm",
    write: false,
    bundle: true,
    minifySyntax: false,
    plugins: [
      YAMLPlugin(),
    ],
  });

  expect(removeComments(result.outputFiles[0]?.text)).toMatchSnapshot();
});

it("expect yml import to be a json object", async () => {
  const result = await build({
    entryPoints: [
      "./test/fixtures/js-yml.js",
    ],
    format: "esm",
    write: false,
    bundle: true,
    minifySyntax: false,
    plugins: [
      YAMLPlugin(),
    ],
  });

  expect(removeComments(result.outputFiles[0]?.text)).toMatchSnapshot();
});

it("expect yml import to be a string", async () => {
  const result = await build({
    entryPoints: [
      "./test/fixtures/js-yml-raw.js",
    ],
    format: "esm",
    write: false,
    bundle: true,
    minifySyntax: false,
    plugins: [
      YAMLPlugin(),
    ],
  });

  expect(removeComments(result.outputFiles[0]?.text)).toMatchSnapshot();
});
