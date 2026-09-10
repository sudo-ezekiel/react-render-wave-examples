import Link from "next/link";
import { CodeBlock } from "@/components/CodeBlock";
import { Code, H2, Note, P, RecipeShell } from "@/components/ExampleShell";

export const metadata = { title: "Choosing batchSize" };

const linkClass =
  "font-medium text-cyan-600 underline-offset-2 hover:underline dark:text-cyan-400";

export default function BatchSizeRecipe() {
  return (
    <RecipeShell
      title="Choosing batchSize"
      description={
        <>
          The right number depends on what the wave is counting, and that is set
          by <Code>revealMode</Code>. Pick the mode first, then the number.
        </>
      }
    >
      <H2>What the wave is counting</H2>
      <P>
        In <Code>revealMode=&quot;sequential&quot;</Code>, the default, the wave
        counts from <Code>startIndex</Code>, not from wherever the reader has
        scrolled to. Row 4,000 is revealed only once the wave has counted past
        4,000. Scroll faster than the wave and you land on rows that are inside
        the window but not yet revealed: they render your skeleton, or nothing
        at all if you did not pass one.
      </P>

      <Note tone="warn">
        On a long sequential list, a small <Code>batchSize</Code> is a race
        between the wave and the reader&apos;s thumb, and the thumb wins.
      </Note>

      <H2>On a long list, reveal by viewport</H2>
      <P>
        <Code>revealMode=&quot;viewport&quot;</Code> reveals the rows inside the
        rendered window instead of counting from the start of the list. Each
        wave takes up to <Code>batchSize</Code> unrevealed rows from the current
        window, so the work per wave is bounded by the window rather than by the
        length of the list. Scroll to row 4,000 and the wave is already there. A
        revealed row is never re-hidden, so scrolling back up shows content
        rather than skeletons again.
      </P>
      <CodeBlock
        code={`<VirtualRenderWave
  items={items}
  itemHeight={48}
  containerHeight={480}
  revealMode="viewport"
  batchSize={8}
  interval={40}
  transition
  renderSkeleton={() => <RowSkeleton />}
  renderItem={(item) => <Row item={item} />}
/>`}
      />

      <H2>Sizing the batch in viewport mode</H2>
      <P>
        Compare the batch against the size of the window, not the length of the
        list. <Code>containerHeight / itemHeight</Code> plus twice{" "}
        <Code>overscan</Code> is roughly how many rows are rendered, so the list
        above renders about twenty. A <Code>batchSize</Code> at or above that
        fills the window in one wave. Below it you see the stagger:{" "}
        <Code>batchSize=&#123;8&#125;</Code> at{" "}
        <Code>interval=&#123;40&#125;</Code> clears a twenty-row window in three
        waves, so about 80ms of stagger per screenful.
      </P>
      <P>
        Pass <Code>getItemKey</Code> as well. Revealed rows are tracked by key,
        so sorting or filtering does not re-stagger rows the reader has already
        seen. Without it the index is the key, and row 3 stays revealed even
        after it becomes a different item.
      </P>
      <P>
        The{" "}
        <Link href="/examples/reveal-mode" className={linkClass}>
          reveal modes example
        </Link>{" "}
        runs the two modes side by side on the same data, which is the quickest
        way to see the difference.
      </P>

      <H2>Sequential, when you want the wave to show</H2>
      <P>
        A visible top-down stagger is a deliberate effect, and sequential is the
        mode that produces it: rows stream in from the first one, in order,
        whatever the reader is looking at. Keep the list short enough that the
        wave finishes in well under a second, and always pass{" "}
        <Code>renderSkeleton</Code> so rows ahead of it have something to draw.
      </P>
      <CodeBlock
        code={`<VirtualRenderWave
  items={items.slice(0, 200)}
  itemHeight={48}
  revealMode="sequential"   // the default, spelled out
  batchSize={20}
  interval={40}
  transition
  renderSkeleton={() => <RowSkeleton />}
  renderItem={(item) => <Row item={item} />}
/>`}
      />

      <H2>Sequential on a long list means one wave</H2>
      <P>
        If you stay on sequential and the list is long,{" "}
        <Code>batchSize=&#123;items.length&#125;</Code> is still the answer.
        Everything is revealed in the first wave and the window alone decides
        what mounts, so no row can be blank however fast the reader scrolls.
        Nothing staggers, which is the trade.
      </P>
      <CodeBlock
        code={`<VirtualRenderWave
  items={items}
  itemHeight={48}
  batchSize={items.length}   // one wave, window handles the rest
  renderItem={(item) => <Row item={item} />}
/>`}
      />

      <H2>Without virtualization there is no tension</H2>
      <P>
        <Code>RenderWave</Code> mounts everything eventually and windows nothing
        away, so a small <Code>batchSize</Code> is exactly the staggered mount
        it looks like. There is no <Code>revealMode</Code> here because there is
        no window to reveal against. That is the case the wave was built for: a
        grid of expensive cards where one commit would block the main thread.
      </P>
      <CodeBlock
        code={`<RenderWave
  items={cards}
  batchSize={12}
  interval={50}
  renderItem={(card) => <ExpensiveCard key={card.id} card={card} />}
/>`}
      />

      <Note>
        <Code>revealMode</Code> defaults to <Code>&quot;sequential&quot;</Code>,
        so code written against 3.0 reveals exactly as it did before. Viewport
        mode is opt-in, one prop at a time.
      </Note>
    </RecipeShell>
  );
}
