"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  VirtualRenderWave,
  type VirtualRenderWaveHandle,
} from "react-render-wave";
import { Demo, ExampleShell } from "@/components/ExampleShell";
import { Controls, Stat } from "@/components/ui";
import { makePeople } from "@/lib/data";

const people = makePeople(10_000);

const code = `"use client";

import { VirtualRenderWave } from "react-render-wave";

const people = makePeople(10_000);

export default function Page() {
  return (
    <VirtualRenderWave
      items={people}
      itemHeight={64}
      containerHeight={480}
      overscan={5}
      // One wave. For a smaller batchSize see the reveal modes example.
      batchSize={people.length}
      getItemKey={(person) => person.id}
      ariaLabel="People"
      renderItem={(person) => (
        <div className="row">
          <strong>{person.name}</strong>
          <span>{person.email}</span>
        </div>
      )}
    />
  );
}`;

export default function BasicExample() {
  const handle = useRef<VirtualRenderWaveHandle>(null);
  const [domRows, setDomRows] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);

  const measure = useCallback(() => {
    const el = handle.current?.getScrollElement();
    setDomRows(el ? el.querySelectorAll('[role="listitem"]').length : 0);
  }, []);

  useEffect(() => {
    measure();
  });

  return (
    <ExampleShell
      title="Basic virtual list"
      description={
        <>
          Ten thousand rows, rendered a screenful at a time. Scroll the list and
          watch the DOM node count stay flat while the offset climbs. The reveal
          below covers every row in one wave; the reveal modes example shows the
          alternative for lists too long for that.
        </>
      }
      code={code}
    >
      <Controls>
        <Stat label="Items" value={people.length.toLocaleString()} />
        <Stat label="Rows in the DOM" value={domRows} highlight />
        <Stat label="Scroll offset" value={`${Math.round(scrollTop)}px`} />
      </Controls>

      <Demo>
        <VirtualRenderWave
          ref={handle}
          items={people}
          itemHeight={64}
          containerHeight={480}
          overscan={5}
          batchSize={people.length}
          getItemKey={(person) => person.id}
          ariaLabel="People"
          onScroll={setScrollTop}
          renderItem={(person) => (
            <div className="flex h-16 items-center justify-between border-b border-neutral-100 px-4 dark:border-neutral-800">
              <div className="min-w-0">
                <div className="truncate font-medium text-neutral-900 dark:text-neutral-100">
                  {person.name}
                </div>
                <div className="truncate text-sm text-neutral-500 dark:text-neutral-400">
                  {person.email}
                </div>
              </div>
              <span className="ml-4 shrink-0 rounded-full bg-neutral-100 px-2.5 py-1 text-xs text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300">
                {person.role}
              </span>
            </div>
          )}
        />
      </Demo>
    </ExampleShell>
  );
}
