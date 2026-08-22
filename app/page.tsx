import Link from "next/link";
import { sections } from "@/lib/examples";
import { CodeBlock } from "@/components/CodeBlock";

export default function Home() {
  return (
    <div className="mx-auto w-full max-w-3xl">
      <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-50">
        React Render Wave
      </h1>
      <p className="mt-3 text-lg text-neutral-600 dark:text-neutral-400">
        Progressive wave rendering and lightweight virtual scrolling for React
        lists. Every page on this site is a real page in the repository, so you
        can copy one and run it.
      </p>

      <p className="mt-6 text-neutral-600 dark:text-neutral-400">
        Mounting thousands of components in a single commit blocks the main
        thread. Render Wave splits that work into small timed batches, so the
        first paint happens immediately and the rest streams in.{" "}
        <code className="rounded bg-neutral-200 px-1 py-0.5 font-mono text-sm dark:bg-neutral-800">
          VirtualRenderWave
        </code>{" "}
        adds windowing on top: only the rows in view exist in the DOM. No
        dependencies, about 3.7 kB gzipped, ESM and CJS with types.
      </p>

      <div className="mt-6">
        <CodeBlock code={`npm install react-render-wave`} />
      </div>

      {sections.map((section) => (
        <section key={section.base}>
          <h2 className="mt-12 text-xl font-bold text-neutral-900 dark:text-neutral-50">
            {section.title}
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {section.entries.map((entry) => (
              <Link
                key={entry.slug}
                href={`${section.base}/${entry.slug}`}
                className="group rounded-xl border border-neutral-200 bg-white p-5 transition hover:border-cyan-400 hover:shadow-sm dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-cyan-600"
              >
                <div className="font-mono text-xs text-cyan-600 dark:text-cyan-400">
                  {entry.api}
                </div>
                <h3 className="mt-1 font-semibold text-neutral-900 group-hover:text-cyan-700 dark:text-neutral-100 dark:group-hover:text-cyan-300">
                  {entry.title}
                </h3>
                <p className="mt-1.5 text-sm text-neutral-600 dark:text-neutral-400">
                  {entry.blurb}
                </p>
              </Link>
            ))}
          </div>
        </section>
      ))}

      <h2 className="mt-14 text-xl font-bold text-neutral-900 dark:text-neutral-50">
        Where to start
      </h2>
      <p className="mt-2 text-neutral-600 dark:text-neutral-400">
        If you have a long list and want it to stop janking, read{" "}
        <Link
          href="/examples/basic"
          className="font-medium text-cyan-600 underline-offset-2 hover:underline dark:text-cyan-400"
        >
          Basic virtual list
        </Link>{" "}
        then{" "}
        <Link
          href="/recipes/batch-size"
          className="font-medium text-cyan-600 underline-offset-2 hover:underline dark:text-cyan-400"
        >
          Choosing batchSize
        </Link>
        . Those two cover most of what goes wrong. The{" "}
        <Link
          href="/api-reference"
          className="font-medium text-cyan-600 underline-offset-2 hover:underline dark:text-cyan-400"
        >
          API reference
        </Link>{" "}
        has every prop in one place.
      </p>
    </div>
  );
}
