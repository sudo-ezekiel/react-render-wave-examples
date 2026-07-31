import { CodeBlock } from "@/components/CodeBlock";
import { Code, H2, Note, P, RecipeShell } from "@/components/ExampleShell";

export const metadata = { title: "Restoring scroll position" };

export default function ScrollRestorationRecipe() {
  return (
    <RecipeShell
      title="Restoring scroll position"
      description={
        <>
          Open a row, come back, and land where you were. Two props do it:{" "}
          <Code>onScroll</Code> on the way out and the imperative handle on the
          way in.
        </>
      }
    >
      <H2>Save the offset</H2>
      <P>
        <Code>onScroll</Code> is throttled to one call per animation frame, so
        writing to a ref on every call is cheap. Do not put it in state; you
        would re-render the list on every frame of every scroll.
      </P>
      <CodeBlock
        code={`const offset = useRef(0);

<VirtualRenderWave
  items={items}
  itemHeight={64}
  onScroll={(scrollTop) => { offset.current = scrollTop; }}
  renderItem={(item) => <Row item={item} />}
/>`}
      />

      <H2>Put it back</H2>
      <P>
        Restore through the handle in a layout effect, so the jump happens
        before the browser paints and the reader never sees the top of the list.
      </P>
      <CodeBlock
        code={`const ref = useRef<VirtualRenderWaveHandle>(null);

useLayoutEffect(() => {
  const saved = sessionStorage.getItem("inbox-scroll");
  if (saved) ref.current?.scrollToOffset(Number(saved), "auto");
}, []);

<VirtualRenderWave
  ref={ref}
  items={items}
  itemHeight={64}
  onScroll={(top) => sessionStorage.setItem("inbox-scroll", String(top))}
  renderItem={(item) => <Row item={item} />}
/>`}
      />

      <Note tone="warn">
        Pass <Code>&quot;auto&quot;</Code> as the behavior. The default is smooth,
        which animates the restore and is visible as a scroll on arrival.
      </Note>

      <H2>By index instead of pixels</H2>
      <P>
        A pixel offset assumes the rows above are the same height they were
        last time. If the data can change between visits, save the topmost
        index from <Code>getVisibleIndexes()</Code> and restore with{" "}
        <Code>scrollTo</Code>, which resolves the offset from current
        measurements.
      </P>
      <CodeBlock
        code={`// leaving
const [top] = ref.current?.getVisibleIndexes() ?? [];

// returning
ref.current?.scrollTo(top, "auto");`}
      />

      <Note>
        With dynamic heights, rows below the fold have not been measured yet, so
        an index restore deep into the list scrolls using the{" "}
        <Code>itemHeight</Code> estimate and settles once real measurements
        arrive. The closer your estimate, the less it settles.
      </Note>
    </RecipeShell>
  );
}
