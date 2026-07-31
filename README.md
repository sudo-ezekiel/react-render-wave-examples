# React Render Wave examples

Runnable examples for [react-render-wave](https://github.com/sudo-ezekiel/react-render-wave) v3, built with Next.js and Tailwind. Every example on the site is a real page in `app/examples`, so you can copy one into your own project and run it.

## Examples

| Page                        | Shows                                                                     |
| --------------------------- | ------------------------------------------------------------------------- |
| `/examples/basic`           | 10,000 rows windowed down to a handful of DOM nodes                       |
| `/examples/dynamic-heights` | Rows of varying height, measured automatically                            |
| `/examples/sticky-headers`  | `groupByKey` plus a pinned header for the current group                   |
| `/examples/infinite-scroll` | `onEndReached` appending pages without duplicate fetches                  |
| `/examples/keyboard`        | Keyboard navigation and the imperative handle                            |
| `/examples/skeletons`       | `renderSkeleton` and `transition` while the wave fills in                |
| `/examples/render-wave`     | `RenderWave`, progressive rendering without virtualization               |
| `/examples/use-render-wave` | The `useRenderWave` hook driving custom markup                           |

## Running locally

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

> **Note:** this app depends on `react-render-wave@^3.0.0`. If v3 is not on npm yet, point the dependency at a local checkout with `npm install ../react-render-wave` before running `npm install`.

Other scripts:

```bash
npm run build
npm run typecheck
npm run lint
```

## Notes on the code

**Sample data is derived from the row index**, never from `Math.random` or `Date`. These pages prerender on the server and render again on the client, so anything non-deterministic would surface as a hydration mismatch. See `lib/data.ts`.

**Most examples pass `batchSize={items.length}`.** The reveal wave counts from index 0 regardless of scroll position, so on a long list a small batch size leaves rows blank if you scroll past the wave. Windowing already caps how many rows mount at once, so on a virtualized list the wave mainly matters for the initial fill. The skeletons example keeps a slow wave on purpose, on a deliberately short list, and always supplies `renderSkeleton`.

**The `overrides` block in `package.json`** bumps `postcss`, `sharp`, and `brace-expansion` past versions that Next.js and eslint still pin. Each is a patch or minor bump inside the same major, and together they take `npm audit` to zero.

## License

MIT
