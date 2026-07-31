"use client";

import { useRef, useState } from "react";
import {
  VirtualRenderWave,
  type VirtualRenderWaveHandle,
} from "react-render-wave";
import { Demo, ExampleShell } from "@/components/ExampleShell";
import { Button, Controls, NumberInput, Stat } from "@/components/ui";
import { makePeople } from "@/lib/data";

const people = makePeople(5_000);

const code = `"use client";

import { useRef } from "react";
import {
  VirtualRenderWave,
  type VirtualRenderWaveHandle,
} from "react-render-wave";

export default function Page() {
  const handle = useRef<VirtualRenderWaveHandle>(null);

  return (
    <>
      <button onClick={() => handle.current?.scrollTo(2500)}>
        Jump to 2500
      </button>
      <button onClick={() => handle.current?.scrollTo(0, "auto")}>
        Jump to top instantly
      </button>

      <VirtualRenderWave
        ref={handle}
        items={people}
        itemHeight={56}
        containerHeight={420}
        batchSize={people.length}
        keyboardNavigation
        ariaLabel="People"
        renderItem={(person) => <Row person={person} />}
      />
    </>
  );
}`;

export default function KeyboardExample() {
  const handle = useRef<VirtualRenderWaveHandle>(null);
  const [target, setTarget] = useState(2_500);
  const [range, setRange] = useState("");

  const readVisible = () => {
    const visible = handle.current?.getVisibleIndexes() ?? [];
    setRange(
      visible.length
        ? `${visible[0]} to ${visible[visible.length - 1]}`
        : "none"
    );
  };

  return (
    <ExampleShell
      title="Keyboard and imperative scroll"
      description={
        <>
          With{" "}
          <code className="font-mono text-sm">keyboardNavigation</code> the
          container becomes focusable. Click the list, then use the arrow keys,
          Page Up and Page Down, Home and End. The handle exposes{" "}
          <code className="font-mono text-sm">scrollTo</code>,{" "}
          <code className="font-mono text-sm">scrollToOffset</code>,{" "}
          <code className="font-mono text-sm">getVisibleIndexes</code>, and{" "}
          <code className="font-mono text-sm">getScrollElement</code>.
        </>
      }
      code={code}
    >
      <Controls>
        <NumberInput
          label="Index"
          value={target}
          min={0}
          max={people.length - 1}
          onChange={setTarget}
        />
        <Button onClick={() => handle.current?.scrollTo(target)}>
          Scroll to index
        </Button>
        <Button onClick={() => handle.current?.scrollTo(0, "auto")}>
          Jump to top
        </Button>
        <Button onClick={readVisible}>Read visible range</Button>
        {range && <Stat label="Visible indexes" value={range} highlight />}
      </Controls>

      <Demo>
        <VirtualRenderWave
          ref={handle}
          items={people}
          itemHeight={56}
          containerHeight={420}
          overscan={5}
          batchSize={people.length}
          keyboardNavigation
          getItemKey={(person) => person.id}
          ariaLabel="People"
          className="focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
          renderItem={(person, index) => (
            <div className="flex h-14 items-center gap-3 border-b border-neutral-100 px-4 dark:border-neutral-800">
              <span className="w-14 shrink-0 font-mono text-xs text-neutral-400 dark:text-neutral-500">
                {index}
              </span>
              <div className="min-w-0">
                <div className="truncate text-sm font-medium text-neutral-900 dark:text-neutral-100">
                  {person.name}
                </div>
                <div className="truncate text-xs text-neutral-500 dark:text-neutral-400">
                  {person.email}
                </div>
              </div>
            </div>
          )}
        />
      </Demo>
    </ExampleShell>
  );
}
