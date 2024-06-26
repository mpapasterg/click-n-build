// Higher-Order endpoint for ID validation

import { type H3Event } from "h3";

type Tail<T extends unknown[]> = T extends [infer Head, ...infer Tail]
  ? Tail
  : never;

export const withID =
  <T extends (event: H3Event, ...args: any) => any>(
    eventHandler: (
      id: string,
      event: H3Event,
      ...args: Tail<Parameters<T>>
    ) => ReturnType<T> | void
  ): ((
    event: H3Event,
    ...args: Tail<Parameters<T>>
  ) => Promise<ReturnType<T> | void>) =>
  async (event, ...args) => {
    // Check if ID is of correct type
    const idParseResult = await getValidatedRouterParams(
      event,
      IDParamSchema.safeParse
    );
    if (!idParseResult.success) {
      console.log(idParseResult.error);
      throw createError({
        statusCode: sanitizeStatusCode(400),
        statusMessage: sanitizeStatusMessage("Bad Request"),
        data: {
          message: "Invalid Build ID",
        },
      });
    }
    const id: string = idParseResult.data.id;
    // const idData: number = Number(getRouterParam(event, "id"));
    // if (Number.isNaN(idData)) {
    //   throw createError({
    //     statusCode: sanitizeStatusCode(400),
    //     statusMessage: sanitizeStatusMessage("Bad Request"),
    //     data: {
    //       message: "Invalid Build ID",
    //     },
    //   });
    // }
    // const idParseResult = IDSchema.safeParse(idData);
    // if (!idParseResult.success) {
    //   throw createError({
    //     statusCode: sanitizeStatusCode(400),
    //     statusMessage: sanitizeStatusMessage("Bad Request"),
    //     data: {
    //       message: "Invalid Build ID",
    //     },
    //   });
    // }
    // const id: string = idParseResult.data;

    return eventHandler(id, event, ...args);
  };
