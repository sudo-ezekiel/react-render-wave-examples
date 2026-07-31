import { CodeBlock } from "@/components/CodeBlock";
import { Code, H2, Note, P, RecipeShell } from "@/components/ExampleShell";

export const metadata = { title: "Sizing the container" };

export default function SizingRecipe() {
  return (
    <RecipeShell
      title="Sizing the container"
      description={
        <>
          <Code>containerHeight</Code> defaults to 400 pixels, which is fine for
          a demo and wrong for most layouts. Any real screen wants the list to
          fill what is left over.
        </>
      }
    >
      <H2>Fill the parent</H2>
      <P>
        Pass a height through <Code>style</Code> and skip{" "}
        <Code>containerHeight</Code> entirely. The viewport is measured with a
        ResizeObserver either way, so a percentage, a viewport unit or a flex
        child all work.
      </P>
      <CodeBlock
        code={`<div className="flex h-dvh flex-col">
  <Header />

  {/* min-h-0 matters: a flex child defaults to min-height:auto and
      refuses to shrink below its content, so the list would overflow
      the screen instead of scrolling inside it. */}
  <div className="min-h-0 flex-1">
    <VirtualRenderWave
      items={items}
      itemHeight={48}
      style={{ height: "100%" }}
      renderItem={(item) => <Row item={item} />}
    />
  </div>
</div>`}
      />

      <Note tone="warn">
        The <Code>min-h-0</Code> above is the part people lose an afternoon to.
        Without it the flex item will not shrink past its content height, the
        container grows to fit all the rows, and nothing scrolls.
      </Note>

      <H2>Fixed height</H2>
      <P>
        When the list really does own a fixed box, <Code>containerHeight</Code>{" "}
        is the shorter way to say it and needs no wrapper.
      </P>
      <CodeBlock
        code={`<VirtualRenderWave items={items} itemHeight={48} containerHeight={560} ... />`}
      />

      <H2>Resizing</H2>
      <P>
        Nothing to wire up. The container is observed, so rotating a phone or
        dragging a split pane recomputes the window on the next frame.
      </P>
    </RecipeShell>
  );
}
