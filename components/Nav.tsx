"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { examples } from "@/lib/examples";

/** Horizontally scrolling nav shown instead of the sidebar on small screens. */
export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="flex gap-2 overflow-x-auto pb-1">
      {[{ slug: "", title: "Overview" }, ...examples].map((example) => {
        const href = example.slug ? `/examples/${example.slug}` : "/";
        const active = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-sm transition ${
              active
                ? "border-cyan-200 bg-cyan-50 font-medium text-cyan-700 dark:border-cyan-900 dark:bg-cyan-950 dark:text-cyan-300"
                : "border-neutral-200 text-neutral-600 dark:border-neutral-800 dark:text-neutral-400"
            }`}
          >
            {example.title}
          </Link>
        );
      })}
    </nav>
  );
}

export function Nav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1">
      <Link
        href="/"
        className={`rounded-md px-3 py-2 text-sm transition ${
          pathname === "/"
            ? "bg-cyan-50 font-medium text-cyan-700 dark:bg-cyan-950 dark:text-cyan-300"
            : "text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800"
        }`}
      >
        Overview
      </Link>

      <div className="mt-4 px-3 pb-1 text-xs font-semibold uppercase tracking-wide text-neutral-400 dark:text-neutral-500">
        Examples
      </div>

      {examples.map((example) => {
        const href = `/examples/${example.slug}`;
        const active = pathname === href;
        return (
          <Link
            key={example.slug}
            href={href}
            className={`rounded-md px-3 py-2 text-sm transition ${
              active
                ? "bg-cyan-50 font-medium text-cyan-700 dark:bg-cyan-950 dark:text-cyan-300"
                : "text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800"
            }`}
          >
            {example.title}
          </Link>
        );
      })}
    </nav>
  );
}
