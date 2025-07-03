import type { FilterPattern } from "@rollup/pluginutils";
import type {
  DocumentOptions,
  ParseOptions,
  SchemaOptions,
  ToJSOptions,
} from "yaml";

export type YAMLValue
  = | number
    | string
    | boolean
    | null
    | { [key: string]: YAMLValue }
    | YAMLValue[];

export interface YamlOptions {
  /**
   * Options to pass to the YAML parser.
   * @see https://eemeli.org/yaml/#options
   *
   * NOTE:
   * Options inside `ToJSOptions` only works if `type` is set to "single".
   */
  parserOptions?: ParseOptions & DocumentOptions & SchemaOptions & ToJSOptions;

  /**
   * Include files that match any of these patterns.
   */
  include?: FilterPattern;

  /**
   * The type of YAML file to parse.
   * @default "single"
   */
  type?: "single" | "multi";

  /**
   * A function to transform the parsed YAML data.
   * @param {YAMLValue} data The parsed YAML data.
   * @param {string} filePath The path to the YAML file.
   * @returns {YAMLValue | undefined} The transformed data.
   */
  transform?: (data: YAMLValue, filePath: string) => YAMLValue | undefined;
}
