import { SignJWT } from "jose";

export default defineEventHandler(async (event) => {
  // Extract credentials from form data
  const credentials: FormData = await readFormData(event);
  const email: string | undefined = credentials.get("email")?.toString();
  const password: string | undefined = credentials.get("password")?.toString();

  // Check if all credentials were sent
  if (email === undefined || password === undefined) {
    throw createError({
      statusCode: sanitizeStatusCode(400),
      statusMessage: sanitizeStatusMessage("Bad Request"),
      data: {
        message: "Invalid Credentials",
      },
    });
  }

  // Check credentials validity
  if (email !== mockEmail) {
    throw createError({
      statusCode: sanitizeStatusCode(404),
      statusMessage: sanitizeStatusMessage("Not Found"),
      data: {
        message: "Email does not match user",
      },
    });
  }
  if (password !== mockPassword) {
    throw createError({
      statusCode: sanitizeStatusCode(401),
      statusMessage: sanitizeStatusMessage("Unauthorized"),
      data: {
        message: "Invalid password",
      },
    });
  }

  // Generate JWT access token
  const auth: Auth = {
    email,
    username: mockUsername,
  };
  const accessToken = await new SignJWT(auth)
    .setProtectedHeader({
      alg: "HS256",
    })
    .setExpirationTime(60 * 60 * 24)
    .sign(mockSecret);

  // Store access token to cookie
  setCookie(event, "x-access-token", accessToken, {
    httpOnly: true,
    sameSite: "strict",
    secure: true,
    maxAge: 60 * 60 * 24,
    path: "/",
  });

  return auth;
});
