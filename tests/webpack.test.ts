import path from "node:path";
import { tmpdir } from "node:os";
import { readFile } from "node:fs/promises";
import type { Configuration, Stats } from "webpack";
import { webpack as createWebpack } from "webpack";
import { expect, it } from "vitest";

// create output in tmp dir

import YAMLPlugin from "../src/webpack";

const dir = path.join(tmpdir(), "unplugin-yaml-tests");

async function webpack(config: Configuration): Promise<Stats | undefined> {
  return new Promise((resolve, reject) => {
    const compiler = createWebpack({
      optimization: {
        minimize: false,
      },
      output: {
        path: dir,
        filename: `${Date.now()}-bundle.js`,
      },
      mode: "production",
      ...config,
    });

    compiler.run((err, stats) => {
      if (err) {
        reject(err);
      }

      resolve(stats);
    });
  });
}

it("expect yaml import to be a json object", async () => {
  const result = await webpack({
    entry: "./tests/fixtures/yaml-config.yaml",
    plugins: [
      YAMLPlugin(),
    ],
    // module: {
    //   rules: [
    //     {
    //       test: /\.yaml$/,
    //       exclude: /node_modules/,
    //       use: {
    //         loader: path.resolve("./yaml-loader.cjs"),
    //       },
    //       type: "asset/source",
    //     },
    //   ],
    // },
  });

  const json = result?.toJson();
  expect(json).toBeDefined();

  const file = json!.assetsByChunkName!.main;
  const content = await readFile(path.join(dir, file![0]!), "utf-8");

  expect(content).toMatchSnapshot();
});

it("expect yaml import to be a string", async () => {
  const result = await webpack({
    entry: "./tests/fixtures/js-yaml-raw.js",
    plugins: [
      YAMLPlugin(),
    ],
  });

  const json = result?.toJson();
  expect(json).toBeDefined();

  const file = json!.assetsByChunkName!.main;
  const content = await readFile(path.join(dir, file![0]!), "utf-8");

  expect(content).toMatchSnapshot();
});

it("expect yml import to be a json object", async () => {
  const result = await webpack({
    entry: "./tests/fixtures/yml-config.yml",
    plugins: [
      YAMLPlugin(),
    ],
  });

  const json = result?.toJson();
  expect(json).toBeDefined();

  const file = json!.assetsByChunkName!.main;
  const content = await readFile(path.join(dir, file![0]!), "utf-8");

  expect(content).toMatchSnapshot();
});

it("expect yml import to be a string", async () => {
  const result = await webpack({
    entry: "./tests/fixtures/js-yml-raw.js",
    plugins: [
      YAMLPlugin(),
    ],
  });

  const json = result?.toJson();
  expect(json).toBeDefined();

  const file = json!.assetsByChunkName!.main;
  const content = await readFile(path.join(dir, file![0]!), "utf-8");

  expect(content).toMatchSnapshot();
});
