"use client";

import { useRef, useState } from "react";
import {
  VirtualRenderWave,
  type ScrollAlign,
  type VirtualRange,
  type VirtualRenderWaveHandle,
} from "react-render-wave";
import { Demo, ExampleShell } from "@/components/ExampleShell";
import { Button, Checkbox, Controls, NumberInput, Stat } from "@/components/ui";
import { makePeople, type Person } from "@/lib/data";

const people = makePeople(20_000);

const ALIGNS: ScrollAlign[] = ["start", "center", "end", "auto"];

const OPEN_AT = 12_450;

const code = `"use client";

import { useRef, useState } from "react";
import {
  VirtualRenderWave,
  type ScrollAlign,
  type VirtualRange,
  type VirtualRenderWaveHandle,
} from "react-render-wave";

const people = makePeople(20_000);
const ALIGNS: ScrollAlign[] = ["start", "center", "end", "auto"];
const OPEN_AT = 12_450;

export default function Page() {
  const handle = useRef<VirtualRenderWaveHandle>(null);
  const [target, setTarget] = useState(OPEN_AT);
  const [align, setAlign] = useState<ScrollAlign>("start");
  const [smooth, setSmooth] = useState(true);
  const [range, setRange] = useState<VirtualRange | null>(null);

  return (
    <>
      {ALIGNS.map((value) => (
        <button key={value} onClick={() => setAlign(value)}>
          {value}
        </button>
      ))}
      <button
        onClick={() =>
          handle.current?.scrollTo(target, {
            align,
            behavior: smooth ? "smooth" : "auto",
          })
        }
      >
        Scroll to index
      </button>

      {/* Both ranges are half open: end and visibleEnd are one past the
          last index. */}
      <p>
        Rendered {range?.start} to {range?.end}, visible {range?.visibleStart}{" "}
        to {range?.visibleEnd}
      </p>

      <VirtualRenderWave
        ref={handle}
        items={people}
        itemHeight={56}
        containerHeight={420}
        overscan={5}
        batchSize={people.length}
        getItemKey={(person) => person.id}
        ariaLabel="People"
        onRangeChange={setRange}
        renderItem={(person, index) => (
          <Row person={person} index={index} height="h-14" />
        )}
      />

      {/* Read once at mount. The first paint and the server markup are
          already scrolled to this row, so nothing jumps afterwards. */}
      <VirtualRenderWave
        items={people}
        itemHeight={44}
        containerHeight={220}
        overscan={5}
        batchSize={people.length}
        initialScrollIndex={OPEN_AT}
        getItemKey={(person) => person.id}
        ariaLabel="People, opened at row 12,450"
        renderItem={(person, index) => (
          <Row person={person} index={index} height="h-11" />
        )}
      />
    </>
  );
}`;

function Row({
  person,
  index,
  height,
}: {
  person: Person;
  index: number;
  height: string;
}) {
  return (
    <div
      className={`flex ${height} items-center gap-3 border-b border-neutral-100 px-4 dark:border-neutral-800`}
    >
      <span className="w-16 shrink-0 font-mono text-xs text-neutral-400 dark:text-neutral-500">
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
  );
}

