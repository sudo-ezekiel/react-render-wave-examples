"use client";

import { useState } from "react";

export function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard access can be denied; the code is selectable either way.
    }
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={copy}
        className="absolute right-3 top-3 rounded-md border border-neutral-700 bg-neutral-800 px-2 py-1 text-xs text-neutral-300 transition hover:bg-neutral-700"
      >
        {copied ? "Copied" : "Copy"}
      </button>
      <pre className="overflow-x-auto rounded-xl border border-neutral-800 bg-neutral-900 p-4 text-sm leading-relaxed text-neutral-100">
        <code className="font-mono">{code}</code>
      </pre>
    </div>
  );
}
