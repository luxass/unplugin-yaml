import type { Configuration, Stats } from "@rspack/core";
import { readFile } from "node:fs/promises";
import path, { join } from "node:path";
import { rspack as createRspack } from "@rspack/core";
import { describe, expect, it } from "vitest";
import { testdir } from "vitest-testdirs";
import YAMLPlugin from "../src/rspack";
import { removeComments } from "./utils";

interface RspackResult {
  stats: Stats;
  json: ReturnType<Stats["toJson"]>;
  file: string;
}

async function rspack(config: Configuration, testdirPath: string): Promise<RspackResult> {
  return new Promise((resolve, reject) => {
    const compiler = createRspack({
      optimization: {
        minimize: true,
      },
      output: {
        path: join(testdirPath, "dist"),
        filename: "bundle.js",
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

      if (!stats) {
        reject(new Error("rspack stats not available"));
        return;
      }

      const json = stats.toJson();
      const files = json.assetsByChunkName?.main;
      if (!files || !Array.isArray(files) || files[0] == null) {
        reject(new Error("main chunk not found"));
        return;
      }

      const file = files[0];

      resolve({ stats, json, file });
    });
  });
}

describe("handles yaml", () => {
  it("expect yaml import to be a json object", async () => {
    const testdirPath = await testdir.from(join(import.meta.dirname, "fixtures/basic/yaml"));

    expect(testdirPath).toBeDefined();

    const { file } = await rspack({
      entry: join(testdirPath, "basic.js"),
      plugins: [
        YAMLPlugin(),
      ],
    }, testdirPath);

    const content = await readFile(path.join(testdirPath, "dist", file), "utf-8");

    expect(removeComments(content)).toMatchSnapshot();
  });

  it("expect yaml import to be a string", async () => {
    const testdirPath = await testdir.from(join(import.meta.dirname, "fixtures/basic/yaml"));

    expect(testdirPath).toBeDefined();

    const { file } = await rspack({
      entry: join(testdirPath, "basic-raw.js"),
      plugins: [
        YAMLPlugin(),
      ],
    }, testdirPath);

    const content = await readFile(path.join(testdirPath, "dist", file), "utf-8");

    expect(removeComments(content)).toMatchSnapshot();
  });
});

describe("handle yml", () => {
  it("expect yml import to be a json object", async () => {
    const testdirPath = await testdir.from(join(import.meta.dirname, "fixtures/basic/yml"));

    expect(testdirPath).toBeDefined();

    const { file } = await rspack({
      entry: join(testdirPath, "basic.js"),
      plugins: [
        YAMLPlugin(),
      ],
    }, testdirPath);

    const content = await readFile(path.join(testdirPath, "dist", file), "utf-8");

    expect(removeComments(content)).toMatchSnapshot();
  });

  it("expect yml import to be a string", async () => {
    const testdirPath = await testdir.from(join(import.meta.dirname, "fixtures/basic/yml"));

    expect(testdirPath).toBeDefined();

    const { file } = await rspack({
      entry: join(testdirPath, "basic-raw.js"),
      plugins: [
        YAMLPlugin(),
      ],
    }, testdirPath);

    const content = await readFile(path.join(testdirPath, "dist", file), "utf-8");

    expect(removeComments(content)).toMatchSnapshot();
  });
});

it("handle multi document", async () => {
  const testdirPath = await testdir.from(join(import.meta.dirname, "fixtures/multi"));

  expect(testdirPath).toBeDefined();

  const { file } = await rspack({
    entry: join(testdirPath, "multi.js"),
    plugins: [
      YAMLPlugin({
        type: "multi",
      }),
    ],
  }, testdirPath);

  const content = await readFile(path.join(testdirPath, "dist", file), "utf-8");

  expect(removeComments(content)).toMatchSnapshot();
});

it("handle transforms", async () => {
  const testdirPath = await testdir.from(join(import.meta.dirname, "fixtures/transform"));

  expect(testdirPath).toBeDefined();

  const { file } = await rspack({
    entry: join(testdirPath, "transform.js"),
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
  }, testdirPath);

  const content = await readFile(path.join(testdirPath, "dist", file), "utf-8");

  expect(removeComments(content)).toMatchSnapshot();
});
