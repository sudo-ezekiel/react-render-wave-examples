/**
 * All sample data is derived from the row index, never from Math.random or
 * Date. These lists render on the server and again on the client, so anything
 * non-deterministic would show up as a hydration mismatch.
 */

const FIRST_NAMES = [
  "Ada",
  "Bruno",
  "Cleo",
  "Dario",
  "Elif",
  "Farid",
  "Greta",
  "Hugo",
  "Ines",
  "Jonas",
  "Kira",
  "Luca",
  "Mira",
  "Nadia",
  "Omar",
  "Petra",
  "Quinn",
  "Rosa",
  "Stefan",
  "Tomas",
  "Ulla",
  "Vera",
  "Wesley",
  "Xenia",
  "Yannis",
  "Zoe",
];

const LAST_NAMES = [
  "Almeida",
  "Bauer",
  "Costa",
  "Dupont",
  "Esposito",
  "Fischer",
  "Garcia",
  "Horvat",
  "Ivanov",
  "Jensen",
  "Kowalski",
  "Lindqvist",
  "Moreau",
  "Novak",
  "Olsen",
  "Petrov",
];

const ROLES = [
  "Design",
  "Engineering",
  "Support",
  "Research",
  "Operations",
  "Marketing",
];

export type Person = {
  id: number;
  name: string;
  email: string;
  role: string;
  letter: string;
};

export function makePeople(count: number, offset = 0): Person[] {
  return Array.from({ length: count }, (_, i) => {
    const id = offset + i;
    const first = FIRST_NAMES[id % FIRST_NAMES.length];
    const last = LAST_NAMES[(id * 7) % LAST_NAMES.length];
    const name = `${first} ${last}`;
    return {
      id,
      name,
      email: `${first.toLowerCase()}.${last.toLowerCase()}${id}@example.com`,
      role: ROLES[id % ROLES.length],
      letter: first[0],
    };
  });
}

/** People sorted by first letter, so group headers are contiguous. */
export function makeContacts(count: number): Person[] {
  return makePeople(count).sort((a, b) => {
    if (a.letter === b.letter) return a.id - b.id;
    return a.letter < b.letter ? -1 : 1;
  });
}

const SENTENCES = [
  "Progressive rendering keeps the main thread free while a long list streams in.",
  "Only the rows inside the viewport are mounted, so the DOM stays small.",
  "Row heights are measured as they mount and cached for later scrolls.",
  "The offset cache uses prefix sums with binary search, so lookups stay cheap.",
  "Measurements survive unmounting, which is why scrolling back never jumps.",
];

export type Post = {
  id: number;
  title: string;
  body: string;
};

export function makePosts(count: number, offset = 0): Post[] {
  return Array.from({ length: count }, (_, i) => {
    const id = offset + i;
    const sentences = 1 + (id % 4);
    return {
      id,
      title: `Post ${id}`,
      body: Array.from(
        { length: sentences },
        (_, s) => SENTENCES[(id + s) % SENTENCES.length]
      ).join(" "),
    };
  });
}

const MESSAGE_BODIES = [
  "Did the deploy go out?",
  "Yes, about ten minutes ago. Logs look clean so far.",
  "I pushed the fix for the scroll jump. It was the measurement cache being cleared on unmount, which is exactly what it is supposed to prevent.",
  "Nice catch.",
  "Do we still need the polyfill?",
  "Only for the older Safari we said we would drop in March. I would leave it until then.",
  "Sounds good.",
  "One more thing: the sticky header flickers when you scroll up fast. I think it is the group lookup running before the offsets settle.",
  "Filed it.",
  "Thanks. I will pick it up tomorrow morning.",
];

export type Message = {
  id: number;
  author: string;
  body: string;
  time: string;
  mine: boolean;
};

/** A chat transcript. Message length varies, so rows need measuring. */
export function makeMessages(count: number, offset = 0): Message[] {
  return Array.from({ length: count }, (_, i) => {
    const id = offset + i;
    const mine = id % 3 === 0;
    // Minutes past midnight, wrapped into one day so the clock stays valid
    // however long the transcript grows.
    const minutes = (8 * 60 + id * 7) % (24 * 60);
    return {
      id,
      author: mine ? "You" : FIRST_NAMES[id % FIRST_NAMES.length],
      body: MESSAGE_BODIES[id % MESSAGE_BODIES.length],
      time: `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`,
      mine,
    };
  });
}

const ORDER_STATUS = ["Paid", "Pending", "Refunded", "Shipped"] as const;

export type Order = {
  id: string;
  customer: string;
  status: (typeof ORDER_STATUS)[number];
  items: number;
  total: string;
};

/** Rows for a table layout. Amounts are derived from the index, not random. */
export function makeOrders(count: number): Order[] {
  return Array.from({ length: count }, (_, i) => {
    const first = FIRST_NAMES[i % FIRST_NAMES.length];
    const last = LAST_NAMES[(i * 5) % LAST_NAMES.length];
    const cents = 1999 + ((i * 3607) % 240000);
    return {
      id: `ORD-${String(100000 + i)}`,
      customer: `${first} ${last}`,
      status: ORDER_STATUS[i % ORDER_STATUS.length],
      items: 1 + (i % 6),
      total: `$${(cents / 100).toFixed(2)}`,
    };
  });
}
