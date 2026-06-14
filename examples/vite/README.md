# Vite + YAML

Plain HTML/CSS example for `unplugin-yaml` with Vite.

## Get started

```bash
pnpm install
pnpm --filter @unplugin-yaml/vite dev
```

## Build

```bash
pnpm --filter @unplugin-yaml/vite build
```

The page is mounted from `src/main.ts`, imports `config.yaml` and `config.yaml?raw`, and renders both without a UI framework.
