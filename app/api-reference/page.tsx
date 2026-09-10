import { CodeBlock } from "@/components/CodeBlock";
import { Code, H2, Note, P, RecipeShell } from "@/components/ExampleShell";

export const metadata = { title: "API reference" };

type Row = [prop: string, type: string, def: string, description: string];

function PropTable({ rows }: { rows: Row[] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-neutral-200 dark:border-neutral-800">
      <table className="w-full min-w-[38rem] border-collapse text-left text-sm">
        <thead className="bg-neutral-50 text-xs uppercase tracking-wide text-neutral-500 dark:bg-neutral-800/60 dark:text-neutral-400">
          <tr>
            <th className="px-3 py-2 font-semibold">Prop</th>
            <th className="px-3 py-2 font-semibold">Type</th>
            <th className="px-3 py-2 font-semibold">Default</th>
            <th className="px-3 py-2 font-semibold">Description</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([prop, type, def, description]) => (
            <tr
              key={prop}
              className="border-t border-neutral-100 align-top dark:border-neutral-800"
            >
              <td className="whitespace-nowrap px-3 py-2 font-mono text-xs text-cyan-700 dark:text-cyan-400">
                {prop}
              </td>
              <td className="px-3 py-2 font-mono text-xs text-neutral-500 dark:text-neutral-400">
                {type}
              </td>
              <td className="whitespace-nowrap px-3 py-2 font-mono text-xs text-neutral-500 dark:text-neutral-400">
                {def}
              </td>
              <td className="px-3 py-2 text-neutral-600 dark:text-neutral-400">
                {description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const hookOptions: Row[] = [
  ["length", "number", "required", "Total number of items available."],
  ["batchSize", "number", "20", "Items revealed per wave."],
  ["interval", "number", "50", "Milliseconds between waves."],
  ["startIndex", "number", "0", "First index to reveal. Earlier items are never revealed."],
  ["enabled", "boolean", "true", "Set false to pause. Revealed items stay; resuming continues rather than restarting."],
  ["onComplete", "() => void", "", "Fires once when the reveal reaches the end."],
];

const hookResult: Row[] = [
  ["count", "number", "", "Items revealed so far, counting from startIndex."],
  ["indexes", "number[]", "", "The revealed indexes. Never points past the end of the list."],
  ["isComplete", "boolean", "", "True once everything from startIndex on is revealed."],
  ["reset", "() => void", "", "Restart from the first batch."],
];

const virtualWindowOptions: Row[] = [
  ["count", "number", "required", "Number of items in the list."],
  ["estimateSize", "number", "required", "Size in pixels used for an item until it is measured. A value that is not positive and finite falls back to 1."],
  ["overscan", "number", "5", "Extra items rendered above and below the viewport. Clamped to a non-negative whole number."],
  ["getItemKey", "(index) => ItemKey", "index", "Stable identity per index. Sizes are stored by key, so a measured item keeps its height across a reorder. Memoize it."],
  ["getScrollElement", "() => HTMLElement | null", "", "Supply the scroll container from a ref you already own, instead of using scrollRef."],
  ["initialScrollOffset", "number", "0", "Scroll offset for the first render. Read once."],
  ["initialScrollIndex", "number", "", "Index to open at. Wins over initialScrollOffset. Read once."],
  ["initialViewportSize", "number", "400", "Viewport size used until the container is measured. Read once."],
  ["scrollMargin", "number", "0", "Pixels between the container's content origin and item 0, for a header or toolbar above the sizer."],
  ["measureSize", "(el) => number", "el.offsetHeight", "How an item element is measured. Use getBoundingClientRect().height for fractional row heights."],
  ["onScroll", "(offset) => void", "", "Current scroll offset, at most once per animation frame. Programmatic scrolls and measurement corrections report through it too."],
  ["onRangeChange", "(range: VirtualRange) => void", "", "Fires whenever any of the four range bounds changes."],
];

const virtualWindowResult: Row[] = [
  ["scrollRef", "(el) => void", "", "Ref callback for the scroll container."],
  ["measureRef", "(index) => (el) => void", "", "Ref callback for the item element at an index. Stable per index."],
  ["virtualItems", "VirtualItem[]", "", "The items to render, from start up to end. Each is { index, key, offset, size }."],
  ["start", "number", "", "First rendered index."],
  ["end", "number", "", "One past the last rendered index."],
  ["visibleStart", "number", "", "First index intersecting the viewport."],
  ["visibleEnd", "number", "", "One past the last index intersecting the viewport."],
  ["totalSize", "number", "", "Size of all items together, for the sizer element."],
  ["scrollOffset", "number", "", "Current scroll offset of the container."],
  ["viewportSize", "number", "", "Current size of the viewport."],
  ["offsetOf", "(index) => number", "", "Pixel offset of the top of an item."],
  ["sizeOf", "(index) => number", "", "Measured size of an item, or the estimate."],
  ["indexAt", "(offset) => number", "", "Index of the item whose span contains a pixel offset."],
  ["scrollToIndex", "(index, options?: ScrollToIndexOptions) => void", "", "Align an item in the viewport. Out of range indexes clamp; NaN is ignored."],
  ["scrollToOffset", "(offset, options?: ScrollToOffsetOptions) => void", "", "Scroll to a pixel offset. NaN is ignored."],
  ["getScrollElement", "() => HTMLElement | null", "", "The scroll container, or null before it is attached."],
];

const renderWaveProps: Row[] = [
  ["items", "T[]", "required", "The full list."],
  ["renderItem", "(item, index) => ReactNode", "required", "Render one item. Set a key on the returned element."],
  ["batchSize", "number", "20", "Items revealed per wave."],
  ["interval", "number", "50", "Milliseconds between waves."],
  ["startIndex", "number", "0", "First index to reveal."],
  ["enabled", "boolean", "true", "Set false to pause the reveal."],
  ["onComplete", "() => void", "", "Fires once when the whole list is revealed."],
];

const virtualProps: Row[] = [
  ["items", "T[]", "required", "The full list."],
  ["itemHeight", "number", "required", "Row height in pixels. With dynamic content this is the estimate used before measuring."],
  ["renderItem", "(item, index) => ReactNode", "required", "Render one row."],
  ["containerHeight", "number", "400", "Container height in pixels. Pass a height through style instead to size from the parent."],
  ["batchSize", "number", "20", "Items revealed per wave. In sequential mode set it to items.length on a long list; in viewport mode it can stay small."],
  ["interval", "number", "50", "Milliseconds between waves."],
  ["overscan", "number", "5", "Extra rows rendered above and below the viewport."],
  ["startIndex", "number", "0", "First index to reveal."],
  ["revealMode", '"sequential" | "viewport"', '"sequential"', "sequential counts forward from startIndex regardless of scroll position. viewport reveals the rows inside the rendered window in batches and never re-hides a revealed row."],
  ["renderSkeleton", "(index) => ReactNode", "", "Placeholder for rows the wave has not reached."],
  ["getItemKey", "(item, index) => ItemKey", "index", "Stable row key. Point it at your id for any list that sorts or filters. Measured heights are stored by key, so a row keeps its height across a reorder."],
  ["scrollToIndex", "number", "", "Scrolls whenever the value changes."],
  ["initialScrollOffset", "number", "0", "Pixel offset for the first render, read once. The first paint and the server markup already show that window."],
  ["initialScrollIndex", "number", "", "Index to open at, read once. Wins over initialScrollOffset and over scrollToIndex at mount, and is corrected once the rows above it are measured."],
  ["transition", "boolean", "false", "Fade newly revealed rows in."],
  ["snapToBatch", "boolean", "false", "Align scroll to the nearest batch once scrolling stops. Assumes fixed heights."],
  ["onEndReached", "() => void", "", "Fires once per arrival at the end."],
  ["endReachedThreshold", "number", "10", "Distance in pixels from the bottom that counts as the end."],
  ["onScroll", "(scrollTop) => void", "", "Scroll position, at most once per animation frame."],
  ["onRangeChange", "(range: VirtualRange) => void", "", "Fires after commit whenever the rendered or the visible range changes. end and visibleEnd are exclusive."],
  ["keyboardNavigation", "boolean", "false", "Focusable container with arrow, page, Home and End scrolling."],
  ["groupByKey", "keyof T | (item, index) => string", "", "Group label per row, for sticky headers."],
  ["renderStickyHeader", "(group) => ReactNode", "", "Sticky header for the topmost visible group. Give it your own background."],
  ["outerElement", "HTMLTag | WrapperComponent", '"div"', "Custom scroll container. Spread the whole props object onto your node. On React 18 wrap the component in forwardRef and attach the ref."],
  ["innerElement", "HTMLTag | WrapperComponent", '"div"', "Custom content sizer. Same ref rules as outerElement."],
  ["className / style", "string / CSSProperties", "", "Applied to the scroll container."],
  ["ariaLabel", "string", "", "Accessible label for the scroll container."],
];

export default function ApiReference() {
  return (
    <RecipeShell
      title="API reference"
      description={
        <>
          Four exports: a windowing hook, a reveal hook, a component around the
          reveal, and a windowed list built on both. All the types below ship
          with the package.
        </>
      }
    >
      <H2>useRenderWave</H2>
      <P>
        The reveal on its own, with no opinion about markup. Everything else in
        the package is built on it.
      </P>
      <CodeBlock code={`const { count, indexes, isComplete, reset } = useRenderWave({
  length: rows.length,
  batchSize: 16,
  interval: 30,
});`} />
      <P>Options:</P>
      <PropTable rows={hookOptions} />
      <P>Result:</P>
      <PropTable rows={hookResult} />
      <Note>
        The hook clamps when <Code>items</Code> shrinks and resumes when it
        grows, and never yields an index past the end, so{" "}
        <Code>items[i]</Code> is always defined.
      </Note>

      <H2>useVirtualWindow</H2>
      <P>
        The lowest level piece: which items to render, where to put them, and
        how to scroll to one. It renders nothing and owns no styles. Put{" "}
        <Code>scrollRef</Code> on a container with a constrained height and{" "}
        <Code>overflow: auto</Code>, give the element inside it a height of{" "}
        <Code>totalSize</Code>, and position each entry at its{" "}
        <Code>offset</Code>. <Code>measureRef(index)</Code> on the row keeps the
        offsets honest once rows turn out taller or shorter than the estimate.
      </P>
      <CodeBlock code={`const { scrollRef, measureRef, virtualItems, totalSize } =
  useVirtualWindow({ count: rows.length, estimateSize: 48, overscan: 8 });

<div ref={scrollRef} style={{ height: 400, overflow: "auto" }}>
  <div style={{ height: totalSize, position: "relative" }}>
    {virtualItems.map(({ index, key, offset }) => (
      <div
        key={key}
        ref={measureRef(index)}
        style={{ position: "absolute", top: 0, left: 0, right: 0, transform: \`translateY(\${offset}px)\` }}
      >
        <Row item={rows[index]} />
      </div>
    ))}
  </div>
</div>`} />
      <P>Options:</P>
      <PropTable rows={virtualWindowOptions} />
      <P>Result:</P>
      <PropTable rows={virtualWindowResult} />
      <Note>
        Both ranges are half open: <Code>end</Code> and <Code>visibleEnd</Code>{" "}
        are one past the last index, so <Code>start</Code> to <Code>end</Code>{" "}
        is what <Code>virtualItems</Code> covers.
      </Note>
      <Note tone="warn">
        Memoize <Code>getItemKey</Code> on the data. A new function identity is
        read as a reorder and forces an O(count) rebuild of the offsets every
        render.
      </Note>

      <H2>RenderWave</H2>
      <P>
        Progressive mounting with no windowing. Use it when the cost is the
        components themselves rather than the row count.
      </P>
      <PropTable rows={renderWaveProps} />

      <H2>VirtualRenderWave</H2>
      <P>
        Windowing on top of the wave. Only rows in view plus{" "}
        <Code>overscan</Code> are mounted. Offsets come from a prefix-sum cache
        with binary search, so the scroll math holds up past 100,000 rows.
      </P>
      <PropTable rows={virtualProps} />
      <Note tone="warn">
        <Code>enabled</Code> and <Code>onComplete</Code> are not on this
        component. A windowed list mounts almost nothing when it is off screen,
        so pausing it has little to do. Drive the hook yourself if you need it.
      </Note>
      <Note tone="warn">
        On React 19 the ref arrives as a prop, so a plain function component
        works as <Code>outerElement</Code> or <Code>innerElement</Code>. On
        React 18 the component must be wrapped in <Code>forwardRef</Code> and
        attach the forwarded ref to its DOM node. A wrapper that drops the ref
        leaves the list unable to scroll or measure, and the only sign is a{" "}
        <Code>console.error</Code> in development naming the wrapper.{" "}
        <Code>WrapperProps.ref</Code> is optional and typed{" "}
        <Code>RefObject&lt;any&gt;</Code>, so read it as{" "}
        <Code>props.ref?.current</Code>.
      </Note>

      <H2>VirtualRenderWaveHandle</H2>
      <CodeBlock code={`const ref = useRef<VirtualRenderWaveHandle>(null);

<VirtualRenderWave ref={ref} ... />

ref.current?.scrollTo(500);              // row 500 to the top, smooth
ref.current?.scrollTo(500, "auto");      // instant
ref.current?.scrollToOffset(1200);       // by pixels
ref.current?.getVisibleIndexes();        // rendered and revealed indexes
ref.current?.getScrollElement();         // the scrollable element, or null

// Or pass { align, behavior }. align defaults to "start".
ref.current?.scrollTo(500, { align: "center" });
ref.current?.scrollTo(500, { align: "end", behavior: "auto" });
ref.current?.scrollTo(500, { align: "auto" }); // only scrolls if row 500 is not fully visible`} />
      <P>
        The second argument is either a <Code>ScrollBehavior</Code> string, the
        3.0 signature, or a <Code>ScrollToIndexOptions</Code> object.{" "}
        <Code>align</Code> is <Code>&quot;start&quot;</Code>,{" "}
        <Code>&quot;center&quot;</Code>, <Code>&quot;end&quot;</Code> or{" "}
        <Code>&quot;auto&quot;</Code>. On the handle{" "}
        <Code>behavior</Code> still defaults to <Code>&quot;smooth&quot;</Code>.
      </P>

      <H2>Exported types</H2>
      <CodeBlock code={`import type {
  UseRenderWaveOptions,
  UseRenderWaveResult,
  UseVirtualWindowOptions,
  UseVirtualWindowResult,
  VirtualItem,
  VirtualRange,
  RenderWaveProps,
  VirtualRenderWaveProps,
  VirtualRenderWaveHandle,
  VirtualRenderWaveComponent,
  RevealMode,
  ScrollAlign,
  ScrollToIndexOptions,
  ScrollToOffsetOptions,
  ItemKey,
  WrapperComponent,
  WrapperProps,
  HTMLTag,
} from "react-render-wave";`} />
      <P>
        New in 3.1.0: <Code>UseVirtualWindowOptions</Code>,{" "}
        <Code>UseVirtualWindowResult</Code>, <Code>VirtualItem</Code>,{" "}
        <Code>VirtualRange</Code>, <Code>RevealMode</Code>,{" "}
        <Code>ScrollAlign</Code>, <Code>ScrollToIndexOptions</Code>,{" "}
        <Code>ScrollToOffsetOptions</Code>, <Code>ItemKey</Code> and{" "}
        <Code>WrapperComponent</Code>.
      </P>
    </RecipeShell>
  );
}
