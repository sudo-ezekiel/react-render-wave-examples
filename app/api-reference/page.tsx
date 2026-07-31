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
  ["batchSize", "number", "20", "Items revealed per wave. Set to items.length on a long list."],
  ["interval", "number", "50", "Milliseconds between waves."],
  ["overscan", "number", "5", "Extra rows rendered above and below the viewport."],
  ["startIndex", "number", "0", "First index to reveal."],
  ["renderSkeleton", "(index) => ReactNode", "", "Placeholder for rows the wave has not reached."],
  ["getItemKey", "(item, index) => string | number", "index", "Stable row key. Point it at your id for any list that sorts or filters."],
  ["scrollToIndex", "number", "", "Scrolls whenever the value changes."],
  ["transition", "boolean", "false", "Fade newly revealed rows in."],
  ["snapToBatch", "boolean", "false", "Align scroll to the nearest batch once scrolling stops. Assumes fixed heights."],
  ["onEndReached", "() => void", "", "Fires once per arrival at the end."],
  ["endReachedThreshold", "number", "10", "Distance in pixels from the bottom that counts as the end."],
  ["onScroll", "(scrollTop) => void", "", "Scroll position, at most once per animation frame."],
  ["keyboardNavigation", "boolean", "false", "Focusable container with arrow, page, Home and End scrolling."],
  ["groupByKey", "keyof T | (item, index) => string", "", "Group label per row, for sticky headers."],
  ["renderStickyHeader", "(group) => ReactNode", "", "Sticky header for the topmost visible group. Give it your own background."],
  ["outerElement", "HTMLTag | FC<WrapperProps>", '"div"', "Custom scroll container. Spread the whole props object onto your node."],
  ["innerElement", "HTMLTag | FC<WrapperProps>", '"div"', "Custom content sizer."],
  ["className / style", "string / CSSProperties", "", "Applied to the scroll container."],
  ["ariaLabel", "string", "", "Accessible label for the scroll container."],
];

export default function ApiReference() {
  return (
    <RecipeShell
      title="API reference"
      description={
        <>
          Three exports: a hook, a component around it, and a windowed list.
          All the types below ship with the package.
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

      <H2>VirtualRenderWaveHandle</H2>
      <CodeBlock code={`const ref = useRef<VirtualRenderWaveHandle>(null);

<VirtualRenderWave ref={ref} ... />

ref.current?.scrollTo(500);              // row 500 to the top, smooth
ref.current?.scrollTo(500, "auto");      // instant
ref.current?.scrollToOffset(1200);       // by pixels
ref.current?.getVisibleIndexes();        // rendered and revealed indexes
ref.current?.getScrollElement();         // the scrollable element, or null`} />

      <H2>Exported types</H2>
      <CodeBlock code={`import type {
  UseRenderWaveOptions,
  UseRenderWaveResult,
  RenderWaveProps,
  VirtualRenderWaveProps,
  VirtualRenderWaveHandle,
  VirtualRenderWaveComponent,
  WrapperProps,
  HTMLTag,
} from "react-render-wave";`} />
    </RecipeShell>
  );
}
