export type Example = {
  slug: string;
  title: string;
  blurb: string;
  api: string;
};

/** Single source of truth for the nav and the landing page. */
export const examples: Example[] = [
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
    slug: "skeletons",
    title: "Skeletons and transitions",
    blurb:
      "Show placeholders for rows the wave has not reached yet, then fade them in.",
    api: "renderSkeleton",
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
];
