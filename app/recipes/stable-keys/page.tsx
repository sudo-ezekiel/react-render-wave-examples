import { CodeBlock } from "@/components/CodeBlock";
import { Code, H2, Note, P, RecipeShell } from "@/components/ExampleShell";

export const metadata = { title: "Keys that survive sorting" };

export default function StableKeysRecipe() {
  return (
    <RecipeShell
      title="Keys that survive sorting"
      description={
        <>
          <Code>getItemKey</Code> defaults to the row index. That is correct
          for a list that never changes and quietly wrong for one that does.
        </>
      }
    >
      <H2>What goes wrong</H2>
      <P>
        With index keys, position 0 is always <Code>key=&quot;0&quot;</Code>. Sort
        the list and React sees the same key holding different data, so it
        reuses that DOM node instead of moving the old one. Anything the DOM
        owns rather than your props stays behind: text selection, an open
        menu, a half-typed input, a CSS transition mid-flight, scroll position
        inside the row.
      </P>

      <Note tone="warn">
        This never throws and never logs. It shows up as a checkbox that ticks
        the wrong row after a filter, which is why it usually ships.
      </Note>

      <H2>The fix</H2>
      <P>Point at whatever your data already uses for identity.</P>
      <CodeBlock
        code={`<VirtualRenderWave
  items={sorted}
  itemHeight={56}
  getItemKey={(person) => person.id}
  renderItem={(person) => <Row person={person} />}
/>`}
      />

      <H2>When there is no id</H2>
      <P>
        Derive one from the fields that make the row unique, and derive it once
        where the data is built rather than inside <Code>getItemKey</Code>. The
        key has to be the same string across renders or you have just made
        every row remount.
      </P>
      <CodeBlock
        code={`// Once, where the rows come from:
const rows = raw.map((r) => ({ ...r, key: \`\${r.date}:\${r.sku}\` }));

<VirtualRenderWave items={rows} getItemKey={(r) => r.key} ... />`}
      />

      <Note>
        Stable keys also matter for measurement. Dynamic row heights are cached
        per key, so a key that changes on every render throws the cache away and
        the list will jump while scrolling.
      </Note>

      <H2>Index keys are fine when</H2>
      <P>
        The list is append-only and never sorted or filtered, and rows hold no
        DOM state of their own. A static log viewer qualifies. Most other things
        do not.
      </P>
    </RecipeShell>
  );
}
