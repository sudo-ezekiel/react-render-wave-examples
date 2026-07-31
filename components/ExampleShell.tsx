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
