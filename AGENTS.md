# Dev Astra

Self-hosted developer toolkit. Tool logic lives in `@dev-astra/core`; the UI is a static React app under `apps/web`.

## Commands

```bash
bun install
bun run dev
bun run test
bun run build
```

## Preferences

- Keep tool logic separate from the React + Vite UI; ship a static browser app as the only interface for now so a future native (e.g. Tauri) shell stays possible.
- Use Apache 2.0 with copyright owner and year only in `NOTICE`; every source and test file gets a brief Apache header with copyright without the year (skip config files where a header does not make sense).

## Workspace Facts

- Dev Astra is a Bun workspaces monorepo: `@dev-astra/core` (`packages/core`) holds pure TypeScript tool logic and registry; `@dev-astra/web` (`apps/web`) is the React + Vite static frontend.
- Starter tools include Base64, JWT (decode only, no verification), JSON, YAML, and UUID.
- Static build output is `apps/web/dist/`; self-host with any static server that supports SPA fallback (e.g. `bunx serve -s apps/web/dist`).
- Repository license is Apache 2.0; `NOTICE` holds the dated copyright line.
