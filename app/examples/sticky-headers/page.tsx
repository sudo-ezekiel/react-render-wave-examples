"use client";

import { VirtualRenderWave } from "react-render-wave";
import { Demo, ExampleShell } from "@/components/ExampleShell";
import { makeContacts } from "@/lib/data";

const contacts = makeContacts(3_000);

const code = `"use client";

import { VirtualRenderWave } from "react-render-wave";

// groupByKey derives the label for each row, and renderStickyHeader draws
// the label of the topmost visible row. The library only positions the
// header, so give it a background of your own; otherwise rows scroll
// visibly behind it.

export default function Page() {
  return (
    <VirtualRenderWave
      items={contacts}
      itemHeight={56}
      containerHeight={480}
      batchSize={contacts.length}
      groupByKey="letter"
      getItemKey={(contact) => contact.id}
      renderStickyHeader={(letter) => (
        <div className="bg-neutral-50 border-b px-4 py-2 font-semibold">
          {letter}
        </div>
      )}
      renderItem={(contact) => <Row contact={contact} />}
    />
  );
}`;

export default function StickyHeadersExample() {
  return (
    <ExampleShell
      title="Sticky group headers"
      description={
        <>
          Contacts sorted by first letter.{" "}
          <code className="font-mono text-sm">groupByKey</code> derives a label
          per row and the header for the topmost visible row stays pinned. A
          function works too, for grouping by date or any computed value.
        </>
      }
      code={code}
    >
      <Demo>
        <VirtualRenderWave
          items={contacts}
          itemHeight={56}
          containerHeight={480}
          overscan={5}
          batchSize={contacts.length}
          groupByKey="letter"
          getItemKey={(contact) => contact.id}
          ariaLabel="Contacts"
          renderStickyHeader={(letter) => (
            <div className="border-b border-neutral-200 bg-neutral-50 px-4 py-2 text-sm font-semibold text-neutral-700 dark:border-neutral-800 dark:bg-neutral-800 dark:text-neutral-200">
              {letter}
            </div>
          )}
          renderItem={(contact) => (
            <div className="flex h-14 items-center gap-3 border-b border-neutral-100 px-4 dark:border-neutral-800">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cyan-100 text-sm font-semibold text-cyan-700 dark:bg-cyan-950 dark:text-cyan-300">
                {contact.letter}
              </div>
              <div className="min-w-0">
                <div className="truncate text-sm font-medium text-neutral-900 dark:text-neutral-100">
                  {contact.name}
                </div>
                <div className="truncate text-xs text-neutral-500 dark:text-neutral-400">
                  {contact.email}
                </div>
              </div>
            </div>
          )}
        />
      </Demo>
    </ExampleShell>
  );
}
