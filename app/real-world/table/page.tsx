"use client";

import { VirtualRenderWave } from "react-render-wave";
import { Demo, ExampleShell, Note } from "@/components/ExampleShell";
import { makeOrders, type Order } from "@/lib/data";

const orders = makeOrders(25_000);

// One template, used by the header and every row, so the columns cannot drift.
const COLUMNS = "minmax(7rem,1fr) minmax(9rem,1.6fr) 6rem 4rem 7rem";

const code = `"use client";

// Rows are absolutely positioned inside the scroller, which a real <table>
// cannot survive: a positioned <tr> drops out of table layout and the columns
// collapse. Use a grid instead and share ONE template between the header and
// the rows, so they cannot drift apart.

const COLUMNS = "minmax(7rem,1fr) minmax(9rem,1.6fr) 6rem 4rem 7rem";

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
    getItemKey={(order) => order.id}
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
          rows, which is what keeps them aligned.
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

      <div className="mt-6">
        <Note tone="warn">
          A real <code className="font-mono text-xs">&lt;table&gt;</code> will
          not work here. Rows are absolutely positioned so the scroller can
          place them, and an absolutely positioned{" "}
          <code className="font-mono text-xs">&lt;tr&gt;</code> leaves table
          layout entirely, taking the column widths with it. Grid or flex rows
          are the way to virtualize tabular data.
        </Note>
      </div>
    </ExampleShell>
  );
}
