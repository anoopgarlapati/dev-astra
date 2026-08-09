# Dev Astra

Self-hosted developer toolkit. Tool logic lives in `@dev-astra/core`; the UI is a static React app under `apps/web`.

**Version:** 0.0.1 (scaffold). Starter tools ship in 0.1.0.

## Requirements

- [Bun](https://bun.sh/) 1.x

## Develop

```bash
bun install
bun run dev
```

Open the URL Vite prints (default `http://localhost:5173`).

## Test

```bash
bun run test
```

## Build static site

```bash
bun run build
```

Output: `apps/web/dist/`

## Self-host

```bash
bun install
bun run build
bunx serve apps/web/dist
```

Serve `apps/web/dist` with any static file server.

## Workspace layout

- `packages/core` — pure TypeScript tools + registry (no UI)
- `apps/web` — React + Vite static frontend
