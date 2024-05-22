import { http, RequestHandler, type ResponseResolver } from "msw";
import * as cookie from "cookie";
import { jwtVerify, SignJWT, type JWTPayload } from "jose";

// Define mock auth data
export const mockEmail: string = "test@test.com";
export const mockUsername: string = "test";
export const mockPassword: string = "passwd123!";
const mockSecret: Uint8Array = new TextEncoder().encode("secret");

type AddParameters<
  TFunction extends (...args: any) => any,
  TParameters extends [...args: any]
> = (
  ...args: [...Parameters<TFunction>, ...TParameters]
) => ReturnType<TFunction>;

// Define higher order handler for API endpoints requiring authentication
export const verified: (
  resolver: (
    ...args: [...Parameters<ResponseResolver>, JWTPayload]
  ) => ReturnType<ResponseResolver>
) => ResponseResolver = (resolver) => async (info) => {
  const request = info.request;

  const accessToken: string | null = request.headers.get("x-auth-token");
  // Check if access token exists
  if (accessToken === null) {
    const response: ServerErrorResponse = {
      message: "Missing access token",
    };
    return Response.json(response, {
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
    return Response.json(response, {
      status: 401,
      statusText: "Unauthorized",
    });
  }
  return resolver(info, payload);
};

// Define all API request handlers
export const handlers: Array<RequestHandler> = [
  http.post(SignInPostURL, async ({ request, params, cookies }) => {
    // Extract credentials from form data
    const credentials: FormData = await request.formData();
    const email: string | undefined = credentials.get("email")?.toString();
    const password: string | undefined = credentials
      .get("password")
      ?.toString();

    // Check if all credentials were sent
    if (email === undefined || password === undefined) {
      const response: ServerErrorResponse = {
        message: "Invalid Credentials",
      };
      return Response.json(response, {
        status: 400,
        statusText: "Bad Request",
      });
    }

    // Check credentials structure
    const result = SignInPostRequestSchema.safeParse({ email, password });
    if (!result.success) {
      const response: ServerErrorResponse = {
        message: "Invalid credentials",
      };
      return Response.json(response, {
        status: 400,
        statusText: "Bad Request",
      });
    }

    // Check credentials validity
    if (email !== mockEmail) {
      const response: ServerErrorResponse = {
        message: "Email does not match user",
      };
      return Response.json(response, {
        status: 404,
        statusText: "Not Found",
      });
    }
    if (password !== mockPassword) {
      const response: ServerErrorResponse = {
        message: "Invalid password",
      };
      return Response.json(response, {
        status: 401,
        statusText: "Unauthorized",
      });
    }

    const response: SignInPostResponse = {
      email,
      username: mockUsername,
    };
    const accessToken = await new SignJWT(response)
      .setProtectedHeader({
        alg: "HS256",
      })
      .setExpirationTime(60 * 60 * 24)
      .sign(mockSecret);
    return Response.json(response, {
      headers: {
        "Set-Cookie": cookie.serialize("x-auth-token", accessToken, {
          httpOnly: true,
          sameSite: "strict",
          secure: true,
          maxAge: 60 * 60 * 24,
          path: "/",
        }),
      },
      status: 200,
      statusText: "OK",
    });
  }),
  http.post(SignUpPostURL, async ({ request, params, cookies }) => {
    // Extract credentials from form data
    const credentials: FormData = await request.formData();
    const email: string | undefined = credentials.get("email")?.toString();
    const username: string | undefined = credentials.get("email")?.toString();
    const password: string | undefined = credentials
      .get("password")
      ?.toString();

    // Check if all credentials were sent
    if (
      email === undefined ||
      username === undefined ||
      password === undefined
    ) {
      const response: ServerErrorResponse = {
        message: "Invalid Credentials",
      };
      return Response.json(response, {
        status: 400,
        statusText: "Bad Request",
      });
    }

    // Check credentials structure
    const result = SignUpPostRequestSchema.safeParse({
      email,
      username,
      password,
    });
    if (!result.success) {
      const response: ServerErrorResponse = {
        message: "Invalid credentials",
      };
      return Response.json(response, {
        status: 400,
        statusText: "Bad Request",
      });
    }

    // Check if user with given email exists
    if (email === mockEmail) {
      const response: ServerErrorResponse = {
        message: "User with specified email already exists",
      };
      return Response.json(response, {
        status: 409,
        statusText: "Conflict",
      });
    }

    const response: SignUpPostResponse = {
      email,
      username,
    };
    return Response.json(response, { status: 201, statusText: "Created" });
  }),
  http.post(SignOutPostURL, () => {
    const response: SignOutPostResponse = {};
    return Response.json(response, { status: 200, statusText: "OK" });
  }),
];
