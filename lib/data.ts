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
