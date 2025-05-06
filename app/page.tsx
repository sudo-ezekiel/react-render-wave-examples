"use client";

import React from "react";
import { VirtualRenderWave } from "react-render-wave";

export default function Home() {
  const length = 2500;

  const items: string[] = Array.from({ length: 10000 }, (_, i) => `Item ${i}`);

  return (
    <div className="min-h-screen p-8 sm:p-20 flex flex-col items-center gap-10 font-sans">
      <h1 className="text-2xl font-bold">
        React Render Wave in Next.js {length}
      </h1>

      <div className="w-full max-w-md flex flex-col gap-4">
        <VirtualRenderWave
          items={items}
          itemHeight={50}
          containerHeight={600}
          batchSize={50}
          interval={20}
          renderItem={(item) => (
            <div style={{ padding: "12px", borderBottom: "1px solid #ddd" }}>
              {item}
            </div>
          )}
        />
      </div>

      <footer className="mt-20 text-sm text-neutral-500">
        Powered by <strong>react-render-wave</strong>
      </footer>
    </div>
  );
}
