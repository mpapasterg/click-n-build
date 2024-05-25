import { SignJWT } from "jose";
import { Builder } from "~/specs/domain";

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

  // Find user with given email
  const user: Builder | null = await BuilderModel.findOne({ email: email });
  if (user === null) {
    throw createError({
      statusCode: sanitizeStatusCode(404),
      statusMessage: sanitizeStatusMessage("Not Found"),
      data: {
        message: "Email does not match user",
      },
    });
  }

  // Check credentials validity
  if (user.password !== password) {
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
    username: user.username,
  };
  const accessToken = await new SignJWT(auth)
    .setProtectedHeader({
      alg: "HS256",
    })
    .setExpirationTime(60 * 60 * 24)
    .sign(new TextEncoder().encode(process.env.JWT_SECRET));

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
