"use client";

import { forwardRef } from "react";
import Link from "next/link";
import { VirtualRenderWave, type WrapperProps } from "react-render-wave";
import { Code, Demo, ExampleShell, Note } from "@/components/ExampleShell";
import { makeOrders, type Order } from "@/lib/data";

const orders = makeOrders(25_000);

const COLUMNS = "minmax(7rem,1fr) minmax(9rem,1.6fr) 6rem 4rem 7rem";

const linkClass =
  "font-medium text-cyan-600 underline-offset-2 hover:underline dark:text-cyan-400";

const Scroller = forwardRef<HTMLDivElement, WrapperProps>(function Scroller(
  { children, ...rest },
  ref,
) {
  return (
    <div
      {...rest}
      ref={ref}
      style={{ ...rest.style, overscrollBehavior: "contain" }}
    >
      {children}
    </div>
  );
});

const code = `"use client";

import { forwardRef } from "react";
import { VirtualRenderWave, type WrapperProps } from "react-render-wave";

const COLUMNS = "minmax(7rem,1fr) minmax(9rem,1.6fr) 6rem 4rem 7rem";

const Scroller = forwardRef<HTMLDivElement, WrapperProps>(function Scroller(
  { children, ...rest },
  ref,
) {
  return (
    <div
      {...rest}
      ref={ref}
      style={{ ...rest.style, overscrollBehavior: "contain" }}
    >
      {children}
    </div>
  );
});

<div className="rounded-xl border">
  {/* Header lives outside the scroller, so it does not scroll at all. */}
  <div
    className="grid border-b bg-neutral-50 text-xs uppercase"
    style={{ gridTemplateColumns: COLUMNS }}
  >
    <Th>Order</Th><Th>Customer</Th><Th>Status</Th><Th right>Items</Th><Th right>Total</Th>
  </div>

  <VirtualRenderWave
    items={orders}
    itemHeight={44}
    containerHeight={420}
    batchSize={orders.length}
    overscan={6}
    getItemKey={(order) => order.id}
    outerElement={Scroller}
    ariaLabel="Orders"
    renderItem={(order) => (
      <div className="grid items-center" style={{ gridTemplateColumns: COLUMNS }}>
        <Td mono>{order.id}</Td>
        <Td>{order.customer}</Td>
        <Td><StatusPill status={order.status} /></Td>
        <Td right>{order.items}</Td>
        <Td right mono>{order.total}</Td>
      </div>
    )}
  />
</div>`;

function Th({
  children,
  right,
}: {
  children: React.ReactNode;
  right?: boolean;
}) {
  return (
    <div
      className={`px-3 py-2 font-semibold tracking-wide text-neutral-500 dark:text-neutral-400 ${
        right ? "text-right" : ""
      }`}
    >
      {children}
    </div>
  );
}

function Td({
  children,
  right,
  mono,
}: {
  children: React.ReactNode;
  right?: boolean;
  mono?: boolean;
}) {
  return (
    <div
      className={`truncate px-3 text-sm text-neutral-700 dark:text-neutral-300 ${
        right ? "text-right" : ""
      } ${mono ? "font-mono text-xs" : ""}`}
    >
      {children}
    </div>
  );
}

const STATUS_STYLES: Record<Order["status"], string> = {
  Paid: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
  Pending: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
  Refunded: "bg-neutral-200 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300",
  Shipped: "bg-cyan-100 text-cyan-700 dark:bg-cyan-950 dark:text-cyan-300",
};

export default function TableExample() {
  return (
    <ExampleShell
      title="Data table"
      description={
        <>
          25,000 orders under a header row that never moves. The header sits
          outside the scroll container and shares its column template with the
          rows, which is what keeps them aligned. The scroll container is a
          custom <Code>outerElement</Code>.
        </>
      }
      code={code}
    >
      <Demo>
        <div
          className="grid border-b border-neutral-200 bg-neutral-50 text-xs uppercase dark:border-neutral-800 dark:bg-neutral-800/60"
          style={{ gridTemplateColumns: COLUMNS }}
        >
          <Th>Order</Th>
          <Th>Customer</Th>
          <Th>Status</Th>
          <Th right>Items</Th>
          <Th right>Total</Th>
        </div>

        <VirtualRenderWave
          items={orders}
          itemHeight={44}
          containerHeight={420}
          batchSize={orders.length}
          overscan={6}
          getItemKey={(order) => order.id}
          outerElement={Scroller}
          ariaLabel="Orders"
          renderItem={(order) => (
            <div
              className="grid h-11 items-center border-b border-neutral-100 dark:border-neutral-800"
              style={{ gridTemplateColumns: COLUMNS }}
            >
              <Td mono>{order.id}</Td>
              <Td>{order.customer}</Td>
              <div className="px-3">
                <span
                  className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_STYLES[order.status]}`}
                >
                  {order.status}
                </span>
              </div>
              <Td right>{order.items}</Td>
              <Td right mono>
                {order.total}
              </Td>
            </div>
          )}
        />
      </Demo>

      <div className="mt-6 flex flex-col gap-4">
        <Note tone="warn">
          Wrap a custom <Code>outerElement</Code> or <Code>innerElement</Code> in{" "}
          <Code>forwardRef</Code> and attach the forwarded ref to your DOM node.
          The list scrolls and measures through that ref. On React 19 it also
          arrives as an ordinary prop, <Code>props.ref</Code>, which is optional,
          so a read of it is <Code>props.ref?.current</Code>. On React 18 a plain
          function component never receives it, so a wrapper that reads the ref
          from props works on 19 and fails silently on 18: the list cannot
          scroll and cannot measure. The only sign is a{" "}
          <Code>console.error</Code> in development naming the wrapper. Spread
          every other prop onto the node as well, or focus, keyboard navigation
          and the container styles go missing.
        </Note>

        <Note tone="warn">
          A real <Code>&lt;table&gt;</Code> will not work here. Rows are
          absolutely positioned so the scroller can place them, and an absolutely
          positioned <Code>&lt;tr&gt;</Code> leaves table layout entirely, taking
          the column widths with it. Grid or flex rows are the way to virtualize
          tabular data.
        </Note>

        <Note>
          If the markup has to be real table elements, reach for{" "}
          <Code>useVirtualWindow</Code>, added in 3.1.0. It returns the window,
          the offsets and the total size and renders nothing at all, so the{" "}
          <Code>&lt;table&gt;</Code>, <Code>&lt;tbody&gt;</Code> and{" "}
          <Code>&lt;tr&gt;</Code> are yours to write, spaced with a padding row
          at each end of the <Code>&lt;tbody&gt;</Code> rather than by absolute
          positioning. See the{" "}
          <Link href="/examples/use-virtual-window" className={linkClass}>
            useVirtualWindow example
          </Link>
          . What you give up is the wave: <Code>VirtualRenderWave</Code> is that
          same hook with the timed reveal on top.
        </Note>
      </div>
    </ExampleShell>
  );
}
