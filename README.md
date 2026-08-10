# Dev Astra

Self-hosted developer toolkit. Tool logic lives in `@dev-astra/core`; the UI is a static React app under `apps/web`.

**Version:** 0.2.2

## Tools

- **Base64** — encode or decode Base64 text
- **JWT** — decode header and payload (no verification)
- **JSON** — format or minify JSON
- **YAML** — convert between YAML and JSON
- **UUID** — generate or validate a UUID v4 only

Each tool page has a collapsed **Docs** panel with a short summary and examples.

Open a tool at `/tools/:id` (for example `/tools/base64`).

## Requirements

- [Bun](https://bun.sh/) 1.x

## Develop

```bash
git clone https://github.com/anoopgarlapati/dev-astra.git
cd dev-astra
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

## CI

GitHub Actions runs `bun run test` and `bun run build` on pull requests and pushes to `main`.

## Self-host

```bash
bun install
bun run build
bunx serve -s apps/web/dist
```

Use `-s` (single-page application mode) so direct URLs such as `/tools/jwt` serve `index.html` and client routing works. You can serve `apps/web/dist` with any static host that supports SPA fallback.

## Workspace layout

- `packages/core` — pure TypeScript tools + registry (no UI)
- `apps/web` — React + Vite static frontend
- `AGENTS.md` — short orientation for coding agents
