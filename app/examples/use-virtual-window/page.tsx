"use client";

import { useCallback } from "react";
import { useVirtualWindow } from "react-render-wave";
import {
  Code,
  Demo,
  ExampleShell,
  H2,
  Note,
  P,
} from "@/components/ExampleShell";
import { Button, Controls, Stat } from "@/components/ui";
import { makePosts } from "@/lib/data";

const posts = makePosts(20_000);

const code = `"use client";

import { useCallback } from "react";
import { useVirtualWindow } from "react-render-wave";

const posts = makePosts(20_000);

export default function Page() {
  // A new function identity is read as a reorder, so memoize it on the data.
  const getItemKey = useCallback((index: number) => posts[index].id, []);

  const {
    scrollRef,
    measureRef,
    virtualItems,
    totalSize,
    scrollToIndex,
    scrollToOffset,
  } = useVirtualWindow({
    count: posts.length,
    estimateSize: 96,
    overscan: 5,
    getItemKey,
  });

  return (
    <>
      <button onClick={() => scrollToIndex(0)}>Top</button>
      <button onClick={() => scrollToIndex(10_000, { align: "center" })}>
        Centre row 10,000
      </button>
      <button
        onClick={() => scrollToIndex(posts.length - 1, { align: "end" })}
      >
        Last row
      </button>
      <button onClick={() => scrollToOffset(250_000)}>Offset 250,000px</button>

      {/* 1. the scroll container: a constrained height and overflow auto */}
      <div
        ref={scrollRef}
        role="list"
        aria-label="Posts"
        style={{ height: 480, overflowY: "auto" }}
      >
        {/* 2. the sizer: as tall as the whole list */}
        <div style={{ position: "relative", height: totalSize }}>
          {/* 3. the items: absolutely positioned at their offset */}
          {virtualItems.map((item) => {
            const post = posts[item.index];
            return (
              <article
                key={item.key}
                ref={measureRef(item.index)}
                role="listitem"
                style={{
                  position: "absolute",
                  top: item.offset,
                  left: 0,
                  width: "100%",
                }}
              >
                <h3>{post.title}</h3>
                <p>{post.body}</p>
              </article>
            );
          })}
        </div>
      </div>
    </>
  );
}`;

export default function UseVirtualWindowExample() {
  const getItemKey = useCallback((index: number) => posts[index].id, []);

  const {
    scrollRef,
    measureRef,
    virtualItems,
    start,
    end,
    visibleStart,
    visibleEnd,
    totalSize,
    scrollOffset,
    scrollToIndex,
    scrollToOffset,
  } = useVirtualWindow({
    count: posts.length,
    estimateSize: 96,
    overscan: 5,
    getItemKey,
  });

  return (
    <ExampleShell
      title="Headless windowing"
      description={
        <>
          <code className="font-mono text-sm">useVirtualWindow</code> is the
          windowing engine on its own: which rows to render, where to put them,
          and how to scroll to one. It renders nothing and owns no styles, so
          every element below is written by this page. Twenty thousand posts,
          measured as they mount.
        </>
      }
      code={code}
    >
      <Controls>
        <Stat label="Rows in the DOM" value={virtualItems.length} highlight />
        <Stat label="Rendered range" value={`${start} to ${end}`} />
        <Stat
          label="Visible range"
          value={`${visibleStart} to ${visibleEnd}`}
        />
        <Stat
          label="Total size"
          value={`${Math.round(totalSize).toLocaleString()}px`}
        />
        <Stat
          label="Scroll offset"
          value={`${Math.round(scrollOffset).toLocaleString()}px`}
        />
      </Controls>

      <Controls>
        <Button onClick={() => scrollToIndex(0)}>Top</Button>
        <Button onClick={() => scrollToIndex(10_000, { align: "center" })}>
          Centre row 10,000
        </Button>
        <Button
          onClick={() => scrollToIndex(posts.length - 1, { align: "end" })}
        >
          Last row
        </Button>
        <Button onClick={() => scrollToOffset(250_000)}>
          Offset 250,000px
        </Button>
      </Controls>

      <Demo>
        <div
          ref={scrollRef}
          role="list"
          aria-label="Posts"
          style={{ height: 480, overflowY: "auto" }}
        >
          <div style={{ position: "relative", height: totalSize }}>
            {virtualItems.map((item) => {
              const post = posts[item.index];
              return (
                <article
                  key={item.key}
                  ref={measureRef(item.index)}
                  role="listitem"
                  style={{
                    position: "absolute",
                    top: item.offset,
                    left: 0,
                    width: "100%",
                  }}
                  className="border-b border-neutral-100 p-4 dark:border-neutral-800"
                >
                  <div className="flex items-baseline gap-3">
                    <span className="w-16 shrink-0 font-mono text-xs text-neutral-400 dark:text-neutral-500">
                      {item.index}
                    </span>
                    <h3 className="font-medium text-neutral-900 dark:text-neutral-100">
                      {post.title}
                    </h3>
                  </div>
                  <p className="mt-1 pl-[4.75rem] text-sm text-neutral-600 dark:text-neutral-400">
                    {post.body}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </Demo>

      <div className="mt-10 flex flex-col gap-4">
        <H2>The three parts have to line up</H2>
        <P>
          A scroll container with a constrained height and{" "}
          <Code>overflow: auto</Code>, carrying <Code>scrollRef</Code>. A sizer
          inside it with <Code>position: relative</Code> and a height of{" "}
          <Code>totalSize</Code>, so the scrollbar measures the whole list and
          not the handful of rows that are mounted. And every entry in{" "}
          <Code>virtualItems</Code> positioned absolutely at{" "}
          <Code>item.offset</Code>. Miss one of the three and the list either
          refuses to scroll or draws all its rows on top of each other.
        </P>
        <P>
          <Code>measureRef(item.index)</Code> measures a row as it mounts and
          keeps the offsets honest when it turns out taller than{" "}
          <Code>estimateSize</Code>. These posts have bodies of different
          lengths, so they need it. When every row is the same height, drop it
          and let <Code>estimateSize</Code> stand.
        </P>

        <H2>The ranges are half open</H2>
        <P>
          <Code>start</Code> to <Code>end</Code> is what is rendered, overscan
          included. <Code>visibleStart</Code> to <Code>visibleEnd</Code> is what
          intersects the viewport. Both are half open: <Code>end</Code> and{" "}
          <Code>visibleEnd</Code> are exclusive, so the last rendered index is{" "}
          <Code>end - 1</Code> and <Code>end - start</Code> is the row count in
          the DOM. The stats above read those four numbers straight off the
          hook rather than counting nodes.
        </P>

        <H2>When to reach for the hook instead of the component</H2>
        <P>
          When the markup cannot be a list of divs the component controls: a
          table body, a grid, a scroll container that already exists further up
          the page, a layout with its own absolutely positioned furniture. Or
          when you want the windowing without the wave. Everywhere else{" "}
          <Code>VirtualRenderWave</Code> is the shorter path, because it is this
          hook with the rows, the keys, the reveal schedule and the sticky
          header already wired up.
        </P>

        <Note tone="warn">
          Memoize <Code>getItemKey</Code>. Measured sizes are stored by key, and
          a new function identity is read as a reorder of the data, which forces
          one O(count) rebuild of the offsets. Use <Code>useCallback</Code> on
          the data rather than a fresh arrow every render.
        </Note>
      </div>
    </ExampleShell>
  );
}
