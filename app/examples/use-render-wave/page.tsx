"use client";

import { useState } from "react";
import { useRenderWave } from "react-render-wave";
import { ExampleShell } from "@/components/ExampleShell";
import { Button, Checkbox, Controls, Stat } from "@/components/ui";
import { makePeople } from "@/lib/data";

const people = makePeople(240);

const code = `"use client";

import { useRenderWave } from "react-render-wave";

export default function Page() {
  const [enabled, setEnabled] = useState(true);

  const { count, isComplete, reset } = useRenderWave({
    length: people.length,
    batchSize: 8,
    interval: 90,
    enabled,
  });

  return (
    <>
      <progress value={count} max={people.length} />
      <button onClick={reset} disabled={!isComplete}>
        Replay
      </button>

      {people.slice(0, count).map((person) => (
        <Card key={person.id} person={person} />
      ))}
    </>
  );
}`;

export default function UseRenderWaveExample() {
  const [enabled, setEnabled] = useState(true);

  const { count, indexes, isComplete, reset } = useRenderWave({
    length: people.length,
    batchSize: 8,
    interval: 90,
    enabled,
  });

  const progress = Math.round((count / people.length) * 100);

  return (
    <ExampleShell
      title="The hook directly"
      description={
        <>
          <code className="font-mono text-sm">useRenderWave</code> is the engine
          behind both components. Use it when you want the reveal schedule but
          your own markup. It returns{" "}
          <code className="font-mono text-sm">count</code>,{" "}
          <code className="font-mono text-sm">indexes</code>,{" "}
          <code className="font-mono text-sm">isComplete</code>, and{" "}
          <code className="font-mono text-sm">reset</code>, and{" "}
          <code className="font-mono text-sm">enabled</code> pauses it mid-wave.
        </>
      }
      code={code}
    >
      <Controls>
        <Checkbox label="enabled" checked={enabled} onChange={setEnabled} />
        <Button onClick={reset}>Replay</Button>
        <Stat label="Revealed" value={`${count} / ${people.length}`} />
        <Stat
          label="Status"
          value={isComplete ? "Complete" : enabled ? "Revealing" : "Paused"}
          highlight={!isComplete}
        />
      </Controls>

      <div className="mb-5 h-2 overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-800">
        <div
          className="h-full rounded-full bg-cyan-500 transition-[width] duration-200"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {indexes.map((index) => {
          const person = people[index];
          return (
            <div
              key={person.id}
              className="rounded-lg border border-neutral-200 bg-white p-3 dark:border-neutral-800 dark:bg-neutral-900"
            >
              <div className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                {person.name}
              </div>
              <div className="mt-0.5 truncate text-xs text-neutral-500 dark:text-neutral-400">
                {person.email}
              </div>
            </div>
          );
        })}
      </div>
    </ExampleShell>
  );
}
