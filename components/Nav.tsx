"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { sections } from "@/lib/examples";

const TOP_LEVEL = [
  { href: "/", label: "Overview" },
  { href: "/api-reference", label: "API reference" },
];

function linkClass(active: boolean) {
  return `rounded-md px-3 py-2 text-sm transition ${
    active
      ? "bg-cyan-50 font-medium text-cyan-700 dark:bg-cyan-950 dark:text-cyan-300"
      : "text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800"
  }`;
}

/** Horizontally scrolling nav shown instead of the sidebar on small screens. */
export function MobileNav() {
  const pathname = usePathname();
  const flat = [
    ...TOP_LEVEL,
    ...sections.flatMap((section) =>
      section.entries.map((entry) => ({
        href: `${section.base}/${entry.slug}`,
        label: entry.title,
      }))
    ),
  ];

  return (
    <nav className="flex gap-2 overflow-x-auto pb-1">
      {flat.map(({ href, label }) => {
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
            {label}
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
      {TOP_LEVEL.map(({ href, label }) => (
        <Link key={href} href={href} className={linkClass(pathname === href)}>
          {label}
        </Link>
      ))}

      {sections.map((section) => (
        <div key={section.base}>
          <div className="mt-4 px-3 pb-1 text-xs font-semibold uppercase tracking-wide text-neutral-400 dark:text-neutral-500">
            {section.title}
          </div>
          {section.entries.map((entry) => {
            const href = `${section.base}/${entry.slug}`;
            return (
              <Link
                key={href}
                href={href}
                className={`block ${linkClass(pathname === href)}`}
              >
                {entry.title}
              </Link>
            );
          })}
        </div>
      ))}
    </nav>
  );
}
