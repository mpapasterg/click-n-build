// Higher order event handler for server endpoint isolation

import { type H3Event } from "h3";

type Tail<T extends unknown[]> = T extends [infer Head, ...infer Tail]
  ? Tail
  : never;

export const serverOnly =
  <T extends (event: H3Event, ...args: any) => any>(
    eventHandler: (
      event: H3Event,
      ...args: Tail<Parameters<T>>
    ) => ReturnType<T> | void
  ): ((event: H3Event, ...args: Tail<Parameters<T>>) => ReturnType<T> | void) =>
  (event, ...args) => {
    // Skip client endpoints
    if (!getRequestURL(event).pathname.startsWith("/api")) {
      return;
    }
    return eventHandler(event, ...args);
  };
