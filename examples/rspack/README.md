# Rspack + YAML

Plain HTML/CSS example for `unplugin-yaml` with Rspack.

## Get started

```bash
pnpm install
pnpm --filter @unplugin-yaml/rspack dev
```

## Build

```bash
pnpm --filter @unplugin-yaml/rspack build
```

The page is mounted from `src/main.ts`, imports `config.yaml` and `config.yaml?raw`, and renders both without a UI framework.
