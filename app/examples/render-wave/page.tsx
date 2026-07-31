"use client";

import { useState } from "react";
import { RenderWave } from "react-render-wave";
import { ExampleShell } from "@/components/ExampleShell";
import { Button, Controls, NumberInput, Stat } from "@/components/ui";

const cells = Array.from({ length: 600 }, (_, i) => i);

const code = `"use client";

import { RenderWave } from "react-render-wave";

// No virtualization here: every cell stays mounted once revealed.
// The point is to spread the mounting cost over several frames instead
// of blocking the main thread with one enormous commit.

export default function Page() {
  const [done, setDone] = useState(false);

  return (
    <div className="grid grid-cols-12 gap-1">
      <RenderWave
        items={cells}
        batchSize={24}
        interval={30}
        onComplete={() => setDone(true)}
        renderItem={(cell) => <Tile key={cell} value={cell} />}
      />
    </div>
  );
}`;

export default function RenderWaveExample() {
  const [batchSize, setBatchSize] = useState(24);
  const [interval, setIntervalMs] = useState(30);
  const [done, setDone] = useState(false);
  const [run, setRun] = useState(0);

  return (
    <ExampleShell
      title="Progressive rendering"
      description={
        <>
          <code className="font-mono text-sm">RenderWave</code> has no
          virtualization: every item stays mounted once revealed. It is for
          content that all has to be there eventually but should not land in a
          single blocking commit. Lower the batch size or raise the interval to
          make the wave obvious.
        </>
      }
      code={code}
    >
      <Controls>
        <NumberInput
          label="batchSize"
          value={batchSize}
          min={1}
          max={200}
          onChange={setBatchSize}
        />
        <NumberInput
          label="interval (ms)"
          value={interval}
          min={0}
          max={500}
          onChange={setIntervalMs}
        />
        <Button
          onClick={() => {
            setDone(false);
            setRun((n) => n + 1);
          }}
        >
          Replay
        </Button>
        <Stat
          label="Status"
          value={done ? "Complete" : "Rendering"}
          highlight={!done}
        />
      </Controls>

      <div
        key={run}
        className="grid grid-cols-[repeat(auto-fill,minmax(2rem,1fr))] gap-1.5 rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900"
      >
        <RenderWave
          items={cells}
          batchSize={batchSize}
          interval={interval}
          onComplete={() => setDone(true)}
          renderItem={(cell) => (
            <div
              key={cell}
              title={`Cell ${cell}`}
              className="aspect-square rounded-md"
              style={{ backgroundColor: `hsl(${(cell * 11) % 360} 65% 58%)` }}
            />
          )}
        />
      </div>
    </ExampleShell>
  );
}
