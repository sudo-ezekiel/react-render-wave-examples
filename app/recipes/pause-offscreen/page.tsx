import { CodeBlock } from "@/components/CodeBlock";
import { Code, H2, Note, P, RecipeShell } from "@/components/ExampleShell";

export const metadata = { title: "Pausing off screen" };

export default function PauseOffscreenRecipe() {
  return (
    <RecipeShell
      title="Pausing off screen"
      description={
        <>
          A page with several waved lists on it runs several timers at once,
          most of them for lists nobody has scrolled to. <Code>enabled</Code>{" "}
          turns one off without unmounting it.
        </>
      }
    >
      <H2>The switch</H2>
      <P>
        Setting <Code>enabled</Code> to false stops the reveal where it is.
        Whatever has already been revealed stays on screen, and setting it back
        to true continues from that point rather than starting over. Use{" "}
        <Code>reset()</Code> if you do want to start over.
      </P>
      <CodeBlock
        code={`const { indexes } = useRenderWave({
  length: rows.length,
  enabled: isVisible,
});`}
      />

      <H2>Driving it from an observer</H2>
      <P>
        An IntersectionObserver on the wrapper is the usual source of that
        boolean.
      </P>
      <CodeBlock
        code={`function useOnScreen<T extends Element>(ref: RefObject<T | null>) {
  const [onScreen, setOnScreen] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(
      ([entry]) => setOnScreen(entry.isIntersecting),
      { rootMargin: "200px" }   // start just before it arrives
    );
    io.observe(node);
    return () => io.disconnect();
  }, [ref]);

  return onScreen;
}

function LazySection({ rows }: { rows: Row[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const onScreen = useOnScreen(ref);

  return (
    <div ref={ref}>
      <RenderWave
        items={rows}
        enabled={onScreen}
        renderItem={(row) => <Card key={row.id} row={row} />}
      />
    </div>
  );
}`}
      />

      <Note tone="warn">
        <Code>enabled</Code> exists on <Code>useRenderWave</Code> and{" "}
        <Code>RenderWave</Code> only. <Code>VirtualRenderWave</Code> does not
        take it, because a windowed list already mounts almost nothing when it
        is off screen. If you want to pause one, drive the hook yourself.
      </Note>

      <H2>Background tabs</H2>
      <P>
        Nothing to do. Waves are committed on an animation frame, and browsers
        stop serving those to a hidden tab, so the reveal parks itself and picks
        up when the tab is foregrounded.
      </P>
    </RecipeShell>
  );
}
