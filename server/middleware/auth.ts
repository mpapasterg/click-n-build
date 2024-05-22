// A middleware extends, protects or modifies the event at hand
// Returning anything from a middleware will return that response and not execute event handlers for the specific request (not recommended)

import { JWTPayload, jwtVerify } from "jose";

export default defineEventHandler(async (event) => {
  // Skip auth routes from checks
  if (getRequestURL(event).pathname.startsWith("/auth")) {
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
  let payload: JWTPayload | undefined;
  try {
    payload = (await jwtVerify(accessToken, mockSecret)).payload;
  } catch (error) {
    throw createError({
      statusCode: sanitizeStatusCode(401),
      statusText: sanitizeStatusMessage("Unauthorized"),
      data: {
        message: "Invalid access token",
      },
    });
  }
});
