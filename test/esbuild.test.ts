import { join } from "node:path";
import { build } from "esbuild";
import { describe, expect, it } from "vitest";
import { testdir } from "vitest-testdirs";
import YAMLPlugin from "../src/esbuild";
import { removeComments } from "./utils";

describe("handles yaml", () => {
  it("expect yaml import to be a json object", async () => {
    const testdirPath = await testdir.from(join(import.meta.dirname, "fixtures/basic/yaml"));

    expect(testdirPath).toBeDefined();

    const result = await build({
      entryPoints: [
        join(testdirPath, "basic.js"),
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
    const testdirPath = await testdir.from(join(import.meta.dirname, "fixtures/basic/yaml"));

    expect(testdirPath).toBeDefined();

    const result = await build({
      entryPoints: [
        join(testdirPath, "basic-raw.js"),
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
});

describe("handles yml", () => {
  it("expect yml import to be a json object", async () => {
    const testdirPath = await testdir.from(join(import.meta.dirname, "fixtures/basic/yml"));

    expect(testdirPath).toBeDefined();

    const result = await build({
      entryPoints: [
        join(testdirPath, "basic.js"),
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
    const testdirPath = await testdir.from(join(import.meta.dirname, "fixtures/basic/yml"));

    expect(testdirPath).toBeDefined();

    const result = await build({
      entryPoints: [
        join(testdirPath, "basic-raw.js"),
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
});

it("handle multi document", async () => {
  const testdirPath = await testdir.from(join(import.meta.dirname, "fixtures/multi"));

  expect(testdirPath).toBeDefined();

  const result = await build({
    entryPoints: [
      join(testdirPath, "multi.js"),
    ],
    format: "esm",
    write: false,
    bundle: true,
    minifySyntax: false,
    plugins: [
      YAMLPlugin({
        type: "multi",
      }),
    ],
  });

  expect(removeComments(result.outputFiles[0]?.text)).toMatchSnapshot();
});

it("handle transforms", async () => {
  const testdirPath = await testdir.from(join(import.meta.dirname, "fixtures/transform"));

  expect(testdirPath).toBeDefined();

  const result = await build({
    entryPoints: [
      join(testdirPath, "transform.js"),
    ],
    format: "esm",
    write: false,
    bundle: true,
    minifySyntax: false,
    plugins: [
      YAMLPlugin({
        transform(data) {
          if (data != null && typeof data === "object" && "this" in data) {
            return {
              this: "transformed",
            };
          }
        },
      }),
    ],
  });

  expect(removeComments(result.outputFiles[0]?.text)).toMatchSnapshot();
});
