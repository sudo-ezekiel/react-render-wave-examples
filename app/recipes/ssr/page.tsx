import { CodeBlock } from "@/components/CodeBlock";
import { Code, H2, Note, P, RecipeShell } from "@/components/ExampleShell";

export const metadata = { title: "Server rendering" };

export default function SsrRecipe() {
  return (
    <RecipeShell
      title="Server rendering"
      description={
        <>
          The first batch is part of the initial render, so server markup is
          real content rather than an empty shell. Everything after that is
          client work.
        </>
      }
    >
      <H2>What the server produces</H2>
      <P>
        The hook computes its first batch during render, with no effect and no
        timer involved, so the server emits exactly{" "}
        <Code>batchSize</Code> items. Hydration matches because the client
        computes the same first batch before any wave has run.
      </P>
      <CodeBlock
        code={`// Server output for batchSize={20}: 20 rows of real markup.
// Wave 2 onward is committed on the client, on an animation frame.
<RenderWave items={items} batchSize={20} renderItem={...} />`}
      />

      <H2>Keep the data deterministic</H2>
      <P>
        This is where SSR lists usually break, and it is not specific to this
        library. If the rows are built with <Code>Math.random()</Code> or{" "}
        <Code>Date.now()</Code>, the server and the client build different rows
        and React reports a mismatch. Derive the content from the data, or pass
        it in from a loader.
      </P>
      <CodeBlock
        code={`// Every list on this site is generated this way, from the index alone:
export function makePeople(count: number, offset = 0) {
  return Array.from({ length: count }, (_, i) => {
    const id = offset + i;
    return { id, name: NAMES[id % NAMES.length] };
  });
}`}
      />

      <Note tone="warn">
        A timestamp column is the common offender. Format it in an effect, or
        send a preformatted string down with the data.
      </Note>

      <H2>Client components</H2>
      <P>
        Both components read layout and attach observers, so in the Next.js App
        Router they belong in a client component. The build output carries the{" "}
        <Code>&quot;use client&quot;</Code> directive already, but the file that
        renders a list needs its own.
      </P>
      <CodeBlock
        code={`"use client";

import { VirtualRenderWave } from "react-render-wave";

export function People({ people }: { people: Person[] }) {
  return <VirtualRenderWave items={people} itemHeight={56} ... />;
}`}
      />

      <Note>
        <Code>VirtualRenderWave</Code> measures the viewport before it can
        decide what is visible, so the server renders the first batch and the
        window is computed on mount. Give the container a height that does not
        depend on measurement, otherwise the first paint is a zero-height box.
      </Note>
    </RecipeShell>
  );
}
