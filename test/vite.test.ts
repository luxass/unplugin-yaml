import { join } from "node:path";
import { build } from "vite";
import { describe, expect, it } from "vitest";
import { testdir } from "vitest-testdirs";
import YAMLPlugin from "../src/vite";

describe("handles yaml", () => {
  it("expect yaml import to be a json object", async () => {
    const testdirPath = await testdir.from(join(import.meta.dirname, "fixtures/basic/yaml"));

    expect(testdirPath).toBeDefined();

    const result = await build({
      build: {
        lib: {
          entry: join(testdirPath, "basic.js"),
          formats: ["es"],
          fileName: "bundle",
          name: "bundle",
        },
        outDir: join(testdirPath, "dist"),
        minify: false,
      },
      plugins: [YAMLPlugin()],
    });

    if (!Array.isArray(result)) {
      expect.fail("result is not an array");
    }

    expect(result).toBeDefined();

    const firstResult = result[0];

    expect(firstResult).toBeDefined();
    expect(firstResult?.output).toBeDefined();
    expect(firstResult?.output[0]).toBeDefined();
    expect(firstResult?.output[0].code).toBeDefined();
    expect(firstResult?.output[0].code).toMatchSnapshot();
  });

  it("expect yaml import to be a string", async () => {
    const testdirPath = await testdir.from(join(import.meta.dirname, "fixtures/basic/yaml"));

    expect(testdirPath).toBeDefined();

    const result = await build({
      build: {
        lib: {
          entry: join(testdirPath, "basic-raw.js"),
          formats: ["es"],
          fileName: "bundle",
          name: "bundle",
        },
        outDir: join(testdirPath, "dist"),
        minify: false,
      },
      plugins: [YAMLPlugin()],
    });

    if (!Array.isArray(result)) {
      expect.fail("result is not an array");
    }

    expect(result).toBeDefined();

    const firstResult = result[0];

    expect(firstResult).toBeDefined();
    expect(firstResult?.output).toBeDefined();
    expect(firstResult?.output[0]).toBeDefined();
    expect(firstResult?.output[0].code).toBeDefined();
    expect(firstResult?.output[0].code).toMatchSnapshot();
  });
});

describe("handles yml", () => {
  it("expect yml import to be a json object", async () => {
    const testdirPath = await testdir.from(join(import.meta.dirname, "fixtures/basic/yml"));

    expect(testdirPath).toBeDefined();

    const result = await build({
      build: {
        lib: {
          entry: join(testdirPath, "basic.js"),
          formats: ["es"],
          fileName: "bundle",
          name: "bundle",
        },
        outDir: join(testdirPath, "dist"),
        minify: false,
      },
      plugins: [YAMLPlugin()],
    });

    if (!Array.isArray(result)) {
      expect.fail("result is not an array");
    }

    expect(result).toBeDefined();

    const firstResult = result[0];

    expect(firstResult).toBeDefined();
    expect(firstResult?.output).toBeDefined();
    expect(firstResult?.output[0]).toBeDefined();
    expect(firstResult?.output[0].code).toBeDefined();
    expect(firstResult?.output[0].code).toMatchSnapshot();
  });

  it("expect yml import to be a string", async () => {
    const testdirPath = await testdir.from(join(import.meta.dirname, "fixtures/basic/yml"));

    expect(testdirPath).toBeDefined();

    const result = await build({
      build: {
        lib: {
          entry: join(testdirPath, "basic-raw.js"),
          formats: ["es"],
          fileName: "bundle",
          name: "bundle",
        },
        outDir: join(testdirPath, "dist"),
        minify: false,
      },
      plugins: [YAMLPlugin()],
    });

    if (!Array.isArray(result)) {
      expect.fail("result is not an array");
    }

    expect(result).toBeDefined();

    const firstResult = result[0];

    expect(firstResult).toBeDefined();
    expect(firstResult?.output).toBeDefined();
    expect(firstResult?.output[0]).toBeDefined();
    expect(firstResult?.output[0].code).toBeDefined();
    expect(firstResult?.output[0].code).toMatchSnapshot();
  });
});

it("handle multi document", async () => {
  const testdirPath = await testdir.from(join(import.meta.dirname, "fixtures/multi"));

  expect(testdirPath).toBeDefined();

  const result = await build({
    build: {
      lib: {
        entry: join(testdirPath, "multi.js"),
        formats: ["es"],
        fileName: "bundle",
        name: "bundle",
      },
      outDir: join(testdirPath, "dist"),
      minify: false,
    },
    plugins: [YAMLPlugin({
      type: "multi",
    })],
  });

  if (!Array.isArray(result)) {
    expect.fail("result is not an array");
  }

  expect(result).toBeDefined();

  const firstResult = result[0];

  expect(firstResult).toBeDefined();
  expect(firstResult?.output).toBeDefined();
  expect(firstResult?.output[0]).toBeDefined();
  expect(firstResult?.output[0].code).toBeDefined();
  expect(firstResult?.output[0].code).toMatchSnapshot();
});

it("handle transforms", async () => {
  const testdirPath = await testdir.from(join(import.meta.dirname, "fixtures/transform"));

  expect(testdirPath).toBeDefined();

  const result = await build({
    build: {
      lib: {
        entry: join(testdirPath, "transform.js"),
        formats: ["es"],
        fileName: "bundle",
        name: "bundle",
      },
      outDir: join(testdirPath, "dist"),
      minify: false,
    },
    plugins: [YAMLPlugin({
      transform(data) {
        if (data != null && typeof data === "object" && "this" in data) {
          return {
            this: "transformed",
          };
        }
      },
    })],
  });

  if (!Array.isArray(result)) {
    expect.fail("result is not an array");
  }

  expect(result).toBeDefined();

  const firstResult = result[0];

  expect(firstResult).toBeDefined();
  expect(firstResult?.output).toBeDefined();
  expect(firstResult?.output[0]).toBeDefined();
  expect(firstResult?.output[0].code).toBeDefined();
  expect(firstResult?.output[0].code).toMatchSnapshot();
});
