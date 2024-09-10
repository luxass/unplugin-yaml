/**
 * This entry file is for main unplugin.
 * @module
 */

import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { createFilter } from "@rollup/pluginutils";
import YAML from "js-yaml";
import { createUnplugin, type UnpluginFactory, type UnpluginInstance } from "unplugin";
import { PLUGIN_NAME } from "./constants";
import type { YamlOptions } from "./types";

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
