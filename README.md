# unplugin-yaml

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]

Allow import YAML file for Vite, Webpack, Rollup and esbuild. With TypeScript support. Powered by [unplugin](https://github.com/unjs/unplugin).

<p align="center">
<br />
<a href="https://stackblitz.com/github/luxass/unplugin-yaml/tree/main/examples/vite-vue?file=vite.config.ts"><img src="https://developer.stackblitz.com/img/open_in_stackblitz.svg" /></a>
</p>

## Install

```bash
npm i -D unplugin-yaml
```

## Usage

> [!TIP]
> You can view all examples [here](./examples).

<details>
<summary>Vite</summary><br/>

```ts
// vite.config.ts
import YAMLPlugin from "unplugin-yaml/vite";

export default defineConfig({
  plugins: [
    YAMLPlugin({ /* options */ }),
  ],
});
```

<br/></details>

<details>
<summary>Rollup</summary><br/>

```ts
// rollup.config.js
import YAMLPlugin from "unplugin-yaml/rollup";

export default {
  plugins: [
    YAMLPlugin({ /* options */ }),
  ],
};
```

<br/></details>

<details>
<summary>Webpack</summary><br/>

```ts
// webpack.config.js
module.exports = {
  /* ... */
  plugins: [
    require("unplugin-yaml/webpack").default({ /* options */ }),
  ],
};
```

<br/></details>

<details>
<summary>Nuxt</summary><br/>

```ts
// nuxt.config.js
export default defineNuxtConfig({
  modules: [
    ["unplugin-yaml/nuxt", { /* options */ }]
  ],
});
```

<br/></details>

<details>
<summary>Astro</summary><br/>

```ts
// astro.config.mjs
import { defineConfig } from "astro/config";
import YAMLPlugin from "unplugin-yaml/astro";

// https://astro.build/config
export default defineConfig({
  integrations: [
    YAMLPlugin({
      /* options */
    })
  ]
});
```

<br/></details>

<details>
<summary>esbuild</summary><br/>

```ts
// esbuild.config.js
import { build } from "esbuild";
import YAMLPlugin from "unplugin-yaml/esbuild";

build({
  /* ... */
  plugins: [
    YAMLPlugin({
      /* options */
    }),
  ],
});
```

<br/></details>

<details>
<summary>Farm</summary><br/>

```ts
// farm.config.ts
import { defineConfig } from "@farmfe/core";
import vue from "@vitejs/plugin-vue";
import YAMLPlugin from "unplugin-yaml/farm";

export default defineConfig({
  vitePlugins: [
    vue(),
  ],
  plugins: [
    YAMLPlugin({
      /* options */
    })
  ]
});
```

<br/></details>

<details>
<summary>Rspack</summary><br/>

```ts
// rspack.config.mjs
import rspack from "@rspack/core";
import YAMLPlugin from "unplugin-yaml/rspack";

/** @type {import('@rspack/core').Configuration} */
export default {
  plugins: [
    new rspack.HtmlRspackPlugin({
      template: "./index.html"
    }),
    YAMLPlugin()
  ],
};
```

<br/></details>

<details>
<summary>Rolldown (Experimental)</summary><br/>

```ts
// rolldown.config.js
import { defineConfig } from "rolldown";
import YAMLPlugin from "unplugin-yaml/rolldown";

export default defineConfig({
  input: "./index.js",
  plugins: [
    YAMLPlugin({
      /* options */
    }),
  ],
});
```

<br/></details>

## Configuration

```ts
YAMLPlugin({
  include: [
    /\.yamlcustom$/, // .yamlcustom
  ],
  parserOptions: {
    // see yaml load options
  }
});
```
### TypeScript

If you are using TypeScript, you need to add the following to your `tsconfig.json` file:

```json
{
  "compilerOptions": {
    "types": [
      "unplugin-yaml/types"
    ]
  }
}
```

## 📄 License

Published under [MIT License](./LICENSE).

[npm-version-src]: https://img.shields.io/npm/v/unplugin-yaml?style=flat&colorA=18181B&colorB=4169E1
[npm-version-href]: https://npmjs.com/package/unplugin-yaml
[npm-downloads-src]: https://img.shields.io/npm/dm/unplugin-yaml?style=flat&colorA=18181B&colorB=4169E1
[npm-downloads-href]: https://npmjs.com/package/unplugin-yaml
