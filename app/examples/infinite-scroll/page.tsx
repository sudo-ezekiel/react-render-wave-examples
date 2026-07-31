"use client";

import { useCallback, useRef, useState } from "react";
import { VirtualRenderWave } from "react-render-wave";
import { Demo, ExampleShell } from "@/components/ExampleShell";
import { Controls, Stat } from "@/components/ui";
import { makePeople, type Person } from "@/lib/data";

const PAGE_SIZE = 100;

const code = `"use client";

import { useCallback, useRef, useState } from "react";
import { VirtualRenderWave } from "react-render-wave";

export default function Page() {
  const [rows, setRows] = useState(() => makePeople(100));
  const [loading, setLoading] = useState(false);
  const inFlight = useRef(false);

  // onEndReached fires once per arrival at the end, so a plain append is
  // safe. The ref guards the async gap: the user can scroll away and back
  // before the request resolves.
  const loadMore = useCallback(async () => {
    if (inFlight.current) return;
    inFlight.current = true;
    setLoading(true);

    const next = await fetchNextPage(rows.length);
    setRows((prev) => [...prev, ...next]);

    setLoading(false);
    inFlight.current = false;
  }, [rows.length]);

  return (
    <VirtualRenderWave
      items={rows}
      itemHeight={56}
      containerHeight={480}
      // Matching batchSize to the page size means each appended page is
      // revealed by the next wave instead of trickling in.
      batchSize={PAGE_SIZE}
      onEndReached={loadMore}
      endReachedThreshold={200}
      getItemKey={(person) => person.id}
      renderItem={(person) => <Row person={person} />}
    />
  );
}`;

export default function InfiniteScrollExample() {
  const [rows, setRows] = useState<Person[]>(() => makePeople(PAGE_SIZE));
  const [loading, setLoading] = useState(false);
  const [pages, setPages] = useState(1);
  const inFlight = useRef(false);

  const loadMore = useCallback(() => {
    if (inFlight.current) return;
    inFlight.current = true;
    setLoading(true);

    // Stands in for a network request.
    setTimeout(() => {
      setRows((prev) => [...prev, ...makePeople(PAGE_SIZE, prev.length)]);
      setPages((p) => p + 1);
      setLoading(false);
      inFlight.current = false;
    }, 700);
  }, []);

  return (
    <ExampleShell
      title="Infinite scroll"
      description={
        <>
          <code className="font-mono text-sm">onEndReached</code> fires once
          each time the user arrives at the end, so appending is safe without
          debouncing. A ref guards the async gap while a page is still loading.{" "}
          <code className="font-mono text-sm">endReachedThreshold</code> starts
          the fetch 200px early so the list rarely runs dry.
        </>
      }
      code={code}
    >
      <Controls>
        <Stat label="Rows loaded" value={rows.length.toLocaleString()} />
        <Stat label="Pages fetched" value={pages} />
        <Stat
          label="Status"
          value={loading ? "Loading" : "Idle"}
          highlight={loading}
        />
      </Controls>

      <Demo>
        <VirtualRenderWave
          items={rows}
          itemHeight={56}
          containerHeight={480}
          overscan={5}
          batchSize={PAGE_SIZE}
          onEndReached={loadMore}
          endReachedThreshold={200}
          getItemKey={(person) => person.id}
          ariaLabel="Feed"
          renderItem={(person) => (
            <div className="flex h-14 items-center justify-between border-b border-neutral-100 px-4 dark:border-neutral-800">
              <div className="min-w-0">
                <div className="truncate text-sm font-medium text-neutral-900 dark:text-neutral-100">
                  {person.name}
                </div>
                <div className="truncate text-xs text-neutral-500 dark:text-neutral-400">
                  {person.role}
                </div>
              </div>
              <span className="ml-4 shrink-0 font-mono text-xs text-neutral-400 dark:text-neutral-500">
                #{person.id}
              </span>
            </div>
          )}
        />
      </Demo>

      <div className="mt-3 h-5 text-center text-sm text-neutral-500 dark:text-neutral-400">
        {loading ? "Loading the next page..." : "Scroll to the end for more"}
      </div>
    </ExampleShell>
  );
}
