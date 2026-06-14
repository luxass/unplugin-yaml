import { join } from "node:path";

import { dedent } from "@luxass/utils";
import { rollup } from "rollup";
import { describe, expect, it } from "vitest";
import { testdir } from "vitest-testdirs";

import YAMLPlugin from "../src/rollup";

describe("rollup", () => {
  it("expect yaml imports to be json objects", async () => {
    const testdirPath = await testdir.from(join(import.meta.dirname, "fixtures/basic"));

    expect(testdirPath).toBeDefined();

    const bundle = await rollup({
      input: join(testdirPath, "basic.js"),
      plugins: [YAMLPlugin()],
    });

    await bundle.write({
      dir: join(testdirPath, "dist"),
      format: "esm",
      sourcemap: false,
    });

    const module = await import(join(testdirPath, "dist/basic.js"));
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

    const bundle = await rollup({
      input: join(testdirPath, "basic-raw.js"),
      plugins: [YAMLPlugin()],
    });

    await bundle.write({
      dir: join(testdirPath, "dist"),
      format: "esm",
      sourcemap: false,
    });

    const module = await import(join(testdirPath, "dist/basic-raw.js"));
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

    const bundle = await rollup({
      input: join(testdirPath, "transform.js"),
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
    });

    await bundle.write({
      dir: join(testdirPath, "dist"),
      format: "esm",
      sourcemap: false,
    });

    const module = await import(join(testdirPath, "dist/transform.js"));
    expect(Object.keys(module)).toEqual(["config"]);

    expect(module.config).toEqual({
      this: "transformed",
    });
  });

  it("handle multi document", async () => {
    const testdirPath = await testdir.from(join(import.meta.dirname, "fixtures/multi"));

    expect(testdirPath).toBeDefined();

    const bundle = await rollup({
      input: join(testdirPath, "multi.js"),
      plugins: [
        YAMLPlugin({
          type: "multi",
        }),
      ],
    });

    await bundle.write({
      dir: join(testdirPath, "dist"),
      format: "esm",
      sourcemap: false,
    });

    const module = await import(join(testdirPath, "dist/multi.js"));
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
