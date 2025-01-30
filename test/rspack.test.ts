import type { Configuration, Stats } from "@rspack/core";
import { readFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { rspack as createRspack } from "@rspack/core";
import { describe, expect, it } from "vitest";

import YAMLPlugin from "../src/rspack";
import { removeComments } from "./utils";

const dir = path.join(tmpdir(), "unplugin-yaml-tests");
async function rspack(config: Configuration): Promise<Stats | undefined> {
  return new Promise((resolve, reject) => {
    const compiler = createRspack({
      optimization: {
        minimize: true,
      },
      output: {
        path: dir,
        filename: `${Date.now()}-bundle.js`,
      },
      mode: "production",
      ...config,
      experiments: {
        rspackFuture: {
          // disables the bundler info
          bundlerInfo: {
            force: false,
          },
        },
      },
    });

    compiler.run((err, stats) => {
      if (err) {
        reject(err);
      }

      resolve(stats);
    });
  });
}

describe("handles yaml", () => {
  it("expect yaml import to be a json object", async () => {
    const result = await rspack({
      entry: "./test/fixtures/basic/yaml/basic.js",
      plugins: [
        YAMLPlugin(),
      ],
    });

    const json = result?.toJson();
    expect(json).toBeDefined();

    const file = json!.assetsByChunkName!.main;
    const content = await readFile(path.join(dir, file![0]!), "utf-8");

    expect(removeComments(content)).toMatchSnapshot();
  });

  it("expect yaml import to be a string", async () => {
    const result = await rspack({
      entry: "./test/fixtures/basic/yaml/basic-raw.js",
      plugins: [
        YAMLPlugin(),
      ],
    });

    const json = result?.toJson();
    expect(json).toBeDefined();

    const file = json!.assetsByChunkName!.main;
    const content = await readFile(path.join(dir, file![0]!), "utf-8");

    expect(removeComments(content)).toMatchSnapshot();
  });
});

describe("handle yml", () => {
  it("expect yml import to be a json object", async () => {
    const result = await rspack({
      entry: "./test/fixtures/basic/yml/basic.js",
      plugins: [
        YAMLPlugin(),
      ],
    });

    const json = result?.toJson();
    expect(json).toBeDefined();

    const file = json!.assetsByChunkName!.main;
    const content = await readFile(path.join(dir, file![0]!), "utf-8");

    expect(removeComments(content)).toMatchSnapshot();
  });

  it("expect yml import to be a string", async () => {
    const result = await rspack({
      entry: "./test/fixtures/basic/yml/basic-raw.js",
      plugins: [
        YAMLPlugin(),
      ],
    });

    const json = result?.toJson();
    expect(json).toBeDefined();

    const file = json!.assetsByChunkName!.main;
    const content = await readFile(path.join(dir, file![0]!), "utf-8");

    expect(removeComments(content)).toMatchSnapshot();
  });
});

it("handle multi document", async () => {
  const result = await rspack({
    entry: "./test/fixtures/multi/multi.js",
    plugins: [
      YAMLPlugin({
        type: "multi",
      }),
    ],
  });

  const json = result?.toJson();
  expect(json).toBeDefined();

  const file = json!.assetsByChunkName!.main;
  const content = await readFile(path.join(dir, file![0]!), "utf-8");

  expect(removeComments(content)).toMatchSnapshot();
});

it("handle transforms", async () => {
  const result = await rspack({
    entry: "./test/fixtures/transform/transform.js",
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

  const json = result?.toJson();
  expect(json).toBeDefined();

  const file = json!.assetsByChunkName!.main;
  const content = await readFile(path.join(dir, file![0]!), "utf-8");

  expect(removeComments(content)).toMatchSnapshot();
});
