import { http, HttpResponse, RequestHandler } from "msw";
import * as cookie from "cookie";
import { SignJWT } from "jose";
import {
  mockBuilderEmail,
  mockBuilderID,
  mockBuilderPassword,
  mockBuilderUsername,
  mockSecret,
} from "../data/auth";

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
      return HttpResponse.json(response, {
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
      return HttpResponse.json(response, {
        status: 400,
        statusText: "Bad Request",
      });
    }

    // Check credentials validity
    if (email !== mockBuilderEmail) {
      const response: ServerErrorResponse = {
        message: "Email does not match user",
      };
      return HttpResponse.json(response, {
        status: 404,
        statusText: "Not Found",
      });
    }
    if (password !== mockBuilderPassword) {
      const response: ServerErrorResponse = {
        message: "Invalid password",
      };
      return HttpResponse.json(response, {
        status: 401,
        statusText: "Unauthorized",
      });
    }

    const response: SignInPostResponse = {
      id: mockBuilderID,
      email,
      username: mockBuilderUsername,
    };
    const accessToken = await new SignJWT(response)
      .setProtectedHeader({
        alg: "HS256",
      })
      .setExpirationTime(60 * 60 * 24)
      .sign(mockSecret);
    return HttpResponse.json(response, {
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
      return HttpResponse.json(response, {
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
      return HttpResponse.json(response, {
        status: 400,
        statusText: "Bad Request",
      });
    }

    // Check if user with given email exists
    if (email === mockBuilderEmail) {
      const response: ServerErrorResponse = {
        message: "User with specified email already exists",
      };
      return HttpResponse.json(response, {
        status: 409,
        statusText: "Conflict",
      });
    }

    const response: SignUpPostResponse = {
      id: mockBuilderID,
      email,
      username,
    };
    return HttpResponse.json(response, { status: 201, statusText: "Created" });
  }),
  http.post(SignOutPostURL, () => {
    const response: SignOutPostResponse = {};
    return HttpResponse.json(response, { status: 200, statusText: "OK" });
  }),
];
