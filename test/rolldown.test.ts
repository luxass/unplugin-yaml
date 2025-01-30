import { rolldown } from "rolldown";
import { describe, expect, it } from "vitest";
import YAMLPlugin from "../src/rolldown";
import { removeComments } from "./utils";

describe("handles yaml", () => {
  it("expect yaml import to be a json object", async () => {
    const bundle = await rolldown({
      input: "./test/fixtures/basic/yaml/basic.js",
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
      input: "./test/fixtures/basic/yaml/basic-raw.js",
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
    const bundle = await rolldown({
      input: "./test/fixtures/basic/yml/basic.js",
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
      input: "./test/fixtures/basic/yml/basic-raw.js",
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
  const bundle = await rolldown({
    input: "./test/fixtures/multi/multi.js",
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
  const bundle = await rolldown({
    input: "./test/fixtures/transform/transform.js",
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
