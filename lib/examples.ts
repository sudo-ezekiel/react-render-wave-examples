export type Entry = {
  slug: string;
  title: string;
  blurb: string;
  /** The API the page is really about, shown as the card eyebrow. */
  api: string;
};

/** Single source of truth for the nav and the landing page. */
export const examples: Entry[] = [
  {
    slug: "basic",
    title: "Basic virtual list",
    blurb:
      "10,000 rows, a handful of DOM nodes. The starting point for every other example.",
    api: "VirtualRenderWave",
  },
  {
    slug: "dynamic-heights",
    title: "Dynamic heights",
    blurb:
      "Rows of different sizes, measured automatically. itemHeight is only the estimate.",
    api: "VirtualRenderWave",
  },
  {
    slug: "sticky-headers",
    title: "Sticky group headers",
    blurb:
      "Group rows by a key and pin the current group to the top while scrolling.",
    api: "groupByKey",
  },
  {
    slug: "infinite-scroll",
    title: "Infinite scroll",
    blurb:
      "Append the next page when the user reaches the end, without duplicate fetches.",
    api: "onEndReached",
  },
  {
    slug: "keyboard",
    title: "Keyboard and imperative scroll",
    blurb:
      "Arrow keys, page keys, Home and End, plus scrolling to any index in code.",
    api: "VirtualRenderWaveHandle",
  },
  {
    slug: "scroll-control",
    title: "Scroll control",
    blurb:
      "Align a row to the top, the middle or the bottom, open the list on a given row, and follow the range as it moves.",
    api: "scrollTo",
  },
  {
    slug: "skeletons",
    title: "Skeletons and transitions",
    blurb:
      "Show placeholders for rows the wave has not reached yet, then fade them in.",
    api: "renderSkeleton",
  },
  {
    slug: "reveal-mode",
    title: "Reveal modes",
    blurb:
      "Sequential counts from the start of the list. Viewport reveals what is on screen, so a small batchSize keeps up.",
    api: "revealMode",
  },
  {
    slug: "render-wave",
    title: "Progressive rendering",
    blurb:
      "No virtualization. Mount a heavy grid in timed batches so the first paint stays instant.",
    api: "RenderWave",
  },
  {
    slug: "use-render-wave",
    title: "The hook directly",
    blurb:
      "Drive your own markup with count, isComplete, reset, and a pause switch.",
    api: "useRenderWave",
  },
  {
    slug: "use-virtual-window",
    title: "Headless windowing",
    blurb:
      "The windowing engine with the component peeled away. Offsets and refs, and the markup is yours.",
    api: "useVirtualWindow",
  },
];

/** Short answers to the questions that come up once you are past the basics. */
export const recipes: Entry[] = [
  {
    slug: "sizing",
    title: "Sizing the container",
    blurb:
      "Fill a flex parent or a dvh layout instead of hard-coding a pixel height.",
    api: "style",
  },
  {
    slug: "batch-size",
    title: "Choosing batchSize",
    blurb:
      "Why a slow wave and a virtualized list work against each other, and what to set instead.",
    api: "batchSize",
  },
  {
    slug: "stable-keys",
    title: "Keys that survive sorting",
    blurb:
      "Filtering or reordering with index keys recycles the wrong DOM. getItemKey fixes it.",
    api: "getItemKey",
  },
  {
    slug: "scroll-restoration",
    title: "Restoring scroll position",
    blurb:
      "Save the offset on the way out and put the reader back where they were, on the first paint rather than after it.",
    api: "initialScrollOffset",
  },
  {
    slug: "pause-offscreen",
    title: "Pausing off screen",
    blurb:
      "Stop the reveal for a list nobody is looking at, then resume when it scrolls into view.",
    api: "enabled",
  },
  {
    slug: "ssr",
    title: "Server rendering",
    blurb:
      "What renders on the server, what waits for the client, and how to avoid a mismatch.",
    api: "SSR",
  },
];

/** Full screens rather than one prop in isolation. */
export const realWorld: Entry[] = [
  {
    slug: "chat",
    title: "Chat transcript",
    blurb:
      "Variable-height messages pinned to the newest, loading older ones as you scroll up.",
    api: "Dynamic heights",
  },
  {
    slug: "table",
    title: "Data table",
    blurb:
      "A virtualized table body under a real sticky header row, with columns that stay aligned.",
    api: "outerElement",
  },
  {
    slug: "search",
    title: "Searchable directory",
    blurb:
      "Filter 50,000 people as you type, with keys that stay stable across every result set.",
    api: "getItemKey",
  },
];

export const sections: {
  title: string;
  base: string;
  entries: Entry[];
}[] = [
  { title: "Examples", base: "/examples", entries: examples },
  { title: "Recipes", base: "/recipes", entries: recipes },
  { title: "Real world", base: "/real-world", entries: realWorld },
];
