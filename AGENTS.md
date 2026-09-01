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
- Keep short tool docs (summary/examples) in `@dev-astra/core` metadata and render them in the web UI as collapsible in-tool docs; do not add a separate in-app docs section unless that decision changes.
- Prefer docs-site navigation and chrome for the web app: left tool sidebar (drawer on small screens) and a light Cursor-docs-like theme.

## Workspace Facts

- Dev Astra is a Bun workspaces monorepo: `@dev-astra/core` (`packages/core`) holds pure TypeScript tool logic and registry; `@dev-astra/web` (`apps/web`) is the React + Vite static frontend.
- Starter tools include Base64, JWT (decode only, no verification), JSON, YAML, and UUID (v4 generate/validate only).
- Web UI uses a docs-style left sidebar shell (`AppShell`); tool pages include copy controls and a floating right-side Tool Docs panel fed from core `docs` metadata.
- Static build output is `apps/web/dist/`; self-host with any static server that supports SPA fallback (e.g. `bunx serve -s apps/web/dist`).
- GitHub Actions CI verifies with `bun install`, `bun run test`, and `bun run build` on PRs and `main` (no deploy step).
- Repository license is Apache 2.0; `NOTICE` holds the dated copyright line.

## Learned User Preferences

- After a patch is merged, checkout `main`, pull, then open a new `feat/` branch for the next patch instead of continuing on the previous feat branch.
- Prefer subagent-driven execution for implementation plans, not inline execution in the same session.
- Prefer custom controls that match the app chrome over native form widgets (styled selectors instead of native `<select>`; dropdowns should feel like the Copy-page split button).
- When a patch is ready, commit and push the feat branch; do not merge to `main` or open a PR unless asked.

## Learned Workspace Facts

- The web shell has a slim top chrome bar (brand left, theme control right); the left sidebar is tools-only (drawer on small screens).
- Theme is System / Light / Dark: preference in `localStorage` (default system), applied as `data-theme` on `<html>` with a FOUC-prevention script; the trigger icon is monitor, sun, or moon to match the choice.
- Light mode keeps the cream docs palette; dark mode is off-black background, near-white text, accent `#f54e00`, and orange text only for selected nav (no fill).
- Structured tool input/output uses a shared `CodeField` (CodeMirror 6) and highlights only when the text is valid; Base64 and UUID stay plain; JWT tokens use three-segment coloring.
- Tool docs examples may set `inputLanguage` / `outputLanguage` (`json` | `yaml` | `jwt` | `plain`) so the docs panel can reuse the same highlighter.
- Patch version bumps go in the root, `@dev-astra/web`, and `@dev-astra/core` `package.json` files and in `README.md`.
- Design specs and plans under `docs/superpowers/` are gitignored and stay local.
