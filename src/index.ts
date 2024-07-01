import { dirname, join } from "node:path";
import { readFile } from "node:fs/promises";
import { type UnpluginFactory, createUnplugin } from "unplugin";
import YAML from "js-yaml";
import { createFilter } from "@rollup/pluginutils";
import type { YamlOptions } from "./types";
import { PLUGIN_NAME } from "./constants";

export type { YamlOptions };

const PREFIX = `\0virtual:yaml:`;

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
        return `${PREFIX}${encodeURIComponent(fullPath)}:raw`;
      }
    },
    async load(id) {
      if (id.startsWith(PREFIX)) {
        const [_, __, pathPart, ___] = id.split(":");
        if (!pathPart) {
          throw new Error("invalid path can't read yaml file");
        }

        const path = decodeURIComponent(pathPart);

        if (!path) {
          throw new Error("invalid path can't read yaml file");
        }

        // eslint-disable-next-line no-console
        console.log("PATH TO READ", path);
        const content = await readFile(path!, "utf-8");

        return {
          code: `export default ${JSON.stringify(content)}`,
          map: null,
        };
      }
    },
  };
};

export const unplugin = /* #__PURE__ */ createUnplugin(unpluginFactory);

export default unplugin;
