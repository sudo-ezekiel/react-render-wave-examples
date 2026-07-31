"use client";

import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { VirtualRenderWave, type VirtualRenderWaveHandle } from "react-render-wave";
import { Demo, ExampleShell } from "@/components/ExampleShell";
import { makeMessages } from "@/lib/data";

const POOL = makeMessages(2_000);
const PAGE_SIZE = 40;

const code = `"use client";

// Two things make a transcript different from a plain list: it opens at the
// BOTTOM, and older messages arrive at the TOP. Prepending shifts every index
// down, so without compensation the view jumps by however many you loaded.

const ref = useRef<VirtualRenderWaveHandle>(null);
const [count, setCount] = useState(60);
const messages = useMemo(() => POOL.slice(POOL.length - count), [count]);

// Open on the newest message.
useLayoutEffect(() => {
  ref.current?.scrollTo(messages.length - 1, "auto");
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

// After older messages are prepended, put the anchor row back where it was.
const anchor = useRef<number | null>(null);
useLayoutEffect(() => {
  if (anchor.current === null) return;
  ref.current?.scrollTo(anchor.current + PAGE_SIZE, "auto");
  anchor.current = null;
}, [count]);

const onScroll = (top: number) => {
  if (top > 240 || anchor.current !== null) return;
  if (count >= POOL.length) return;
  const [first] = ref.current?.getVisibleIndexes() ?? [0];
  anchor.current = first;            // remember before the indexes shift
  setCount((c) => Math.min(c + PAGE_SIZE, POOL.length));
};

<VirtualRenderWave
  ref={ref}
  items={messages}
  itemHeight={72}                    // estimate; bubbles are measured
  batchSize={messages.length}
  getItemKey={(m) => m.id}
  onScroll={onScroll}
  style={{ height: "100%" }}
  renderItem={(m) => <Bubble message={m} />}
/>`;

export default function ChatExample() {
  const ref = useRef<VirtualRenderWaveHandle>(null);
  const [count, setCount] = useState(60);
  const messages = useMemo(() => POOL.slice(POOL.length - count), [count]);
  const anchor = useRef<number | null>(null);

  useLayoutEffect(() => {
    ref.current?.scrollTo(count - 1, "auto");
    // Only on mount: this opens the transcript at the newest message.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useLayoutEffect(() => {
    if (anchor.current === null) return;
    ref.current?.scrollTo(anchor.current + PAGE_SIZE, "auto");
    anchor.current = null;
  }, [count]);

  const atStart = count >= POOL.length;

  return (
    <ExampleShell
      title="Chat transcript"
      description={
        <>
          Message bubbles are whatever height their text needs, the view opens
          on the newest one, and scrolling to the top loads another 40 older
          messages without the content jumping under you.
        </>
      }
      code={code}
    >
      <Demo>
        <div className="h-[480px]">
          <VirtualRenderWave
            ref={ref}
            items={messages}
            itemHeight={72}
            batchSize={messages.length}
            overscan={6}
            getItemKey={(message) => message.id}
            ariaLabel="Chat transcript"
            style={{ height: "100%" }}
            onScroll={(top) => {
              if (top > 240 || anchor.current !== null || atStart) return;
              const [first] = ref.current?.getVisibleIndexes() ?? [0];
              anchor.current = first;
              setCount((c) => Math.min(c + PAGE_SIZE, POOL.length));
            }}
            renderItem={(message) => (
              <div
                className={`flex px-4 py-2 ${
                  message.mine ? "justify-end" : "justify-start"
                }`}
              >
                <div className="max-w-[78%]">
                  {!message.mine && (
                    <div className="mb-1 text-xs font-medium text-neutral-500 dark:text-neutral-400">
                      {message.author}
                    </div>
                  )}
                  <div
                    className={`rounded-2xl px-3 py-2 text-sm ${
                      message.mine
                        ? "bg-cyan-600 text-white"
                        : "bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-100"
                    }`}
                  >
                    {message.body}
                  </div>
                  <div
                    className={`mt-1 text-[11px] text-neutral-400 ${
                      message.mine ? "text-right" : ""
                    }`}
                  >
                    {message.time}
                  </div>
                </div>
              </div>
            )}
          />
        </div>
      </Demo>
      <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400">
        {atStart
          ? `Beginning of the conversation. ${messages.length} messages loaded.`
          : `${messages.length} of ${POOL.length} messages loaded. Scroll to the top for more.`}
      </p>
    </ExampleShell>
  );
}
