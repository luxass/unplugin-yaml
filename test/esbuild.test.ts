import { join } from "node:path";
import { dedent } from "@luxass/utils";
import { build } from "esbuild";
import { describe, expect, it } from "vitest";
import { testdir } from "vitest-testdirs";
import YAMLPlugin from "../src/esbuild";

describe("esbuild", () => {
  it("expect yaml imports to be json objects", async () => {
    const testdirPath = await testdir.from(join(import.meta.dirname, "fixtures/basic"));

    expect(testdirPath).toBeDefined();

    await build({
      entryPoints: [
        join(testdirPath, "basic.js"),
      ],
      format: "esm",
      outfile: join(testdirPath, "output.js"),
      bundle: true,
      minifySyntax: false,
      plugins: [
        YAMLPlugin(),
      ],
    });

    const module = await import(join(testdirPath, "output.js")).then((m) => m);
    expect(module).toBeDefined();

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

    await build({
      entryPoints: [
        join(testdirPath, "basic-raw.js"),
      ],
      format: "esm",
      outfile: join(testdirPath, "output-raw.js"),
      bundle: true,
      minifySyntax: false,
      plugins: [
        YAMLPlugin(),
      ],
    });

    const module = await import(join(testdirPath, "output-raw.js")).then((m) => m);
    expect(module).toBeDefined();

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

    await build({
      entryPoints: [
        join(testdirPath, "transform.js"),
      ],
      format: "esm",
      outfile: join(testdirPath, "output-transform.js"),
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

    const config = await import(join(testdirPath, "output-transform.js")).then((m) => m.config);
    expect(config).toBeDefined();

    expect(config).toEqual({
      this: "transformed",
    });
  });

  it("handle multi document", async () => {
    const testdirPath = await testdir.from(join(import.meta.dirname, "fixtures/multi"));

    expect(testdirPath).toBeDefined();

    await build({
      entryPoints: [
        join(testdirPath, "multi.js"),
      ],
      format: "esm",
      outfile: join(testdirPath, "output-multi.js"),
      bundle: true,
      minifySyntax: false,
      plugins: [
        YAMLPlugin({
          type: "multi",
        }),
      ],
    });

    const cronjobs = await import(join(testdirPath, "output-multi.js")).then((m) => m.cronjobs);
    expect(cronjobs).toBeDefined();

    expect(cronjobs).toEqual([
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
                      command: [
                        "/bin/sh",
                        "-c",
                        "echo \"First job running\"; date",
                      ],
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
                      command: [
                        "/bin/sh",
                        "-c",
                        "echo \"Second job running\"; date",
                      ],
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
