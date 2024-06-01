import { type JWTPayload, jwtVerify } from "jose";
import {
  HttpResponse,
  type HttpResponseResolver,
  type ResponseResolver,
} from "msw";
import { mockSecret } from "../data/auth";

// Define higher order handler for API endpoints requiring authentication
export const requiresAuthentication: (
  resolver: (
    accessToken: JWTPayload,
    ...info: [...Parameters<HttpResponseResolver>]
  ) => ReturnType<HttpResponseResolver>
) => HttpResponseResolver = (resolver) => async (info) => {
  const request = info.request;

  const accessToken: string | null = request.headers.get("x-auth-token");
  // Check if access token exists
  if (accessToken === null) {
    const response: ServerErrorResponse = {
      message: "Missing access token",
    };
    return HttpResponse.json(response, {
      status: 400,
      statusText: "Bad Request",
    });
  }

  // Check if access token is valid
  let payload: JWTPayload | undefined;
  try {
    payload = (await jwtVerify(accessToken, mockSecret)).payload;
  } catch (error) {
    const response: ServerErrorResponse = {
      message: "Invalid access token",
    };
    return HttpResponse.json(response, {
      status: 401,
      statusText: "Unauthorized",
    });
  }
  return resolver(payload, info);
};
