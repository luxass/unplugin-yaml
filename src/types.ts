import type { FilterPattern } from "@rollup/pluginutils";
import type { LoadOptions } from "js-yaml";

export interface YamlOptions {
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
