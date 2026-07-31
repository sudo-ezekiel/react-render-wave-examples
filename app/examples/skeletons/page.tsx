"use client";

import { useState } from "react";
import { VirtualRenderWave } from "react-render-wave";
import { Demo, ExampleShell } from "@/components/ExampleShell";
import { Button, Checkbox, Controls, NumberInput } from "@/components/ui";
import { makePeople } from "@/lib/data";

// Deliberately short. The wave counts from index 0, so on a very long list a
// slow wave would leave everything below the fold in skeletons for minutes.
const people = makePeople(150);

const code = `"use client";

import { VirtualRenderWave } from "react-render-wave";

// Rows the wave has not reached yet render through renderSkeleton.
// With transition enabled, each row fades in as it is revealed.

export default function Page() {
  return (
    <VirtualRenderWave
      items={people}
      itemHeight={64}
      containerHeight={480}
      batchSize={6}
      interval={180}
      transition
      getItemKey={(person) => person.id}
      renderItem={(person) => <Row person={person} />}
      renderSkeleton={() => (
        <div className="h-16 p-4">
          <div className="skeleton-bar h-3 w-40 rounded bg-neutral-300" />
        </div>
      )}
    />
  );
}`;

export default function SkeletonsExample() {
  const [transition, setTransition] = useState(true);
  const [batchSize, setBatchSize] = useState(6);
  const [interval, setIntervalMs] = useState(180);
  const [run, setRun] = useState(0);

  return (
    <ExampleShell
      title="Skeletons and transitions"
      description={
        <>
          The wave is slowed down here so you can watch it.{" "}
          <code className="font-mono text-sm">renderSkeleton</code> fills rows
          the wave has not reached yet, and{" "}
          <code className="font-mono text-sm">transition</code> fades each row
          in as it arrives. Replay to start the wave over, and scroll down
          mid-wave to see rows that are windowed in but not yet revealed.
        </>
      }
      code={code}
    >
      <Controls>
        <NumberInput
          label="batchSize"
          value={batchSize}
          min={1}
          max={100}
          onChange={setBatchSize}
        />
        <NumberInput
          label="interval (ms)"
          value={interval}
          min={0}
          max={2000}
          onChange={setIntervalMs}
        />
        <Checkbox
          label="transition"
          checked={transition}
          onChange={setTransition}
        />
        <Button onClick={() => setRun((n) => n + 1)}>Replay</Button>
      </Controls>

      <Demo>
        <VirtualRenderWave
          key={run}
          items={people}
          itemHeight={64}
          containerHeight={480}
          overscan={4}
          batchSize={batchSize}
          interval={interval}
          transition={transition}
          getItemKey={(person) => person.id}
          ariaLabel="People"
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
          renderSkeleton={() => (
            <div className="flex h-16 flex-col justify-center gap-2 border-b border-neutral-100 px-4 dark:border-neutral-800">
              <div className="skeleton-bar h-3 w-40 rounded bg-neutral-300 dark:bg-neutral-700" />
              <div className="skeleton-bar h-2.5 w-56 rounded bg-neutral-200 dark:bg-neutral-800" />
            </div>
          )}
        />
      </Demo>
    </ExampleShell>
  );
}