export default function ScrollControlExample() {
  const handle = useRef<VirtualRenderWaveHandle>(null);
  const [target, setTarget] = useState(OPEN_AT);
  const [align, setAlign] = useState<ScrollAlign>("start");
  const [smooth, setSmooth] = useState(true);
  const [range, setRange] = useState<VirtualRange | null>(null);

  const scroll = () => {
    handle.current?.scrollTo(target, {
      align,
      behavior: smooth ? "smooth" : "auto",
    });
  };

  return (
    <ExampleShell
      title="Scroll control"
      description={
        <>
          <code className="font-mono text-sm">scrollTo</code> takes an index and{" "}
          <code className="font-mono text-sm">{"{ align, behavior }"}</code>.
          Pick a row and an alignment, then watch the two ranges below, which
          come from{" "}
          <code className="font-mono text-sm">onRangeChange</code>.
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
        {ALIGNS.map((value) => (
          <Button key={value} onClick={() => setAlign(value)}>
            {value}
          </Button>
        ))}
        <Checkbox label="smooth" checked={smooth} onChange={setSmooth} />
        <Button onClick={scroll}>Scroll to index</Button>
      </Controls>

      <Controls>
        <Stat label="Align" value={align} highlight />
        <Stat label="Behavior" value={smooth ? "smooth" : "auto (instant)"} />
        <Stat
          label="Rendered range"
          value={range ? `${range.start} to ${range.end}` : "-"}
        />
        <Stat
          label="Visible range"
          value={range ? `${range.visibleStart} to ${range.visibleEnd}` : "-"}
        />
      </Controls>

      <Demo>
        <VirtualRenderWave
          ref={handle}
          items={people}
          itemHeight={56}
          containerHeight={420}
          overscan={5}
          batchSize={people.length}
          getItemKey={(person) => person.id}
          ariaLabel="People"
          onRangeChange={setRange}
          renderItem={(person, index) => (
            <Row person={person} index={index} height="h-14" />
          )}
        />
      </Demo>

      <div className="mt-6 flex flex-col gap-3 text-neutral-600 dark:text-neutral-400">
        <p>
          <code className="font-mono text-sm">start</code> puts the row at the
          top of the viewport, <code className="font-mono text-sm">end</code>{" "}
          puts it at the bottom, and{" "}
          <code className="font-mono text-sm">center</code> puts it in the
          middle. <code className="font-mono text-sm">auto</code> only scrolls
          when the row is not already fully visible. Scroll with{" "}
          <code className="font-mono text-sm">auto</code> twice in a row: the
          second press moves nothing, and neither range changes.
        </p>
        <p>
          Both ranges are half open.{" "}
          <code className="font-mono text-sm">end</code> and{" "}
          <code className="font-mono text-sm">visibleEnd</code> are one past the
          last index, so a rendered range of 0 to 12 means twelve rows. The
          rendered range is wider than the visible one by the overscan.
        </p>
        <p>
          On the handle{" "}
          <code className="font-mono text-sm">behavior</code> defaults to{" "}
          <code className="font-mono text-sm">smooth</code>, and{" "}
          <code className="font-mono text-sm">align</code> defaults to{" "}
          <code className="font-mono text-sm">start</code>. The 3.0 signature{" "}
          <code className="font-mono text-sm">
            scrollTo(index, &quot;auto&quot;)
          </code>{" "}
          still works, where the string is the behavior: that one is an instant
          scroll, not the <code className="font-mono text-sm">auto</code>{" "}
          alignment.
        </p>
      </div>

      <h2 className="mb-3 mt-10 text-sm font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
        Opening on a row
      </h2>

      <div className="mb-4 flex flex-col gap-3 text-neutral-600 dark:text-neutral-400">
        <p>
          The list below has{" "}
          <code className="font-mono text-sm">
            initialScrollIndex={"{"}12_450{"}"}
          </code>
          . It is already at row 12,450 on its first paint, and no scroll runs
          after mount. This page is exported as static HTML, so the server
          markup holds that window too.
        </p>
        <p>
          The prop is read once. Changing it later does nothing; use{" "}
          <code className="font-mono text-sm">scrollToIndex</code> or the handle
          to move after mount.{" "}
          <code className="font-mono text-sm">initialScrollOffset</code> does
          the same job in pixels, and{" "}
          <code className="font-mono text-sm">initialScrollIndex</code> wins
          when both are set. With rows taller or shorter than{" "}
          <code className="font-mono text-sm">itemHeight</code>, the offset is
          corrected once the rows above have been measured.
        </p>
      </div>

      <Demo>
        <VirtualRenderWave
          items={people}
          itemHeight={44}
          containerHeight={220}
          overscan={5}
          batchSize={people.length}
          initialScrollIndex={OPEN_AT}
          getItemKey={(person) => person.id}
          ariaLabel="People, opened at row 12,450"
          renderItem={(person, index) => (
            <Row person={person} index={index} height="h-11" />
          )}
        />
      </Demo>
    </ExampleShell>
  );
}
