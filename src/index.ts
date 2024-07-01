import { dirname, join } from "node:path";
import { readFile } from "node:fs/promises";
import { type UnpluginFactory, createUnplugin } from "unplugin";
import YAML from "js-yaml";
import { createFilter } from "@rollup/pluginutils";
import type { YamlOptions } from "./types";
import { PLUGIN_NAME } from "./constants";

export type { YamlOptions };

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

        return `virtual:yaml:${fullPath}:raw`;
      }
    },
    async load(id) {
      if (id.startsWith("virtual:yaml:")) {
        const [_, __, path, ___] = id.split(":");

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
