"use client";

import { useState } from "react";
import { VirtualRenderWave } from "react-render-wave";
import { Demo, ExampleShell } from "@/components/ExampleShell";
import { Checkbox, Controls } from "@/components/ui";
import { makePosts } from "@/lib/data";

const posts = makePosts(5_000);

const code = `"use client";

import { VirtualRenderWave } from "react-render-wave";

// itemHeight is only the estimate used until a row has been measured.
// Rows are measured with a ResizeObserver as they mount, and the
// measurements persist after they unmount, so scrolling back never jumps.

export default function Page() {
  return (
    <VirtualRenderWave
      items={posts}
      itemHeight={96}
      containerHeight={480}
      batchSize={posts.length}
      getItemKey={(post) => post.id}
      renderItem={(post) => (
        <article className="p-4">
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </article>
      )}
    />
  );
}`;

export default function DynamicHeightsExample() {
  const [clamp, setClamp] = useState(false);

  return (
    <ExampleShell
      title="Dynamic heights"
      description={
        <>
          These posts have bodies of different lengths and no fixed row height.{" "}
          <code className="font-mono text-sm">itemHeight</code> is only the
          estimate used before a row has been measured. Toggling the clamp
          changes every row&apos;s height at once, and the list re-measures in
          place.
        </>
      }
      code={code}
    >
      <Controls>
        <Checkbox
          label="Clamp bodies to one line"
          checked={clamp}
          onChange={setClamp}
        />
      </Controls>

      <Demo>
        <VirtualRenderWave
          items={posts}
          itemHeight={96}
          containerHeight={480}
          overscan={4}
          batchSize={posts.length}
          getItemKey={(post) => post.id}
          ariaLabel="Posts"
          renderItem={(post) => (
            <article className="border-b border-neutral-100 p-4 dark:border-neutral-800">
              <h3 className="font-medium text-neutral-900 dark:text-neutral-100">
                {post.title}
              </h3>
              <p
                className={`mt-1 text-sm text-neutral-600 dark:text-neutral-400 ${
                  clamp ? "truncate" : ""
                }`}
              >
                {post.body}
              </p>
            </article>
          )}
        />
      </Demo>
    </ExampleShell>
  );
}
