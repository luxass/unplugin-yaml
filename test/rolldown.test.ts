import { join } from "node:path";
import { rolldown } from "rolldown";
import { describe, expect, it } from "vitest";
import { testdir } from "vitest-testdirs";
import YAMLPlugin from "../src/rolldown";
import { removeComments } from "./utils";

describe("handles yaml", () => {
  it("expect yaml import to be a json object", async () => {
    const testdirPath = await testdir.from(join(import.meta.dirname, "fixtures/basic/yaml"));

    expect(testdirPath).toBeDefined();

    const bundle = await rolldown({
      input: join(testdirPath, "basic.js"),
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
    const testdirPath = await testdir.from(join(import.meta.dirname, "fixtures/basic/yaml"));

    expect(testdirPath).toBeDefined();

    const bundle = await rolldown({
      input: join(testdirPath, "basic-raw.js"),
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
});

describe("handle yml", () => {
  it("expect yml import to be a json object", async () => {
    const testdirPath = await testdir.from(join(import.meta.dirname, "fixtures/basic/yml"));

    expect(testdirPath).toBeDefined();

    const bundle = await rolldown({
      input: join(testdirPath, "basic.js"),
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
    const testdirPath = await testdir.from(join(import.meta.dirname, "fixtures/basic/yml"));

    expect(testdirPath).toBeDefined();

    const bundle = await rolldown({
      input: join(testdirPath, "basic-raw.js"),
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
});

it("handle multi document", async () => {
  const testdirPath = await testdir.from(join(import.meta.dirname, "fixtures/multi"));

  expect(testdirPath).toBeDefined();

  const bundle = await rolldown({
    input: join(testdirPath, "multi.js"),
    plugins: [
      YAMLPlugin({
        type: "multi",
      }),
    ],
  });
  const { output } = await bundle.generate({
    format: "esm",
    sourcemap: false,
  });

  expect(removeComments(output[0].code)).toMatchSnapshot();
});

it("handle transforms", async () => {
  const testdirPath = await testdir.from(join(import.meta.dirname, "fixtures/transform"));

  expect(testdirPath).toBeDefined();

  const bundle = await rolldown({
    input: join(testdirPath, "transform.js"),
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
  const { output } = await bundle.generate({
    format: "esm",
    sourcemap: false,
  });

  expect(removeComments(output[0].code)).toMatchSnapshot();
});
