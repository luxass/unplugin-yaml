import { dirname, join } from "node:path";
import { readFile } from "node:fs/promises";
import type { LoadOptions } from "js-yaml";
import { createUnplugin } from "unplugin";
import YAML from "js-yaml";
import type { FilterPattern } from "@rollup/pluginutils";
import { createFilter } from "@rollup/pluginutils";

export interface Options {
  /**
   * Options to pass to the YAML parser.
   * @see https://github.com/nodeca/js-yaml
   */
  parserOptions?: LoadOptions;

  /**
   * Include files that match any of these patterns.
   */
  include?: FilterPattern;
}

const unplugin = createUnplugin<Options | undefined>((options = {}) => {
  const filter = createFilter(
    options.include || /\.ya?ml(\?raw)?$/,
  );

  return {
    name: "unplugin-yaml",
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
});

export default unplugin;
