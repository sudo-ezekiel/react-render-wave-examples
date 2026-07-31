"use client";

import { useDeferredValue, useMemo, useRef, useState } from "react";
import { VirtualRenderWave, type VirtualRenderWaveHandle } from "react-render-wave";
import { Demo, ExampleShell, Note } from "@/components/ExampleShell";
import { Stat } from "@/components/ui";
import { makePeople } from "@/lib/data";

const people = makePeople(50_000);

const code = `"use client";

// 50,000 rows filtered on every keystroke. Two things keep it smooth:
//
// 1. useDeferredValue, so typing stays responsive while the filter runs
//    against the stale query and catches up a frame later.
// 2. getItemKey pointing at person.id. Every query produces a different
//    result set at the same indexes, so index keys would hand row 0 of
//    "ada" to row 0 of "adam" and reuse the DOM underneath it.

const [query, setQuery] = useState("");
const deferred = useDeferredValue(query);

const results = useMemo(() => {
  const q = deferred.trim().toLowerCase();
  if (!q) return people;
  return people.filter(
    (p) => p.name.toLowerCase().includes(q) || p.email.includes(q)
  );
}, [deferred]);

<VirtualRenderWave
  items={results}
  itemHeight={56}
  containerHeight={420}
  batchSize={results.length}
  getItemKey={(person) => person.id}
  renderItem={(person) => <PersonRow person={person} />}
/>`;

export default function SearchExample() {
  const [query, setQuery] = useState("");
  const deferred = useDeferredValue(query);
  const ref = useRef<VirtualRenderWaveHandle>(null);

  const results = useMemo(() => {
    const q = deferred.trim().toLowerCase();
    if (!q) return people;
    return people.filter(
      (person) =>
        person.name.toLowerCase().includes(q) || person.email.includes(q)
    );
  }, [deferred]);

  return (
    <ExampleShell
      title="Searchable directory"
      description={
        <>
          50,000 people, filtered as you type. The result set changes on every
          keystroke while the rendered window stays a couple of dozen nodes.
        </>
      }
      code={code}
    >
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          type="search"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            ref.current?.scrollToOffset(0, "auto");
          }}
          placeholder="Search by name or email"
          aria-label="Search people"
          className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-cyan-500 focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100"
        />
        <div className="shrink-0">
          <Stat
            label="Matches"
            value={results.length.toLocaleString()}
            highlight
          />
        </div>
      </div>

      <Demo>
        {results.length === 0 ? (
          <div className="flex h-[420px] items-center justify-center text-sm text-neutral-500 dark:text-neutral-400">
            Nothing matches “{query}”.
          </div>
        ) : (
          <VirtualRenderWave
            ref={ref}
            items={results}
            itemHeight={56}
            containerHeight={420}
            batchSize={results.length}
            overscan={6}
            getItemKey={(person) => person.id}
            ariaLabel="People"
            renderItem={(person) => (
              <div className="flex h-14 items-center gap-3 border-b border-neutral-100 px-4 dark:border-neutral-800">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cyan-100 text-sm font-semibold text-cyan-700 dark:bg-cyan-950 dark:text-cyan-300">
                  {person.letter}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium text-neutral-900 dark:text-neutral-100">
                    {person.name}
                  </div>
                  <div className="truncate text-xs text-neutral-500 dark:text-neutral-400">
                    {person.email}
                  </div>
                </div>
                <div className="shrink-0 text-xs text-neutral-400">
                  {person.role}
                </div>
              </div>
            )}
          />
        )}
      </Demo>

      <div className="mt-6">
        <Note>
          Scrolling back to the top on a new query is a deliberate call, not
          something the library does. Without it you keep the old offset, which
          on a shorter result set means landing somewhere arbitrary or past the
          end.
        </Note>
      </div>
    </ExampleShell>
  );
}
