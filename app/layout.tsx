import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { Nav, MobileNav } from "@/components/Nav";

export const metadata: Metadata = {
  metadataBase: new URL("https://renderwave.sudo-ezekiel.com"),
  title: {
    default: "React Render Wave",
    template: "%s | React Render Wave",
  },
  description:
    "Documentation, recipes and runnable examples for react-render-wave: progressive wave rendering and virtual scrolling for React lists.",
  openGraph: {
    title: "React Render Wave",
    description:
      "Documentation, recipes and runnable examples for progressive rendering and virtual scrolling in React.",
    url: "https://renderwave.sudo-ezekiel.com",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-8 md:flex-row md:py-12">
          <aside className="shrink-0 md:sticky md:top-12 md:h-fit md:w-56">
            <Link href="/" className="mb-6 block">
              <span className="text-lg font-bold text-neutral-900 dark:text-neutral-50">
                🌊 Render Wave
              </span>
              <span className="mt-0.5 block text-xs text-neutral-500 dark:text-neutral-400">
                Docs and examples for v3
              </span>
            </Link>

            <div className="hidden md:block">
              <Nav />
            </div>
            <div className="md:hidden">
              <MobileNav />
            </div>

            <div className="mt-6 hidden flex-col gap-1 border-t border-neutral-200 pt-4 text-sm md:flex dark:border-neutral-800">
              <a
                href="https://github.com/sudo-ezekiel/react-render-wave"
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1 text-neutral-500 transition hover:text-cyan-600 dark:text-neutral-400 dark:hover:text-cyan-400"
              >
                GitHub
              </a>
              <a
                href="https://www.npmjs.com/package/react-render-wave"
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1 text-neutral-500 transition hover:text-cyan-600 dark:text-neutral-400 dark:hover:text-cyan-400"
              >
                npm
              </a>
            </div>
          </aside>

          <main className="min-w-0 flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}
