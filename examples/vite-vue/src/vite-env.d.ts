/// <reference types="vite/client" />
/// <reference types="unplugin-yaml/types" />

declare module "*.vue" {
  import type { DefineComponent } from "vue";

  const component: DefineComponent;
  export default component;
}
