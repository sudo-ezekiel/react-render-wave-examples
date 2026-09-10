"use client";

import { useEffect, useRef, useState } from "react";
import {
  VirtualRenderWave,
  type VirtualRenderWaveHandle,
} from "react-render-wave";
import { Demo, ExampleShell } from "@/components/ExampleShell";
import { Button, Controls, NumberInput, Stat } from "@/components/ui";
import { makePeople, type Person } from "@/lib/data";

const people = makePeople(5_000);

const code = `"use client";

import { useRef } from "react";
import {
  VirtualRenderWave,
  type VirtualRenderWaveHandle,
} from "react-render-wave";

const people = makePeople(5_000);

export default function Page() {
  const sequential = useRef<VirtualRenderWaveHandle>(null);
  const viewport = useRef<VirtualRenderWaveHandle>(null);

  const jump = () => {
    const options = { align: "start", behavior: "auto" } as const;
    sequential.current?.scrollTo(3_000, options);
    viewport.current?.scrollTo(3_000, options);
  };

  return (
    <>
      <button onClick={jump}>Jump both to 3,000</button>

      <VirtualRenderWave
        ref={sequential}
        items={people}
        itemHeight={56}
        containerHeight={420}
        batchSize={10}
        interval={120}
        revealMode="sequential"
        getItemKey={(person) => person.id}
        ariaLabel="People, sequential reveal"
        renderItem={(person) => <Row person={person} />}
        renderSkeleton={() => <RowSkeleton />}
      />

      <VirtualRenderWave
        ref={viewport}
        items={people}
        itemHeight={56}
        containerHeight={420}
        batchSize={10}
        interval={120}
        revealMode="viewport"
        getItemKey={(person) => person.id}
        ariaLabel="People, viewport reveal"
        renderItem={(person) => <Row person={person} />}
        renderSkeleton={() => <RowSkeleton />}
      />
    </>
  );
}`;

function Row({ person }: { person: Person }) {
  return (
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
  );
}

function RowSkeleton() {
  return (
    <div
      data-skeleton
      className="flex h-14 flex-col justify-center gap-2 border-b border-neutral-100 px-4 dark:border-neutral-800"
    >
      <div className="skeleton-bar h-3 w-32 rounded bg-neutral-300 dark:bg-neutral-700" />
      <div className="skeleton-bar h-2.5 w-20 rounded bg-neutral-200 dark:bg-neutral-800" />
    </div>
  );
}

/** Panel heading that names the mode and reports what it has revealed. */
function PanelHeader({ mode, status }: { mode: string; status: string }) {
  return (
    <div className="flex items-center justify-between gap-2 border-b border-neutral-200 px-4 py-2 dark:border-neutral-800">
      <code className="font-mono text-xs text-neutral-800 dark:text-neutral-200">
        revealMode=&quot;{mode}&quot;
      </code>
      <span className="shrink-0 text-xs tabular-nums text-neutral-500 dark:text-neutral-400">
        {status}
      </span>
    </div>
  );
}

function readStatus(handle: VirtualRenderWaveHandle | null) {
  const el = handle?.getScrollElement();
  if (!el) return "";
  const rendered = el.querySelectorAll('[role="listitem"]').length;
  const skeletons = el.querySelectorAll("[data-skeleton]").length;
  return `${rendered - skeletons} of ${rendered} rows revealed`;
}

export default function RevealModeExample() {
  const sequential = useRef<VirtualRenderWaveHandle>(null);
  const viewport = useRef<VirtualRenderWaveHandle>(null);
  const [target, setTarget] = useState(3_000);
  const [run, setRun] = useState(0);
  const [sequentialStatus, setSequentialStatus] = useState("");
  const [viewportStatus, setViewportStatus] = useState("");

  useEffect(() => {
    const id = window.setInterval(() => {
      setSequentialStatus(readStatus(sequential.current));
      setViewportStatus(readStatus(viewport.current));
    }, 200);
    return () => window.clearInterval(id);
  }, []);

  const jump = () => {
    const options = { align: "start", behavior: "auto" } as const;
    sequential.current?.scrollTo(target, options);
    viewport.current?.scrollTo(target, options);
  };

  return (
    <ExampleShell
      title="Reveal modes"
      description={
        <>
          Two lists over the same 5,000 people, the same{" "}
          <code className="font-mono text-sm">batchSize</code> of 10 and the
          same 120ms interval. The only difference is{" "}
          <code className="font-mono text-sm">revealMode</code>. Jump both to
          row 3,000: the sequential wave is still counting up from row 0, so
          everything there is a skeleton. The viewport wave reveals the rows
          inside the rendered window, so it fills in within a wave or two.
        </>
      }
      code={code}
    >
      <Controls>
        <NumberInput
          label="Jump to index"
          value={target}
          min={0}
          max={people.length - 1}
          onChange={setTarget}
        />
        <Button onClick={jump}>Jump both lists</Button>
        <Button onClick={() => setRun((n) => n + 1)}>
          Replay from the top
        </Button>
        <Stat label="Items" value={people.length.toLocaleString()} />
        <Stat label="batchSize" value={10} highlight />
      </Controls>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Demo>
          <PanelHeader mode="sequential" status={sequentialStatus} />
          <VirtualRenderWave
            key={`sequential-${run}`}
            ref={sequential}
            items={people}
            itemHeight={56}
            containerHeight={420}
            batchSize={10}
            interval={120}
            revealMode="sequential"
            getItemKey={(person) => person.id}
            ariaLabel="People, sequential reveal"
            renderItem={(person) => <Row person={person} />}
            renderSkeleton={() => <RowSkeleton />}
          />
        </Demo>

        <Demo>
          <PanelHeader mode="viewport" status={viewportStatus} />
          <VirtualRenderWave
            key={`viewport-${run}`}
            ref={viewport}
            items={people}
            itemHeight={56}
            containerHeight={420}
            batchSize={10}
            interval={120}
            revealMode="viewport"
            getItemKey={(person) => person.id}
            ariaLabel="People, viewport reveal"
            renderItem={(person) => <Row person={person} />}
            renderSkeleton={() => <RowSkeleton />}
          />
        </Demo>
      </div>

      <div className="mt-6 flex flex-col gap-3 text-sm text-neutral-600 dark:text-neutral-400">
        <p>
          <code className="font-mono text-sm">sequential</code> is the default
          and the 3.0 behaviour. The wave counts forward from{" "}
          <code className="font-mono text-sm">startIndex</code> and ignores the
          scroll position, so the reveal always runs in list order. Use it when
          the reveal is the effect: a short list that streams in from the top,
          one batch at a time.
        </p>
        <p>
          <code className="font-mono text-sm">viewport</code> is for long lists.
          The wave reveals the rows inside the rendered window, so it follows
          the reader instead of the index. A small{" "}
          <code className="font-mono text-sm">batchSize</code> then keeps each
          commit cheap without leaving skeletons where the reader is looking. A
          revealed row is never re-hidden, so scrolling back over ground the
          wave has covered shows real rows.
        </p>
        <p>
          That last part is why{" "}
          <code className="font-mono text-sm">
            batchSize=&#123;items.length&#125;
          </code>{" "}
          used to be the advice on a long list. It was the only way to
          guarantee no skeleton under the reader, at the cost of rendering the
          whole window in one commit. In viewport mode it no longer has to be.
        </p>
      </div>
    </ExampleShell>
  );
}
