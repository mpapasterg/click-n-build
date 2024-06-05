// Higher order event handler for endpoints requiring authentication

import { type H3Event } from "h3";
import { type JWTPayload, jwtVerify } from "jose";

type Tail<T extends unknown[]> = T extends [infer Head, ...infer Tail]
  ? Tail
  : never;

export const withAuth =
  <T extends (event: H3Event, ...args: any) => any>(
    eventHandler: (
      event: H3Event,
      ...args: Tail<Parameters<T>>
    ) => ReturnType<T> | void
  ): ((
    event: H3Event,
    ...args: Tail<Parameters<T>>
  ) => Promise<ReturnType<T> | void>) =>
  async (event, ...args) => {
    const accessToken: string | undefined = getCookie(event, "x-access-token");

    // Check if access token exists
    if (accessToken === undefined) {
      throw createError({
        statusCode: sanitizeStatusCode(401),
        statusMessage: sanitizeStatusMessage("Unauthorized"),
        data: {
          message: "Missing access token",
        },
      });
    }

    // Check if access token is valid
    let payload: (Auth & JWTPayload) | undefined;
    try {
      payload = (
        await jwtVerify<Auth>(
          accessToken,
          new TextEncoder().encode(process.env.JWT_SECRET)
        )
      ).payload;
    } catch (error) {
      console.log(error);
      throw createError({
        statusCode: sanitizeStatusCode(401),
        statusText: sanitizeStatusMessage("Unauthorized"),
        data: {
          message: "Invalid access token",
        },
      });
    }

    // Add payload to context
    const auth: Auth = {
      id: payload.id,
      email: payload.email,
      username: payload.username,
    };
    event.context.auth = auth;

    return eventHandler(event, ...args);
  };
