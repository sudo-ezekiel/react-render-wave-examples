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
      // One wave. The reveal counts from index 0, so on a list this long a
      // small batchSize would leave rows blank if you scroll past the wave.
      // The skeletons example shows the wave doing its job instead.
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

  // Counting the real DOM nodes is the clearest way to show what windowing
  // buys: the number stays flat no matter how long the list is.
  const measure = useCallback(() => {
    const el = handle.current?.getScrollElement();
    setDomRows(el ? el.querySelectorAll('[role="listitem"]').length : 0);
  }, []);

  // Runs after every commit, so the count reflects the DOM that was just
  // rendered rather than the previous window.
  useEffect(() => {
    measure();
  });

  return (
    <ExampleShell
      title="Basic virtual list"
      description={
        <>
          Ten thousand rows, rendered a screenful at a time. Scroll the list and
          watch the DOM node count stay flat while the offset climbs.
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
