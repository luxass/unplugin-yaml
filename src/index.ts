/**
 * This entry file is for main unplugin.
 * @module
 */

import { dirname, join } from "node:path";
import { readFile } from "node:fs/promises";
import { type UnpluginFactory, type UnpluginInstance, createUnplugin } from "unplugin";
import YAML from "js-yaml";
import { createFilter } from "@rollup/pluginutils";
import type { YamlOptions } from "./types";
import { PLUGIN_NAME } from "./constants";

export type { YamlOptions };

const PREFIX = `\0virtual:yaml:`;

/**
 * A unplugin factory, used by Unplugin to create a new plugin instance.
 */
export const unpluginFactory: UnpluginFactory<YamlOptions | undefined> = (options = {}) => {
  const filter = createFilter(
    options.include || /\.ya?ml(\?raw)?$/,
  );

  return {
    name: PLUGIN_NAME,
    enforce: "pre",
    transformInclude(id) {
      return filter(id);
    },
    transform(code, id) {
      if (id.endsWith("?raw")) {
        return `${code}`;
      }
      return `export default ${JSON.stringify(YAML.load(code, options.parserOptions))};`;
    },
    resolveId(id, importer) {
      if (/\.ya?ml\?raw$/.test(id) && importer) {
        const [relativePath] = id.split("?raw");
        const fullPath = join(dirname(importer), relativePath!);
        return `${PREFIX}${fullPath}:raw`;
      }
    },
    async load(id) {
      if (!/\.ya?ml\?raw$/.test(id) && !id.startsWith(PREFIX)) {
        return;
      }

      // TODO: Remove this when Rspack supports resolveId
      if (/\.ya?ml\?raw$/.test(id) && !id.startsWith(PREFIX)) {
        id = `${PREFIX}${id.replace(/\?raw$/, "")}:raw`;
      }

      if (!id.startsWith(PREFIX)) {
        return;
      }

      id = id.slice(PREFIX.length);

      if (id.endsWith(":raw")) {
        id = id.slice(0, -4);
      }

      const path = id;

      if (!path) {
        throw new Error("invalid path can't read yaml file");
      }

      const content = (await readFile(path, "utf-8")).replace(/\r\n/g, "\n");

      return {
        code: `export default ${JSON.stringify(content)}`,
        map: null,
      };
    },
  };
};

/**
 * The main unplugin instance.
 */
export const unplugin: UnpluginInstance<YamlOptions | undefined, boolean> = /* #__PURE__ */ createUnplugin(unpluginFactory);

export default unplugin;
