import { createRequire } from "node:module";
import { join } from "node:path";

import { dedent } from "@luxass/utils";
import type { Configuration } from "@rspack/core";
import { rspack as createRspack } from "@rspack/core";
import { describe, expect, it } from "vitest";
import { testdir } from "vitest-testdirs";

import YAMLPlugin from "../src/rspack";

const require = createRequire(import.meta.url);
const { version: rspackVersion } = require("@rspack/core/package.json") as { version: string };
const rspackMajor = Number(rspackVersion.split(".")[0]);

async function rspack(config: Configuration, testdirPath: string): Promise<null> {
  return new Promise((resolve, reject) => {
    const compiler = createRspack({
      optimization: {
        minimize: true,
        usedExports: true,
      },
      output: {
        path: join(testdirPath, "dist"),
        filename: "bundle.js",
        library: {
          type: "module",
        },
        module: true,
        // bundlerInfo was promoted from experiments to output in v2.x.
        ...(rspackMajor >= 2 ? { bundlerInfo: { force: false } } : {}),
      },
      // In v1.x, bundlerInfo lived under experiments.rspackFuture.
      ...(rspackMajor < 2
        ? ({ experiments: { rspackFuture: { bundlerInfo: { force: false } } } } as object)
        : {}),
      stats: "none",
      infrastructureLogging: {
        level: "none",
      },
      mode: "production",
      ...config,
    });

    compiler.run((err, stats) => {
      if (err) {
        reject(err);
        return;
      }

      if (!stats) {
        reject(new Error("rspack stats not available"));
        return;
      }

      if (stats.hasErrors()) {
        reject(new Error(stats.toString("errors-only")));
        return;
      }

      resolve(null);
    });
  });
}

describe("rspack", () => {
  it("expect yaml imports to be json objects", async () => {
    const testdirPath = await testdir.from(join(import.meta.dirname, "fixtures/basic"));

    expect(testdirPath).toBeDefined();

    await rspack(
      {
        entry: join(testdirPath, "basic.js"),
        plugins: [YAMLPlugin()],
      },
      testdirPath,
    );

    const module = await import(join(testdirPath, "dist/bundle.js"));
    expect(Object.keys(module)).toEqual(["yaml", "yml"]);

    const matchedCfg = {
      pluginDir: "./plugins",
      web: { enabled: true },
      logging: { type: "stdout", level: "info" },
    };

    expect(module.yaml).toEqual(matchedCfg);
    expect(module.yml).toEqual(matchedCfg);
  });

  it("expect yaml imports to be strings", async () => {
    const testdirPath = await testdir.from(join(import.meta.dirname, "fixtures/basic"));

    expect(testdirPath).toBeDefined();

    await rspack(
      {
        entry: join(testdirPath, "basic-raw.js"),
        plugins: [YAMLPlugin()],
      },
      testdirPath,
    );

    const module = await import(join(testdirPath, "dist/bundle.js"));
    expect(Object.keys(module)).toEqual(["yaml", "yml"]);

    const expectedString = dedent`
      pluginDir: ./plugins

      web:
        enabled: true

      logging:
        type: stdout
        level: info
    `;

    expect(module.yml).toMatch(expectedString);
    expect(module.yaml).toMatch(expectedString);
  });

  it("handle transforms", async () => {
    const testdirPath = await testdir.from(join(import.meta.dirname, "fixtures/transform"));

    expect(testdirPath).toBeDefined();

    await rspack(
      {
        entry: join(testdirPath, "transform.js"),
        plugins: [
          YAMLPlugin({
            transform(data) {
              if (data != null && typeof data === "object" && "this" in data) {
                return {
                  this: "transformed",
                };
              }

              return data;
            },
          }),
        ],
      },
      testdirPath,
    );

    const module = await import(join(testdirPath, "dist/bundle.js"));
    expect(Object.keys(module)).toEqual(["config"]);

    expect(module.config).toEqual({
      this: "transformed",
    });
  });

  it("handle multi document", async () => {
    const testdirPath = await testdir.from(join(import.meta.dirname, "fixtures/multi"));

    expect(testdirPath).toBeDefined();

    await rspack(
      {
        entry: join(testdirPath, "multi.js"),
        plugins: [
          YAMLPlugin({
            type: "multi",
          }),
        ],
      },
      testdirPath,
    );

    const module = await import(join(testdirPath, "dist/bundle.js"));
    expect(Object.keys(module)).toEqual(["cronjobs"]);

    expect(module.cronjobs).toEqual([
      {
        apiVersion: "batch/v1",
        kind: "CronJob",
        metadata: {
          name: "first-cronjob",
          namespace: "default",
        },
        spec: {
          concurrencyPolicy: "Forbid",
          failedJobsHistoryLimit: 1,
          jobTemplate: {
            spec: {
              template: {
                spec: {
                  containers: [
                    {
                      command: ["/bin/sh", "-c", 'echo "First job running"; date'],
                      image: "busybox:latest",
                      name: "first-job",
                    },
                  ],
                  restartPolicy: "OnFailure",
                },
              },
            },
          },
          schedule: "*/10 * * * *",
          successfulJobsHistoryLimit: 3,
        },
      },
      {
        apiVersion: "batch/v1",
        kind: "CronJob",
        metadata: {
          name: "second-cronjob",
          namespace: "default",
        },
        spec: {
          concurrencyPolicy: "Forbid",
          failedJobsHistoryLimit: 1,
          jobTemplate: {
            spec: {
              template: {
                spec: {
                  containers: [
                    {
                      command: ["/bin/sh", "-c", 'echo "Second job running"; date'],
                      image: "busybox:latest",
                      name: "second-job",
                    },
                  ],
                  restartPolicy: "OnFailure",
                },
              },
            },
          },
          schedule: "0 0 * * *",
          successfulJobsHistoryLimit: 3,
        },
      },
    ]);
  });
});
