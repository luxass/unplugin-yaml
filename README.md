# unplugin-yaml

Allow import YAML file for Vite, Webpack, Rollup and esbuild. With TypeScript support. Powered by [unplugin](https://github.com/unjs/unplugin).

## Install

```bash
npm i -D unplugin-yaml
```

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

Example: [`playground/vite`](./playground/vite)

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

Example: [`playground/rollup`](./playground/rollup)

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

Example: [`playground/webpack`](./playground/webpack)

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

## Configuration

```ts
YAMLPlugin({
  include: [
    /\.yamlcustom$/, // .yamlcustom
  ],
  parserOptions: {
    // see js-yaml load options
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

</td>
</tr>
</table>

## 📄 License

Published under [MIT License](./LICENSE).
