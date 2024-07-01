import type { YamlOptions } from "./types";
import { PLUGIN_NAME } from "./constants";
import unplugin from ".";

export default function (options: YamlOptions) {
  return {
    name: PLUGIN_NAME,
    hooks: {
      "astro:config:setup": async (astro: any) => {
        astro.config.vite.plugins ||= [];
        astro.config.vite.plugins.push(unplugin.vite(options));
      },
    },
  };
}
