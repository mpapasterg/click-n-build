// A middleware extends, protects or modifies the event at hand
// Returning anything from a middleware will return that response and not execute event handlers for the specific request (not recommended)

import { type JWTPayload, jwtVerify } from "jose";
import { serverOnly } from "../utils/serverOnly";

export default defineEventHandler(
  serverOnly(async (event) => {
    // Skip auth routes from checks
    if (getRequestURL(event).pathname.startsWith("/api/auth")) {
      return;
    }

    const accessToken: string | undefined = getHeader(event, "x-auth-token");

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
  })
);
