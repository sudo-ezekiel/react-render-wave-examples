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
      <P>
        Point at whatever your data already uses for identity. The return type
        is <Code>ItemKey</Code>, which is <Code>string | number</Code>.
      </P>
      <CodeBlock
        code={`<VirtualRenderWave
  items={sorted}
  itemHeight={56}
  getItemKey={(person) => person.id}
  renderItem={(person) => <Row person={person} />}
/>`}
      />

      <H2>Measured heights follow the key</H2>
      <P>
        Measured row heights are stored by key rather than by position. With{" "}
        <Code>getItemKey</Code> set, a row that has already been measured keeps
        that height when it moves to a different index, so a sort only moves
        rows around.
      </P>
      <P>
        Without it, the key at each position stays the same while the data under
        it changes, so every row drops back to the <Code>itemHeight</Code>{" "}
        estimate and measures again on the next frame. On dynamic-height rows
        you watch the whole list collapse to one uniform height and then settle,
        once per sort.
      </P>

      <Note>
        The key has to hold still across renders as well as across sorts. One
        that changes every render throws the measurement cache away, and the
        list will jump while scrolling.
      </Note>

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

      <H2>With the hook, memoize it</H2>
      <P>
        <Code>useVirtualWindow</Code> reads a new <Code>getItemKey</Code>{" "}
        identity as a reorder, so give it one that survives a render.
      </P>
      <CodeBlock
        code={`const getItemKey = useCallback((index: number) => rows[index].id, [rows]);

const { scrollRef, virtualItems, totalSize } = useVirtualWindow({
  count: rows.length,
  estimateSize: 56,
  getItemKey,
});`}
      />
      <P>
        <Code>VirtualRenderWave</Code> does not have this problem. An inline
        arrow is fine there.
      </P>

      <H2>Index keys are fine when</H2>
      <P>
        The list is append-only and never sorted or filtered, and rows hold no
        DOM state of their own. A static log viewer qualifies. Most other things
        do not.
      </P>
    </RecipeShell>
  );
}
