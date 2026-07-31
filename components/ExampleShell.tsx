import type { ReactNode } from "react";
import { CodeBlock } from "./CodeBlock";

export function ExampleShell({
  title,
  description,
  code,
  children,
}: {
  title: string;
  description: ReactNode;
  code: string;
  children: ReactNode;
}) {
  return (
    <article className="mx-auto w-full max-w-3xl">
      <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50">
        {title}
      </h1>
      <div className="mt-2 text-neutral-600 dark:text-neutral-400">
        {description}
      </div>

      <div className="mt-8">{children}</div>

      <h2 className="mb-3 mt-10 text-sm font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
        Source
      </h2>
      <CodeBlock code={code} />
    </article>
  );
}

/** Bordered surface the live list sits in. */
export function Demo({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900">
      {children}
    </div>
  );
}

/** Page frame for a recipe: prose and code, with an optional live demo. */
export function RecipeShell({
  title,
  description,
  children,
}: {
  title: string;
  description: ReactNode;
  children: ReactNode;
}) {
  return (
    <article className="mx-auto w-full max-w-3xl">
      <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50">
        {title}
      </h1>
      <div className="mt-2 text-neutral-600 dark:text-neutral-400">
        {description}
      </div>
      <div className="mt-8 flex flex-col gap-6">{children}</div>
    </article>
  );
}

export function H2({ children }: { children: ReactNode }) {
  return (
    <h2 className="mt-4 text-lg font-semibold text-neutral-900 dark:text-neutral-100">
      {children}
    </h2>
  );
}

export function P({ children }: { children: ReactNode }) {
  return (
    <p className="text-neutral-600 dark:text-neutral-400">{children}</p>
  );
}

export function Code({ children }: { children: ReactNode }) {
  return (
    <code className="rounded bg-neutral-200 px-1 py-0.5 font-mono text-[0.9em] text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200">
      {children}
    </code>
  );
}

/** Callout for a caveat worth stopping on. */
export function Note({
  tone = "info",
  children,
}: {
  tone?: "info" | "warn";
  children: ReactNode;
}) {
  const styles =
    tone === "warn"
      ? "border-amber-300 bg-amber-50 text-amber-900 dark:border-amber-900 dark:bg-amber-950/50 dark:text-amber-200"
      : "border-cyan-300 bg-cyan-50 text-cyan-900 dark:border-cyan-900 dark:bg-cyan-950/50 dark:text-cyan-200";
  return (
    <div className={`rounded-lg border px-4 py-3 text-sm ${styles}`}>
      {children}
    </div>
  );
}
