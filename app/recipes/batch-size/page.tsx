import { CodeBlock } from "@/components/CodeBlock";
import { Code, H2, Note, P, RecipeShell } from "@/components/ExampleShell";

export const metadata = { title: "Choosing batchSize" };

export default function BatchSizeRecipe() {
  return (
    <RecipeShell
      title="Choosing batchSize"
      description={
        <>
          The wave and the window solve the same problem twice, and on a long
          list they get in each other&apos;s way. This is the one piece of
          tuning worth understanding before you ship.
        </>
      }
    >
      <H2>What actually happens</H2>
      <P>
        The wave counts from <Code>startIndex</Code>, not from wherever the
        reader has scrolled to. Row 4,000 is revealed only once the wave has
        counted past 4,000. Scroll faster than the wave and you land on rows
        that are inside the window but not yet revealed: they render your
        skeleton, or nothing at all if you did not pass one.
      </P>

      <Note tone="warn">
        Windowing already caps how many rows mount at once. On a virtualized
        list the wave buys you very little beyond the first screen, and it can
        cost you blank rows.
      </Note>

      <H2>On a virtualized list, reveal in one wave</H2>
      <P>
        Let the window do the work. This is the right default for anything
        longer than a few hundred rows.
      </P>
      <CodeBlock
        code={`<VirtualRenderWave
  items={items}
  itemHeight={48}
  batchSize={items.length}   // one wave, window handles the rest
  renderItem={(item) => <Row item={item} />}
/>`}
      />

      <H2>When you want the wave to show</H2>
      <P>
        A visible stagger is a deliberate effect. Keep the list short enough
        that the wave finishes in well under a second, and always pass{" "}
        <Code>renderSkeleton</Code> so rows ahead of it have something to draw.
      </P>
      <CodeBlock
        code={`<VirtualRenderWave
  items={items.slice(0, 200)}
  itemHeight={48}
  batchSize={20}
  interval={40}
  transition
  renderSkeleton={() => <RowSkeleton />}
  renderItem={(item) => <Row item={item} />}
/>`}
      />

      <H2>Without virtualization there is no tension</H2>
      <P>
        <Code>RenderWave</Code> mounts everything eventually and windows nothing
        away, so a small <Code>batchSize</Code> is exactly the staggered mount
        it looks like. That is the case the wave was built for: a grid of
        expensive cards where one commit would block the main thread.
      </P>
      <CodeBlock
        code={`<RenderWave
  items={cards}
  batchSize={12}
  interval={50}
  renderItem={(card) => <ExpensiveCard key={card.id} card={card} />}
/>`}
      />
    </RecipeShell>
  );
}
