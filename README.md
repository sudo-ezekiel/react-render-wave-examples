# React Render Wave docs

The documentation site for [react-render-wave](https://github.com/sudo-ezekiel/react-render-wave):
API reference, recipes, and runnable examples.

Live at **[renderwave.sudo-ezekiel.com](https://renderwave.sudo-ezekiel.com)**.

Every page here is a real page in this repository. Nothing is faked with a
screenshot, so if an example renders on the site it compiles and runs.

## Layout

| Path | What is in it |
|------|---------------|
| `app/examples/` | One prop or feature at a time, each with its source below the demo |
| `app/recipes/` | Task-oriented answers: sizing, batch size, keys, scroll restoration, pausing, SSR |
| `app/real-world/` | Whole screens: a chat transcript, a data table, a searchable directory |
| `app/api-reference/` | Every export and prop in one page |
| `lib/examples.ts` | The registry the nav and the landing page are both built from |
| `lib/data.ts` | Sample data, derived from the row index so SSR and hydration agree |

Adding a page means creating it under the right directory and adding one entry
to `lib/examples.ts`. The nav and the landing grid pick it up from there.

## Local development

```bash
npm install
npm run dev
```

The site resolves `react-render-wave` from npm. v3 is not published yet, so
install it from the repository while you work:

```bash
npm install github:sudo-ezekiel/react-render-wave
```

## Deploying

Static export served by an assets-only Cloudflare Worker.

```bash
npm run deploy
```

That builds to `out/` and runs `wrangler deploy`. The hostname and the DNS
record come from `wrangler.jsonc`.

## Checks

```bash
npm run lint
npm run typecheck
npm run build
```
