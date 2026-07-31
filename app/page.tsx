import Link from "next/link";
import { examples } from "@/lib/examples";
import { CodeBlock } from "@/components/CodeBlock";

export default function Home() {
  return (
    <div className="mx-auto w-full max-w-3xl">
      <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-50">
        React Render Wave
      </h1>
      <p className="mt-3 text-lg text-neutral-600 dark:text-neutral-400">
        Progressive wave rendering and lightweight virtual scrolling for React
        lists. Every example on this site is a real page in this repository, so
        you can copy one and run it.
      </p>

      <div className="mt-6">
        <CodeBlock code={`npm install react-render-wave`} />
      </div>

      <p className="mt-6 text-neutral-600 dark:text-neutral-400">
        Mounting thousands of components in a single commit blocks the main
        thread. Render Wave splits that work into small timed batches, so the
        first paint happens immediately and the rest streams in.{" "}
        <code className="rounded bg-neutral-200 px-1 py-0.5 font-mono text-sm dark:bg-neutral-800">
          VirtualRenderWave
        </code>{" "}
        adds windowing on top: only the rows in view exist in the DOM.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {examples.map((example) => (
          <Link
            key={example.slug}
            href={`/examples/${example.slug}`}
            className="group rounded-xl border border-neutral-200 bg-white p-5 transition hover:border-cyan-400 hover:shadow-sm dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-cyan-600"
          >
            <div className="font-mono text-xs text-cyan-600 dark:text-cyan-400">
              {example.api}
            </div>
            <h2 className="mt-1 font-semibold text-neutral-900 group-hover:text-cyan-700 dark:text-neutral-100 dark:group-hover:text-cyan-300">
              {example.title}
            </h2>
            <p className="mt-1.5 text-sm text-neutral-600 dark:text-neutral-400">
              {example.blurb}
            </p>
          </Link>
        ))}
      </div>

      <h2 className="mt-14 text-xl font-bold text-neutral-900 dark:text-neutral-50">
        Coming from v2?
      </h2>
      <p className="mt-2 text-neutral-600 dark:text-neutral-400">
        v3 is a rewrite of the internals with a close-to-compatible component
        API. The WebAssembly layer is gone, so there is no bundler
        configuration and no <code className="font-mono text-sm">.wasm</code>{" "}
        asset. The one signature break is the hook, which now returns an object:
      </p>
      <div className="mt-4">
        <CodeBlock
          code={`// v2
const indexes = useRenderWave({ length: items.length });

// v3
const { indexes, count, isComplete, reset } = useRenderWave({
  length: items.length,
});`}
        />
      </div>
      <p className="mt-4 text-neutral-600 dark:text-neutral-400">
        The full migration list lives in the{" "}
        <a
          href="https://github.com/sudo-ezekiel/react-render-wave#-migrating-from-v2"
          target="_blank"
          rel="noreferrer"
          className="font-medium text-cyan-600 underline-offset-2 hover:underline dark:text-cyan-400"
        >
          package README
        </a>
        .
      </p>
    </div>
  );
}
