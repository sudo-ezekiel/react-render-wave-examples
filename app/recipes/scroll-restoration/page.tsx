import { CodeBlock } from "@/components/CodeBlock";
import { Code, H2, Note, P, RecipeShell } from "@/components/ExampleShell";

export const metadata = { title: "Restoring scroll position" };

export default function ScrollRestorationRecipe() {
  return (
    <RecipeShell
      title="Restoring scroll position"
      description={
        <>
          Open a row, come back, and land where you were on the first frame.{" "}
          <Code>onScroll</Code> saves the offset on the way out and{" "}
          <Code>initialScrollOffset</Code> opens on it on the way in. The
          imperative handle is for moves that happen after mount.
        </>
      }
    >
      <H2>Save the offset</H2>
      <P>
        <Code>onScroll</Code> is throttled to one call per animation frame, so
        writing on every call is cheap. Do not put it in state; you would
        re-render the list on every frame of every scroll.
      </P>
      <CodeBlock
        code={`<VirtualRenderWave
  items={items}
  itemHeight={64}
  onScroll={(top) => sessionStorage.setItem("inbox-scroll", String(top))}
  renderItem={(item) => <Row item={item} />}
/>`}
      />

      <H2>Open on it</H2>
      <P>
        <Code>initialScrollOffset</Code> is read once at mount, before the first
        paint. The first frame is already the saved window, so there is no
        moment where the reader sees the top of the list. The server markup
        holds that window too, which means a restored list rendered on the
        server agrees with the client instead of correcting itself on
        hydration.
      </P>
      <CodeBlock
        code={`const saved = Number(sessionStorage.getItem("inbox-scroll") ?? 0);

<VirtualRenderWave
  items={items}
  itemHeight={64}
  initialScrollOffset={saved}
  onScroll={(top) => sessionStorage.setItem("inbox-scroll", String(top))}
  renderItem={(item) => <Row item={item} />}
/>`}
      />

      <Note>
        The offset has to exist at the first render, and{" "}
        <Code>sessionStorage</Code> only exists in the browser. That read
        belongs in a component the server does not prerender. When the page is
        rendered on the server, keep the offset somewhere the server can read
        as well: a route segment, a search param, or a cookie.
      </Note>

      <Note tone="warn">
        <Code>initialScrollOffset</Code> is read at mount and never again.
        Changing the value later does nothing, so it is not a controlled prop.
        Every move after mount goes through the handle.
      </Note>

      <H2>Restoring after mount</H2>
      <P>
        Data that arrives asynchronously is the case the prop cannot cover: at
        mount the list is still empty, so there is nothing to scroll to yet.
        Wait for the rows, then scroll through the handle in a layout effect,
        before the browser paints them.
      </P>
      <CodeBlock
        code={`const ref = useRef<VirtualRenderWaveHandle>(null);

useLayoutEffect(() => {
  if (!items.length) return;
  const saved = sessionStorage.getItem("inbox-scroll");
  if (saved) ref.current?.scrollToOffset(Number(saved), "auto");
}, [items.length]);

<VirtualRenderWave
  ref={ref}
  items={items}
  itemHeight={64}
  onScroll={(top) => sessionStorage.setItem("inbox-scroll", String(top))}
  renderItem={(item) => <Row item={item} />}
/>`}
      />

      <Note tone="warn">
        Pass <Code>&quot;auto&quot;</Code> as the behavior. The handle defaults
        to smooth, which animates the restore and arrives as a visible scroll.
      </Note>

      <H2>By row instead of by pixel</H2>
      <P>
        A pixel offset assumes the rows above are the height they were last
        time. If the data can change between visits, save the topmost index
        from <Code>getVisibleIndexes()</Code> and open on that with{" "}
        <Code>initialScrollIndex</Code>. It wins over{" "}
        <Code>initialScrollOffset</Code>, and it is corrected once the rows
        above it have been measured, so a list with dynamic heights settles on
        the row you asked for rather than on a pixel that moved.
      </P>
      <CodeBlock
        code={`// leaving
const [top = 0] = ref.current?.getVisibleIndexes() ?? [];
sessionStorage.setItem("inbox-row", String(top));

// returning
<VirtualRenderWave
  items={items}
  itemHeight={64}
  initialScrollIndex={Number(sessionStorage.getItem("inbox-row") ?? 0)}
  renderItem={(item) => <Row item={item} />}
/>`}
      />

      <P>
        After mount the same restore is <Code>scrollTo</Code>, which resolves
        the offset from current measurements. It takes a behavior string or{" "}
        <Code>{"{ align, behavior }"}</Code>, so you can land the row in the
        middle of the viewport instead of at the top.
      </P>
      <CodeBlock
        code={`ref.current?.scrollTo(top, { align: "center", behavior: "auto" });`}
      />

      <Note>
        With dynamic heights, rows below the fold have not been measured yet,
        so opening deep in the list positions with the <Code>itemHeight</Code>{" "}
        estimate and corrects as real measurements arrive. The closer your
        estimate, the less it moves.
      </Note>
    </RecipeShell>
  );
}
